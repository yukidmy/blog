import { Tracking } from "../components/analytics";
import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Zen_Kaku_Gothic_New } from "next/font/google";

config.autoAddCss = false;

const zenkakugothicnew = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={zenkakugothicnew.className}>
      <Tracking />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
