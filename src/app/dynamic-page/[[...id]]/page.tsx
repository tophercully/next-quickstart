import { Lightbulb, Shuffle } from "lucide-react";

export default async function ItemPage({
  params,
}: {
  params: { id: string[] };
}) {
  const id = params.id ? params.id.join("/") : "No ID provided";
  const nextId = id === "No ID provided" || Number(id) >= 10 ? 1 : Number(id) + 1;

  // Try fetching some info here and awaiting before returning JSX
  // This means the page will be server-rendered and server all content at once with no client-side loading

  const someData = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  const data = await someData.json();

  return (
    <div className="flex max-w-[80ch] flex-col gap-4">
      <h1 className="text-7xl">{`Dynamic Route`}</h1>
      <span className="text-3xl text-base-300">
        {`Url Param Value: `}
        <span className="text-base-800">{id}</span>
      </span>
      <p className="mt-4 flex w-fit items-center gap-2 text-xs">
        <Lightbulb className="h-full p-1" />
        Try replacing the value /dynamic-page/XXXX
      </p>
      <a
        href={`/dynamic-page/${nextId}`}
        className="flex w-fit items-center gap-2 border bg-base-100 px-2 py-1 text-xs hover:bg-base-150"
      >
        <Shuffle className="h-full p-1" />
        Press to cycle the value of the url param
      </a>

      <div className="flex max-w-[80ch] flex-col gap-2 break-words">
        <p>
          Try fetching some data here and awaiting before returning JSX. This
          means the page will be server-rendered and server all content at once
          with no client-side loading
        </p>
        <span>
          {`For example, fetching from https://jsonplaceholder.typicode.com/users/${id}, the username is: `}
          <span className="inline bg-base-150 px-2 py-1">{data.username}</span>
        </span>
      </div>
    </div>
  );
}
