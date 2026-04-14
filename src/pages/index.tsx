import Head from "next/head";
import "survey-core/defaultV2.min.css";
import { useState } from "react";
import { useRouter } from "next/router";

// ─── Config ────────────────────────────────────────────────────────────────

const TASKS = [
  { id: "boolq",      name: "BoolQ"      },
  { id: "zebralogic", name: "ZebraLogic" },
  { id: "fever",      name: "Fever"      },
];

const FEATURES = [
  { id: "basic",           name: "Basic"             },
  { id: "salient",         name: "Salient"           },
  { id: "explanations",    name: "Natural Language"  },
  { id: "counterfactual",  name: "Counterfactual"    },
];

const EXPERIMENT_TYPES = [
  {
    id: "TwoStep",
    name: "Two-Step",
    description: "Answer → view AI → re-answer",
  },
  {
    id: "OneStep",
    name: "One-Step",
    description: "Answer with AI already visible",
  },
];

const PARTS = [
  { id: "merged",        name: "Full (Merged)"  },
  { id: "qualification", name: "Qualification"  },
  { id: "main",          name: "Main"           },
];

// ─── Styles ────────────────────────────────────────────────────────────────

const S = {
  page: {
    fontFamily: "Inter, sans-serif",
    color: "#1D1D1F",
    minHeight: "100vh",
    backgroundColor: "#F4F5F7",
    padding: "48px 24px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  wrap: {
    maxWidth: "720px",
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    gap: "32px",
  },
  header: {
    textAlign: "center" as const,
  },
  h1: {
    fontSize: "30px",
    fontWeight: 700,
    margin: "0 0 10px 0",
    color: "#111",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    margin: 0,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "14px",
    padding: "28px 32px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid #EAEAEA",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  row: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  label: {
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    color: "#888",
  },
  pillGroup: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
  },
  divider: {
    borderTop: "1px solid #EAEAEA",
    margin: "0",
  },
  urlBox: {
    backgroundColor: "#F4F5F7",
    borderRadius: "8px",
    padding: "14px 16px",
    fontFamily: "monospace",
    fontSize: "13px",
    color: "#333",
    wordBreak: "break-all" as const,
    border: "1px solid #E0E0E0",
    display: "flex",
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    gap: "12px",
  },
  urlText: {
    flex: 1,
  },
  copyBtn: {
    flexShrink: 0,
    padding: "6px 12px",
    fontSize: "12px",
    fontWeight: 500,
    backgroundColor: "transparent",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#555",
    transition: "all 0.15s",
  },
  launchBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#19B394",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.15s",
  },
  experimentOnlyRow: {
    display: "flex",
    alignItems: "center" as const,
    gap: "10px",
    cursor: "pointer",
  },
  toggle: (active: boolean) => ({
    width: "38px",
    height: "22px",
    borderRadius: "11px",
    backgroundColor: active ? "#19B394" : "#ccc",
    position: "relative" as const,
    transition: "background 0.2s",
    flexShrink: 0,
    cursor: "pointer",
    border: "none",
  }),
  toggleThumb: (active: boolean) => ({
    position: "absolute" as const,
    top: "3px",
    left: active ? "19px" : "3px",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "white",
    transition: "left 0.2s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  }),
};

// Pill button — active vs inactive
const Pill = ({
  label,
  active,
  onClick,
  description,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  description?: string;
}) => (
  <button
    onClick={onClick}
    title={description}
    css={{
      padding: "7px 16px",
      borderRadius: "20px",
      border: active ? "2px solid #19B394" : "2px solid #E0E0E0",
      backgroundColor: active ? "#E8F7F4" : "#fff",
      color: active ? "#19B394" : "#555",
      fontSize: "13px",
      fontWeight: active ? 600 : 400,
      cursor: "pointer",
      transition: "all 0.15s",
      outline: "none",
      "&:hover": {
        borderColor: "#19B394",
        color: "#19B394",
      },
    }}
  >
    {label}
  </button>
);

// ─── Component ─────────────────────────────────────────────────────────────

const Home = () => {
  const router = useRouter();

  const [task, setTask]         = useState("boolq");
  const [feature, setFeature]   = useState("salient");
  // const [group, setGroup]       = useState("group-1");
  const [expType, setExpType]   = useState("TwoStep");
  const [part, setPart]         = useState("merged");
  const [expOnly, setExpOnly]   = useState(false);
  const [attOnly, setAttOnly]   = useState(false);
  const [evalOnly, setEvalOnly]   = useState(false);
  const [copied, setCopied]     = useState(false);

  let path = `/${task}/${feature}/${expType}/${part}`;
  
  const queryParams = new URLSearchParams();
  if (expOnly) queryParams.append("experimentOnly", "true");
  if (attOnly) queryParams.append("attn", "false");
  if (evalOnly) queryParams.append("eval", "false");

  const queryString = queryParams.toString();
  if (queryString) {
    path += `?${queryString}`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + path);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleLaunch = () => {
    router.push(path);
  };

  return (
    <>
      <Head>
        <title>XAI Experiment Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={S.page}>
        <div css={S.wrap}>

          {/* Header */}
          <header css={S.header}>
            <h1 css={S.h1}>XAI Experiment Portal</h1>
            <p css={S.subtitle}>
              Configure an experiment URL and launch it directly.
            </p>
          </header>

          {/* Configurator card */}
          <div css={S.card}>

            {/* Task */}
            <div css={S.row}>
              <span css={S.label}>Task</span>
              <div css={S.pillGroup}>
                {TASKS.map((t) => (
                  <Pill key={t.id} label={t.name} active={task === t.id} onClick={() => setTask(t.id)} />
                ))}
              </div>
            </div>

            <hr css={S.divider} />

            {/* Features */}
            <div css={S.row}>
              <span css={S.label}>Explanation Features</span>
              <div css={S.pillGroup}>
                {FEATURES.map((f) => (
                  <Pill key={f.id} label={f.name} active={feature === f.id} onClick={() => setFeature(f.id)} />
                ))}
              </div>
            </div>

            <hr css={S.divider} />

            {/* Experiment Type */}
            <div css={S.row}>
              <span css={S.label}>Experiment Type</span>
              <div css={S.pillGroup}>
                {EXPERIMENT_TYPES.map((e) => (
                  <Pill
                    key={e.id}
                    label={e.name}
                    active={expType === e.id}
                    onClick={() => setExpType(e.id)}
                    description={e.description}
                  />
                ))}
              </div>
              <span css={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>
                {EXPERIMENT_TYPES.find((e) => e.id === expType)?.description}
              </span>
            </div>

            <hr css={S.divider} />

            {/* Part */}
            <div css={S.row}>
              <span css={S.label}>Survey Part</span>
              <div css={S.pillGroup}>
                {PARTS.map((p) => (
                  <Pill key={p.id} label={p.name} active={part === p.id} onClick={() => setPart(p.id)} />
                ))}
              </div>
            </div>

            <hr css={S.divider} />

            {/* Experiment-only toggle */}
            <label css={S.experimentOnlyRow}>
              <button
                css={S.toggle(expOnly)}
                onClick={() => setExpOnly((v) => !v)}
                aria-label="Toggle experiment-only mode"
                type="button"
              >
                <span css={S.toggleThumb(expOnly)} />
              </button>
              <span css={{ fontSize: "14px", color: "#444", fontWeight: 500 }}>
                Development mode
              </span>
              <span css={{ fontSize: "13px", color: "#999" }}>
                — skips intro pages (<code>?experimentOnly=true</code>)
              </span>
            </label>
            <label css={S.experimentOnlyRow}>
              <button
                css={S.toggle(attOnly)}
                onClick={() => setAttOnly((v) => !v)}
                aria-label="Toggle attention check"
                type="button"
              >
                <span css={S.toggleThumb(attOnly)} />
              </button>
              <span css={{ fontSize: "14px", color: "#444", fontWeight: 500 }}>
                Attention Check
              </span>
              <span css={{ fontSize: "13px", color: "#999" }}>
                — skips attention page (<code>?attn=false</code>)
              </span>
            </label>
            <label css={S.experimentOnlyRow}>
              <button
                css={S.toggle(evalOnly)}
                onClick={() => setEvalOnly((v) => !v)}
                aria-label="Toggle Question Evaluation"
                type="button"
              >
                <span css={S.toggleThumb(evalOnly)} />
              </button>
              <span css={{ fontSize: "14px", color: "#444", fontWeight: 500 }}>
                Evaluation
              </span>
              <span css={{ fontSize: "13px", color: "#999" }}>
                — skips eval page (<code>?eval=false</code>)
              </span>
            </label>

            <hr css={S.divider} />

            {/* Generated URL */}
            <div css={S.row}>
              <span css={S.label}>Generated URL</span>
              <div css={S.urlBox}>
                <span css={S.urlText}>{path}</span>
                <button css={S.copyBtn} onClick={handleCopy}>
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Launch */}
            <button
              css={S.launchBtn}
              onClick={handleLaunch}
            >
              Launch Experiment →
            </button>

          </div>
        </div>
      </main>
    </>
  );
};

export default Home;