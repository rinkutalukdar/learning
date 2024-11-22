import React, { useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '../components/Layout';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import NewsTile from '../components/NewsTile';
import { format } from 'date-fns';

interface NewsArticle {
  title: string;
  content: string;
  publishedAt: string;
  urlToImage: string;
  description: string;
  url: string;
  source: {
    name: string;
  };
}

interface IndexPageProps extends PageProps {
  data: {
    allNewsArticle: {
      nodes: NewsArticle[];
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const allItems = data.allNewsArticle.nodes;
  const itemsPerPage = 10;
  const [items, setItems] = useState(allItems.slice(0, itemsPerPage));
  const [hasMore, setHasMore] = useState(allItems.length > itemsPerPage);

  const loadMoreItems = () => {
    const nextItems = allItems.slice(items.length, items.length + itemsPerPage);
    setItems((prevItems) => [...prevItems, ...nextItems]);
    if (items.length + itemsPerPage >= allItems.length) {
      setHasMore(false);
    }
  };

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
                icon={<span style={{ fontSize: '24px' }}>🕑</span>}
                iconStyle={{ background: '#3498db', color: '#fff' }}
                contentStyle={{ padding: 0 }}
                contentArrowStyle={{ borderRight: '10px solid rgb(228 226 221)' }}
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
    allNewsArticle(sort: { publishedAt: DESC }) {
      nodes {
        title
        content
        publishedAt
        urlToImage
        description
        url
        source {
          name
        }
      }
    }
  }
`;
