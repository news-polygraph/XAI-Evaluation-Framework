/**
 * A truthfulness slider component that the user can interact with to rate the truthfulness of a news item.
 */

import { createTheme, debounce, Slider, ThemeProvider } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const ThuthfulnessSlider = ({
  initialScore, // The initial score of the slider (default is 50))
  interactive = false,
  onChange, // A callback function that is called whenever the score changes.
}: {
  initialScore?: number;
  interactive?: boolean;
  onChange?: (score: number) => void;
}) => {
  const [score, setScore] = useState<number>(initialScore || 50); // The current score of the slider, updated whenever the user changes the score.
  const [isInitialState, setIsInitialState] = useState(!initialScore); // Determines whether to show the thumb or not.
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderLeft, setSliderLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current?.querySelector(".MuiSlider-rail");
    setSliderWidth(slider!.clientWidth);
    setSliderLeft(slider!.getBoundingClientRect().left);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const slider = sliderRef.current?.querySelector(".MuiSlider-rail");
      setSliderWidth(slider!.clientWidth);
      setSliderLeft(slider!.getBoundingClientRect().left);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        css={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          gap: "1px",
          position: "relative",
          ".part": {
            width: "100%",
            height: "14px",
            position: "relative",

            "&:nth-of-type(1)": {
              borderRadius: "6px 0 0 6px",
              background: "#595959",
            },

            "&:nth-of-type(2)": {
              background: "#7F7F7F",
            },

            "&:nth-of-type(3)": {
              background: "#A5A5A5",
            },

            "&:nth-of-type(4)": {
              background: "#BFBFBF",
            },

            "&:nth-of-type(5)": {
              borderRadius: "0 6px 6px 0",
              background: "#D8D8D8",
            },

            "> label": {
              fontSize: "10px",
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              // don't break line
              whiteSpace: "nowrap",
            },
          },
        }}
      >
        <div className="part 1">
          <label>Falsch</label>
        </div>
        <div className="part 2">
          <label>Eher falsch</label>
        </div>
        <div className="part 3">
          <label>Neutral</label>
        </div>
        <div className="part 4">
          <label>Eher wahr</label>
        </div>
        <div className="part 5">
          <label>Wahr</label>
        </div>
        <div
          css={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ThemeProvider
            theme={createTheme({
              palette: {
                primary: {
                  main: "#19B394",
                },
              },
            })}
          >
            <Slider
              ref={sliderRef}
              value={score}
              valueLabelDisplay="on"
              color="primary"
              valueLabelFormat={(value) => {
                return `${value}%`;
              }}
              css={{
                padding: "36px 0",
                "& .MuiSlider-rail": {
                  color: "transparent",
                },
                "& .MuiSlider-track": {
                  color: "transparent",
                },
                "& .MuiSlider-valueLabel": {
                  top: "-8px",
                  backgroundColor: interactive ? "#19B394" : "#757575",
                },
                "& .MuiSlider-thumb": {
                  display: isInitialState ? "none" : "flex",
                },

                "&:hover .MuiSlider-thumb": {
                  display: "flex",
                },
              }}
              // If the slider is not interactive, don't allow the user to change the score.
              disabled={!interactive}
              // When the user hovers over the slider, set the isInitialState state to false.
              onMouseMove={(e) => {
                if (!interactive || !isInitialState) return;

                // use debounce to prevent lag
                debounce(() => {
                  const mousePosition = e.clientX - sliderLeft;
                  const score = Math.round((mousePosition / sliderWidth) * 100);
                  setScore(score);
                }, 5)();
              }}
              // When the user leaves the slider, call the onChange callback with the current score.
              onMouseLeave={() => {
                if (!interactive) return;

                setIsInitialState(false);
                onChange && onChange(score);
              }}
              // When the user clicks on the slider, call the onChange callback with the current score.
              onMouseUp={() => {
                if (!interactive) return;

                setIsInitialState(false);
                onChange && onChange(score);
              }}
              // When the user changes the score, call the onChange callback with the new score.
              onChange={(e, value) => {
                if (!interactive) return;
                setScore(value as number);
              }}
            />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default ThuthfulnessSlider;



