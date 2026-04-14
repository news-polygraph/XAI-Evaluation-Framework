import { agreementLikert7 } from "@/helper/likert-scales";
import DatasetItem from "@/model/dataset-item";
import { SurveyPart } from "@/model/survey-part";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import { ExperimentType } from "@/model/experiment-type";

const getPagesForDatasetItem = (
  datasetItem: DatasetItem,
  xaiFeatures: XAIFeatureLevel,
  part: SurveyPart,
  experimentType: ExperimentType
) => {
  const title = "Survey Question";
  const description = datasetItem.ratingType === 'boolean'
  ? "Please read the news item carefully and determine if the item is True or False based on the information provided."
  : datasetItem.ratingType === 'multiple-choice'
  ? "Please read the news item carefully and select the correct option based on the information provided."
  : "Please read the news item carefully and adjust the truthfulness rating based on the information provided.";

  return [
    ...(experimentType === "TwoStep"
      ? [
          {
            title,
            description,
            elements: [
              {
                type: "datasetitem",
                name: `datasetitem.${datasetItem.id}.rating-before-xai`,
                hideNumber: true,
                titleLocation: "hidden",
                datasetitem: datasetItem,
                xaiFeatures: "none",
                isInput: true,
                isRequired: true,
              },
            ],
          },
        ]
      : []),
      ...(experimentType === "TwoStep"
      ? [
          {
            name: "article-with-xai",
            title,
            description,
            elements: [
              {
                type: "datasetitem",
                name: `datasetitem.${datasetItem.id}.article-with-xai`,
                hideNumber: true,
                titleLocation: "hidden",
                datasetitem: datasetItem,
                xaiFeatures: xaiFeatures,
                isInput: false,
              },
            ],
          },
        ]
      : []),
    {
      title,
      description,
      elements: [
        {
          type: "datasetitem",
          name: `datasetitem.${datasetItem.id}.rating-after-xai`,
          hideNumber: true,
          titleLocation: "hidden",
          datasetitem: datasetItem,
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
          name: `datasetitem.${datasetItem.id}.control-question`,
          title: datasetItem.controlQuestion.question,
          hideNumber: true,
          choicesOrder: "random",
          isRequired: true,
          choices: [
            {
              value: "correct",
              text: datasetItem.controlQuestion.correctAnswer,
            },
            ...datasetItem.controlQuestion.wrongAnswers.map((answer, i) => ({
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
          name: `datasetitem.${datasetItem.id}.system-evaluation`,
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
          visibleIf: `{datasetitem.${datasetItem.id}.control-question} != 'correct'`,
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
  datasetItems: DatasetItem[],
  xaiFeatures: XAIFeatureLevel,
  part: SurveyPart,
  experimentType: ExperimentType
) => {
  return [
    ...datasetItems.flatMap((datasetItem) =>
      getPagesForDatasetItem(datasetItem as any, xaiFeatures, part, experimentType)
    ),
  ];
};

export default experimentPages;
