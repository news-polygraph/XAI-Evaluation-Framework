import { css, Global } from "@emotion/react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
