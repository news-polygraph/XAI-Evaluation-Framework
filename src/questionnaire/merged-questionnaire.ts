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

export const mergedQuestionnaire = (
  datasetItems: DatasetItem[],
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
      ...tutorial(xaiFeatures),
      youAreReady,
      ...experimentPages(datasetItems, xaiFeatures, "merged", experimentType),
      almostDone,
      ...aiSystemEvaluation(xaiFeatures),
      newsDashboardEvaluation,
      demographics,
    ],
  };

  if (experimentOnly) {
    questionnaire.firstPageIsStarted = false;
    questionnaire.pages = [
      ...experimentPages(datasetItems, xaiFeatures, "merged", experimentType),
    ];
  }

  return questionnaire;
};
