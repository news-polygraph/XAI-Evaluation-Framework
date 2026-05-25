import { ExperimentType } from "@/model/experiment-type";
import { XAIFeatureLevel } from "@/model/xai-feature-level";

const feverTutorialText = (xaiFeatures: XAIFeatureLevel, experimentType: ExperimentType) => {
  const stepIntroHtml =
    experimentType === "TwoStep"
      ? `
        <p>
          Your tasks, rating the claims, is divided into <b>three steps</b>:
        </p>
        </br>
        <p>
          <b>Step 1 -  Read and Rate:</b> Read the claim and rate its truthfulness, make sure to indicate your confidence in the rating you have provided. After you have rated the claim, click on <b><i>Next</i></b> to move on to the next step.
        </p>
        </br>
        <p>
          <b>Step 2 - Inform:</b> Additional information will show up, which you can take into account for your rating.
        </p>
        </br>
        <p>
          <b>Step 3 - Rate again:</b> You are asked to rate the same claim again, but this time you can take into account the additional information provided in Step 2. You should also indicate your confidence in the rating you have provided.
        </p>
      `
      : `
        <p>
          Your task is to rate the claims given the relevant information, this will include both the relevant passage an the AI-system's explanations. Make sure to indicate your confidence in the rating you have provided. After you have rated the claim, click on <b><i>Next</i></b> to move on to the next claim.
        </p>
      `;
  return {
    name: "tutorial-text",
    elements: [
      {
        maxWidth: "900px",
        type: "html",
        html: `
        <div>
          <p>
            <b>Explanations for task Fever</b>
          </p>
          </br>
          <p>
            In the following, you will receive several claims which you should rate their truthfulness according to the provided evidence. The claims are presented in the <b>Dashboard</b>, consisting of several <b>AI-system components</b>. Which will be described later in more detail.
          </p>
          ${stepIntroHtml}
          </br>
          <p>
            In the following an introduction to the task will be shown, with more detailed descriptions for each step. Please read it carefully, before the actual task starts.
          </p>
        `,
      },
    ],
  };
};

export default feverTutorialText;
