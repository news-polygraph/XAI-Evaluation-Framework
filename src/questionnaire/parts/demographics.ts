const demographics = {
  title: "Last Questions about Your Personality",
  description:
    "In the following we ask you several demographic questions, which will be stored anonymously only! Please answer as truthfully as possible.",
  elements: [
    {
      title: "To which age category do you belong?",
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
        { value: "60-or-older", text: "60 or older" },
      ],
    },
    {
      title: "What is your gender?",
      type: "radiogroup",
      name: "demographics.gender",
      hideNumber: true,
      isRequired: true,
      choices: [
        { value: "female", text: "female" },
        { value: "male", text: "male" },
        { value: "diverse", text: "diverse" },
      ],
    },
    {
      title: "In which country do you currently live?",
      type: "text",
      name: "demographics.country",
      hideNumber: true,
      isRequired: true,
    },
    {
      title: "What is your nationality?",
      type: "text",
      name: "demographics.nationality",
      hideNumber: true,
      isRequired: true,
    },
    {
      title: "What is your highest school-leaving qualification?",
      type: "radiogroup",
      name: "demographics.education",
      hideNumber: true,
      isRequired: true,
      choices: [
        { value: "no-degree", text: "no degree" },
        {
          value: "secondary",
          text: "secondary school diploma / elementary school diploma",
        },
        { value: "upper-secondary", text: "upper secondary school" },
        { value: "high-school", text: "high school diploma" },
        { value: "university", text: "university degree" },
      ],
    },
    {
      title:
        "Which of the following categories best describes your employment status?",
      type: "radiogroup",
      name: "demographics.employment",
      hideNumber: true,
      isRequired: true,
      choices: [
        { value: "apprentice", text: "Apprentice" },
        { value: "student", text: "Student" },
        { value: "salaried-employee", text: "Salaried employee" },
        { value: "self-employed", text: "Self-employed" },
        { value: "civil-servant", text: "Civil servant" },
        { value: "retiree-pensioner", text: "Retiree / pensioner" },
        { value: "unemployed", text: "Unemployed" },
        { value: "other", text: "Other" },
      ],
    },
    {
      title: "What is your annual household income (gross)?",
      type: "radiogroup",
      name: "demographics.income",
      hideNumber: true,
      isRequired: true,
      choices: [
        { value: "less-than-20000-usd", text: "Less than $20.000" },
        { value: "20000-34999-usd", text: "$20.000 - $34.999" },
        { value: "35000-49999-usd", text: "$35.000 - $49.999" },
        { value: "50000-74999-usd", text: "$50.000 - $74.999" },
        { value: "75000-99999-usd", text: "$75.000 - $99.999" },
        { value: "over-100000-usd", text: "Over $100.000" },
        { value: "no-answer", text: "I do not want to answer" },
      ],
    },
  ],
};

export default demographics;
