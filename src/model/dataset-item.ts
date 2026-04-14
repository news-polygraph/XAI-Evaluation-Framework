export default interface DatasetItem {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  category?: string;
  ratingType?: "value" | "boolean" | "multiple-choice";
  options?: string[];
  isFalsePositive: boolean;
  isTrueNegative: boolean;
  isQualification: boolean;
  xaiFeatures: {
    truthfulness: number | boolean | string; 
    highlightedContent?: string;
    naturalLanguageExplanation?: string;
    counterfactualExplanation?: string;
  };
  controlQuestion: {
    question: string;
    correctAnswer: string;
    wrongAnswers: string[];
  };
}
