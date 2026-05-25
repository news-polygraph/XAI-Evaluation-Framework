/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import DatasetItem from '../model/dataset-item';
import { XAIFeatureLevel } from '../model/xai-feature-level';
import { TutorialTooltipStep } from '../model/tutorial-tooltip-step';

import TruthfulnessSlider from './TruthfulnessSlider';
import TruthfulnessBoolean from './TruthfulnessBoolean';
import TruthfulnessMultipleChoice from './TruthfulnessMultipleChoice';
import TutorialTooltip from './TutorialTooltip';
import { getHighlightedSentences } from '../helper/xai-highlight';

// ─── Styles ───────────────────────────────────────────────────────────────────
const panelStyles = css`
  height: 100%;
  border: 1px solid #E5E5E5;
  background: transparent;

  h1 { font-size: 18px; font-weight: 600; }
  h2 { font-size: 14px; color: #4F4F4F; font-weight: 600; margin-bottom: 8px; }

  .line {
    width: 100%;
    height: 1px;
    background-color: #E5E5E5;
    margin: 20px 0;
  }
  .xai-highlight {
    background-color: #FFE826;
  }
`;

interface Props {
  datasetItem: DatasetItem;
  xaiFeatures: XAIFeatureLevel;
  tutorialTooltip: TutorialTooltipStep | null;
}

const XAIAnswerPanel: React.FC<Props> = ({ datasetItem, xaiFeatures, tutorialTooltip }) => (
  <section className="container" css={panelStyles}>
    <h1>AI-System Answer</h1>
    <div className="line" />

    {/* ── AI truthfulness rating ─────────────────────────────────────────── */}
    <div css={css`display: flex; gap: 8px; position: relative;`}>
      {tutorialTooltip === 'ai-rating' && (
        <TutorialTooltip>
          <b>Step 2 – Inform</b> During step 2 you see the answer provided by
          <b>AI-System</b>. Please check the <b>AI-generated</b> explanation below the given answer and click next.
        </TutorialTooltip>
      )}

      {datasetItem.ratingType === 'boolean' ? (
        <TruthfulnessBoolean
          initialScore={datasetItem.xaiFeatures?.truthfulness as boolean}
        />
      ) : datasetItem.ratingType === 'multiple-choice' ? (
        <TruthfulnessMultipleChoice
          initialScore={datasetItem.xaiFeatures?.truthfulness as string}
          options={datasetItem.options}
        />
      ) : (
        <TruthfulnessSlider
          initialScore={datasetItem.xaiFeatures?.truthfulness as number}
        />
      )}
    </div>

    {/* ── Salient: highlighted text passages ────────────────────────────── */}
    {xaiFeatures === 'salient' && (
      <>
        <div className="line" />
        <div css={css`position: relative;`}>
          {tutorialTooltip === 'salient-highlights' && (
            <TutorialTooltip>
              <b>Step 2 – Inform Text Highlights</b> The text highlighted in
              yellow marks the statements the AI-System based its rating on.
              Please click next.
            </TutorialTooltip>
          )}
          <h2>Text passages the AI-System's rating is based on</h2>
          {getHighlightedSentences(datasetItem.xaiFeatures?.highlightedContent ?? '').map(
            (sentence, index) => (
              <blockquote
                key={index}
                css={css`
                  border-left: 6px solid #fdef70;
                  padding: 8px;
                  margin: 8px 0;
                  background-color: #FFE82626;
                `}
                dangerouslySetInnerHTML={{ __html: sentence }}
              />
            ),
          )}
        </div>
      </>
    )}

    {/* ── Natural language explanation ───────────────────────────────────── */}
    {xaiFeatures === 'explanations' && (
      <>
        <div className="line" />
        <div css={css`position: relative;`}>
          {tutorialTooltip === 'natural-language-explanation' && (
            <TutorialTooltip>
              <b>Step 2 – Inform Natural Language Explanation</b> The text
              highlighted in pink contains an explanation about the reasoning
              of the AI-System. Please read it carefully and click next.
            </TutorialTooltip>
          )}
          <h2>Explainability Feature: Natural language explanation</h2>
          <blockquote
            css={css`
              border-left: 6px solid #FF6FFF;
              padding: 8px;
              margin: 8px 0;
              background-color: #FF6FFF1A;
            `}
          >
            {datasetItem.xaiFeatures?.naturalLanguageExplanation}
          </blockquote>
        </div>
      </>
    )}

    {/* ── Counterfactual explanation ─────────────────────────────────────── */}
    {xaiFeatures === 'counterfactual' && (
      <>
        <div className="line" />
        <div css={css`position: relative;`}>
          {tutorialTooltip === 'counterfactual-explanation' && (
            <TutorialTooltip>
              <b>Step 2 – Inform Counterfactual Explanation</b>
              <br />
              <br />
              This explainability feature shows what an alternative and countefactual
              text looks like for the AI-System to alter its truthfulness rating. Please
              read it carefully and click next.
            </TutorialTooltip>
          )}
          <h2>Explainability Feature: Counterfactual Explanation</h2>
          <blockquote
            css={css`
              border-left: 6px solid #FF9F1C;
              padding: 8px;
              margin: 8px 0;
              background-color: #FF9F1C1A;
            `}
          >
            {datasetItem.xaiFeatures?.counterfactualExplanation}
          </blockquote>
        </div>
      </>
    )}
  </section>
);

export default XAIAnswerPanel;