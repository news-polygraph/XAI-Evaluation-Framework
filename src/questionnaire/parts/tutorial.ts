import exampleDatasetItem from "@/data/example-item.json";
import DatasetItem from "@/model/dataset-item";
import { TutorialTooltipStep } from "@/model/tutorial-tooltip-step";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import tutorialText from "./tutorial-text";

const getTutorialPageForStep = (
  datasetItem: DatasetItem,
  {
    isInput,
    xaiFeatures,
    step,
    isRequired = false,
  }: {
    isInput: boolean;
    xaiFeatures: XAIFeatureLevel;
    step: TutorialTooltipStep;
    isRequired?: boolean;
  }
) => {
  const title = "Truthfulness Rating of News Items";
  const description = datasetItem.ratingType === 'boolean'
  ? "Please read the news item carefully and determine if the item is True or False based on the information provided."
  : datasetItem.ratingType === 'multiple-choice'
  ? "Please read the news item carefully and select the correct option based on the information provided."
  : "Please read the news item carefully and adjust the truthfulness rating based on the information provided.";

  return {
    title,
    description,
    elements: [
      {
        type: "datasetitem",
        hideNumber: true,
        name: `tutorial.${step}`,
        titleLocation: "hidden",
        datasetitem: datasetItem,
        xaiFeatures: xaiFeatures,
        isInput: isInput,
        isTutorial: true,
        tutorialTooltip: step,
        isRequired: isRequired,
      },
    ],
  };
};

const getTutorialPagesForDatasetItem = (
  datasetItem: DatasetItem,
  xaiFeatures: XAIFeatureLevel
) => {
  return [
    getTutorialPageForStep(datasetItem, {
      isInput: true,
      xaiFeatures: xaiFeatures,
      step: "overview",
    }),
    getTutorialPageForStep(datasetItem, {
      isInput: false,
      xaiFeatures: "none",
      step: "article",
    }),
    getTutorialPageForStep(datasetItem, {
      isInput: true,
      xaiFeatures: "none",
      step: "your-rating",
      isRequired: true,
    }),
    getTutorialPageForStep(datasetItem, {
      isInput: false,
      xaiFeatures: xaiFeatures,
      step: "ai-rating",
    }),
    xaiFeatures === "salient" &&
      getTutorialPageForStep(datasetItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "readability",
      }),
    xaiFeatures === "salient" &&
      getTutorialPageForStep(datasetItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "text-highlights",
      }),
    xaiFeatures === "salient" &&
      getTutorialPageForStep(datasetItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "sentiment-highlights",
      }),
    xaiFeatures === "explanations" &&
      getTutorialPageForStep(datasetItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "natural-language-explanation",
      }),
    xaiFeatures === 'counterfactual' && 
      getTutorialPageForStep(datasetItem,{
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: 'counterfactual-explanation',
      }),
    getTutorialPageForStep(datasetItem, {
      isInput: true,
      xaiFeatures: xaiFeatures,
      step: "redo-your-rating",
      isRequired: true,
    }),
  ];
};

const experimentPages = (xaiFeatures: XAIFeatureLevel) => {
  const tutorialTextPage = tutorialText(xaiFeatures);

  return [
    tutorialTextPage,
    ...getTutorialPagesForDatasetItem(exampleDatasetItem as any, xaiFeatures),
  ];
};

export default experimentPages;
