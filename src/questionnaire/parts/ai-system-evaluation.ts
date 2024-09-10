import { agreementLikert7, helpfulnessLikert7 } from "@/helper/likert-scales";
import { XAIFeatureLevel } from "@/model/xai-feature-level";

/**
 * Generates a survey page for evaluating the usefulness of the Political Viewpoint visualizations.
 */
const aiSystemEvaluation = (xaiLevel: XAIFeatureLevel) => {
  //Not needed for Visualizations survey
  const featureChoices = [
    {
      value: "truthfulness-assessment",
      text: "Truthfulness assessment from the AI-System",
    },
    {
      value: "information-about-the-source",
      text: "Information about the source",
    },
    { value: "publishing-date", text: "Publishing date" },
  ];

  //Not needed for Visualizations survey
  if (xaiLevel === "salient") {
    const salientFeaures = [
      {
        value: "readability",
        text: "Explainability Feature 1: Readability of the news article",
      },
      {
        value: "text-highlights",
        text: "Explainability Feature 2: Text passages, where the AI-System's truthfulness rating is based on",
      },
      {
        value: "sentiment-highlights",
        text: "Explainability Feature 3: Words and phrases referring to emotional content",
      },
    ];

    featureChoices.push(...salientFeaures);
  }
  //Not needed for Visualizations survey
  if (xaiLevel === "explanations") {
    const explanationFeatures = [
      {
        value: "natural-language-explanation",
        text: "Explainability Feature: Natural language explanation",
      },
    ];

    featureChoices.push(...explanationFeatures);
  }

  return [
    {   
      title:
        "Umfrage Teil 2: Abschließende Fragen zur Nützlichkeit von politischen Informationsvisualisierungen",
      description:
        "Im Folgenden stellen wir Ihnen einige Fragen zu Ihrer Meinung über die politischen Informationsvisualisierungen. Bitte antworten Sie so wahrheitsgemäß wie möglich.",
      elements: [
        {
          /*
           * The choices are the different visualizations that the user has seen.
           * They are identified by their image links.
           */
          title: "Welcher Visualisierungsstil hat Ihnen am besten gefallen? Bitte wählen Sie Ihren Lieblingsstil aus.",
          type: "imagepicker",
          name: "visualization-evaluation.image-choice",
          hideNumber: true,
          choices: [
              { value: "ideology_1a", imageLink: "/imgs_by_items/item_19/ideology_1a.png" },
              { value: "ideology_1b", imageLink: "/imgs_by_items/item_19/ideology_1b.png" },
              { value: "ideology_2a", imageLink: "/imgs_by_items/item_19/ideology_2a.png" },
              { value: "ideology_2b", imageLink: "/imgs_by_items/item_19/ideology_2b.png" },
              { value: "leaning_1a", imageLink: "/imgs_by_items/item_19/leaning_1a.png" },
              { value: "leaning_1b", imageLink: "/imgs_by_items/item_19/leaning_1b.png" },
              { value: "leaning_2a", imageLink: "/imgs_by_items/item_19/leaning_2a.png" },
              { value: "leaning_2b", imageLink: "/imgs_by_items/item_19/leaning_2b.png" },
              { value: "parties_1a", imageLink: "/imgs_by_items/item_19/parties_1a.png" },
              { value: "parties_1b", imageLink: "/imgs_by_items/item_19/parties_1b.png" },
              { value: "parties_2a", imageLink: "/imgs_by_items/item_19/parties_2a.png" },
              { value: "parties_2b", imageLink: "/imgs_by_items/item_19/parties_2b.png" },
          ],
          isRequired: true,
          "imageHeight": 150,
          "imageWidth": 312,
          "imageFit": "contain",
        },
        {
          /**
           * Purpose: This question is used to evaluate the usefulness of the different types of information that are shown to the user.
           */
          title: "Welche Informationen haben Ihnen am meisten geholfen, den Wahrheitsgehalt eines Artikels zu beurteilen? Die politische Ausrichtung (links oder rechts), die Ideologie (autoritär, Kapitalismus usw.) oder die zugehörige politische Partei?",
          type: "radiogroup",
          name: "visualization-evaluation.most-useful-type",
          hideNumber: true,
          choices: [
              { value: "ideology", text: "Ideologie" },
              { value: "leaning", text: "Anlehnen" },
              { value: "party", text: "Politische Partei" },
          ],
          isRequired: true,
        },
        {
          /**
           * Purpose: This question is used to evaluate the usefulness of the different types of information that are shown to the user.
           * It asks the user to describe other ways of categorizing political information that they think are useful.
           */
          title:
            "Welche anderen Möglichkeiten gibt es, politische Informationen zu kategorisieren, abgesehen von politischer Ideologie, Neigung und Parteien?",
          type: "text",
          name: "visualization-evaluation.other-information-wish",
          hideNumber: true,
          isRequired: true,

        },
        {
          /**
           * Purpose: This question is used to evaluate the usefulness of the different types of information that are shown to the user.
           * It asks the user to describe other ways of visualizing political information that they think are useful.
           */
          title:
            "Welche anderen Möglichkeiten der Visualisierung von politischer Ideologie, Neigung und Parteien gibt es über die in dieser Studie genannten hinaus?",
          type: "text",
          name: "visualization-evaluation.other-visuals",
          hideNumber: true,
          isRequired: true,
        },
        {
          /**
           * Purpose: This question is used to evaluate the usefulness of the different types of information that are shown to the user.
           * It asks the user whether they think that the political information is generally useful to determine the truthfulness of an article.
           *
           * The user is asked to answer with a simple yes or no, or not sure.
           */
          title:
            "Wie hilfreich sind politische Informationen im Allgemeinen, um den Wahrheitsgehalt eines Artikels zu erkennen?",
          type: "radiogroup",
          name: "ai-system-evaluation.value-speed-or-comprehensiveness",
          hideNumber: true,
          choices: [
            { value: "yes", text: "Ja" },
            { value: "no", text: "Nein" },
            { value: "not-sure", text: "Nicht sicher" },
          ],
          isRequired: true,
        },
        {
          title:
            "Wie hilfreich sind politische Informationen im Allgemeinen, um den Wahrheitsgehalt eines Artikels zu erkennen?",
          type: "matrix",
          name: "political-info-helpful",
          hideNumber: true,
          columns: helpfulnessLikert7,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            {
                value: "Hilfsbereitschaft",
            },
          ],
        },
      ],
  },
  ];
};

export default aiSystemEvaluation;
