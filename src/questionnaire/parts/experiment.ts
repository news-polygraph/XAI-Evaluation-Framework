import { agreementLikert7 } from "@/helper/likert-scales";
import NewsItem from "@/model/news-item";
import { SurveyPart } from "@/model/survey-part";
import { XAIFeatureLevel } from "@/model/xai-feature-level";

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
          xaiFeatures: xaiFeatures,
          isInput: false,
        },
      ],
    },
    {
      title,
      description,
      elements: [
        {
          type: "newsitem",
          name: `newsitem.${newsItem.id}.rating-after-xai`,
          hideNumber: true,
          titleLocation: "hidden",
          newsitem: newsItem,
          xaiFeatures: xaiFeatures,
          isInput: true,
          isRequired: true,
        },
      ],
    },
    {
      name: "control-question",
      title,
      description,
      elements: [
        {
          // multiple choice control question
          type: "radiogroup",
          name: `newsitem.${newsItem.id}.control-question`,
          title: newsItem.controlQuestion.question,
          hideNumber: true,
          choicesOrder: "random",
          isRequired: true,
          choices: [
            {
              value: "correct",
              text: newsItem.controlQuestion.correctAnswer,
            },
            ...newsItem.controlQuestion.wrongAnswers.map((answer, i) => ({
              value: `wrong-${i + 1}`,
              text: answer,
            })),
          ],
          correctAnswer: "correct",
        },
      ],
    },
    {
      title: "Evaluate the system",
      description:
        "Evaluate the AI system based on the explanations it provided",
      elements: [
        {
          type: "matrix",
          name: `newsitem.${newsItem.id}.system-evaluation`,
          title: "Competence",
          hideNumber: true,
          titleLocation: "hidden",
          columns: agreementLikert7,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            {
              text: "The AI-System classified the news items correctly",
              value: "classified-correctly",
            },
            {
              text: "I understand what the AI-System does",
              value: "understand-what-system-does",
            },
            {
              text: "The explainability features presented are useful to assess the truthfulness of the news article",
              value: "xai-features-useful",
            },
            {
              text: "The indications given by the AI-System are useful to assess the truthfulness of the news article",
              value: "indications-useful",
            },
            {
              text: "The presented explanations are comprehensible and help me with assessing the news articles",
              value: "explanations-comprehensible-and-help-assess",
            },
          ],
        },
      ],
    },
    part === "main"
      ? {
          // show warning if control question was answered incorrectly
          name: "control-question-warning",
          visibleIf: `{newsitem.${newsItem.id}.control-question} != 'correct'`,
          elements: [
            {
              type: "html",
              maxWidth: "900px",
              html: `<div>
          <b>Attention</b>: you entered an incorrect answer to the control question! In order to receive the <b>bonus of 5 €</b> you need to answer at least <b>5 control questions correctly!</b> Please read the news items carefully.
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
