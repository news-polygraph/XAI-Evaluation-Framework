import { ExperimentType } from "@/model/experiment-type";
import { XAIFeatureLevel } from "@/model/xai-feature-level";

const zebraTutorialText = (xaiFeatures: XAIFeatureLevel, experimentType: ExperimentType) => {
  const stepIntroHtml =
  experimentType === "TwoStep"
    ? `
      <p>
        Your tasks, solving the puzzles, is divided into <b>three steps</b>:
      </p>
      </br>
      <p>
        <b>Step 1 -  Read and Solve:</b> Read the scenario and clues and solve the puzzle, make sure to indicate your confidence in the solution you have provided. After you have solved the puzzle, click on <b><i>Next</i></b> to move on to the next step.
      </p>
      </br>
      <p>
        <b>Step 2 - Inform:</b> Additional information will show up, which you can take into account for your solution.
      </p>
      </br>
      <p>
        <b>Step 3 - Solve again:</b> You are asked to solve the same puzzle again, but this time you can take into account the additional information provided in Step 2. You should also indicate your confidence in the solution you have provided.
      </p>
    `
    : `
      <p>
        Your task is to solve the puzzles given the relevant information, this will include both the relevant scenario and clues and the AI-system's explanations. Make sure to indicate your confidence in the solution you have provided. After you have solved the puzzle, click on <b><i>Next</i></b> to move on to the next puzzle.
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
            <b>Explanations for task ZebraLogic</b>
          </p>
          </br>
          <p>
            In the following, you will receive several puzzles which you should solve according to the provided scenario and clues. The puzzles are presented in the <b>Dashboard</b>, consisting of several <b>AI-system components</b>. Which will be described later in more detail.
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

export default zebraTutorialText;
