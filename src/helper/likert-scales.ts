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
  "Strongly agree",
  "Agree",
  "Somewhat agree",
  "Neutral",
  "Somewhat disagree",
  "Disagree",
  "Strongly disagree",
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
  "Very strong",
  "Strong",
  "Less",
  "Not at all",
]);

export const frequencyLikert4 = getLikertScale(4, [
  "Frequently",
  "Occasionally",
  "Rarely",
  "Never",
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
  "Tend to agree",
  "Rather disagree",
  "Don't know",
]);
