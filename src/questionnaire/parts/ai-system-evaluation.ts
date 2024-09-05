import { agreementLikert7 } from "@/helper/likert-scales";
import { XAIFeatureLevel } from "@/model/xai-feature-level";

const aiSystemEvaluation = (xaiLevel: XAIFeatureLevel) => {
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
          title:
            "Welche anderen Möglichkeiten gibt es, politische Informationen zu kategorisieren, abgesehen von politischer Ideologie, Neigung und Parteien?",
          type: "text",
          name: "visualization-evaluation.other-information-wish",
          hideNumber: true,
          isRequired: true,
        },
        {
          title:
            "Welche anderen Möglichkeiten der Visualisierung von politischer Ideologie, Neigung und Parteien gibt es über die in dieser Studie genannten hinaus?",
          type: "text",
          name: "visualization-evaluation.other-visuals",
          hideNumber: true,
          isRequired: true,
        },
        {
          title:
            "Helfen Ihnen politische Informationen im Allgemeinen dabei, den Wahrheitsgehalt eines Artikels zu erkennen?",
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
          "imageHeight": 300,
          "imageWidth": 300,
          "imageFit": "contain",
        },
      ],
  },
    // {
    //   title: "Survey Part 2: Overall AI-System Evaluation II",
    //   description:
    //     "In the following we ask you several questions about the overall performance of the AI-System. Please answer as truthfully as possible.",
    //   elements: [
    //     {
    //       type: "matrix",
    //       name: "ai-system-evaluation",
    //       hideNumber: true,
    //       columns: agreementLikert7,
    //       alternateRows: true,
    //       titleLocation: "hidden",
    //       isAllRowRequired: true,
    //       rows: [
    //         {
    //           text: "I think I understand why this AI-System provided the decision it did",
    //           value: "understand-why-system-provided-decision",
    //         },
    //         {
    //           text: "I think I understand what this AI-System bases its provided decision on",
    //           value: "understand-what-system-bases-decision-on",
    //         },
    //         {
    //           text: "The classification of the AI-System is comprehensible for me",
    //           value: "classification-comprehensible",
    //         },
    //         {
    //           text: "It is easy to follow what the AI-System does",
    //           value: "easy-to-follow-what-system-does",
    //         },
    //         {
    //           text: "I know what will happen the next time I use the AI-System because I understand how it behaves",
    //           value: "know-what-will-happen-next-time",
    //         },
    //         {
    //           text: "I tend to trust this AI-System, even though I have little or no knowledge of it",
    //           value: "tend-to-trust-system-even-without-knowledge",
    //         },
    //         {
    //           text: "My tendency to trust this AI-System is high",
    //           value: "tendency-to-trust-system-high",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title:
    //     "Survey Part 2: Final Questions about the Usefulness of the AI-System and Explanations Given",
    //   description:
    //     "In the following we ask you several questions about what you think about the AI-System. Please answer as truthfully as possible.",
    //   elements: [
    //     {
    //       title: "What was the most useful explanation feature for you?",
    //       type: "radiogroup",
    //       name: "ai-system-evaluation.most-useful-explanation-feature",
    //       hideNumber: true,
    //       choices: featureChoices,
    //       isRequired: true,
    //     },
    //     {
    //       title:
    //         "What other information would you like to obtain to better assess the truthfulness of an article?",
    //       type: "text",
    //       name: "ai-system-evaluation.other-information-wish",
    //       hideNumber: true,
    //       isRequired: true,
    //     },
    //     {
    //       title:
    //         "What do you value more in terms of information - speed or comprehensiveness?",
    //       type: "radiogroup",
    //       name: "ai-system-evaluation.value-speed-or-comprehensiveness",
    //       hideNumber: true,
    //       choices: [
    //         { value: "speed", text: "Speed" },
    //         { value: "comprehensiveness", text: "Comprehensiveness" },
    //       ],
    //       isRequired: true,
    //     },
    //     {
    //       title:
    //         "What criteria do you usually use to judge whether a news/article is reliable?",
    //       type: "text",
    //       name: "ai-system-evaluation.criteria-to-judge-reliability",
    //       hideNumber: true,
    //       isRequired: true,
    //     },
    //     {
    //       type: "boolean",
    //       name: "journalist2",
    //       title: "Are a journalist by profession?",
    //       valueTrue: "Yes",
    //       valueFalse: "No",
    //       renderAs: "radio",
    //       hideNumber: true,
    //       isRequired: true,
    //     },
    //     {
    //       type: "matrix",
    //       name: "ai-system-evaluation",
    //       title: "Please answer the following questions about the AI-System",
    //       hideNumber: true,
    //       alternateRows: true,
    //       columns: agreementLikert7,
    //       isAllRowRequired: true,
    //       rows: [
    //         {
    //           value: "trust-new-tech",
    //           text: "My typical approach is to trust new technologies until they prove to me that I shouldn't trust them",
    //         },
    //         {
    //           value: "benefit-of-doubt",
    //           text: "I generally give technology the benefit of the doubt when I first use it",
    //         },
    //         {
    //           value: "sceptical-about-ai-system",
    //           text: "Overall, are you sceptical about the AI-System?",
    //         },
    //         {
    //           value: "rely-on-ai-system",
    //           text: "How willing are you to rely on information provided by the AI-System in the context of fake news detection?",
    //         },
    //         {
    //           value: "system-helpful",
    //           text: "For my everyday consumption of news this AI-System is helpful",
    //         },
    //         {
    //           value: "everyday-work-helpful",
    //           text: "For my everyday work assessing information the AI-System is helpful",
    //           visibleIf: "{journalist2}='Yes'",
    //         },
    //         {
    //           value: "system-has-functionality-for-work",
    //           text: "The AI-System has the functionality I need for my work",
    //           visibleIf: "{journalist2}='Yes'",
    //         },
    //       ],
    //     },
    //     {
    //       title:
    //         "You stated that the system is not helpful for your everyday work. Why?",
    //       type: "text",
    //       name: "ai-system-evaluation.why-not-helpful-for-everyday-work",
    //       hideNumber: true,
    //       visibleIf: "{ai-system-evaluation.everyday-work-helpful} < 4",
    //       isRequired: true,
    //     },
    //     {
    //       title: "What functionality would be a good addition?",
    //       type: "text",
    //       name: "ai-system-evaluation.additional-functionality",
    //       hideNumber: true,
    //       isRequired: true,
    //     },
    //   ],
    // },
  ];
};

export default aiSystemEvaluation;
