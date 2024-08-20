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
      title: "Survey Part 2: Overall AI-System Evaluation",
      description:
        "In the following we ask you several questions about the overall performance of the AI-System. Please answer as truthfully as possible.",
      elements: [
        {
          type: "matrix",
          name: "ai-system-evaluation",
          hideNumber: true,
          columns: agreementLikert7,
          alternateRows: true,
          titleLocation: "hidden",
          isAllRowRequired: true,
          rows: [
            {
              text: "The AI-System supports decision-making in fake news detection very well",
              value: "system-supports-decision-making",
            },
            {
              text: "In general, the AI-System is able to detect fake news",
              value: "system-able-to-detect-fake-news",
            },
            {
              text: "The AI-System is able to classify the news articles competently",
              value: "system-able-to-classify-news-articles",
            },
            {
              text: "The AI-System can correctly classify the presented news articles",
              value: "system-can-correctly-classify-news-articles",
            },
            {
              text: "The AI-System can efficiently classify the presented news articles",
              value: "system-can-efficiently-classify-news-articles",
            },
            {
              text: "The AI-System decides neutral",
              value: "system-decides-neutral",
            },
            {
              text: "The AI-System decides consistently according to the same criteria",
              value: "system-decides-consistently",
            },
            {
              text: "The criteria according to which the AI-System evaluates are acceptable",
              value: "system-criteria-acceptable",
            },
          ],
        },
      ],
    },
    {
      title: "Survey Part 2: Overall AI-System Evaluation II",
      description:
        "In the following we ask you several questions about the overall performance of the AI-System. Please answer as truthfully as possible.",
      elements: [
        {
          type: "matrix",
          name: "ai-system-evaluation",
          hideNumber: true,
          columns: agreementLikert7,
          alternateRows: true,
          titleLocation: "hidden",
          isAllRowRequired: true,
          rows: [
            {
              text: "I think I understand why this AI-System provided the decision it did",
              value: "understand-why-system-provided-decision",
            },
            {
              text: "I think I understand what this AI-System bases its provided decision on",
              value: "understand-what-system-bases-decision-on",
            },
            {
              text: "The classification of the AI-System is comprehensible for me",
              value: "classification-comprehensible",
            },
            {
              text: "It is easy to follow what the AI-System does",
              value: "easy-to-follow-what-system-does",
            },
            {
              text: "I know what will happen the next time I use the AI-System because I understand how it behaves",
              value: "know-what-will-happen-next-time",
            },
            {
              text: "I tend to trust this AI-System, even though I have little or no knowledge of it",
              value: "tend-to-trust-system-even-without-knowledge",
            },
            {
              text: "My tendency to trust this AI-System is high",
              value: "tendency-to-trust-system-high",
            },
          ],
        },
      ],
    },
    {
      title:
        "Survey Part 2: Final Questions about the Usefulness of the AI-System and Explanations Given",
      description:
        "In the following we ask you several questions about what you think about the AI-System. Please answer as truthfully as possible.",
      elements: [
        {
          title: "What was the most useful explanation feature for you?",
          type: "radiogroup",
          name: "ai-system-evaluation.most-useful-explanation-feature",
          hideNumber: true,
          choices: featureChoices,
          isRequired: true,
        },
        {
          title:
            "What other information would you like to obtain to better assess the truthfulness of an article?",
          type: "text",
          name: "ai-system-evaluation.other-information-wish",
          hideNumber: true,
          isRequired: true,
        },
        {
          title:
            "What do you value more in terms of information - speed or comprehensiveness?",
          type: "radiogroup",
          name: "ai-system-evaluation.value-speed-or-comprehensiveness",
          hideNumber: true,
          choices: [
            { value: "speed", text: "Speed" },
            { value: "comprehensiveness", text: "Comprehensiveness" },
          ],
          isRequired: true,
        },
        {
          title:
            "What criteria do you usually use to judge whether a news/article is reliable?",
          type: "text",
          name: "ai-system-evaluation.criteria-to-judge-reliability",
          hideNumber: true,
          isRequired: true,
        },
        {
          type: "boolean",
          name: "journalist2",
          title: "Are a journalist by profession?",
          valueTrue: "Yes",
          valueFalse: "No",
          renderAs: "radio",
          hideNumber: true,
          isRequired: true,
        },
        {
          type: "matrix",
          name: "ai-system-evaluation",
          title: "Please answer the following questions about the AI-System",
          hideNumber: true,
          alternateRows: true,
          columns: agreementLikert7,
          isAllRowRequired: true,
          rows: [
            {
              value: "trust-new-tech",
              text: "My typical approach is to trust new technologies until they prove to me that I shouldn't trust them",
            },
            {
              value: "benefit-of-doubt",
              text: "I generally give technology the benefit of the doubt when I first use it",
            },
            {
              value: "sceptical-about-ai-system",
              text: "Overall, are you sceptical about the AI-System?",
            },
            {
              value: "rely-on-ai-system",
              text: "How willing are you to rely on information provided by the AI-System in the context of fake news detection?",
            },
            {
              value: "system-helpful",
              text: "For my everyday consumption of news this AI-System is helpful",
            },
            {
              value: "everyday-work-helpful",
              text: "For my everyday work assessing information the AI-System is helpful",
              visibleIf: "{journalist2}='Yes'",
            },
            {
              value: "system-has-functionality-for-work",
              text: "The AI-System has the functionality I need for my work",
              visibleIf: "{journalist2}='Yes'",
            },
          ],
        },
        {
          title:
            "You stated that the system is not helpful for your everyday work. Why?",
          type: "text",
          name: "ai-system-evaluation.why-not-helpful-for-everyday-work",
          hideNumber: true,
          visibleIf: "{ai-system-evaluation.everyday-work-helpful} < 4",
          isRequired: true,
        },
        {
          title: "What functionality would be a good addition?",
          type: "text",
          name: "ai-system-evaluation.additional-functionality",
          hideNumber: true,
          isRequired: true,
        },
      ],
    },
  ];
};

export default aiSystemEvaluation;
