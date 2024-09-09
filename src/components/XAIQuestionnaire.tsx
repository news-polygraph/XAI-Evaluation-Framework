import Head from "next/head";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { qualificationQuestionnaire } from "@/questionnaire/qualification-questionnaire";
import { registerMyQuestion } from "./NewsItemQuestion";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import NewsItem from "@/model/news-item";
import { SurveyPart } from "@/model/survey-part";
import { mainQuestionnaire } from "@/questionnaire/main-questionnaire";
import { mergedQuestionnaire } from "@/questionnaire/merged-questionnaire";
import { NewsItemQuestionModel } from "./NewsItemQuestion";

/**
 * A Next.js page that renders a survey using the SurveyJS library based on the given part and features.
 * The page also handles the submission of the survey to the Crowdee platform.
 */

const XAIQuestionnaire = ({
  newsItems,
  xaiFeature,
  groupNumber,
  part,
}: {
  newsItems: NewsItem[];
  xaiFeature: XAIFeatureLevel;
  groupNumber: number;
  part: SurveyPart;
}) => {
  console.log(`PART: ${part}; GROUP: ${groupNumber}; FEATURE: ${xaiFeature};`);

  let questionnaire: (
    newsItems: NewsItem[],
    xaiFeature: XAIFeatureLevel
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
  const survey = new Model(questionnaire(newsItems, xaiFeature));
  

  survey.onAfterRenderPage.add((sender, options) => {
    // hide "Previous" button on all pages except the "You are ready" page
    const prevButton = document.querySelector(
      ".sd-navigation__prev-btn"
    ) as HTMLElement;

    if (prevButton) {
      prevButton.style.display =
        options.page.name === "you-are-ready" ? "block" : "none";
    }
  });

  survey.onCurrentPageChanged.add((sender, options) => {
    // jump back to start of tutorial when user clicks "Previous"
    if (options.oldCurrentPage.name === "you-are-ready" && options.isPrevPage) {
      sender.setValue("understand-task", undefined);
      sender.currentPage = sender.getPageByName("tutorial-text");
    }
    // complete questionnaire if user answers incorrectly in the qualification survey
    // else if (
    //   part === "qualification" &&
    //   options.oldCurrentPage.name === "control-question"
    // ) {
    //   const hasIncorrectAnswer = sender
    //     .getQuizQuestions()
    //     .some((question) => !question.isEmpty() && !question.isAnswerCorrect());

    //   if (hasIncorrectAnswer) {
    //     survey.doComplete();
    //   }
    // }
  });

  survey.onValueChanged.add((sender, options) => {
    if (options.name === "understand-task") {
      if (options.value === "Nein") {
        sender.setValue("understand-task", undefined);
        sender.currentPage = sender.getPageByName("tutorial-text");
      }
    }
  });
  survey.onComplete.add((result) => {
    // crowdee removes the id from the form, so in production we need to get it by the second selector
    const submitForm = (document.getElementById("submit-form") ??
      document.querySelector("body > form")) as HTMLFormElement;
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
      "METADATA.GROUP": groupNumber,
      "METADATA.PART": part,
      // POINTS: result.getCorrectAnswerCount(),
    };

    let totalCorrectAnswers = 0;

    // Iterate over all questions and check if they are NewsItemQuestions
    result.getAllQuestions().forEach((question) => {
      if (question.getType() === "newsitem" && question.name.includes("rating-after-xai")) {
        const newsItemQuestion = question as NewsItemQuestionModel;

        // Access the correctAnswer from the question model
        const correctAnswer = newsItemQuestion.correctAnswer;

        // The key in formData is question_<name of the question>_correctAnswer, and the value is the correctAnswer
        formData[`question_${newsItemQuestion.name}_correctAnswer`] = correctAnswer;

        // This is the sum of correct Answers among all of the questions
        totalCorrectAnswers += correctAnswer;
      }
    });

    console.log("TOTAL CORRECT ANSWERS: " + totalCorrectAnswers);


    //Add the total number of correct answers to the formData to calculate the points in the Crowdee platform
    formData.POINTS = totalCorrectAnswers;

    for (const key in result.data) {  
      if (typeof result.data[key] === "object") {
        for (const subKey in result.data[key]) {
          formData[`${key}.${subKey}`] = result.data[key][subKey];
        }
      } else {
        formData[key] = result.data[key];
      }
    }

    console.log(formData);

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
      .then((html) => {
        // replace the entire page with the response from the server
        document.open();
        document.write(html);
        document.close();
      })
      .catch((error) => console.error(error));
  });

  return (
    <>
      <Head>
        <title>Political Viewpoint Visualization Experiment</title>
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
            {/* This experiment is conducted by the <a href="">***</a> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default XAIQuestionnaire;
