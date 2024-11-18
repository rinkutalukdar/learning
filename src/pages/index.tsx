// src/pages/index.js
import React, { useState } from 'react';
import { graphql } from 'gatsby';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '../components/Layout';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaNewspaper } from 'react-icons/fa';
import NewsTile from '../components/NewsTile';
import { format } from 'date-fns';
import { FaExternalLinkAlt, FaLightbulb } from 'react-icons/fa'; // Icon for "Read More"

const IndexPage = ({ data }) => {
  const initialItems = data.allNewsArticle.nodes;
  const [items, setItems] = useState(initialItems);
  const [skip, setSkip] = useState(initialItems.length);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10; // Number of items to load per request

  // Function to load more items
  const loadMoreItems = async () => {
    try {
      // Fetch more items using Gatsby's GraphQL API endpoint
      const response = await fetch('/___graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query($skip: Int!, $limit: Int!) {
              allNewsArticle(sort: { publishedAt: DESC }, skip: $skip, limit: $limit) {
                nodes {
                  title
                  content
                  publishedAt
                  urlToImage
                  url
                  source {
                    name
                  }
                }
              }
            }
          `,
          variables: { skip, limit: itemsPerPage },
        }),
      });

      const result = await response.json();
      const newItems = result.data.allNewsArticle.nodes;

      if (newItems.length === 0) {
        setHasMore(false); // No more items to load
      } else {
        setItems((prevItems) => [...prevItems, ...newItems]);
        setSkip(skip + itemsPerPage);
      }
    } catch (error) {
      console.error('Error loading more items:', error);
    }
  };

  // const formattedDate = format(new Date(item.publishedAt), 'MMM d, yyyy'); // Example: "Nov 18, 2024"

  return (
    <Layout>
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">News Timeline</h1>
        <InfiniteScroll
          dataLength={items.length}
          next={loadMoreItems}
          hasMore={hasMore}
          loader={<p className="text-center mt-4">Loading more items...</p>}
        >
          <VerticalTimeline>
            {items.map((item, index) => (
              <VerticalTimelineElement
                key={index}
                date={format(new Date(item.publishedAt), 'MMM d, yyyy')}
                icon={<FaLightbulb style={{ fontSize: '24px' }} />}
                iconStyle={{ background: '#3498db', color: '#fff' }}
                contentStyle={{ padding: 0 }}
                contentArrowStyle={{ borderRight: '10px solid rgb(228 226 221)' }}
                iconStyle={{ padding:1, background: 'rgb(33, 150, 243)', color: '#fff' }}
              >
                <NewsTile
                  title={item.title}
                  content={item.content}
                  urlToImage={item.urlToImage}
                  publishedAt={item.publishedAt}
                  source={item.source}
                  url={item.url}
                />
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allNewsArticle(sort: { publishedAt: DESC }, limit: 10) {
      nodes {
        title
        content
        publishedAt
        urlToImage
        url
        source {
          name
        }
      }
    }
  }
`;
