import React from 'react';
import ItemList from "../components/ItemList";
import Layout from "../components/Layout";

const ReduxConcept = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Redux Explanation</h1>
        <main>
          <ItemList />
        </main>
        </div>
    </Layout>
  );
};

export default ReduxConcept;