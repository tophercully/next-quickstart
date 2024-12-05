import MediumArticleContent from "@/components/MediumArticleContent";
import Page from "@/components/page";
import { Article } from "@/types/feed";
import { fetchMediumFeed } from "@/util/fetchMediumFeed";
import { getIdFromGuid } from "@/util/getIdFromGuid";

type Props = {
  params: Promise<{ id: string }>;
};

const ArticlePage = async ({ params }: Props) => {
  const { id } = await params;
  let article = null;

  try {
    const data = await fetchMediumFeed("chrismccully");
    article =
      data.items.find((item: Article) => getIdFromGuid(item.guid) === id) ||
      null;
  } catch (err: any) {
    console.error(err);
  }

  if (!article) {
    return (
      <Page>
        <div className="flex h-full w-full items-center justify-center">
          Article not found.
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <MediumArticleContent
        username="chrismccully"
        article={article}
      />
    </Page>
  );
};

export async function generateStaticParams() {
  const data = await fetchMediumFeed("chrismccully");
  return data.items.map((item: Article) => ({
    id: getIdFromGuid(item.guid),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let article = null;

  try {
    const data = await fetchMediumFeed("chrismccully");
    article =
      data.items.find((item: Article) => getIdFromGuid(item.guid) === id) ||
      null;
  } catch (err: any) {
    console.error(err);
  }

  if (!article) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: article.title,
  };
}

export default ArticlePage;
