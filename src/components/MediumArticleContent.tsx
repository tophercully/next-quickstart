import { Article } from "@/types/feed";
import ArticleFooter from "./ArticleFooter";
import ArticleInfo from "./ArticleInfo";
import CustomStyledContent from "./CustomStyledContent";
import SidebarMediumPosts from "./SidebarMediumPosts";

const MediumArticleContent = ({
  article,
}: {
  username: string;
  article: Article;
}) => {
  if (!article)
    return (
      <div className="flex h-full w-full items-center justify-center">
        Article not found
      </div>
    );

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col justify-between gap-4 p-2 md:p-4 lg:flex-row">
        <ArticleInfo article={article} />
        <div className="flex flex-col gap-8">
          <CustomStyledContent content={article.content} />
          <ArticleFooter />
          <h3 className="text-xl font-medium">More to read:</h3>
          <SidebarMediumPosts
            excludeId={article.guid}
            username={"chrismccully"}
          />
        </div>
        <div className="w-[40ch]" />
      </div>
    </div>
  );
};

export default MediumArticleContent;
