import Head from "next/head";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { qualificationQuestionnaire } from "@/questionnaire/qualification-questionnaire";
import { registerMyQuestion } from "./DatasetItemQuestion";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import DatasetItem from "@/model/dataset-item";
import { SurveyPart } from "@/model/survey-part";
import { mainQuestionnaire } from "@/questionnaire/main-questionnaire";
import { mergedQuestionnaire } from "@/questionnaire/merged-questionnaire";
import { ExperimentType } from "@/model/experiment-type";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ZebraLogicDraftProvider } from "./ZebraLogicDraftContext";

const XAIQuestionnaire = ({
  datasetItems,
  dataset,
  xaiFeature,
  part,
  experimentType,
}: {
  datasetItems: DatasetItem[];
  dataset: string;
  xaiFeature: XAIFeatureLevel;
  part: SurveyPart;
  experimentType: ExperimentType;
}) => {
  const router = useRouter();
  const pageTimestamps = useRef<{ [pageName: string]: number }>({});
  const lastPageEntryTime = useRef<number>(0);

  useEffect(() => {
    if (!router.isReady) return;

    const pid = router.query.PROLIFIC_PID as string;
    const studyId = router.query.STUDY_ID as string;
    const sessId = router.query.SESSION_ID as string;

    if (pid) localStorage.setItem("prolific.pid", pid);
    if (studyId) localStorage.setItem("prolific.study_id", studyId);
    if (sessId) localStorage.setItem("prolific.session_id", sessId);
  }, [router.isReady, router.query]);

  console.log(`PART: ${part}; FEATURE: ${xaiFeature};`);

  let questionnaire: (
    datasetItems: DatasetItem[],
    dataset: string,
    xaiFeature: XAIFeatureLevel,
    experimentType: ExperimentType
  ) => any;

  switch (part) {
    case "qualification":
      questionnaire = qualificationQuestionnaire;
      break;
    case "main":
      questionnaire = mainQuestionnaire;
      break;
    case "merged":
      questionnaire = mergedQuestionnaire;
      break;
    default:
      throw new Error("Invalid survey part");
  }

  registerMyQuestion();
  const survey = new Model(questionnaire(datasetItems, dataset, xaiFeature, experimentType));
  const urlParams = new URLSearchParams(window.location.search)
  const isExperimentOnly = urlParams.get('experimentOnly') === 'true'
  if (isExperimentOnly) {
    survey.widthMode = 'responsive'
  }


  survey.onStarted.add(() => {
    lastPageEntryTime.current = Date.now();
  });

  survey.onAfterRenderPage.add((sender, options) => {
    const prevButton = document.querySelector(
      ".sd-navigation__prev-btn"
    ) as HTMLElement;

    if (prevButton) {
      prevButton.style.display =
        options.page.name === "you-are-ready" ? "block" : "none";
    }
  });

  survey.onCurrentPageChanged.add((sender, options) => {
    if (options.oldCurrentPage) {
      const timeSpent = Date.now() - lastPageEntryTime.current;
      let pageName = options.oldCurrentPage.name;
      if (pageName.startsWith("page") && options.oldCurrentPage.questions.length > 0) {
        pageName = options.oldCurrentPage.questions[0].name;
      }
      pageTimestamps.current[pageName] = (pageTimestamps.current[pageName] || 0) + timeSpent;
      sender.setValue(`TIME_SPENT_${pageName}`, timeSpent);
    }
    lastPageEntryTime.current = Date.now();

    if (options.oldCurrentPage?.name === "you-are-ready" && options.isPrevPage) {
      sender.setValue("understand-task", undefined);
      sender.currentPage = sender.getPageByName("tutorial-text");
    }
    else if (
    (part === "qualification" || part === "merged") &&
      options.oldCurrentPage?.name === "control-question"
    ) {
      const hasIncorrectAnswer = sender
        .getQuizQuestions()
        .filter((q: any) => q.isQualification === true)
        .some((question) => !question.isEmpty() && !question.isAnswerCorrect());
      
      if (hasIncorrectAnswer) {
        survey.doComplete();
      }
    }
  });

  survey.onValueChanged.add((sender, options) => {
    if (options.name === "understand-task") {
      if (options.value === "No") {
        sender.setValue("understand-task", undefined);
        sender.currentPage = sender.getPageByName("tutorial-text");
      }
    }
  });

  survey.onComplete.add((result) => {
    if (survey.currentPage) {
      const timeSpent = Date.now() - lastPageEntryTime.current;
      let pageName = survey.currentPage.name;
      if (pageName.startsWith("page") && survey.currentPage.questions.length > 0) {
        pageName = survey.currentPage.questions[0].name;
      }
      result.setValue(`TIME_SPENT_${pageName}`, timeSpent);
    }

    const submitForm = (document.getElementById("submit-form") ??
      document.querySelector("body > form")) as HTMLFormElement;
    const prolificPID = localStorage.getItem("prolific.pid") ?? "N/A";
    const studyID     = localStorage.getItem("prolific.study_id") ?? "N/A";
    const sessionID   = localStorage.getItem("prolific.session_id") ?? "N/A";

    const formData: { [key: string]: any } = {
      "x-crowdee-task": (
        submitForm.querySelector(
          "input[name=x-crowdee-task]"
        ) as HTMLInputElement
      )?.value,
      "x-crowdee-user": (
        submitForm.querySelector(
          "input[name=x-crowdee-user]"
        ) as HTMLInputElement
      )?.value,
      "x-crowdee-mode": (
        submitForm.querySelector(
          "input[name=x-crowdee-mode]"
        ) as HTMLInputElement
      )?.value,
      "METADATA.FEATURE": xaiFeature,
      "METADATA.EXPERIMENT_TYPE": experimentType,
      "METADATA.PART": part,
      "PROLIFIC_PID": prolificPID,
      "STUDY_ID": studyID,
      "SESSION_ID": sessionID,
      POINTS: result.getCorrectAnswerCount(),
    };

    for (const key in result.data) {
      if (typeof result.data[key] === "object") {
        for (const subKey in result.data[key]) {
          formData[`${key}.${subKey}`] = result.data[key][subKey];
        }
      } else {
        formData[key] = result.data[key];
      }
    }

    console.log("Submitting formData:", formData);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html",
      },
      body: new URLSearchParams(formData),
    };

    fetch(submitForm.action, options)
      .then((response) => response.text())
      .then(() => {
        // window.location.href = "https://app.prolific.com/submissions/complete?cc=YOUR_COMPLETION_CODE";
        console.log("SUCCESS: Would redirect to Prolific now!");
      })
      .catch((error) => {
        console.error(error);
        // window.location.href = "https://app.prolific.com/submissions/complete?cc=YOUR_COMPLETION_CODE";
        console.log("ERROR: Would redirect to Prolific now!");
      });
  });

  return (
    <ZebraLogicDraftProvider>
      <Head>
        <title>XAI Experiment</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        css={{
          position: "relative",
        }}
      >
        <Survey
          model={survey}
          css={{
            "--sd-base-padding": "32px",
            ".sd-action-bar": {
              justifyContent: "end",
            },
            ".sd-row": {
              justifyContent: "center",
            },
            ".sd-progress__text": {
              display: "none",
            },
            ".sd-completedpage": {
              fontWeight: "normal !important",
            },
          }}
        />
        <div
          className="imprint"
          css={{
            fontFamily: "Inter, sans-serif",
            color: "#1D1D1F",
            fontSize: "13px",
            padding: "24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            This experiment is conducted by the <a href="">***</a>
          </div>
        </div>
      </main>
    </ZebraLogicDraftProvider>
  );
};

export default XAIQuestionnaire;