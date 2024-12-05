import Link from "next/link";
import { fetchMediumFeed } from "../util/fetchMediumFeed";
import { getFirstImageFromContent } from "../util/getFirstImageFromContent";
import { getIdFromGuid } from "../util/getIdFromGuid";

const SidebarMediumPosts = async ({
  username,
  excludeId,
}: {
  username: string;
  excludeId: string;
}) => {
  let error = null;
  let posts = [];
  try {
    const data = await fetchMediumFeed(username);
    posts = data.items.filter(
      (item: any) => getIdFromGuid(item.guid) !== excludeId,
    );
  } catch (err: any) {
    error = err.message;
    posts = [];
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid max-w-[80ch] grid-cols-1 gap-4 md:grid-cols-2">
      {posts.map((post: any, index: number) => (
        <Link
          key={index}
          href={`/a/${getIdFromGuid(post.guid)}`}
          className="flex aspect-[4/3] h-full flex-col justify-between gap-4 rounded bg-white p-4 shadow duration-200 hover:-translate-y-1 hover:border-base-950 hover:shadow-lg"
        >
          <div className="flex h-2/3 w-full items-center justify-center">
            <img
              className="h-full object-cover"
              src={
                post.thumbnail ?
                  post.thumbnail
                : (getFirstImageFromContent(post.content) as string)
              }
              alt={post.title}
            />
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="line-clamp-1 text-lg font-semibold">{post.title}</h2>
            <p className="text-base-300">
              {new Date(post.pubDate).toDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SidebarMediumPosts;
