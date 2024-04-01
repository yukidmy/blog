import { Layout } from "../components/layout";
import { Header } from "../components/sub-title-header";
import type { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <Layout subTitle="404">
      <Header
        subTitle="404"
        path={[
          { href: "/", subTitle: "Home" },
          {
            href: "/404",
            subTitle: "404",
          },
        ]}
      />
      <div className="w-full my-10 aspect-video text-center">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/r7gJrvvCyWo"
          title="YouTube video player - Sexy Zone「NOT FOUND」（YoutubeVer）"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Layout>
  );
};

export default Custom404;
