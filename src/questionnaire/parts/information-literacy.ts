import { likelihoodLikert7 } from "@/helper/likert-scales";

const informationLiteracy = {
  title: "Survey Part 1: General Background of Reading and Searching for News",
  description:
    "In the following we ask you several questions regarding your ability to identify false information in news items. Please answer the following questions as truthfully as possible.",
  elements: [
    {
      type: "matrix",
      name: "information-literacy",
      title: "I think...",
      alternateRows: true,
      hideNumber: true,
      isAllRowRequired: true,
      columns: likelihoodLikert7,
      rows: [
        {
          value: "identify-misinformation",
          text: "... I can identify misinformation in news",
        },
        {
          value: "check-reliability",
          text: "... I can check the reliability of the searched information",
        },
        {
          value: "efficiently-use-subscribed-and-openaccess",
          text: "... I can efficiently use subscribed and openaccess information resources when I am looking for information",
        },
        {
          value: "identify-authentic-sources",
          text: "... I can identify the best authentic sources of information",
        },
        {
          value: "research-level-skilss",
          text: "... I have research-level skills",
        },
        {
          value: "plagiarism-and-publication-ethics",
          text: "... I know about plagiarism and publication ethics",
        },
        {
          value: "access-relevant-literature",
          text: "... I have the skill to access information resources for finding relevant literature, about topics I want to verify (e.g. looking up information about climate change and its effect on our everyday life)",
        },
        {
          value: "differentiate-right-and-fake",
          text: "... I can differentiate between right and fake information when I am reading news, also online in my social media channels",
        },
        {
          value: "have-it-skills",
          text: "... I have skills in Information Technology (IT)",
        },
      ],
    },
  ],
};

export default informationLiteracy;
