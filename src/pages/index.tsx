import Head from "next/head";
import "survey-core/defaultV2.min.css";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Head>
        <title>XAI Experiment</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        css={{
          fontFamily: "Inter, sans-serif",
          color: "#1D1D1F",
          fontSize: "16px",
          lineHeight: "1.5",
          padding: "32px",
        }}
      >
        <h1>XAI Experiment</h1>
        <h2
          css={{
            fontSize: "22px",
            fontWeight: 600,
          }}
        >
          Full versions
        </h2>
        <ul
          css={{
            marginLeft: "16px",
          }}
        >
          <li>
            Basic:{" "}
            <Link href="/basic/group-2/qualification">Qualification</Link> -{" "}
            <Link href="/basic/group-2/main">Main</Link>
          </li>
          <li>
            Salient features:{" "}
            <Link href="/salient/group-2/qualification">Qualification</Link> -{" "}
            <Link href="/salient/group-2/main">Main</Link>
          </li>
          <li>
            Natural language explanation:{" "}
            <Link href="/explanations/group-2/qualification">
              Qualification
            </Link>{" "}
            - <Link href="/explanations/group-2/main">Main</Link>
          </li>
          <li>
            Random:{" "}
            <Link href="/random">
              (group: 1/2, feature: salient/explanations)
            </Link>
          </li>
          <li>
            Visualizations:{" "}
            <Link href="/visualizations/group-2/qualification">Qualification</Link> -{" "}
            <Link href="/visualizations/group-2/main">Main</Link>
          </li>
        </ul>
        <h2
          css={{
            fontSize: "22px",
            fontWeight: 600,
            marginTop: "32px",
          }}
        >
          Experimental part only
        </h2>
        <ul
          css={{
            marginLeft: "16px",
          }}
        >
          <li>
            Basic:{" "}
            <Link href="/basic/group-2/qualification?experimentOnly=true">
              Qualification
            </Link>{" "}
            - <Link href="/basic/group-2/main?experimentOnly=true">Main</Link>
          </li>
          <li>
            Salient features:{" "}
            <Link href="/salient/group-2/qualification?experimentOnly=true">
              Qualification
            </Link>{" "}
            - <Link href="/salient/group-2/main?experimentOnly=true">Main</Link>
          </li>
          <li>
            Natural language explanation:{" "}
            <Link href="/explanations/group-2/qualification?experimentOnly=true">
              Qualification
            </Link>{" "}
            -{" "}
            <Link href="/explanations/group-2/main?experimentOnly=true">
              Main
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Home;
