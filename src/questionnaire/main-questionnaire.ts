import { XAIFeatureLevel } from "@/model/xai-feature-level";
import mainStartPage from "./parts/main-start-page";
import experimentPages from "./parts/experiment";
import aiSystemEvaluation from "./parts/ai-system-evaluation";
import demographics from "./parts/demographics";
import almostDone from "./parts/almost-done";
import tutorial from "./parts/tutorial";
import youAreReady from "./parts/you-are-ready";
import NewsItem from "@/model/news-item";
import newsDashboardEvaluation from "./parts/news-dashboard-evaluation";
import bonusInfo from "./parts/bonus-info";

/**
 * Returns the questionnaire for the main part of the experiment.
 * The questionnaire is generated based on the given news items and XAI feature level.
 * The questionnaire consists of the following parts:
 * 1. Main start page
 * 2. Experiment pages (news items with XAI features)
 * 3. Almost done page
 * 4. AI system evaluation
 * 5. Demographics
 * 6. Bonus info
 */
export const mainQuestionnaire = (
  newsItems: NewsItem[],
  xaiFeatures: XAIFeatureLevel
) => {
  const urlParams = new URLSearchParams(window.location.search);
  const experimentOnly = urlParams.get("experimentOnly") === "true";

  const questionnaire = {
    firstPageIsStarted: true,
    showPageNumbers: false,
    showProgressBar: "top",
    pages: [
      mainStartPage,
      ...experimentPages(newsItems, xaiFeatures, "main"),
      almostDone,
      ...aiSystemEvaluation(xaiFeatures),
      demographics,
      bonusInfo,
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
    questionnaire.pages = [...experimentPages(newsItems, xaiFeatures, "main")];
  }

  return questionnaire;
};
