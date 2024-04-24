import XAIQuestionnaire from "@/components/XAIQuestionnaire";
import getRandomizedNewsItems from "@/helper/get-randomized-news-items";
import { XAIFeatureLevel } from "@/model/xai-feature-level";

const Home = () => {
  // see if group number and feature are stored in local storage
  let groupNumber = parseInt(
    localStorage.getItem("xai-experiment.group") ?? "0"
  );
  let feature = localStorage.getItem(
    "xai-experiment.feature"
  ) as XAIFeatureLevel | null;

  // if they are not, generate random group number and feature
  if (groupNumber === 0 || feature === null) {
    // generate random group number (1 or 2)
    groupNumber = Math.random() < 0.5 ? 1 : 2;

    // get randomized feature ("salient" or "explanations")
    feature = Math.random() < 0.5 ? "salient" : "explanations";

    // store group number and feature in local storage
    localStorage.setItem("xai-experiment.group", groupNumber.toString());
    localStorage.setItem("xai-experiment.feature", feature);
  }

  const newsItems = getRandomizedNewsItems(groupNumber, "merged");

  return (
    <XAIQuestionnaire
      newsItems={newsItems}
      xaiFeature={feature}
      groupNumber={groupNumber}
      part="merged"
    />
  );
};

export default Home;
