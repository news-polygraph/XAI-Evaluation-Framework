import data from "@/data/news-items.json";
import NewsItem from "@/model/news-item";
import { SurveyPart } from "@/model/survey-part";
import getRandomClassNames from "./get-randomized-classnames";

/**
 * Returns a list of randomized news items for a given group and survey part.
 * The function also sets the randomizedImages property of each news item.
 */

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
        groupItems.length === 3, 
        "There should be 3 items in the qualification part"
      );

      // randomize the order of the items
      groupItems.sort(() => Math.random() - 0.5);

      // Assign the randomized images to each item
      groupItems.forEach((item) => {
        // The randomized images are stored in the item's randomizedImages property
        item.randomizedImages = getRandomClassNames(item);
      })

      return groupItems;
    }
    case "main": {
      //const classNames = getRandomClassNames();
      const groupItems = data.filter((item) => {
        return item.group === group && !item.isQualification;
      }) as NewsItem[];

      // randomize the order of the items
      groupItems.sort(() => Math.random() - 0.5);
      
      console.assert(
        groupItems.length === 15,
        "There should be 15 items in the main part"
        );
        
        groupItems.forEach((item) => {
          item.randomizedImages = getRandomClassNames(item);
        })
        
      return groupItems;
    }
    case "merged": {
      const groupItems = data.filter((item) => {
        return item.group === group;
      }) as NewsItem[];

      // randomize the order of the items
      groupItems.sort(() => Math.random() - 0.5);


      // randomize the order of the items
      groupItems.sort(() => Math.random() - 0.5);

      console.assert(
        groupItems.length === 8,
        "There should be 8 items in the main part"
      );

      groupItems.forEach((item) => {
        item.randomizedImages = getRandomClassNames(item);
      })
      
      return groupItems;
    }
  }
};

export default getRandomizedNewsItems;
