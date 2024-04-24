import data from "@/data/news-items.json";
import NewsItem from "@/model/news-item";
import { SurveyPart } from "@/model/survey-part";

const getRandomizedNewsItems = (
  group: number,
  part: SurveyPart
): NewsItem[] => {
  switch (part) {
    case "qualification": {
      const groupItems = data.filter((item) => {
        return item.group === group && item.isQualification;
      }) as NewsItem[];

      console.assert(
        groupItems.length === 2,
        "There should be 2 items in the qualification part"
      );

      // randomize the order of the items
      groupItems.sort(() => Math.random() - 0.5);

      return groupItems;
    }
    case "main": {
      const groupItems = data.filter((item) => {
        return item.group === group && !item.isQualification;
      }) as NewsItem[];
      const falsePositive = data.filter((item) => item.isFalsePositive)[0];
      const trueNegative = data.filter((item) => item.isTrueNegative)[0];

      // randomize the order of the items
      groupItems.sort(() => Math.random() - 0.5);

      // add false positive as 3rd item
      groupItems.splice(2, 0, falsePositive as NewsItem);

      // add true negative as 6th item
      groupItems.splice(5, 0, trueNegative as NewsItem);

      console.assert(
        groupItems.length === 6,
        "There should be 6 items in the main part"
      );

      return groupItems;
    }
    case "merged": {
      const groupItems = data.filter((item) => {
        return item.group === group;
      }) as NewsItem[];

      // randomize the order of the items
      groupItems.sort(() => Math.random() - 0.5);

      const falsePositive = data.filter((item) => item.isFalsePositive)[0];
      const trueNegative = data.filter((item) => item.isTrueNegative)[0];

      // randomize the order of the items
      groupItems.sort(() => Math.random() - 0.5);

      // add false positive as 4th item
      groupItems.splice(3, 0, falsePositive as NewsItem);

      // add true negative as 8th item
      groupItems.splice(7, 0, trueNegative as NewsItem);

      console.assert(
        groupItems.length === 8,
        "There should be 8 items in the main part"
      );

      return groupItems;
    }
  }
};

export default getRandomizedNewsItems;
