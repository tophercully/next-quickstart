import { Article } from "@/types/feed";
import ArticleNavigator from "./ArticleNavigator";

const ArticleInfo = ({ article }: { article: Article }) => {
  return (
    <div className="sticky top-0 flex flex-col gap-8 rounded lg:max-w-[40ch]">
      <div
        id="info"
        className="flex flex-col gap-1"
      >
        <p className="text-sm text-gray-500">
          {new Date(article.pubDate).toDateString()}
        </p>
        <a
          href={article.guid}
          target="_blank"
          className="text-4xl font-bold"
        >
          {article.title}
        </a>
      </div>
      <ArticleNavigator content={article.content} />
    </div>
  );
};

export default ArticleInfo;
