// This file contains the NewsItem interface, which is used to represent news items with additional information about their truthfulness, ratings, and randomized images.
// The interface is used by the NewsItemComponent and NewsItemQuestion components to display the news items and their associated information.
interface NewsItem {
  id: number;
  title: string;
  source: string;
  category?: string;
  publishingDate: string;
  label: "fake" | "true";
  xaiFeatures: {
    truthfulness: number;
  };
  ratings: {
    ideology_1: string;
    ideology_2: string;
    leaning_1: number;
    leaning_2: string;
    parties_1: string;
    parties_2: string;
  };
  randomizedImages?: any;
  value?: number;
  score?: number;  
  correctAnswer?: number;
}
export default NewsItem;