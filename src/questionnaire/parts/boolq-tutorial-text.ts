import { ExperimentType } from "@/model/experiment-type";
import { XAIFeatureLevel } from "@/model/xai-feature-level";

const boolqTutorialText = (
  xaiFeatures: XAIFeatureLevel,
  experimentType: ExperimentType
) => {
  const stepIntroHtml =
    experimentType === "TwoStep"
      ? `
        <p>
          Your tasks, answering the questions, is divided into <b>three steps</b>:
        </p>
        </br>
        <p>
          <b>Step 1 -  Read and Answer:</b> Read the question and answer it, make sure to indicate your confidence in the answer you have provided. After you have answered the question, click on <b><i>Next</i></b> to move on to the next step.
        </p>
        </br>
        <p>
          <b>Step 2 - Inform:</b> Additional information will show up, which you can take into account for your answer.
        </p>
        </br>
        <p>
          <b>Step 3 - Answer again:</b> You are asked to answer the same question again, but this time you can take into account the additional information provided in Step 2. You should also indicate your confidence in the answer you have provided.
        </p>
      `
      : `
        <p>
          Your task is to answer the questions given the relevant information, this will include both the relevant passage an the AI-system's explanations. Make sure to indicate your confidence in the answer you have provided. After you have answered the question, click on <b><i>Next</i></b> to move on to the next question.
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
            <b>Explanations for task BoolQ</b>
          </p>
          </br>
          <p>
            In the following, you will receive several questions which you should answer according to the provided passage. The questions are presented in the <b>Dashboard</b>, consisting of several <b>AI-system components</b>. Which will be described later in more detail.
          </p>
          </br>
          ${stepIntroHtml}
          </br>
          <p>
            In the following an introduction to the task will be shown, with more detailed descriptions for each step. Please read it carefully, before the actual task starts.
          </p>
        </div>
        `,
      },
    ],
  };
};

export default boolqTutorialText;
