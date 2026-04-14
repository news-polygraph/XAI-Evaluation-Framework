import DatasetItem from "@/model/dataset-item";
import { TutorialTooltipStep } from "@/model/tutorial-tooltip-step";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import { useState } from "react";
import TruthfulnessSlider from "./TruthfulnessSlider";
import TruthfulnessBoolean from "./TruthfulnessBoolean";
import TruthfulnessMultipleChoice from './TruthfulnessMultipleChoice';
import ConfidenceSlider from "./ConfidenceSlider";

import TutorialTooltip from "./TutorialTooltip";

const DatasetItemComponent = ({
  datasetItem,
  xaiFeatures,
  isInput = false,
  onRatingChange = () => {},
  isTutorialMode = false,
  tutorialTooltip = null,
  defaultRatingValue = undefined,
  showError = false,
}: {
  datasetItem: DatasetItem;
  xaiFeatures: XAIFeatureLevel;
  isInput: boolean;
  onRatingChange: (value: any) => void;
  isTutorialMode: boolean;
  tutorialTooltip: TutorialTooltipStep | null;
  defaultRatingValue: any;
  showError: boolean;
}) => {
  // Parse the stored object if it exists, otherwise fall back to raw value or undefined
  const [ratingValue, setRatingValue] = useState<number | boolean | string | undefined>(
    typeof defaultRatingValue === "object" && defaultRatingValue !== null
      ? defaultRatingValue.rating
      : defaultRatingValue
  );
  const [confidenceValue, setConfidenceValue] = useState<number | undefined>(
    typeof defaultRatingValue === "object" && defaultRatingValue !== null
      ? defaultRatingValue.confidence
      : undefined
  );

  const xaiHighlight = (content: string) => {
    return content
      .replace(/<mark>/g, "<span class='xai-highlight'>")
      .replace(/<\/mark>/g, "</span>")
      .replace(/<sentiment>/g, "<span class='sentiment-highlight'>")
      .replace(/<\/sentiment>/g, "</span>");
  };

  const getHighlightedSentences = (highlightedContent: string) => {
    const sentences = highlightedContent.match(/<mark>(.*?)<\/mark>/g);

    if (sentences) {
      return sentences.map((sentence) => {
        return sentence
          .replace(/<\/?mark>/g, "")
          .replace(/<\/?sentiment>/g, "");
      });
    } else {
      return [];
    }
  };

  const getSentimentHighlights = (highlightedContent: string) => {
    const sentences = highlightedContent.match(
      /<sentiment>(.*?)<\/sentiment>/g
    );

    if (sentences) {
      return sentences.map((sentence) => {
        return sentence
          .replace(/<\/?sentiment>/g, "")
          .replace(/<\/?mark>/g, "");
      });
    } else {
      return [];
    }
  };

  return (
    <section
      css={{
        fontFamily: "Inter, sans-serif",
        color: "#1D1D1F",
        whiteSpace: "normal",
        display: "grid",
        gridTemplateColumns: "minmax(58%, 1fr) minmax(380px, 1fr)",
        gap: "32px",

        "@media (max-width: 1100px)": {
          gridTemplateColumns: "1fr",
        },

        ".container": {
          backgroundColor: "#FBFBFB",
          borderRadius: "8px",
          padding: "20px",
          minWidth: "380px",

          h1: {
            fontSize: "18px",
            fontWeight: 600,
          },

          h2: {
            fontSize: "14px",
            color: "#4F4F4F",
            fontWeight: 600,
            marginBottom: "8px",
          },

          ".line": {
            width: "100%",
            height: "1px",
            backgroundColor: "#E5E5E5",
            margin: "20px 0",
          },
        },
      }}
    >
      {tutorialTooltip === "overview" && (
        <TutorialTooltip>
          <b>News Dashboard:</b> In the following we will walk you through the
          different parts of the <b>News Dashboard</b> and introduce you to the
          different steps of your task. Please click next.
        </TutorialTooltip>
      )}
      <article
        css={{
          position: "relative",
          h1: {
            fontSize: "30px",
            marginBottom: "8px",
          },
          h2: {
            fontSize: "18px",
            color: "#4F4F4F",
            fontWeight: 500,
            marginBottom: "24px",
          },
          h3: {
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "24px",
          },
          p: {
            fontSize: "16px",
            lineHeight: "24px",
          },
          ".xai-highlight": {
            backgroundColor: "#FFE826",
          },
          ".sentiment-highlight": {
            backgroundColor: "#00FEFE",
          },
        }}
      >
        {tutorialTooltip === "article" && (
          <TutorialTooltip>
            <b>Step 1 - Read and Rate:</b> During step 1 (<b>Read</b>) you are
            asked to read the news item carefully. You see here how the news
            items are presented to you, with the title and the domain (here{" "}
            {datasetItem.category}) where it is written in. Please click next.
          </TutorialTooltip>
        )}
        <div
          css={{
            fontSize: "14px",
            marginBottom: "12px",
            fontWeight: 700,
            color: "#0055F6",
          }}
        >
          {datasetItem.category}
        </div>
        <h1>{datasetItem.title}</h1>
        <h2>{datasetItem.subtitle}</h2>
        <div></div>
        <p
          dangerouslySetInnerHTML={{
            __html:
              xaiFeatures === "salient"
                ? xaiHighlight(datasetItem.xaiFeatures.highlightedContent || "")
                : datasetItem.content,
          }}
          css={{
            textAlign: "justify",
          }}
        ></p>
      </article>
      <aside
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {xaiFeatures !== "none" && (
          <section
            className="container"
            css={{
              height: "100%",
              border: "1px solid #E5E5E5",
              background: "transparent",
            }}
          >
            <h1>AI-System Answer</h1>
            <div className="line"></div>
            <div
              css={{
                display: "flex",
                gap: "8px",
                position: "relative",
              }}
            >
              {tutorialTooltip === "ai-rating" && (
                <TutorialTooltip>
                  <b>Step 2 - Inform:</b> During step 2 you see the truthfulness
                  rating of the <b>AI-System</b> running in the background.
                  Furthermore, you see the publishing date and the source of the
                  source of the news item displayed below. Please check the{" "}
                  <b>AI-generated</b> rating and the additional information
                  carefully and click next.
                </TutorialTooltip>
              )}
              {datasetItem.ratingType === 'boolean' ? (
                <TruthfulnessBoolean initialScore={datasetItem.xaiFeatures?.truthfulness as boolean} />
              ) : datasetItem.ratingType === 'multiple-choice' ? (
                <TruthfulnessMultipleChoice 
                  initialScore={datasetItem.xaiFeatures?.truthfulness as string} 
                  options={datasetItem.options || []} 
                />
              ) : (
                <TruthfulnessSlider initialScore={datasetItem.xaiFeatures?.truthfulness as number} />
              )}
            </div>
            <div className="line"></div>
            {xaiFeatures === "salient" && (
              <>
                <div className="line"></div>
                <div
                  css={{
                    position: "relative",
                  }}
                >
                  {tutorialTooltip === "text-highlights" && (
                    <TutorialTooltip>
                      <b>Step 2 - Inform Text Highlights:</b> The{" "}
                      <b>
                        explainability feature 2 - the text highlighted in
                        yellow,
                      </b>{" "}
                      are the statements that support the truthfulness rating of
                      the <b>AI-System</b>. The <b>AI-System</b> in the
                      background automatically marks the sentences where the
                      rating is based on. Please click next.
                    </TutorialTooltip>
                  )}
                  <h2>
                    Text passages, where the
                    AI-System&apos;s truthfulness rating is based on
                  </h2>
                  <div>
                    {getHighlightedSentences(
                      datasetItem.xaiFeatures.highlightedContent || ""
                    ).map((sentence, index) => (
                      <blockquote
                        key={index}
                        css={{
                          borderLeft: "6px solid #FFE826",
                          padding: "8px",
                          margin: "8px 0",
                          backgroundColor: "#FFE8261A",
                        }}
                      >
                        {sentence}
                      </blockquote>
                    ))}
                  </div>
                </div>
              </>
            )}
            {xaiFeatures === "explanations" && (
              <>
                <div className="line"></div>
                <div
                  css={{
                    position: "relative",
                  }}
                >
                  {tutorialTooltip === "natural-language-explanation" && (
                    <TutorialTooltip>
                      <b>Step 2 - Inform Natural Language Explanation:</b> The{" "}
                      <b>explainability feature, text highlighted in pink</b>{" "}
                      contains an explanation about the truthfulness of the news
                      item. The <b>AI-System</b> in the background automatically
                      generates this <b>natural language explanation</b>, which
                      reflects the <b>AI-generated</b> truthfulness rating.
                      Please read the explanation carefully and click next.
                    </TutorialTooltip>
                  )}
                  <h2>Explainability Feature: Natural language explanation</h2>
                  <blockquote
                    css={{
                      borderLeft: "6px solid #FF6FFF",
                      padding: "8px",
                      margin: "8px 0",
                      backgroundColor: "#FF6FFF1A",
                    }}
                  >
                    {datasetItem.xaiFeatures.naturalLanguageExplanation}
                  </blockquote>
                </div>
              </>
            )}
            {(xaiFeatures === 'counterfactual') && (
              <div className="line"></div>
            )}

            {(xaiFeatures === 'counterfactual') && (
              <div style={{ position: 'relative' }}>
                {tutorialTooltip === 'counterfactual-explanation' && (
                  <TutorialTooltip>
                    <b>Step 2 - Inform (Counterfactual Explanation)</b><br/><br/>
                    This <b>explainability feature</b> shows what would need to change in the text for the <b>AI-System</b> to alter its truthfulness rating. Please read the counterfactual explanation carefully and click next.
                  </TutorialTooltip>
                )}
                <h2>Explainability Feature: Counterfactual Explanation</h2>
                <blockquote style={{ 
                  borderLeft: '6px solid #FF9F1C', // Using orange for distinction
                  padding: '8px', 
                  margin: '8px 0', 
                  backgroundColor: '#FF9F1C1A' 
                }}>
                  {datasetItem.xaiFeatures?.counterfactualExplanation}
                </blockquote>
              </div>
            )}
          </section>
        )}
      </aside>
      {isInput && (
        <div
          className="container"
          css={{
            border: !showError ? "1px solid #19B394" : "1px solid #E60A3E",
            flex: 1,
            minWidth: "58%",
            position: "relative",
          }}
        >
          {tutorialTooltip === "your-rating" && (
            <TutorialTooltip>
              <b>Step 1 - Read and Rate:</b> During step 1 (<b>Rate</b>) you are
              asked to perform your own truthfulness rating based on the news
              article. To perform your rating you can change the slider below
              between 0 and 100% of truthfulness. Please perform your rating and
              click next.
            </TutorialTooltip>
          )}
          {tutorialTooltip === "redo-your-rating" && (
            <TutorialTooltip>
              <b>Step 3 - Repeat Rating:</b> You are asked to redo your
              truthfulness rating again, by taking the{" "}
              <b>additional information</b> on the right side into account.
              Please notice, <b>there is no right and wrong</b>, feel free to
              change your original rating in accordance to the new insights you
              gained from the additional provided information. Please click
              next.
            </TutorialTooltip>
          )}
          <h1>Your answer</h1>
          <div className="line"></div>
          
          <div css={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            
            {/* 1. Truthfulness Rating Block */}
            <div css={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
                  options={datasetItem.options || []}
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

            {/* 2. Confidence Rating Block */}
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
    </section>
  );
};

export default DatasetItemComponent;
