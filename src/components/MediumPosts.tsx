import Link from "next/link";
import { fetchMediumFeed } from "../util/fetchMediumFeed";
import { getFirstImageFromContent } from "../util/getFirstImageFromContent";
import { getIdFromGuid } from "../util/getIdFromGuid";

const MediumPosts = async ({ username }: { username: string }) => {
  let error = null;
  let posts = [];
  try {
    const data = await fetchMediumFeed(username);
    posts = data.items;
  } catch (err: any) {
    error = err.message;
    posts = [];
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      {posts.map((post: any, index: number) => (
        <Link
          key={index}
          href={`/a/${getIdFromGuid(post.guid)}`}
          rel="noopener noreferrer"
          className="flex h-40 max-w-[80ch] justify-between gap-4 rounded border-l-8 bg-white p-4 shadow duration-200 hover:-translate-y-1 hover:border-base-950 hover:shadow-lg"
        >
          <div className="flex flex-col justify-between">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-300">
              {new Date(post.pubDate).toDateString()}
            </p>
          </div>
          <img
            className="aspect-square w-1/3 object-contain"
            src={
              post.thumbnail ?
                post.thumbnail
              : (getFirstImageFromContent(post.content) as string)
            }
            alt={post.title}
          />
        </Link>
      ))}
    </div>
  );
};

export default MediumPosts;
