import { Layout } from "../components/layout";
import { Header } from "../components/sub-title-header";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const About: NextPage = () => {
  return (
    <Layout subTitle="About">
      <Header
        subTitle="About"
        path={[
          { href: "/", subTitle: "Home" },
          {
            href: "/about",
            subTitle: "About",
          },
        ]}
      />
      <div className="w-full max-w-4xl my-5 flex flex-wrap justify-center items-center">
        <div className="relative m-2 aspect-square w-44 lg:w-56">
          <Image
            src="https://www.yukidmy.com/profile.jpg"
            fill
            style={{ objectFit: "contain" }}
            alt="icon"
            className="rounded-full border border-slate-50"
            sizes="(max-width: 1024px) 18vw,
                    22vw"
          />
        </div>
        <div className="mx-2">
          <article className="my-3 space-y-2">
            <p>
              <Link href="https://www.yukidmy.com/">Yuki Y</Link>{" "}
              の個人ブログです。
              <br />
              発信内容は全て個人の意見であり、所属企業を代表するものではありません。
            </p>
            <p>
              This is a personal blog of{" "}
              <Link href="https://www.yukidmy.com/">Yuki Y</Link>.<br />
              The opinions stated here are my own, not those of my employers.
            </p>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default About;
