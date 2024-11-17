import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import TutorialList from "../components/TutorialsList";

const Home = ({ data }) => {
  const markdown = data.allMarkdownRemark.nodes.find(
    (node) => node.frontmatter.fileId === "gatsby_learning"
  );

  if (!markdown) {
    return <p>No items found.</p>;
  }

  const { frontmatter, html } = markdown;

  // Parse HTML to extract chapters and items
  const chapterRegex = /<h2>(.*?)<\/h2>/g;
  const itemRegex = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g;

  let match;
  const chapters = [];
  const result = [];

  // Extract and store chapters
  while ((match = chapterRegex.exec(html)) !== null) {
    chapters.push(match[1]);
  }

  // Extract items and group them under their respective chapters
  let currentChapterIndex = -1;
  html.replace(
    /<h2>(.*?)<\/h2>|<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g,
    (match, chapter, title, description) => {
      if (chapter) {
        currentChapterIndex++;
        result.push({ [chapter]: [] });
      } else if (title && description) {
        result[currentChapterIndex][chapters[currentChapterIndex]].push({
          title,
          description,
        });
      }
    }
  );

  // Navigation Logic
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === chapters.length - 1;

  const prevChapter = !isFirst ? () => setCurrentIndex(currentIndex - 1) : null;
  const nextChapter = !isLast ? () => setCurrentIndex(currentIndex + 1) : null;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
        <p className="text-gray-600 mb-6">{frontmatter.date}</p>

        {/* Render the current chapter and its items */}
        <h2 className="text-2xl font-semibold mb-4">
          {chapters[currentIndex]}
        </h2>
        <TutorialList items={result[currentIndex][chapters[currentIndex]]} />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {prevChapter && (
            <button
              onClick={prevChapter}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              ← Previous
            </button>
          )}
          {nextChapter && (
            <button
              onClick={nextChapter}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        frontmatter {
          title
          date
          fileId
        }
        html
      }
    }
  }
`;

export const Head = () => <title>Home Page</title>;
