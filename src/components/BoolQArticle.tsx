/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BoolQItem } from '../model/dataset-item';
import { XAIFeatureLevel } from '../model/xai-feature-level';
import TutorialTooltip from './TutorialTooltip';
import { TutorialTooltipStep } from '../model/tutorial-tooltip-step';

// ─── Styles ───────────────────────────────────────────────────────────────────

const articleStyles = css`
  position: relative;

  /* Question title */
  h1 {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 16px;
    color: #1D1D1F;
  }

  /* "Passage" label */
  h2 {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #888;
    margin-bottom: 10px;
  }

  /* Passage body */
  p {
    font-size: 16px;
    line-height: 1.7;
    color: #333;
    text-align: justify;
  }

  .xai-highlight   { background-color: #FFE826; }
  .sentiment-highlight { background-color: #00FEFE; }
`;

interface Props {
  datasetItem: BoolQItem;
  xaiFeatures: XAIFeatureLevel;
  tutorialTooltip: TutorialTooltipStep | null;
  xaiHighlight: (content: string | string[]) => string;
}

const BoolQArticle: React.FC<Props> = ({
  datasetItem,
  xaiFeatures,
  tutorialTooltip,
  xaiHighlight,
}) => {
  const passageHtml =
    xaiFeatures === 'salient'
      ? xaiHighlight(datasetItem.xaiFeatures.highlightedContent ?? datasetItem.content)
      : datasetItem.content;

  return (
    <article css={articleStyles}>
      {tutorialTooltip === 'boolqarticle' && (
        <TutorialTooltip>
          <b>Step 1 – Read and answer</b> Read the question carefully, then read
          the passage that provides the supporting context. Please click next.
        </TutorialTooltip>
      )}

      {/* Question as title */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
        {datasetItem.isQualification && (
          <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: '#E8F7F4', color: '#19B394', border: '1px solid #19B394' }}>
            Qualification
          </span>
        )}
        {datasetItem.isFalsePositive && (
          <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: '#FFF0F0', color: '#E60A3E', border: '1px solid #E60A3E' }}>
            False Positive
          </span>
        )}
        {datasetItem.isTrueNegative && (
          <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: '#FFF7E0', color: '#B07A00', border: '1px solid #B07A00' }}>
            True Negative
          </span>
        )}
      </div>
      <h1>{datasetItem.title}</h1>

      {/* Passage */}
      <h2>Passage</h2>
      <p dangerouslySetInnerHTML={{ __html: passageHtml }} />
    </article>
  );
};

export default BoolQArticle;