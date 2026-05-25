export type DatasetType = 'boolq' | 'fever' | 'zebralogic';

interface DatasetItemBase {
  id: number;
  dataset: DatasetType;
  title?: string;
  ratingType?: 'boolean' | 'multiple-choice';
  options?: string[];
  isFalsePositive: boolean;
  isTrueNegative: boolean;
  isQualification: boolean;
  xaiFeatures: {
    truthfulness: number | boolean | string;
    highlightedContent?: string | string[];
    naturalLanguageExplanation?: string;
    counterfactualExplanation?: string;
    highlightedClaim?: string;
  };
  controlQuestion: {
    question: string;
    correctAnswer: string;
    wrongAnswers: string[];
  };
}

export interface BoolQItem extends DatasetItemBase {
  dataset: 'boolq';
  title: string;
  content: string;
}

export interface FeverItem extends DatasetItemBase {
  dataset: 'fever';
  claim: string;
  evidence: string[];
}


export interface ZebraLogicEntries {
  Amount: number;
  [rowName: string]: string[] | number;
}

export interface ZebraLogicItem extends DatasetItemBase {
  dataset: 'zebralogic';
  title: string;
  content: string;
  clues: string[];
  entries?: ZebraLogicEntries;
}

type DatasetItem = BoolQItem | FeverItem | ZebraLogicItem;
export default DatasetItem;