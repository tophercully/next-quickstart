"use client";
import React from "react";

const tagStyles: { [key: string]: string } = {
  p: "mt-4 text-lg text-base-800",
  h1: "text-5xl font-bold mt-4",
  h2: "text-4xl font-bold mt-3",
  h3: "text-3xl font-bold mt-24 scroll-mt-36",
  h4: "text-2xl font-semibold mt-16 scroll-mt-36",
  strong: "font-semibold",
  em: "italic",
  a: " underline",
  figure: "my-8",
  img: "max-w-full h-auto mx-auto rounded-lg",
  figcaption: "text-center text-sm text-base-400 mt-2",
  ul: "list-disc pl-5 mb-4",
  ol: "list-decimal pl-5 mb-4",
  li: "mb-2",
  pre: "bg-base-150 text-base-900 p-4 my-6 rounded-lg overflow-x-auto",
  code: " text-base-900 p-1 rounded",
};

interface Props {
  content: string;
}

const parseHtmlToJsx = (html: string, parentStyle = ""): React.ReactNode => {
  if (typeof window === "undefined") {
    return null;
  }

  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(html, "text/html");
  const body = parsedHtml.body;

  const renderNode = (node: ChildNode, index: number): React.ReactNode => {
    const { nodeName } = node;
    const tagName = nodeName.toLowerCase();
    const combinedStyle = `${parentStyle} ${tagStyles[tagName] || ""}`.trim();

    // Handle text nodes
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    // Handle elements
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;

      // For <img> tag
      if (tagName === "img") {
        const src = element.getAttribute("src") || "";
        const alt = element.getAttribute("alt") || "";
        return (
          <img
            src={src}
            alt={alt}
            className={combinedStyle}
            key={`img-${index}`}
          />
        );
      }

      // For <a> tag
      if (tagName === "a") {
        const href = element.getAttribute("href") || "#";
        return (
          <a
            href={href}
            className={combinedStyle}
            target="_blank"
            rel="noopener noreferrer"
            key={`a-${index}`}
          >
            {Array.from(element.childNodes).map((child, idx) =>
              renderNode(child, idx),
            )}
          </a>
        );
      }

      // For <h3> and <h4> tags
      if (tagName === "h3" || tagName === "h4") {
        const textContent = element.textContent || "";
        const id = textContent.toLowerCase().replace(/\s+/g, "-");
        return React.createElement(
          tagName,
          { className: combinedStyle, id, key: `${tagName}-${index}` },
          Array.from(element.childNodes).map((child, idx) =>
            renderNode(child, idx),
          ),
        );
      }

      // For <br> tag
      if (tagName === "br") {
        return (
          <br
            className={combinedStyle}
            key={`br-${index}`}
          />
        );
      }

      // For <figure> and other parent elements
      return React.createElement(
        tagName,
        {
          className: combinedStyle,
          key: `${tagName}-${index}`,
        },
        Array.from(element.childNodes).map((child, idx) =>
          renderNode(child, idx),
        ),
      );
    }

    return null;
  };

  return Array.from(body.childNodes).map((node, index) =>
    renderNode(node, index),
  );
};

const StyledContent: React.FC<Props> = ({ content }) => {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className="prose flex max-w-none flex-col">
      {parseHtmlToJsx(content)}
    </div>
  );
};

export default StyledContent;
