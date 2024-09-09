const getLikertScale = (scale: number, labels: string[]) => {
  if (scale !== labels.length) {
    throw new Error(
      `Likert scale expected ${scale} labels, but got ${labels.length}`
    );
  }

  return labels.map((label, i) => {
    return {
      value: scale - i,
      text: label,
    };
  });
};

export const agreementLikert7 = getLikertScale(7, [
  "Stimme voll und ganz zu",
  "Zustimmen",
  "Eher zustimmen",
  "Neutral",
  "Eher nicht einverstanden",
  "Nicht einverstanden",
  "Stimmt überhaupt nicht zu",
]);

export const likelihoodLikert7 = getLikertScale(7, [
  "Always true",
  "Usually true",
  "Often true",
  "Occasionally True",
  "Rarely true",
  "Usually not true",
  "Never true",
]);

export const frequencyLikert7 = getLikertScale(7, [
  "Always",
  "Usually",
  "Frequently",
  "Sometimes",
  "Occasionally",
  "Rarely",
  "Never",
]);

export const seriousnessLikert7 = getLikertScale(7, [
  "Very serious",
  "Serious",
  "Somewhat serious",
  "Neutral",
  "Rather not serious",
  "Not serious",
  "Not serious at all",
]);

export const accuracyLikert7 = getLikertScale(7, [
  "Very accurate",
  "Accurate",
  "Somewhat accurate",
  "Neutral",
  "Rather inaccurate",
  "Inaccurate",
  "Very inaccurate",
]);

export const accessibilityLikert7 = getLikertScale(7, [
  "Very accessible",
  "Accessible",
  "Somewhat accessible",
  "Neutral",
  "Somewhat not accessible",
  "Not accessible",
  "Very not accessible",
]);

export const importanceLikert7 = getLikertScale(7, [
  "Very important",
  "Important",
  "Somewhat important",
  "Neutral",
  "Somewhat not important",
  "Not important",
  "Very not important",
]);

export const satisfactionLikert7 = getLikertScale(7, [
  "Completely satisfied",
  "Satisfied",
  "Somewhat satisfied",
  "Neutral",
  "Somewhat dissatisfied",
  "Dissatisfied",
  "Completely dissatisfied",
]);

export const truthfulnessLikert7 = getLikertScale(7, [
  "Very truthful",
  "Truthful",
  "Somewhat truthful",
  "Neutral",
  "Somewhat untruthful",
  "Untruthful",
  "Very untruthful",
]);

export const strengthLikert4 = getLikertScale(4, [
  "Sehr stark",
  "Stark",
  "Weniger",
  "Gar nicht",
]);

export const frequencyLikert4 = getLikertScale(4, [
  "Häufig",
  "Gelegentlich",
  "Selten",
  "Nie",
]);

export const importanceLikert4 = getLikertScale(4, [
  "Very important",
  "Important",
  "Less important",
  "Not important at all",
]);

export const satisfactionLikert4 = getLikertScale(4, [
  "Very satisfied",
  "Satisfied",
  "Less satisfied",
  "Not satisfied at all",
]);

export const agreementLikert3 = getLikertScale(3, [
  "Stimme eher zu",
  "Stimme eher nicht zu",
  "Weiß nicht",
]);

export const leftRightLikert10 = getLikertScale(11, [
  "0 (Links)",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10 (Rechts)",
]);

export const autLibLikert10 = getLikertScale(11, [
  "0 (Autoritarismus)",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10 (Liberalismus)",
]);

export const progKonsLikert10 = getLikertScale(11, [
  "0 (Progressivismus)",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10 (Konservatismus)",
]);

export const kapiSoziLikert10 = getLikertScale(11, [
  "0 (Kapitalismus)",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10 (Sozialismus)",
]);

export const weitLikert3 = getLikertScale(3, [
  "Gehen zu weit",
  "Angemessen",
  "Gehen nicht weit genug",
]);

export const gutLikert3 = getLikertScale(3, [
  "Finde ich nicht gut",
  "Neutral",
  "Finde ich gut",
]);

export const migrationLikert2 = getLikertScale(2, [
  "Weiterhin nach Afghanistan abgeschoben werden",
  "Sollte es aufgrund der aktuellen Sicherheitslage in Afghanistan einen Abschiebungsstopp geben",
]);

export const besserLikert2 = getLikertScale(2, [
  "Besser",
  "Schlechter",
]);

export const oftenLikert6 = getLikertScale(6, [
  "Täglich",
  "Mehrmals pro Woche",
  "Mehrmals pro Monat",
  "Mehrmals pro Jahr",
  "Seltener",
  "Gar nicht",
]);

export const oftenLikert3 = getLikertScale(3, [
  "Täglich",
  "Nicht täglich",
  "(Fast) gar nicht",
]);

export const yesnoLikert2 = getLikertScale(2, [
  "Ja",
  "Nein",
]);

export const credibleLikert4 = getLikertScale(4, [
  "Sehr glaubwürdig",
  "Eher glaubwürdig",
  "Eher nicht glaubwürdig",
  "Gar nicht glaubwürdig",
]);

export const helpfulnessLikert7 = getLikertScale(7, [
  "Sehr hilfreich",
  "Hilfreich",
  "Etwas hilfreich",
  "Neutral",
  "Eher nicht hilfreich",
  "Nicht hilfreich",
  "Sehr wenig hilfreich",
]);