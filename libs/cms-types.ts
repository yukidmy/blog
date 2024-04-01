type Reference<T, R> = T extends "get" ? R : string | null;
interface GetsType<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
type DateType = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
type Structure<T, P> = T extends "get"
  ? { id: string } & DateType & Required<P>
  : T extends "gets"
    ? GetsType<{ id: string } & DateType & Required<P>>
    : Partial<DateType> & (T extends "patch" ? Partial<P> : P);

export type tag<T = "get"> = Structure<
  T,
  {
    /**
     * Name
     */
    name: string;
    /**
     * Count
     */
    count?: number;
  }
>;

export type article<T = "get"> = Structure<
  T,
  {
    /**
     * Title
     */
    title: string;
    /**
     * Content
     */
    content: string;
    /**
     * Eyecatch
     */
    eyecatch: { url: string; width: number; height: number };
    /**
     * Tags
     */
    tags: Reference<T, tag>[];
    /**
     * summary
     */
    summary?: string;
  }
>;

export interface EndPoints {
  get: {
    tag: tag<"get">;
    article: article<"get">;
  };
  gets: {
    tag: tag<"gets">;
    article: article<"gets">;
  };
  post: {
    tag: tag<"post">;
    article: article<"post">;
  };
  put: {
    tag: tag<"put">;
    article: article<"put">;
  };
  patch: {
    tag: tag<"patch">;
    article: article<"patch">;
  };
}
