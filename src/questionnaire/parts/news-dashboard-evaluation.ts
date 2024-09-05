import { agreementLikert7, satisfactionLikert7 } from "@/helper/likert-scales";

const newsDashboardEvaluation = {
  title: "Umfrage Teil 2: Gesamtbewertung des Nachrichten-Dashboards",
  description:
    "Im Folgenden stellen wir Ihnen mehrere Fragen zur allgemeinen Nützlichkeit des bereitgestellten News Dashboards. Bitte antworten Sie so wahrheitsgemäß wie möglich.",
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
          text: "Die Verwendung des News Dashboard würde meine Effektivität beim Aufspüren von Fake News erhöhen.",
          value: "increase-effectiveness-fake-news-detection",
        },
        {
          text: "Ich denke, das News Dashboard ist nützlich für die Bewertung von Nachrichtenartikeln",
          value: "useful-assess-news-articles",
        },
        {
          text: "Mit dem News Dashboard kann ich Fake News in Zukunft schneller erkennen",
          value: "help-detect-fake-news-faster",
        },
        {
          text: "Insgesamt verstehe ich, wie das News Dashboard mir bei meinen Entscheidungen hilft.",
          value: "assist-decisions",
        },
        // {
        //   text: "Overall, I think the explanations given by the AI-System in the News Dashboard for the news article are useful",
        //   value: "useful-explanations-news",
        // },
        {
          text: "Die Einarbeitung in das News Dashboard dauert zu lange, als dass sich der Aufwand lohnen würde.",
          value: "long-learning-time-not-worth",
        },
        {
          text: "Insgesamt sind die im News Dashboard dargestellten Erklärungen verständlich und helfen mir bei der Beurteilung der Nachrichtenartikel",
          value: "comprehensible-explanations-help-assess-news-articles",
        },
        // {
        //   text: "The presented explainability features in the News Dashboard seem too complicated",
        //   value: "complicated-explainability-features",
        // },
        // {
        //   text: "The metadata (source of the article and publishing date) are presented comprehensible and useful for the task",
        //   value: "comprehensible-useful-metadata",
        // },
      ],
    },
    // {
    //   type: "matrix",
    //   name: "news-dashboard-evaluation",
    //   hideNumber: true,
    //   columns: satisfactionLikert7,
    //   alternateRows: true,
    //   titleLocation: "hidden",
    //   isAllRowRequired: true,
    //   rows: [
    //     {
    //       text: "How satisfied are you with the explanatory quality of the News Dashboard?",
    //       value: "satisfied-with-explanatory-quality",
    //     },
    //   ],
    // },
  ],
};

export default newsDashboardEvaluation;
