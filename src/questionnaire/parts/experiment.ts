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


const getPagesForNewsItem = (
  newsItem: NewsItem,
  xaiFeatures: XAIFeatureLevel,
  part: SurveyPart
) => {
  const title = "Truthfulness Rating of News Items";
  const description =
    "Please read the news item carefully and adjust the truthfulness rating based on the information provided.";

  return [
    {
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
      name: "article-with-xai",
      title,
      description,
      elements: [
        {
          type: "newsitem",
          name: `newsitem.${newsItem.id}.article-with-xai`,
          hideNumber: true,
          titleLocation: "hidden",
          newsitem: newsItem,
          xaiFeatures: "visualizations",
          isInput: false,
        },
      ],
    },
    {
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
    // {
    //   name: "correct-answer",
    //   title,
    //   description,
    //   visible: false,
    //   elements: [
    //     {
    //       type: "newsitem",
    //       name: `newsitem.${newsItem.id}.rating-after-xai`,
    //       title: "Testing",
    //       hideNumber: true,
    //       titleLocation: "hidden",
    //       newsitem: newsItem,
    //       xaiFeatures: "visualizations",
    //       isInput: true,
    //       isRequired: true,
    //       value: newsItem.correctAnswer,
    //     },
    //   ],
    // },
    
    // {
    //   title,
    //   description,
    //   elements: [
    //     {
    //       type: "newsitem",
    //       name: `newsitem.${newsItem.id}.truthfulness_score`,
    //       hideNumber: true,
    //       visible: false,
    //       titleLocation: "hidden",
    //       newsitem: newsItem,
    //       xaiFeatures: "visualizations",
    //       isInput: true,
    //       isRequired: true,
    //       value: newsItem.value === newsItem.correctAnswer ? "correct" : "incorrect",
    //       correctAnswer: "correct",
    //     },
    //   ],
    // },
    {
      title: "Evaluate the visualizations",
      description: "Choose which visualization was more helpful to you when evaluating the truthfulness of the news item.",
      elements: [
        {
          type: "imagepicker",
          name: `newsitem.${newsItem.id}.visualization-evaluation`,
          title: "Visualization Choice",
          hideNumber: true,
          newsitem: newsItem,
          choices: [
            {
              value: "Leaning",
              imageLink: classUrls[extractClassName(newsItem.randomizedImages.leaning)]
            },
            {
              value: "Ideology",
              imageLink: classUrls[extractClassName(newsItem.randomizedImages.ideology)]
            },
            {
              value: "Parties",
              imageLink: classUrls[extractClassName(newsItem.randomizedImages.parties)]
            }
          ],
          isRequired: true,
        }
      ],
    },
    // {
    //   name: "control-question",
    //   title,
    //   description,
    //   elements: [
    //     {
    //       // multiple choice control question
    //       type: "radiogroup",
    //       name: `newsitem.${newsItem.id}.control-question`,
    //       title: newsItem.controlQuestion.question,
    //       hideNumber: true,
    //       choicesOrder: "random",
    //       isRequired: true,
    //       choices: [
    //         {
    //           value: "correct",
    //           text: newsItem.controlQuestion.correctAnswer,
    //         },
    //         ...newsItem.controlQuestion.wrongAnswers.map((answer, i) => ({
    //           value: `wrong-${i + 1}`,
    //           text: answer,
    //         })),
    //       ],
    //       correctAnswer: "correct",
    //     },
    //   ],
    // },
    part === "main"
      ? {
          // show warning if control question was answered incorrectly 
          name: "truthfulness-score-warning",
          newsitem : newsItem,
          visibleIf: `{newsitem.${newsItem.id}.rating-after-xai} != ${newsItem.correctAnswer}`,
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

