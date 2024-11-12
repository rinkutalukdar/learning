import React from 'react';
import { Link, graphql, useStaticQuery, PageProps } from 'gatsby'
import Tutorial from './Tutorial';


const TutorialList: React.FC<ItemsPageProps> = ({items}) => {
  // console.log(items)s
  // console.log(Object.keys(items)[0]);
  let chapter = Object.keys(items)[0];
  return (
    <>
      <div className="mx-auto m-8 p-4 bg-white rounded-lg shadow-md">
      {items.map((item, index) => (
        <Tutorial key={index} item={item} />
      ))}
      </div>
    </>
  );
};


export default TutorialList;