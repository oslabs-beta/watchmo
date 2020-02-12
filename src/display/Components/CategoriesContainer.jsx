/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prop-types */
import React from 'react';
import '../stylesheets/style.scss';
import Category from './Category';
// import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const CategoriesContainer = props => {
  // declaring an array to collect each set of data by category
  const localCats = [];
  // building array of category objects
  for (const category in props.configData.categories) {
    const lilCats = {};
    lilCats.name = category;
    lilCats.queries = props.configData.categories[category].queries;
    lilCats.frequency = props.configData.categories[category].frequency;
    localCats.push(lilCats);
  }

  return (
    <div className="category">
      <hr />
      <div>
        <Category
          categories={localCats}
          configData={props.configData}
          queryChange={props.queryChange}
          freqChange={props.freqChange}
        />
      </div>
       <input type="text" id="catInput" placeholder=" Add/Select Category (lower case)" onChange={props.addTypedCat} value={props.typedCat}></input>
       <button type="button" onClick={props.addCategory}>Add Category</button>
       <button type="button" onClick={props.delCategory}>Delete Category</button>
    </div>
  );
};
export default CategoriesContainer;
