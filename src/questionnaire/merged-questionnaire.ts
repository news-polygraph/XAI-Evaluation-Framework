import { XAIFeatureLevel } from "@/model/xai-feature-level";
import mergedStartPage from "./parts/merged-start-page";
import expectations from "./parts/expectations";
import informationLiteracy from "./parts/information-literacy";
import informationSeekingBehaviour from "./parts/information-seeking-behaviour";
import experimentPages from "./parts/experiment";
import aiSystemEvaluation from "./parts/ai-system-evaluation";
import demographics from "./parts/demographics";
import almostDone from "./parts/almost-done";
import tutorial from "./parts/tutorial";
import youAreReady from "./parts/you-are-ready";
import personalCode from "./parts/personal-code";
import DatasetItem from "@/model/dataset-item";
import newsDashboardEvaluation from "./parts/news-dashboard-evaluation";
import { ExperimentType } from "@/model/experiment-type";
import qualificationStartPage from "./parts/qualification-start-page";
import welcomeToQualification from "./parts/welcome-to-qualification";
import mainStartPage from "./parts/main-start-page";

export const mergedQuestionnaire = (
  datasetItems: DatasetItem[],
  dataset: string,
  xaiFeatures: XAIFeatureLevel,
  experimentType: ExperimentType
) => {
  // check if experimentOnly is set to true in query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const experimentOnly = urlParams.get("experimentOnly") === "true";

  const questionnaire = {
    firstPageIsStarted: true,
    showPageNumbers: false,
    showProgressBar: "top",
    pages: [
      mergedStartPage,
      welcomeToQualification,
      ...tutorial(xaiFeatures, dataset, experimentType),
      youAreReady,
      ...experimentPages(datasetItems, xaiFeatures, "qualification", experimentType),
      mainStartPage,
      ...experimentPages(datasetItems, xaiFeatures, "main", experimentType),
      // almostDone,
      // ...aiSystemEvaluation(xaiFeatures),
      // newsDashboardEvaluation,
      // demographics,
    ],
    completedHtmlOnCondition: [
      {
        expression: `{correctAnswers} == {questionCount}`,
        html: `<div style="max-width: 900px; margin: 0 auto;">
        <p>
        Thank you for taking part in the job, you have paid attention to the questions and answered the control questions correctly, your answers are recorded.
        </p>
        </br>
        <p>
        You can close this Tab now.
        </p>
        </div>`,
      },
    ],
    completedHtml: `<div style="max-width: 900px; margin: 0 auto;">
    <p>
    Thank you for taking part in the qualification job! Unfortunately, you have not paid enough attention to the control questions and you are not qualified for the main job.
    </p>
    </br>
    <p>
    You can close this Tab now.
    </p>
    </div>`,
  };

  if (experimentOnly) {
    questionnaire.firstPageIsStarted = false;
    questionnaire.pages = [
      ...experimentPages(datasetItems, xaiFeatures, "qualification", experimentType),
      mainStartPage,
      ...experimentPages(datasetItems, xaiFeatures, "main", experimentType),
    ];
  }

  return questionnaire;
};
