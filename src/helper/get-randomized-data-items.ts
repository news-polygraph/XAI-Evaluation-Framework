import boolqData from "@/data/boolq-items.json";
import zebraLogicData from "@/data/zebralogic-items.json";
import feverData from "@/data/fever-items.json";
import DatasetItem from "@/model/dataset-item";
import { SurveyPart } from "@/model/survey-part";

const getRandomizedDatasetItems = (
  task: string,
  // group: number,
  part: SurveyPart
): DatasetItem[] => {
  
  // 1. Select the correct dataset based on the task
  let data: any[] = [];
  switch (task.toLowerCase()) {
    case "boolq":
      data = boolqData;
      break;
    case "zebralogic":
      data = zebraLogicData;
      break;
    case "fever":
      data = feverData;
      break;
    default:
      console.error(`Unknown task provided: ${task}`);
      return [];
  }

  // 2. Run the existing randomization logic on the selected dataset
  switch (part) {
    case "qualification": {
      const groupItems = data.filter(
        (item) => item.isQualification
      ) as DatasetItem[];
      
      console.assert(
        groupItems.length === 2,
        `There should be 2 qualification items for ${task}`
      );
      
      // randomize the order of the items
      return groupItems.sort(() => Math.random() - 0.5);
    }
    case "main": {
      const groupItems = data.filter(
        (item) => !item.isQualification
      ) as DatasetItem[];
      
      const falsePositive = data.filter((item) => item.isFalsePositive)[0];
      const trueNegative = data.filter((item) => item.isTrueNegative)[0];

      // randomize the order of the items
      groupItems.sort(() => Math.random() - 0.5);

      // add control items
      if (falsePositive) groupItems.splice(2, 0, falsePositive as DatasetItem);
      if (trueNegative) groupItems.splice(5, 0, trueNegative as DatasetItem);

      return groupItems;
    }
    case "merged": {
      const groupItems = data;
      
      const falsePositive = data.filter((item) => item.isFalsePositive)[0];
      const trueNegative = data.filter((item) => item.isTrueNegative)[0];

      // randomize the order of the items
      groupItems.sort(() => Math.random() - 0.5);

      // add control items
      if (falsePositive) groupItems.splice(3, 0, falsePositive as DatasetItem);
      if (trueNegative) groupItems.splice(7, 0, trueNegative as DatasetItem);

      return groupItems;
    }
    default:
      return [];
  }
};

export default getRandomizedDatasetItems;
