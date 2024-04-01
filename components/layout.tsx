import { Footer } from "./footer";
import { MyHead } from "./head";
import { Navbar } from "./navbar";
import type { NextPage } from "next";
import { ReactNode } from "react";

export const Layout: NextPage<{
  subTitle: string;
  description?: string;
  image?: string;
  children: ReactNode;
}> = ({ subTitle, description, image, children }) => {
  return (
    <>
      <MyHead subTitle={subTitle} description={description} image={image} />
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto">
          <section className="m-5">{children}</section>
        </main>
        <Footer />
      </div>
    </>
  );
};
