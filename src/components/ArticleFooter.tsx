const ArticleFooter = () => {
  return (
    <footer className="mt-8 flex items-center gap-4">
      <a
        href="https://bsky.app/profile/chrismccully.com"
        target="_blank"
      >
        <img
          src="/logos/blueskyLogo.png"
          className="aspect-square w-6 cursor-pointer grayscale hover:grayscale-0"
        />
      </a>
      <a
        href="https://github.com/tophercully"
        target="_blank"
      >
        <img
          src="/logos/github.png"
          className="aspect-square w-6 cursor-pointer grayscale hover:grayscale-0"
        />
      </a>
      <a
        href="https://snippp.io/user/118192145443293104266"
        target="_blank"
      >
        <img
          src="/logos/snippp1x1.svg"
          className="aspect-square w-6 cursor-pointer grayscale hover:grayscale-0"
        />
      </a>
    </footer>
  );
};
export default ArticleFooter;
