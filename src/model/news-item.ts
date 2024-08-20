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
  controlQuestion: {
    question: string;
    correctAnswer: string;
    wrongAnswers: string[];
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
  correctAnswer: number;
  value?: number;
  score?: number;
}

export default NewsItem;

// keep the exact number for the original users score in value and store the transformed score in score