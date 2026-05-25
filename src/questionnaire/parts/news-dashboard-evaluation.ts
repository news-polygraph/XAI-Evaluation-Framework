import { agreementLikert7, satisfactionLikert7 } from "@/helper/likert-scales";

const newsDashboardEvaluation = {
  title: "Survey Part 2: Overall News Dashboard Evaluation",
  description:
    "In the following we ask you several questions about the overall usefulness of the provided News Dashboard. Please answer as truthfully as possible.",
  elements: [
    {
      type: "matrix",
      name: "news-dashboard-evaluation",
      hideNumber: true,
      columns: agreementLikert7,
      alternateRows: true,
      titleLocation: "hidden",
      isAllRowRequired: true,
      rows: [
        {
          text: "Using the News Dashboard would increase my effectiveness in finding the correct answer.",
          value: "increase-effectiveness-fake-news-detection",
        },
        {
          text: "I think the News Dashboard is useful for solving this task",
          value: "useful-assess-news-articles",
        },
        {
          text: "Using the News Dashboard will help me solve problems faster in the future",
          value: "help-detect-fake-news-faster",
        },
        {
          text: "Overall, I understand how this Dashboard assists me with decisions I have to make",
          value: "assist-decisions",
        },
        {
          text: "Overall, I think the explanations given by the AI-System in the Dashboard for this task are useful",
          value: "useful-explanations-news",
        },
        {
          text: "It takes too long to learn how to use the Dashboard to make it worth the effort",
          value: "long-learning-time-not-worth",
        },
        {
          text: "Overall, the presented explanations in the Dashboard are comprehensible and helped me with assessing my answers",
          value: "comprehensible-explanations-help-assess-news-articles",
        },
        {
          text: "The presented explainability features in the Dashboard seem too complicated",
          value: "complicated-explainability-features",
        },
      ],
    },
    {
      type: "matrix",
      name: "news-dashboard-evaluation",
      hideNumber: true,
      columns: satisfactionLikert7,
      alternateRows: true,
      titleLocation: "hidden",
      isAllRowRequired: true,
      rows: [
        {
          text: "How satisfied are you with the explanatory quality of the Dashboard?",
          value: "satisfied-with-explanatory-quality",
        },
      ],
    },
  ],
};

export default newsDashboardEvaluation;
