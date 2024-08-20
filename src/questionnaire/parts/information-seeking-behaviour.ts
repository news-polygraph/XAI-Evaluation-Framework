import {
  accessibilityLikert7,
  frequencyLikert7,
  importanceLikert7,
  seriousnessLikert7,
  truthfulnessLikert7,
} from "@/helper/likert-scales";

const informationSeekingBehaviour = [
  {
    title: "Survey Part 1: Your General Behaviour Searching for Information I",
    description:
      "In this part you should answer questions about the accessibility and transparency of information. Please answer as truthfully as possible.",
    elements: [
      {
        type: "boolean",
        name: "journalist",
        title: "Are a journalist by profession?",
        valueTrue: "Yes",
        valueFalse: "No",
        renderAs: "radio",
        hideNumber: true,
        isRequired: true,
      },
      {
        type: "matrix",
        name: "information-seeking.sources",
        title:
          "How often do you use these sources to learn about different topics?",
        hideNumber: true,
        columns: frequencyLikert7,
        alternateRows: true,
        isAllRowRequired: true,
        rows: [
          { value: "newspaper", text: "Newspaper" },
          { value: "online-newspaper", text: "Online newspaper" },
          { value: "instagram", text: "Instagram" },
          { value: "twitter", text: "Twitter" },
          { value: "facebook", text: "Facebook" },
          {
            value: "interview",
            text: "Personal Talk (Interview)",
            visibleIf: "{journalist}='Yes'",
          },
          { value: "blogs-websites", text: "Blogs/Websites" },
          {
            value: "personal-social-networks",
            text: "In personal social networks",
          },
        ],
      },
      {
        type: "checkbox",
        name: "information-seeking.most-used-sources",
        title: "Choose the three sources from above you use most often!",
        hideNumber: true,
        isRequired: true,
        maxSelectedChoices: 3,
        validators: [
          {
            type: "answercount",
            text: "Invalid response: please select three sources",
            minCount: 3,
          },
        ],
        choices: [
          { value: "newspaper", text: "Newspaper" },
          { value: "online-newspaper", text: "Online newspaper" },
          { value: "instagram", text: "Instagram" },
          { value: "twitter", text: "Twitter" },
          { value: "facebook", text: "Facebook" },
          {
            value: "interview",
            text: "Personal Talk (Interview)",
            visibleIf: "{journalist}='Yes'",
          },
          { value: "blogs-websites", text: "Blogs/Websites" },
          {
            value: "personal-social-networks",
            text: "In personal social networks",
          },
        ],
      },
      {
        title:
          "How do you rate the seriousness of the source you named first in the previous question?",
        type: "matrix",
        name: "information-seeking",
        hideNumber: true,
        columns: seriousnessLikert7,
        alternateRows: true,
        isAllRowRequired: true,
        rows: [
          {
            value: "top-source-seriousness",
            text: "Seriousness of the source",
          },
        ],
      },
      {
        title:
          "How would you rate the truthfulness of information available from the following sources?",
        type: "matrix",
        name: "information-seeking.truthfulness",
        hideNumber: true,
        columns: truthfulnessLikert7,
        alternateRows: true,
        isAllRowRequired: true,
        rows: [
          { value: "newspaper", text: "Newspaper" },
          { value: "online-newspaper", text: "Online newspaper" },
          { value: "instagram", text: "Instagram" },
          { value: "twitter", text: "Twitter" },
          { value: "facebook", text: "Facebook" },
        ],
      },
    ],
  },
  {
    title: "Survey Part 1: Your General Behaviour Searching for Information II",
    description:
      "In this part you should answer questions about the accessibility and transparency of information. Please answer as truthfully as possible.",
    elements: [
      {
        type: "matrix",
        name: "information-seeking",
        title:
          "How accessible is transparent and reliable information about online sources and their content for you?",
        hideNumber: true,
        columns: accessibilityLikert7,
        alternateRows: true,
        isAllRowRequired: true,
        rows: [
          {
            value: "accessibility-of-information-about-transparency",
            text: "Accessibility",
          },
        ],
      },
      {
        title: "How do you access the material?",
        type: "matrix",
        name: "information-seeking.access",
        hideNumber: true,
        columns: frequencyLikert7,
        alternateRows: true,
        isAllRowRequired: true,
        rows: [
          { value: "personal-purchase", text: "By personal purchase" },
          { value: "google", text: "Google" },
          { value: "library", text: "Library" },
          { value: "websites", text: "Websites" },
        ],
      },
      {
        title:
          "How important is it for you to receive comprehensive information?",
        type: "matrix",
        name: "information-seeking",
        hideNumber: true,
        columns: importanceLikert7,
        alternateRows: true,
        isAllRowRequired: true,
        rows: [
          {
            value: "comprehensive-information",
            text: "Receiving comprehensive information",
          },
        ],
      },
      {
        title: "What is your purpose of information seeking?",
        type: "matrix",
        name: "information-seeking.purpose",
        hideNumber: true,
        columns: frequencyLikert7,
        alternateRows: true,
        isAllRowRequired: true,
        rows: [
          { value: "keep-up-to-date", text: "Keep up-to-date" },
          { value: "general-awareness", text: "General awareness" },
          { value: "preparing-research", text: "Preparing research" },
        ],
      },
    ],
  },
];

export default informationSeekingBehaviour;
