import { createTheme, debounce, Slider, ThemeProvider } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const ThuthfulnessSlider = ({
  initialScore,
  interactive = false,
  onChange,
}: {
  initialScore?: number;
  interactive?: boolean;
  onChange?: (score: number) => void;
}) => {
  const [score, setScore] = useState<number>(initialScore || 50);
  const [isInitialState, setIsInitialState] = useState(!initialScore);

  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderLeft, setSliderLeft] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  // set the slider width and left position on mount
  useEffect(() => {
    const slider = sliderRef.current?.querySelector(".MuiSlider-rail");
    setSliderWidth(slider!.clientWidth);
    setSliderLeft(slider!.getBoundingClientRect().left);
  }, []);

  // set the slider width and left position on resize
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

  const handleChange = (newScore: number) => {
    const transformedScore = newScore > 50 ? 1 : 0;
    setScore(newScore);
    onChange && onChange(transformedScore);
  };

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
          <label>Fake</label>
        </div>
        <div className="part 2">
          <label>Rather Fake</label>
        </div>
        <div className="part 3">
          <label>Neutral</label>
        </div>
        <div className="part 4">
          <label>Rather True</label>
        </div>
        <div className="part 5">
          <label>True</label>
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
                // hide the thumb if score is not set and the slide is not hovered
                "& .MuiSlider-thumb": {
                  display: isInitialState ? "none" : "flex",
                },

                "&:hover .MuiSlider-thumb": {
                  display: "flex",
                },
              }}
              disabled={!interactive}
              onMouseMove={(e) => {
                if (!interactive || !isInitialState) return;

                // use debounce to prevent lag
                debounce(() => {
                  const mousePosition = e.clientX - sliderLeft;
                  const score = Math.round((mousePosition / sliderWidth) * 100);
                  handleChange(score);
                }, 5)();
              }}
              onMouseLeave={() => {
                if (!interactive) return;

                setIsInitialState(false);
                handleChange(score);
              }}
              onMouseUp={() => {
                if (!interactive) return;

                setIsInitialState(false);
                handleChange(score);
              }}
              onChange={(e, value) => {
                if (!interactive) return;
                handleChange(value as number);
              }}
            />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default ThuthfulnessSlider;
