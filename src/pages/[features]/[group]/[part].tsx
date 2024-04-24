import XAIQuestionnaire from "@/components/XAIQuestionnaire";
import getRandomizedNewsItems from "@/helper/get-randomized-news-items";
import { SurveyPart } from "@/model/survey-part";
import { XAIFeatureLevel } from "@/model/xai-feature-level";

const Home = ({
  features,
  group,
  part,
}: {
  features: XAIFeatureLevel;
  group: string;
  part: SurveyPart;
}) => {
  // parse group number from group string
  const groupNumber = parseInt(group.split("-")[1]);
  const newsItems = getRandomizedNewsItems(groupNumber, part);

  return (
    <XAIQuestionnaire
      newsItems={newsItems}
      xaiFeature={features}
      groupNumber={groupNumber}
      part={part}
    />
  );
};

export default Home;

export const getStaticPaths = async () => {
  const features = ["basic", "salient", "explanations"];
  const groups = [2].map((group) => `group-${group}`);
  const parts = ["qualification", "main"];

  const paths = features.flatMap((features) => {
    return groups.flatMap((group) => {
      return parts.map((part) => {
        return {
          params: {
            features,
            group,
            part,
          },
        };
      });
    });
  });

  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: {
  params: {
    features: string;
    group: string;
    part: string;
  };
}) => {
  return {
    props: {
      features: params.features,
      group: params.group,
      part: params.part,
    },
  };
};
