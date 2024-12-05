"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Heading {
  key: string;
  id: string;
  text: string;
  level: number;
  children: Heading[];
}

const parseHeadings = (content: string): Heading[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const headings = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6"));

  const createHeading = (element: Element): Heading => ({
    key: element.getAttribute("id") || "",
    id: element.getAttribute("id") || "",
    text: element.textContent || "",
    level: parseInt(element.tagName[1]),
    children: [],
  });

  const nestedHeadings: Heading[] = [];
  const stack: Heading[] = [];

  headings.forEach((heading) => {
    const newHeading = createHeading(heading);

    while (
      stack.length > 0 &&
      stack[stack.length - 1].level >= newHeading.level
    ) {
      stack.pop();
    }

    if (stack.length === 0) {
      nestedHeadings.push(newHeading);
    } else {
      stack[stack.length - 1].children.push(newHeading);
    }

    stack.push(newHeading);
  });

  return nestedHeadings;
};

const ArticleNavigator: React.FC<{ content: string }> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setHeadings(parseHeadings(content));

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Update activeId when the section is in view
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px -50% 0px", // Trigger when 50% of the section is in view
    });

    // Observe each heading element in the content
    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headingElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [content]);

  const handleLinkClick = (e: React.MouseEvent, heading: Heading) => {
    e.preventDefault(); // Prevent default anchor link behavior

    const target = document.getElementById(
      heading.text.replace(/\s+/g, "-").toLowerCase(),
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderHeadings = (headings: Heading[]) => (
    <ul
      className="space-y-2"
      key={content}
    >
      {headings.map((heading) => (
        <li
          key={heading.id}
          className="ml-4"
        >
          <Link
            href={`#${heading.text.replace(/\s+/g, "-").toLowerCase()}`} // Leave this as it was
            className={`block text-base-400 transition-colors hover:underline ${
              (
                activeId === heading.text.replace(/\s+/g, "-").toLowerCase() // Ensure activeId matches the formatted text
              ) ?
                "font-semibold text-base-900"
              : ""
            }`}
            onClick={(e) => handleLinkClick(e, heading)} // Handle the click manually
          >
            {heading.text}
          </Link>
          {heading.children.length > 0 && renderHeadings(heading.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="article-navigator border-l-2 border-gray-200 p-4">
      {renderHeadings(headings)}
    </nav>
  );
};

export default ArticleNavigator;
