import { Tracking } from "../components/analytics";
import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Zen_Kaku_Gothic_New, Train_One } from "next/font/google";
import type { AppProps } from "next/app";
import { FC } from "react";

config.autoAddCss = false;

const zaenkakugothicnew = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});
const trainone = Train_One({
  weight: ["400"],
  subsets: ["latin"],
});

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Tracking />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
