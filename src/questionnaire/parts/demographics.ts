/**
 * This is the demographics part of the survey.
 *
 * It asks the user for some basic information about themselves, such as their age, gender, and education level.
 *
 * The questions are:
 * - How old are you?
 * - What is your gender?
 * - What is your highest level of education?
 * - What is your employment status?
 * - What is your annual household income?
 *
 * The user is required to answer all of these questions, and the answers will be stored anonymously.
 */
const demographics = {
  title: "Letzte Fragen zu Ihrer Persönlichkeit",
  description:
    "Im Folgenden stellen wir Ihnen einige demografische Fragen, die ausschließlich anonymisiert gespeichert werden! Bitte antworten Sie so wahrheitsgemäß wie möglich",
  elements: [
    {
      title: "Wie alt sind Sie?",
      type: "radiogroup",
      name: "demographics.age",
      hideNumber: true,
      isRequired: true,
      choices: [
        { value: "18-20", text: "18-20" },
        { value: "21-29", text: "21-29" },
        { value: "30-39", text: "30-39" },
        { value: "40-49", text: "40-49" },
        { value: "50-59", text: "50-59" },
        { value: "60-or-older", text: "60 oder älter" },
      ],
    },
    {
      title: "Bitte geben Sie Ihr Geschlecht an.",
      type: "radiogroup",
      name: "demographics.gender",
      hideNumber: true,
      isRequired: true,
      choices: [
        { value: "female", text: "Weiblich" },
        { value: "male", text: "Männlich" },
        { value: "diverse", text: "Divers" },
      ],
    },
    {
      title: "In welchem Land leben Sie derzeit?",
      type: "text",
      name: "demographics.country",
      hideNumber: true,
      isRequired: true,
    },
    {
      title: "Welche Nationalität haben Sie?",
      type: "text",
      name: "demographics.nationality",
      hideNumber: true,
      isRequired: true,
    },
    {
      title: "Was ist Ihr höchster Schulabschluss?",
      type: "radiogroup",
      name: "demographics.education",
      hideNumber: true,
      isRequired: true,
      choices: [
        { value: "no-degree", text: "Kein Abschluss" },
        {
          value: "secondary",
          text: "Sekundarschulabschluss / Grundschulabschluss",
        },
        { value: "upper-secondary", text: "Sekundarstufe II" },
        { value: "high-school", text: "Highschool-Diplom" },
        { value: "university", text: "Universitätsabschluss" },
      ],
    },
    {
      title:
        "Welche der folgenden Kategorien beschreibt Ihren Beschäftigungsstatus am besten?",
      type: "radiogroup",
      name: "demographics.employment",
      hideNumber: true,
      isRequired: true,
      choices: [
        { value: "apprentice", text: "Auszubildender" },
        { value: "student", text: "Studenten" },
        { value: "salaried-employee", text: "Gehaltsempfänger" },
        { value: "self-employed", text: "Selbstständig" },
        { value: "civil-servant", text: "Staatsbediensteter" },
        { value: "retiree-pensioner", text: "Rentner/Rentnerin" },
        { value: "unemployed", text: "Arbeitslos" },
        { value: "other", text: "Andere" },
      ],
    },
    {
      title: "Wie hoch ist Ihr jährliches Haushaltseinkommen (brutto)??",
      type: "radiogroup",
      name: "demographics.income",
      hideNumber: true,
      isRequired: true,
      choices: [
        { value: "less-than-20000-usd", text: "Weniger als $20.000" },
        { value: "20000-34999-usd", text: "$20.000 - $34.999" },
        { value: "35000-49999-usd", text: "$35.000 - $49.999" },
        { value: "50000-74999-usd", text: "$50.000 - $74.999" },
        { value: "75000-99999-usd", text: "$75.000 - $99.999" },
        { value: "over-100000-usd", text: "Über $100.000" },
        { value: "no-answer", text: "I nicht antworten wollen" },
      ],
    },
  ],
};

export default demographics;


