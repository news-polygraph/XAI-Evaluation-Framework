import boolqData from "@/data/boolq-items.json";
import zebraLogicData from "@/data/zebralogic-items.json";
import feverData from "@/data/fever-items.json";
import DatasetItem from "@/model/dataset-item";
import { SurveyPart } from "@/model/survey-part";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickExcluding(lo: number, hi: number, exclude: number): number {
  let idx: number;
  do {
    idx = lo + Math.floor(Math.random() * (hi - lo + 1));
  } while (idx === exclude);
  return idx;
}

function buildSequence(rawData: any[]): DatasetItem[] {
  const shuffled = shuffle(rawData);
  const items: any[] = shuffled.map((item, i) => ({
    ...item,
    isQualification: i < 2,
    isFalsePositive: false,
    isTrueNegative: false,
  }));


  const fpIdx = 5 + Math.floor(Math.random() * 5); 
  const tnIdx = pickExcluding(5, 9, fpIdx);

  items[fpIdx].isFalsePositive = true;
  items[tnIdx].isTrueNegative = true;

  return items as DatasetItem[];
}

const sequenceCache: Record<string, DatasetItem[]> = {};

function getSequence(task: string): DatasetItem[] {
  const key = task.toLowerCase();
  if (!sequenceCache[key]) {
    let raw: any[] = [];
    switch (key) {
      case "boolq":      raw = boolqData as any[];      break;
      case "zebralogic": raw = zebraLogicData as any[];  break;
      case "fever":      raw = feverData as any[];       break;
      default:
        console.error(`Unknown task: ${task}`);
        return [];
    }
    sequenceCache[key] = buildSequence(raw);
  }
  return sequenceCache[key];
}

const getRandomizedDatasetItems = (
  task: string,
  part: SurveyPart
): DatasetItem[] => {
  const all = getSequence(task);
  if (!all.length) return [];

  switch (part) {
    // First 2 items of the shuffled sequence
    case "qualification":
      return all.filter((item) => item.isQualification);

    // Items 2–9 (the 8 non-qualification ones)
    case "main":
      return all.filter((item) => !item.isQualification);

    // All 10
    case "merged":
      return all;

    default:
      return [];
  }
};

export default getRandomizedDatasetItems;