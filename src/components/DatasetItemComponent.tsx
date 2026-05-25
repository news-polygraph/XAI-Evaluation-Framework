/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

import DatasetItem from '../model/dataset-item';
import { TutorialTooltipStep } from '../model/tutorial-tooltip-step';
import { XAIFeatureLevel } from '../model/xai-feature-level';

import TruthfulnessSlider from './TruthfulnessSlider';
import TruthfulnessBoolean from './TruthfulnessBoolean';
import TruthfulnessMultipleChoice from './TruthfulnessMultipleChoice';
import ConfidenceSlider from './ConfidenceSlider';
import TutorialTooltip from './TutorialTooltip';

import BoolQArticle from './BoolQArticle';
import FeverArticle from './FeverArticle';
import ZebraLogicArticle from './ZebraLogicArticle';
import XAIAnswerPanel from './XAIAnswerPanel';

import { xaiHighlight } from '../helper/xai-highlight';

// ─── Layout styles ────────────────────────────────────────────────────────────

const sectionStyles = css`
  font-family: Inter, sans-serif;
  color: #1D1D1F;
  white-space: normal;
  display: grid;
  grid-template-columns: minmax(58%, 1fr) minmax(380px, 1fr);
  gap: 32px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }

  .container {
    background-color: #FBFBFB;
    border-radius: 8px;
    padding: 20px;
    min-width: 380px;

    h1 { font-size: 18px; font-weight: 600; }
    h2 { font-size: 14px; color: #4F4F4F; font-weight: 600; margin-bottom: 8px; }
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: #E5E5E5;
    margin: 20px 0;
  }
`;

const asideStyles = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  datasetItem: DatasetItem;
  xaiFeatures: XAIFeatureLevel;
  isInput?: boolean;
  onRatingChange: (value: any) => void;
  isTutorialMode?: boolean;
  tutorialTooltip?: TutorialTooltipStep | null;
  defaultRatingValue?: any;
  showError?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

const DatasetItemComponent: React.FC<Props> = ({
  datasetItem,
  xaiFeatures,
  isInput = false,
  onRatingChange,
  isTutorialMode = false,
  tutorialTooltip = null,
  defaultRatingValue = undefined,
  showError = false,
}) => {
  // ── Rating state ────────────────────────────────────────────────────────────
  const [ratingValue, setRatingValue] = useState<number | boolean | string | undefined>(
    typeof defaultRatingValue === 'object' && defaultRatingValue !== null
      ? defaultRatingValue.rating
      : defaultRatingValue,
  );

  const [confidenceValue, setConfidenceValue] = useState<number | undefined>(
    typeof defaultRatingValue === 'object' && defaultRatingValue !== null
      ? defaultRatingValue.confidence
      : undefined,
  );

  // ── Article: delegate entirely to per-dataset subcomponent ──────────────────
  const commonArticleProps = { xaiFeatures, tutorialTooltip, xaiHighlight };

  const renderArticle = () => {
    switch (datasetItem.dataset) {
      case 'boolq':
        return <BoolQArticle datasetItem={datasetItem} {...commonArticleProps} />;
      case 'fever':
        return <FeverArticle datasetItem={datasetItem} {...commonArticleProps} />;
      case 'zebralogic':
        return <ZebraLogicArticle datasetItem={datasetItem} {...commonArticleProps} />;
      default:
        return (
          <article>
            <h1>{(datasetItem as any).title}</h1>
            <p>{(datasetItem as any).content}</p>
          </article>
        );
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <section css={sectionStyles}>

      {/* Overview tutorial tooltip */}
      {tutorialTooltip === 'overview' && (
        <TutorialTooltip>
          <b>Dashboard</b> In the following we will walk you through the
          different parts of the <b>Dashboard</b> and introduce you to the
          different steps of your task. Please click next.
        </TutorialTooltip>
      )}

      {/* Left column: dataset-specific article */}
      {renderArticle()}

      {/* Right column: AI answer + user rating */}
      <aside css={asideStyles}>

        {/* AI answer panel — hidden when xaiFeatures is 'none' */}
        {xaiFeatures !== 'none' && (
          <XAIAnswerPanel
            datasetItem={datasetItem}
            xaiFeatures={xaiFeatures}
            tutorialTooltip={tutorialTooltip}
          />
        )}

        {/* User rating input */}
        {isInput && (
          <div
            className="container"
            css={css`
              border: ${!showError ? '1px solid #19B394' : '1px solid #E60A3E'};
              flex: 1;
              min-width: 58%;
              position: relative;
            `}
          >

            <h1>Your answer</h1>
            <div className="line" />

            <div css={css`display: flex; flex-direction: column; gap: 32px;`}>
              {tutorialTooltip === 'your-rating' && (
                <TutorialTooltip>
                  <b>Step 1 – Choose the correct answer</b> Out of the currently provided options, please choose the most fitting answer. Do not forget to adjust the confidence slider to indicate how confident you are in your answer. After you have made your choice, click on <b><i>Next</i></b> to move on to the next step.
                </TutorialTooltip>
              )}
              {tutorialTooltip === 'redo-your-rating' && (
                <TutorialTooltip>
                  <b>Step 3 – Answer again</b> You are asked to re-evaluate your answer, taking the additional information into
                  account. Feel free to keep your original answer or change it, the same applies to the confidence slider. Please click next.
                </TutorialTooltip>
              )}
              {/* Truthfulness rating */}
              <div css={css`display: flex; flex-direction: column; gap: 12px;`}>
                <h2>Truthfulness</h2>
                {datasetItem.ratingType === 'boolean' ? (
                  <TruthfulnessBoolean
                    initialScore={ratingValue as boolean}
                    interactive
                    onChange={(score) => {
                      setRatingValue(score);
                      onRatingChange({ rating: score, confidence: confidenceValue });
                    }}
                  />
                ) : datasetItem.ratingType === 'multiple-choice' ? (
                  <TruthfulnessMultipleChoice
                    initialScore={ratingValue as string}
                    options={datasetItem.options}
                    interactive
                    onChange={(score) => {
                      setRatingValue(score as any);
                      onRatingChange({ rating: score, confidence: confidenceValue });
                    }}
                  />
                ) : (
                  <TruthfulnessSlider
                    initialScore={ratingValue as number}
                    interactive
                    onChange={(score) => {
                      setRatingValue(score);
                      onRatingChange({ rating: score, confidence: confidenceValue });
                    }}
                  />
                )}
              </div>

              {/* Confidence */}
              <ConfidenceSlider
                initialScore={confidenceValue}
                onChange={(newConfidence) => {
                  setConfidenceValue(newConfidence);
                  onRatingChange({ rating: ratingValue, confidence: newConfidence });
                }}
              />
            </div>
          </div>
        )}
      </aside>
    </section>
  );
};

export default DatasetItemComponent;