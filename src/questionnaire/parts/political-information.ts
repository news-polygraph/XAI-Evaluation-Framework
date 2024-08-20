import {
    accessibilityLikert7,
    frequencyLikert7,
    importanceLikert7,
    seriousnessLikert7,
    truthfulnessLikert7,
    strengthLikert4,
    frequencyLikert4,
    importanceLikert4,
    satisfactionLikert4,
    agreementLikert3,
  } from "@/helper/likert-scales";
  
  const politicalInformation = [
    {
      title: "Survey Part 1: Your General Political Behavior",
      description:
        "In this part you should answer questions about how you interact with politics and political information. Please answer as truthfully as possible.",
      elements: [
        // {
        //   type: "boolean",
        //   name: "journalist",
        //   title: "Are a journalist by profession?",
        //   valueTrue: "Yes",
        //   valueFalse: "No",
        //   renderAs: "radio",
        //   hideNumber: true,
        //   isRequired: true,
        // },
        // {
        //   type: "matrix",
        //   name: "information-seeking.sources",
        //   title:
        //     "How often do you use these sources to learn about different topics?",
        //   hideNumber: true,
        //   columns: frequencyLikert7,
        //   alternateRows: true,
        //   isAllRowRequired: true,
        //   rows: [
        //     { value: "newspaper", text: "Newspaper" },
        //     { value: "online-newspaper", text: "Online newspaper" },
        //     { value: "instagram", text: "Instagram" },
        //     { value: "twitter", text: "Twitter" },
        //     { value: "facebook", text: "Facebook" },
        //     {
        //       value: "interview",
        //       text: "Personal Talk (Interview)",
        //       visibleIf: "{journalist}='Yes'",
        //     },
        //     { value: "blogs-websites", text: "Blogs/Websites" },
        //     {
        //       value: "personal-social-networks",
        //       text: "In personal social networks",
        //     },
        //   ],
        // },
        // {
        //   type: "checkbox",
        //   name: "information-seeking.most-used-sources",
        //   title: "Choose the three sources from above you use most often!",
        //   hideNumber: true,
        //   isRequired: true,
        //   maxSelectedChoices: 3,
        //   validators: [
        //     {
        //       type: "answercount",
        //       text: "Invalid response: please select three sources",
        //       minCount: 3,
        //     },
        //   ],
        //   choices: [
        //     { value: "newspaper", text: "Newspaper" },
        //     { value: "online-newspaper", text: "Online newspaper" },
        //     { value: "instagram", text: "Instagram" },
        //     { value: "twitter", text: "Twitter" },
        //     { value: "facebook", text: "Facebook" },
        //     {
        //       value: "interview",
        //       text: "Personal Talk (Interview)",
        //       visibleIf: "{journalist}='Yes'",
        //     },
        //     { value: "blogs-websites", text: "Blogs/Websites" },
        //     {
        //       value: "personal-social-networks",
        //       text: "In personal social networks",
        //     },
        //   ],
        // },
        {
          title:
            "How interested and well-informed are you about general political issues?",
          type: "matrix",
          name: "political-issues",
          hideNumber: true,
          columns: strengthLikert4,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            {
              value: "top-source-seriousness",
              text: "How interested are you in political issues in general?",
            },
            {
                value: "top-source-seriousness",
                text: "How well informed do you feel about political issues in general?",
            },
          ],
        },
        {
          title:
            "Thinking about the last week, how often did you talk to someone about political issues on the following occasions?",
          type: "matrix",
          name: "political-communication",
          hideNumber: true,
          columns: frequencyLikert4,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            { value: "work-school", text: "At work, school, or university" },
            { value: "personal-life", text: "In personal conversations with friends, family" },
            { value: "online", text: "When using social networks on the Internet" },
            { value: "free-time", text: "In my free time/hobbies e.g. in the club" },
          ],
        },
        {
            title:
              "If you want to form your own opinion on a political issue, how important are…?",
            type: "matrix",
            name: "political-information-importance",
            hideNumber: true,
            columns: importanceLikert4,
            alternateRows: true,
            isAllRowRequired: true,
            rows: [
              { value: "journalists", text: "News and information from journalists" },
              { value: "internet", text: "Information on the Internet from celebrities or even from “normal people” you don’t know personally" },
              { value: "speeches", text: "Speeches and contributions by politicians" },
              { value: "friends-family", text: "The opinions of family members, friends, and acquaintances" },
              { value: "government", text: "Information from the Federal Government" },
            ],
          },
        {
          type: "checkbox",
          name: "political-parties",
          title: "Which of the following parties do you like the most?",
          hideNumber: true,
          isRequired: true,
          maxSelectedChoices: 1,
        //   validators: [
        //     {
        //       type: "answercount",
        //       text: "Invalid response: please select three sources",
        //       minCount: 3,
        //     },
        //   ],
          choices: [
            { value: "cdu", text: "CDU" },
            { value: "csu", text: "CSU" },
            { value: "spd", text: "SPD" },
            { value: "grune", text: "Bündis 90/Die Grünen" },
            { value: "fdp", text: "FDP" },
            { value: "afd", text: "AfD" },
            { value: "die linke", text: "Die Linke" },
            { value: "other", text: "Other" },
          ],
        },
      ],
    },
    {
      title: "Survey Part 1: Dealing with Disinformation",
      description:
        "In this part you should answer questions about the dangers of disinformation and how you deal with it. Please answer as truthfully as possible.",
      elements: [
        {
            title:
              "How often do you react as follows when you find information on the Internet or in social networks that interests you, but you are not sure whether it is true or not?",
            type: "matrix",
            name: "dealing-with-disinformation",
            hideNumber: true,
            columns: frequencyLikert4,
            alternateRows: true,
            isAllRowRequired: true,
            rows: [
              { value: "ignore-info", text: "I ignore the information." },
              { value: "verify-source", text: "I am looking for other sources and media reports to verify the information." },
              { value: "ask-others", text: "I ask others what they think about it." },
              { value: "trustworthy-source", text: "I'm trying to find out whether the source of information can be trusted in principle." },
            ],
          },
        {
          title: "Please indicate for each of the following statements whether you tend to agree or disagree with them.",
          type: "matrix",
          name: "dangers-disinformation",
          hideNumber: true,
          columns: agreementLikert3,
          alternateRows: true,
          isAllRowRequired: true,
          rows: [
            { value: "information-abundance", text: "With the abundance of information, you no longer know what to believe." },
            { value: "personal-fear", text: "I'm worried that I might fall for false or misleading news myself." },
            { value: "others-fear", text: "I fear that others may be influenced by false or misleading news." },
          ],
        },
        {
            type: "checkbox",
            name: "sources-of-information",
            title: "From which sources would you like more information on how to avoid misleading or detect false information?",
            hideNumber: true,
            isRequired: true,
            maxSelectedChoices: 5,
            validators: [
              {
                type: "answercount",
                text: "Invalid response: please select at least one source",
                minCount: 1,
              },
            ],
            choices: [
              { value: "media", text: "From the media" },
              { value: "government", text: "By the Federal Government" },
              { value: "blog", text: "From bloggers who deal with it" },
              { value: "social-networks", text: "From operators of social networks on the internet" },
              { value: "school", text: "From schools and universities" },
              { value: "none", text: "Do you not want any information about this?" },
              { value: "other", text: "Other" },
            ],
          },
          {
            type: "checkbox",
            name: "fake-news-sending",
            title: "Who has ever sent you, forwarded you or posted misleading or false information in chat groups in which you are active?",
            hideNumber: true,
            isRequired: true,
            maxSelectedChoices: 6,
            validators: [
              {
                type: "answercount",
                text: "Invalid response: please select at least one answer",
                minCount: 1,
              },
            ],
            choices: [
              { value: "family", text: "Relatives/Family" },
              { value: "friends", text: "Friends" },
              { value: "acquaintance", text: "Acquaintance" },
              { value: "social-networks", text: "From operators of social networks on the internet" },
              { value: "celebrities", text: "Celebrities" },
              { value: "strangers", text: "People you don’t know" },
              { value: "none", text: "None of the above" },
              { value: "other", text: "Not specified" },
            ],
          },
        // {
        //   title:
        //     "How important is it for you to receive comprehensive information?",
        //   type: "matrix",
        //   name: "information-seeking",
        //   hideNumber: true,
        //   columns: importanceLikert7,
        //   alternateRows: true,
        //   isAllRowRequired: true,
        //   rows: [
        //     {
        //       value: "comprehensive-information",
        //       text: "Receiving comprehensive information",
        //     },
        //   ],
        // },
        // {
        //   title: "What is your purpose of information seeking?",
        //   type: "matrix",
        //   name: "information-seeking.purpose",
        //   hideNumber: true,
        //   columns: frequencyLikert7,
        //   alternateRows: true,
        //   isAllRowRequired: true,
        //   rows: [
        //     { value: "keep-up-to-date", text: "Keep up-to-date" },
        //     { value: "general-awareness", text: "General awareness" },
        //     { value: "preparing-research", text: "Preparing research" },
        //   ],
        // },
      ],
    },
  ];
  
  export default politicalInformation;
  