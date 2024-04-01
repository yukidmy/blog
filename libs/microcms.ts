import { article, tag } from "../libs/cms-types";
import { load } from "cheerio";
import hljs from "highlight.js";
import { JSDOM } from "jsdom";
import { createClient } from "microcms-js-sdk";


const QUERY_ALL_LIMIT = 100000;
const SUMMARY_LIMIT = 1000;

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE as string,
  apiKey: process.env.MICROCMS_API_KEY as string,
});

const getSummary = (contentHtml: string): string => {
  const jsdom = new JSDOM(contentHtml);
  const text = jsdom.window.document.body.textContent;
  return text?.slice(0, SUMMARY_LIMIT) ?? "";
};

const preprocessContent = (contentHtml: string): string => {
  const $ = load(contentHtml);
  $("pre code").each((_, elem) => {
    const result = hljs.highlightAuto($(elem).text());
    $(elem).html(result.value);
  });
  $("code").each((_, elem) => {
    $(elem).addClass("hljs");
  });
  return $.html();
};

export const readArticle = async (id: string): Promise<article> => {
  const data = await client.get<article<"get">>({
    endpoint: "article",
    contentId: id,
  });
  data.summary = getSummary(data.content);
  data.content = preprocessContent(data.content);
  return data;
};

export const listArticles = async (
  offset: number = 0,
  limit: number = QUERY_ALL_LIMIT
): Promise<Array<article>> => {
  const data = await client.get<article<"gets">>({
    endpoint: "article",
    queries: { offset: offset, limit: limit, orders: "-publishedAt" },
  });
  for (const d of data.contents) {
    d.summary = getSummary(d.content);
    d.content = preprocessContent(d.content);
  }
  return data.contents as unknown as Array<article>;
};

export const readTag = async (id: string): Promise<tag> => {
  const data = await client.get<tag<"get">>({
    endpoint: "tag",
    contentId: id,
  });
  return data;
};

export const listTags = async (): Promise<Array<tag>> => {
  const articleData = await client.get<article<"gets">>({
    endpoint: "article",
    queries: { limit: QUERY_ALL_LIMIT, fields: "id,tags.id" },
  });
  const tagCount: Record<string, { articleIds: Array<string>; name: string }> =
    {};
  for (const d of articleData.contents) {
    const tags = d.tags as unknown as Array<tag>;
    for (const tag of tags) {
      if (!(tag.id in tagCount)) {
        tagCount[tag.id] = { articleIds: [], name: tag.name };
      }
      tagCount[tag.id].articleIds.push(d.id);
    }
  }
  const tagData = await client.get<tag<"gets">>({
    endpoint: "tag",
    queries: { limit: QUERY_ALL_LIMIT },
  });
  for (const d of tagData.contents) {
    d.count = tagCount[d.id]?.articleIds.length ?? 0;
  }
  return tagData.contents.sort((t1, t2) => {
    return t2.count - t1.count === 0
      ? t1.name.localeCompare(t2.name)
      : t2.count - t1.count;
  });
};

export const listArticlesByTag = async (
  tagId: string
): Promise<Array<article>> => {
  const data = await client.get<article<"gets">>({
    endpoint: "article",
    queries: { filters: `tags[contains]${tagId}` },
  });
  for (const d of data.contents) {
    d.summary = getSummary(d.content);
  }
  return data.contents as unknown as Array<article>;
};
