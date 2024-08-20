import { XAIFeatureLevel } from "@/model/xai-feature-level";
import expectations from "./parts/expectations";
import informationLiteracy from "./parts/information-literacy";
import informationSeekingBehaviour from "./parts/information-seeking-behaviour";
import politicalInformation from "./parts/political-information";
import experimentPages from "./parts/experiment";
import tutorial from "./parts/tutorial";
import youAreReady from "./parts/you-are-ready";
import personalCode from "./parts/personal-code";
import NewsItem from "@/model/news-item";
import qualificationStartPage from "./parts/qualification-start-page";
import welcomeToQualification from "./parts/welcome-to-qualification";

export const qualificationQuestionnaire = (
  newsItems: NewsItem[],
  xaiFeatures: XAIFeatureLevel
) => {
  // check if experimentOnly is set to true in query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const experimentOnly = urlParams.get("experimentOnly") === "true";

  const questionnaire = {
    firstPageIsStarted: true,
    showPageNumbers: false,
    showProgressBar: "top",
    pages: [
      qualificationStartPage,
      personalCode,
      welcomeToQualification,
      ...politicalInformation,
      informationLiteracy,
      ...informationSeekingBehaviour,
      ...tutorial(xaiFeatures),
      youAreReady,
      ...experimentPages(newsItems, xaiFeatures, "qualification"),
    ],
    completedHtmlOnCondition: [
      {
        expression: `{correctAnswers} == {questionCount}`,
        html: `<div style="max-width: 900px; margin: 0 auto;">
        <p>
        Thank you for taking part in the qualification job! You have answered both control questions correctly and can take part in the main job.
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
      ...experimentPages(newsItems, xaiFeatures, "qualification"),
    ];
  }

  return questionnaire;
};
