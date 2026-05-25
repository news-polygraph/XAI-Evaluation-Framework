import exampleBoolQItem from "@/data/example-boolq-item.json";
import exampleFeverItem from "@/data/example-fever-item.json";
import exampleZebraItem from "@/data/example-zebra-item.json";
import { BoolQItem, FeverItem, ZebraLogicItem } from "@/model/dataset-item";

type DatasetItem = BoolQItem | FeverItem | ZebraLogicItem;

import { XAIFeatureLevel } from "@/model/xai-feature-level";
import boolqTutorialText from "./boolq-tutorial-text";
import feverTutorialText from "./fever-tutorial-text";
import zebraTutorialText from "./zebra-tutorial-text";
import { TutorialTooltipStep } from "@/model/tutorial-tooltip-step";
import { ExperimentType } from "@/model/experiment-type";

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
    datasetItem.dataset === "boolq" &&  
      getTutorialPageForStep(datasetItem, {
        isInput: false,
        xaiFeatures: "none",
        step: "boolqarticle",
      }),
    datasetItem.dataset === "fever" &&  
      getTutorialPageForStep(datasetItem, {
        isInput: false,
        xaiFeatures: "none",
        step: "feverarticle",
      }),
    datasetItem.dataset === "zebralogic" &&  
      getTutorialPageForStep(datasetItem, {
        isInput: false,
        xaiFeatures: "none",
        step: "zebralogicarticle",
      }),
    datasetItem.dataset === "zebralogic" &&  
      getTutorialPageForStep(datasetItem, {
        isInput: false,
        xaiFeatures: "none",
        step: "draft",
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
        step: "salient-highlights",
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

const getExampleItemForExperiment = (dataset: string): DatasetItem => {
  switch (dataset) {
    case "boolq":
      return exampleBoolQItem as BoolQItem;
    case "fever":
      return exampleFeverItem as FeverItem;
    case "zebralogic":
      return exampleZebraItem as ZebraLogicItem;
    default:
      return {} as any; // fallback
  }
};


const getTutorialTextPageForExperiment = (
  xaiFeatures: XAIFeatureLevel,
  dataset: string,
  experimentType: ExperimentType
) => {
  switch (dataset) {
    case "boolq":
      return boolqTutorialText(xaiFeatures, experimentType);
    case "fever":
      return feverTutorialText(xaiFeatures, experimentType);
    case "zebralogic":
      return zebraTutorialText(xaiFeatures, experimentType);
    default:
      return null;
  }
};

const tutorial = (xaiFeatures: XAIFeatureLevel, dataset: string, experimentType: ExperimentType) => {
  const tutorialTextPage = getTutorialTextPageForExperiment(xaiFeatures, dataset, experimentType);
  const exampleItem = getExampleItemForExperiment(dataset);

  return [
    tutorialTextPage,
    ...getTutorialPagesForDatasetItem(exampleItem, xaiFeatures),
  ];
};

export default tutorial;
