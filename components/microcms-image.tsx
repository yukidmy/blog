import tailwindConfig from "../tailwind.config";
import type { NextPage } from "next";
import Image from "next/image";
import resolveConfig from "tailwindcss/resolveConfig";

// TODO: Use cache() API when it is released.
// https://beta.nextjs.org/docs/data-fetching/caching#per-request-caching
// https://github.com/facebook/react/pull/25502

export const MicroCmsImage: NextPage<{
  src: string;
  alt: string;
  loading: "eager" | "lazy";
}> = ({ src, alt, loading }) => {
  const config = resolveConfig(tailwindConfig);
  const breakpoints = ["xs", "sm", "md", "lg", "xl", "2xl"];
  const sizes = breakpoints.map(
    (breakpoint) =>
      +config.theme.screens[
        breakpoint as keyof typeof config.theme.screens
      ].slice(0, -2),
  );

  return (
    <picture>
      <>
        {sizes.map((size, index) => {
          const createSrcSetString = (src: string, factor: number): string => {
            const url = new URL(src);
            url.searchParams.set("w", size.toString());
            url.searchParams.set("fm", "webp");
            url.searchParams.set("dpr", factor.toString());
            url.searchParams.set("q", "70");
            return `${url.toString()} ${factor}x`;
          };

          const srcSet = [
            createSrcSetString(src, 1),
            createSrcSetString(src, 1.5),
            createSrcSetString(src, 2),
          ].join(", ");

          return (
            <source
              key={index}
              srcSet={srcSet}
              media={`(max-width: ${size}px)`}
              type="image/webp"
            />
          );
        })}
        <source srcSet={`${src}?w=1920&fm=webp`} type="image/webp" />
        <Image
          src={src}
          alt={alt}
          loading={loading}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-xl border border-slate-100"
        />
      </>
    </picture>
  );
};
