import { XAIFeatureLevel } from "@/model/xai-feature-level";
import mainStartPage from "./parts/main-start-page";
import experimentPages from "./parts/experiment";
import aiSystemEvaluation from "./parts/ai-system-evaluation";
import demographics from "./parts/demographics";
import almostDone from "./parts/almost-done";
import tutorial from "./parts/tutorial";
import youAreReady from "./parts/you-are-ready";
import DatasetItem from "@/model/dataset-item";
import newsDashboardEvaluation from "./parts/news-dashboard-evaluation";
import bonusInfo from "./parts/bonus-info";
import { ExperimentType } from "@/model/experiment-type";

export const mainQuestionnaire = (
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
      mainStartPage,
      ...tutorial(xaiFeatures, dataset, experimentType),
      youAreReady,
      ...experimentPages(datasetItems, xaiFeatures, "main", experimentType),
      // almostDone,
      // ...aiSystemEvaluation(xaiFeatures),
      // newsDashboardEvaluation,
      // demographics,
      // bonusInfo,
    ],
    completedHtml: `
      <div>
        <p>
          Loading...
        </p>
      </div>
    `,
  };

  if (experimentOnly) {
    questionnaire.firstPageIsStarted = false;
    questionnaire.pages = [...experimentPages(datasetItems, xaiFeatures, "main", experimentType)];
  }

  return questionnaire;
};
