/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ZebraLogicItem } from '../model/dataset-item';
import { XAIFeatureLevel } from '../model/xai-feature-level';
import TutorialTooltip from './TutorialTooltip';
import { TutorialTooltipStep } from '../model/tutorial-tooltip-step';
import ZebraLogicDraftTable from './ZebraLogicDraftTable';
import { buildHighlightMap } from '../helper/xai-highlight';

// ─── Styles ───────────────────────────────────────────────────────────────────

const articleStyles = css`
  position: relative;

  h1 {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.35;
    margin-bottom: 16px;
    color: #1D1D1F;
  }

  h2 {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #888;
    margin-bottom: 10px;
  }

  .scenario-box {
    background: #F7F7F7;
    border-radius: 8px;
    padding: 14px 16px;
    font-size: 15px;
    line-height: 1.7;
    color: #333;
    white-space: pre-wrap;
    margin-bottom: 20px;
  }

  .clues-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .clue-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 15px;
    line-height: 1.55;
    color: #1D1D1F;
  }

  .clue-number {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #E8F7F4;
    color: #19B394;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
  }

  .xai-highlight       { background-color: #FFE826; }
  .sentiment-highlight { background-color: #00FEFE; }
`;

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  datasetItem: ZebraLogicItem;
  xaiFeatures: XAIFeatureLevel;
  tutorialTooltip: TutorialTooltipStep | null;
  xaiHighlight: (content: string | string[]) => string;
}

const ZebraLogicArticle: React.FC<Props> = ({
  datasetItem,
  xaiFeatures,
  tutorialTooltip,
  xaiHighlight,
}) => {
  // Build highlight map once per render (outside the clues .map loop)
  const highlightMap =
    xaiFeatures === 'salient' &&
    Array.isArray(datasetItem.xaiFeatures?.highlightedContent)
      ? buildHighlightMap(datasetItem.xaiFeatures.highlightedContent as string[])
      : null;

  return (
    <article css={articleStyles}>
      {tutorialTooltip === 'zebralogicarticle' && (
        <TutorialTooltip>
          <b>Step 1 – Read and Solve</b> Read the puzzle question, the scenario
          description, and each clue carefully before making your judgement.
          Please click next.
        </TutorialTooltip>
      )}
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

      <h2>Scenario</h2>
      <div
        className="scenario-box"
        dangerouslySetInnerHTML={{ __html: datasetItem.content }}
      />

      {datasetItem.clues?.length > 0 && (
        <>
          <h2>Clues</h2>
          <ol className="clues-list">
            {datasetItem.clues.map((clue, idx) => {
              const html = highlightMap?.get(clue.trim())
                ? xaiHighlight(highlightMap.get(clue.trim())!)
                : clue;
              return (
                <li key={idx} className="clue-item">
                  <span className="clue-number">{idx + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: html }} />
                </li>
              );
            })}
          </ol>
        </>
      )}

      {/* Pass itemId down so the table can key its store entry */}
      {datasetItem.entries && (
      <div
        style={{
          position: "relative",
          marginTop: "16px",
        }}
      >
        {tutorialTooltip === "draft" && (
          <TutorialTooltip>
            <b>Tip – Draft Table</b> You can use this table to draft your solution
            before submitting your final answer. Your inputs here won't be recorded
            or submitted, so feel free to experiment and change them as much as you like!
          </TutorialTooltip>
        )}
        <ZebraLogicDraftTable
          itemId={datasetItem.id}
          entries={datasetItem.entries}
        />
      </div>
    )}
    </article>
  );
};

export default ZebraLogicArticle;