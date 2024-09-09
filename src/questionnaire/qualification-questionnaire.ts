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

/**
 * Returns the questionnaire for the qualification part of the experiment.
 * The questionnaire is generated based on the given news items and XAI feature level.
 * The questionnaire consists of the following parts:
 * 1. Qualification start page
 * 2. Personal code page
 * 3. Welcome to qualification page
 * 4. Political information page
 * 5. Information seeking behaviour page
 * 6. Tutorial pages
 * 7. You are ready page
 * 8. Experiment pages
 */
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
      ...informationSeekingBehaviour,
      ...tutorial(xaiFeatures),
      youAreReady,
      ...experimentPages(newsItems, xaiFeatures, "qualification"),
    ],
    // Need to update to access POINTS from XAIQuestionnaire
    completedHtmlOnCondition: [
      {
        expression: `{correctAnswers} == {questionCount}`,
        html: `<div style="max-width: 900px; margin: 0 auto;">
        <p>
        Vielen Dank, dass Sie an der Qualifikationsarbeit teilgenommen haben! Sie haben mindestens 2/3 der Nachrichten richtig bewertet und können an der Hauptaufgabe teilnehmen.
        </p>
        </br>
        <p>
        Sie können diese Registerkarte jetzt schließen.
        </p>
        </div>`,
      },
    ],
    completedHtml: `<div style="max-width: 900px; margin: 0 auto;">
    <p>
    Vielen Dank, dass Sie an der Qualifikationsaufgabe teilgenommen haben! Leider haben Sie mindestens 2/3 der Meldungen nicht richtig bewertet und sich nicht für die Hauptaufgabe qualifiziert.
    </p>
    </br>
    <p>
    Sie können diese Registerkarte jetzt schließen.
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
