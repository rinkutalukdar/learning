// src/pages/news.tsx
import React from "react";
import { graphql } from "gatsby";

const NewsPage = ({ data }) => {
  const { title, description, content, url } = data.newsArticle;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div>{content}</div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
};

export const query = graphql`
  query($id: String!) {
    newsArticle(id: { eq: $id }) {
      title
      description
      content
      url
    }
  }
`;

export default NewsPage;
