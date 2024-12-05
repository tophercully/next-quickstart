import Link from "next/link";
import ArticleFooter from "./ArticleFooter";

const AuthorCard = () => {
  return (
    <div className="flex max-w-[80ch] flex-col gap-4 p-4 md:flex-row md:gap-8 md:p-0">
      <img
        src="/pfp.jpg"
        alt="Profile Picture"
        className="h-32 w-32 rounded-full"
      />
      <span className="text-2xl">
        <h3 className="font-medium">{`Hi, I'm Chris`}</h3>

        <p className="text-base text-base-500">
          {`I sometimes write about web development, design, and procedural
          systems. Nothing gets me more excited than design, music, and making
          an impact.`}
        </p>
        <p className="text-base text-base-500">
          Try out{" "}
          <Link
            className="underline"
            href={"https://snippp.io"}
            target="_blank"
          >
            {`Snippp.io`}
          </Link>{" "}
          or{" "}
          <Link
            className="underline"
            href={"https://cocoontools.chrismccully.com"}
            target="_blank"
          >
            Cocoon
          </Link>
          {`, some projects I've built recently.`}
        </p>
        <ArticleFooter />
      </span>
    </div>
  );
};

export default AuthorCard;
