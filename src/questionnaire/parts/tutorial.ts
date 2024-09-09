import NewsItem from "@/model/news-item";
import exampleNewsItem from "@/data/example-news-item.json";
import { TutorialTooltipStep } from "@/model/tutorial-tooltip-step";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import tutorialText from "./tutorial-text";
import getRandomClassNames from "@/helper/get-randomized-classnames";

let exampleItem: NewsItem = {...exampleNewsItem as NewsItem, randomizedImages: getRandomClassNames(exampleNewsItem as NewsItem)};

/**
 * Generates a single page for the tutorial for a given news item, step and XAI feature level.
 */
const getTutorialPageForStep = (
  newsItem: NewsItem,
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
  const title = "Bewertung des Wahrheitsgehalts von Nachrichten";
  const description =
    "Bitte lesen Sie die Nachricht sorgfältig durch und passen Sie die Bewertung des Wahrheitsgehalts anhand der bereitgestellten Informationen an.";

  return {
    title,
    description,
    elements: [
      {
        type: "newsitem",
        hideNumber: true,
        name: `tutorial.${step}`,
        titleLocation: "hidden",
        newsitem: newsItem,
        xaiFeatures: xaiFeatures,
        isInput: isInput,
        isTutorial: true,
        tutorialTooltip: step,
        isRequired: isRequired,
      },
    ],
  };
};

/**
 * Generates an array of survey pages for the tutorial of a given news item and XAI feature level.
 * The tutorial is composed of the following steps:
 * - Overview
 * - Article
 * - Your rating
 * - Visualizations (only for Visualizations XAI feature level)
 */
const getTutorialPagesForNewsItem = (
  newsItem: NewsItem,
  xaiFeatures: XAIFeatureLevel
) => {
  return [
    getTutorialPageForStep(newsItem, {
      isInput: true,
      xaiFeatures: xaiFeatures,
      step: "overview",
    }),
    getTutorialPageForStep(newsItem, {
      isInput: false,
      xaiFeatures: "none",
      step: "article",
    }),
    getTutorialPageForStep(newsItem, {
      isInput: true,
      xaiFeatures: "none",
      step: "your-rating",
      isRequired: true,
    }),
    // xaiFeatures === "visualizations" &&
    //   getTutorialPageForStep(newsItem, {
    //     isInput: false,
    //     xaiFeatures: xaiFeatures,
    //     step: "visualizations",
    //   }),
    xaiFeatures === "salient" &&
      getTutorialPageForStep(newsItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "readability",
      }),
    xaiFeatures === "salient" &&
      getTutorialPageForStep(newsItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "text-highlights",
      }),
    xaiFeatures === "salient" &&
      getTutorialPageForStep(newsItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "sentiment-highlights",
      }),
    xaiFeatures === "explanations" &&
      getTutorialPageForStep(newsItem, {
        isInput: false,
        xaiFeatures: xaiFeatures,
        step: "natural-language-explanation",
      }),
    getTutorialPageForStep(newsItem, {
      isInput: true,
      xaiFeatures: xaiFeatures,
      step: "redo-your-rating",
      isRequired: true,
    }),
  ];
};

/**
 * Generates the pages for the experiment.
 * The experiment is composed of the tutorial pages (overview, article, your rating, visualizations, redo your rating) and the main experiment pages.
 */
const experimentPages = (xaiFeatures: XAIFeatureLevel) => {
  const tutorialTextPage = tutorialText(xaiFeatures);

  return [
    tutorialTextPage,
    ...getTutorialPagesForNewsItem(exampleItem as any, xaiFeatures),
  ];
};

export default experimentPages;
