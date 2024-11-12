import React from 'react';
import ItemList from "../components/ItemList";
import Layout from "../components/Layout";

const ReduxConcept = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Redux Explanation</h1>
      <main>
        <ItemList />
      </main>
    </Layout>
  );
};

export default ReduxConcept;