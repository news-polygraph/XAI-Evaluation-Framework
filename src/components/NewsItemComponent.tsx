import NewsItem from "@/model/news-item";
import { TutorialTooltipStep } from "@/model/tutorial-tooltip-step";
import { XAIFeatureLevel } from "@/model/xai-feature-level";
import { useState, useEffect } from "react";
import ThuthfulnessSlider from "./TruthfulnessSlider";
import TutorialTooltip from "./TutorialTooltip";
import images from "./Visualizations.module.css";

const NewsItemComponent = ({
  newsItem,
  xaiFeatures,
  isInput = false,
  onRatingChange = () => {},
  isTutorialMode = false,
  tutorialTooltip = null,
  defaultRatingValue = undefined,
  showError = false,
  randomizedImages,
  //correctAnswer
}: {
  newsItem: NewsItem;
  xaiFeatures: XAIFeatureLevel;
  isInput: boolean;
  onRatingChange: (value: number) => void;
  isTutorialMode: boolean;
  tutorialTooltip: TutorialTooltipStep | null;
  defaultRatingValue: number | undefined;
  showError: boolean;
  randomizedImages?: any;
  //correctAnswer: string
}) => {
  const [ratingValue, setRatingValue] = useState<number | undefined>(
    defaultRatingValue
  );
  //console.log(randomizedImages)

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
          minWidth: "500px",

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
          }
        }}
      >
        {tutorialTooltip === "article" && (
          <TutorialTooltip>
            <b>Step 1 - Read:</b> During step 1 (<b>Read</b>) you are
            asked to read the news item carefully. You see here how the news
            item is presented, with the title and the domain (here {" "}
            {newsItem.category}). Please click next.
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
          {newsItem.category}
        </div>
        <h1>{newsItem.title}</h1>
        <div></div>
      </article>
      <aside
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {xaiFeatures === "visualizations" && (
          <section
            className="container"
            css={{
              height: "100%",
              border: "1px solid #E5E5E5",
              background: "transparent",
            }}
          >
            <h1>Political Viewpoint of News Item</h1>
            <div className="line"></div>
            <div
              css={{
                display: "flex",
                gap: "4px",
                position: "relative",
              }}
            >
              {tutorialTooltip === "visualizations" && (
                <TutorialTooltip>
                  <b>Step 3 - Inform:</b> During step 3, you see three different 
                  visualizations representing the political viewpoint of the news item.
                  Please read the{" "} <b>Political Viewpoint</b> visualizations 
                  carefully and click next.
                </TutorialTooltip>
              )}
            </div>
            <div className={randomizedImages?.leaning}></div>
            <div className={randomizedImages?.ideology}></div>
            <div className={randomizedImages?.parties}></div>
            <div className="line"></div>
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
              <b>Step 2 - Rate:</b> During step 2 (<b>Rate</b>) you are
              asked to perform your own truthfulness rating based on the news
              item. To perform your rating you can change the slider below
              between 0 and 100% of truthfulness. Please perform your rating and
              click next.
            </TutorialTooltip>
          )}
          {tutorialTooltip === "redo-your-rating" && (
            <TutorialTooltip>
              <b>Step 4 - Repeat Rating:</b> You are asked to redo your
              truthfulness rating again, by taking the{" "}
              <b>additional information</b> on the right side into account.
              Please notice, <b>there is no right and wrong</b>, feel free to
              change your original rating in accordance to the new insights you
              gained from the additional provided information. Please click
              next.
            </TutorialTooltip>
          )}
          <h1>Your rating</h1>
          <div className="line"></div>
          <div
            css={{
              display: "flex",
              gap: "8px",
            }}
          >
            <h2>Truthfulness</h2>
            <ThuthfulnessSlider
              initialScore={ratingValue}
              interactive
              onChange={(transformedScore) => {
                setRatingValue(transformedScore);
                onRatingChange(transformedScore);
                newsItem.value = transformedScore;
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsItemComponent;
