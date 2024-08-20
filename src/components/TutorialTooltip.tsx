const TutorialTooltip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="tooltip"
      css={{
        position: "absolute",
        left: "-12px",
        top: "-16px",
        transform: "translateY(-100%)",
        width: "100%",
        minWidth: "350px",
        maxWidth: "400px",
        padding: "24px",
        backgroundColor: "#19B394",
        color: "#fff",
        borderRadius: "8px",
        fontSize: "14px",
        lineHeight: 1.4,
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
        border: "1px solid #19B394",
        zIndex: 1,

        "::before": {
          content: '""',
          position: "absolute",
          left: "12px",
          top: "100%",
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderTop: "10px solid #19B394",
        },

        animation: "fadeIn 0.2s ease-in-out forwards",

        "@keyframes fadeIn": {
          "0%": {
            opacity: 0,
            transform: "translateY(-90%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(-100%)",
          },
        },
      }}
    >
      {children}
    </div>
  );
};

export default TutorialTooltip;
