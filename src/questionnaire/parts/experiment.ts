import { agreementLikert7 } from "@/helper/likert-scales";
import NewsItem from "@/model/news-item";
import { SurveyPart } from "@/model/survey-part";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import classUrls from "@/components/urls";


// Function to extract the classname from the provided format
const extractClassName = (value: string): string => {
  // Split by underscore and take the first four parts
  const parts = value.split('_');
  return `${parts[1]}_${parts[2]}_${parts[3]}_${parts[4]}_`;
};


/**
 * Generates the pages for a single news item in the experiment.
 */
const getPagesForNewsItem = (
  newsItem: NewsItem,
  xaiFeatures: XAIFeatureLevel,
  part: SurveyPart
) => {
  const title = "Bewertung des Wahrheitsgehalts von Nachrichten";
  const description =
    "Bitte lesen Sie die Nachricht sorgfältig durch und passen Sie die Bewertung des Wahrheitsgehalts anhand der bereitgestellten Informationen an.";
  // console.log(newsItem)
  return [
    {
      /**
       * The first page shows the news item without THE visualizations.
       * The user should rate the truthfulness of the news item.
       */
      title,
      description,
      elements: [
        {
          type: "newsitem",
          name: `newsitem.${newsItem.id}.rating-before-xai`,
          hideNumber: true,
          titleLocation: "hidden",
          newsitem: newsItem,
          xaiFeatures: "none",
          isInput: true,
          isRequired: true,
        },
      ],
    },
    
    {
      /**
       * The second page shows the news item with the visualizations.
       * The user should rate the truthfulness of the news item again.
       */
      name: "rating-after-xai",
      title,
      description,
      elements: [
        {
          type: "newsitem",
          name: `newsitem.${newsItem.id}.rating-after-xai`,
          title: "Testing",
          hideNumber: true,
          titleLocation: "hidden",
          newsitem: newsItem,
          xaiFeatures: "visualizations",
          isInput: true,
          isRequired: true,
          value: newsItem.value,
          correctAnswer: newsItem.correctAnswer,
        },
      ],
    },
    {
      /**
       * The third page asks the user to choose which visualization was the most helpful.
       */
      title: "Bewerten Sie die Visualisierungen",
      description: "Wählen Sie aus, welche Visualisierung Ihnen bei der Beurteilung des Wahrheitsgehalts der Nachricht am hilfreichsten war.",
      elements: [
        {
          type: "imagepicker",
          name: `newsitem.${newsItem.id}.visualization-evaluation`,
          title: "Auswahl der Visualisierung",
          hideNumber: true,
          newsitem: newsItem,
          choices: [
            {
              value: "Anlehnen",
              imageLink: classUrls[extractClassName(newsItem.randomizedImages.leaning)]
            },
            {
              value: "Ideologie",
              imageLink: classUrls[extractClassName(newsItem.randomizedImages.ideology)]
            },
            {
              value: "Parteien",
              imageLink: classUrls[extractClassName(newsItem.randomizedImages.parties)]
            }
          ],
          isRequired: true,
        }
      ],
    },
    part === "main" || part === "qualification"
      ? {
          /**
           * If the user did not answer the control question correctly, show a warning.
           * NOT WORKING YET
           */
          name: "truthfulness-score-warning",
          newsitem : newsItem,
          visibleIf: `1 != correctAnswer`, // correctAnswer needs to be set to newsItemQuestion.correctAnswer 
          elements: [
            {
              type: "html",
              maxWidth: "900px",
              html: `<div>
              You did not succesfully rate the article's truthfulness.
          </div>`,
            },
          ],
        }
      : {
          visibleIf: "false",
        },
  ];
};


const experimentPages = (
  newsItems: NewsItem[],
  xaiFeatures: XAIFeatureLevel,
  part: SurveyPart
) => {
  return [
    ...newsItems.flatMap((newsItem) =>
      getPagesForNewsItem(newsItem as any, xaiFeatures, part)
    ),
  ];
};


export default experimentPages;


