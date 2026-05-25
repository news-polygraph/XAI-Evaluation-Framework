/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FeverItem } from '../model/dataset-item';
import { XAIFeatureLevel } from '../model/xai-feature-level';
import TutorialTooltip from './TutorialTooltip';
import { TutorialTooltipStep } from '../model/tutorial-tooltip-step';

const articleStyles = css`
  position: relative;

  /* Claim — lighter weight, soft amber highlight background */
  .claim-heading {
    display: inline;
    font-size: 20px;
    font-weight: 500; /* lighter than a full h1 */
    line-height: 1.45;
    color: #2d2d2d;
    border-radius: 3px;
    padding: 2px 4px;
    margin-bottom: 20px;
  }

  .claim-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
  }

  /* Evidence section */
  .evidence-label {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #888;
    margin: 20px 0 12px;
  }

  /* Each evidence sentence pair — question-style label + answer */
  .evidence-pair {
    margin-bottom: 14px;
  }

  .evidence-q {
    font-size: 13px;
    font-weight: 600;
    color: #4F4F4F;
    margin-bottom: 4px;

    /* Extract the "What…?" part before the first sentence */
    &::before {
      content: 'Q: ';
      color: #0055F6;
    }
  }

  .evidence-a {
    font-size: 15px;
    line-height: 1.65;
    color: #1D1D1F;
    padding-left: 12px;
    border-left: 3px solid #E5E5E5;

    &::before {
      content: 'A: ';
      font-weight: 600;
      color: #19B394;
    }
  }

  /* Plain evidence (no question heading) */
  .evidence-plain {
    font-size: 15px;
    line-height: 1.65;
    color: #1D1D1F;
    padding: 8px 12px;
    border-left: 3px solid #E5E5E5;
    margin-bottom: 10px;
  }

  .xai-highlight {
    background-color: #FFE826;
  }

  .sentiment-highlight {
    background-color: #00FEFE;
  }
`;

type EvidenceSegment =
  | { type: 'qa'; question: string; answer: string }
  | { type: 'plain'; text: string };

function splitIntoPairs(evidence: string | string[]): { question: string; answer: string }[] {
  const pairs: { question: string; answer: string }[] = [];
  for (let i = 0; i + 1 < evidence.length; i += 2) {
    pairs.push({ question: evidence[i], answer: evidence[i + 1] });
  }
  return pairs;
}
function applyHighlights(content: string): string {
  return content
    .replace(/<mark>/g, '<span class="xai-highlight">')
    .replace(/<\/mark>/g, '</span>')
    .replace(/<sentiment>/g, '<span class="sentiment-highlight">')
    .replace(/<\/sentiment>/g, '</span>');
}

interface Props {
  datasetItem: FeverItem;
  xaiFeatures: XAIFeatureLevel;
  tutorialTooltip: TutorialTooltipStep | null;
  xaiHighlight: (content: string | string[]) => string;
}

const FeverArticle: React.FC<Props> = ({
  datasetItem,
  xaiFeatures,
  tutorialTooltip,
  xaiHighlight,
}) => {
  const isSalient = xaiFeatures === 'salient';

  const sourceEvidence: string | string[] = isSalient && datasetItem.xaiFeatures?.highlightedContent
      ? datasetItem.xaiFeatures.highlightedContent
      : datasetItem.evidence ?? [];

  // Build QA pairs from the chosen source array.
  const pairs = splitIntoPairs(Array.isArray(sourceEvidence) ? sourceEvidence : [sourceEvidence]);
  function renderContent(raw: string): string {
    if (isSalient) return applyHighlights(raw);
    return xaiHighlight ? xaiHighlight(raw) : raw;
  }

  const title: string = isSalient && datasetItem.xaiFeatures?.highlightedClaim
    ? xaiHighlight(datasetItem.xaiFeatures.highlightedClaim)
    : datasetItem.claim ?? '';
  return (
    <article css={articleStyles}>
      {tutorialTooltip === 'feverarticle' && (
        <TutorialTooltip>
          <b>Step 1: Read and Rate</b> Read the claim carefully, then review the supporting or refuting Q&A style evidence
          below. Please click next.
        </TutorialTooltip>
      )}

      {/* ── Claim ── */}
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
      <div>
        <div className="claim-label">Claim</div>
        <div>
          <span
            className="claim-heading"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </div>

      {/* ── Evidence ── */}
      <div className="evidence-label">Evidence</div>

      {pairs.map((pair, idx) =>
          <div key={idx} className="evidence-pair">
            <div
              className="evidence-q"
              dangerouslySetInnerHTML={{ __html: renderContent(pair.question) }}
            />
            <div
              className="evidence-a"
              dangerouslySetInnerHTML={{ __html: renderContent(pair.answer) }}
            />
          </div>
      )}
    </article>
  );
};

export default FeverArticle;