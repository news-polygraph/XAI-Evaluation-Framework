import { XAIFeatureLevel } from "@/model/xai-feature-level";

const tutorialText = (xaiFeatures: XAIFeatureLevel) => {
  return {
    name: "tutorial-text",
    elements: [
      {
        maxWidth: "900px",
        type: "html",
        html: `
        <div>
          <p>
            <b>Explanations for the Truthfulness Assessment Task of News</b>
          </p>
          </br>
          <p>
            In the following, you will receive eight news articles which you should rate according to their truthfulness. The news articles are presented in the <b>News Dashboard</b>, consisting of several <b>AI-system components</b>. Which will be described later in more detail. Your tasks, rating the news article according to their truthfulness is divided into <b>three steps</b>: 
          </p>
          </br>
          <p>
            <b>Step 1 -  Read and Rate:</b> Read the news item and rate it
          </p>
          </br>
          <p>
            <b>Step 2 - Inform:</b> Additional information will show up, which you can take into account for your rating
          </p>
          </br>
          <p>
            <b>Step 3 - Repeat Rating:</b> You are asked to repeat your truthfulness rating
          </p>
          </br>
          <p>
            Overall, there are two sources of news articles: (1) a trustworthy source publishing mostly true articles and (2) an untrustworthy source, publishing mostly misleading and false articles.
          </p>
          </br>
          <p>
            In the following an introduction to the task will be shown, with more detailed descriptions for each step. Please read it carefully, before the actual task starts.
          </p>
        `,
      },
    ],
  };
};

export default tutorialText;
