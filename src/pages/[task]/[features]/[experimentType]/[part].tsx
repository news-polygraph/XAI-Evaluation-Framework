import XAIQuestionnaire from "@/components/XAIQuestionnaire";
import getRandomizedDatasetItems from "@/helper/get-randomized-data-items";
import { SurveyPart } from "@/model/survey-part";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import { ExperimentType } from "@/model/experiment-type";

export default function Home({
  task,
  features,
  group,
  part,
  experimentType,
}: {
  task: string;
  features: XAIFeatureLevel;
  group: string;
  part: SurveyPart;
  experimentType: ExperimentType;
}) {
  // Parse group number from group string (e.g., "group-1" -> 1)
  // const groupNumber = parseInt(group.split("-")[1]);

  const datasetItems = getRandomizedDatasetItems(task, part);

  return (
    <XAIQuestionnaire
      datasetItems={datasetItems}
      dataset={task}
      xaiFeature={features}
      // groupNumber={groupNumber}
      part={part}
      experimentType={experimentType}
    />
  );
}

export const getStaticPaths = async () => {
  const tasks = ["boolq", "zebralogic", "fever"];
  const features = ["basic", "salient", "explanations", "counterfactual"];
  // const groups = [1, 2].map((group) => `group-${group}`);
  const experimentTypes: ExperimentType[] = ["OneStep", "TwoStep"];
  const parts = ["qualification", "main", "merged"];

  const paths = tasks.flatMap((task) =>
    features.flatMap((feature) =>
        experimentTypes.flatMap((experimentType) =>
          parts.map((part) => ({
            params: { task, features: feature, experimentType, part },
          }))
        )
    )
  );

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: any) => {
  return {
    props: {
      task: params.task,
      features: params.features,
      part: params.part,
      experimentType: params.experimentType,
    },
  };
};