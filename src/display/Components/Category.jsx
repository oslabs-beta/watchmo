/* eslint-disable no-restricted-syntax */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import '../stylesheets/style.scss';
import CategoryData from './CategoryData';
// import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const Category = props => {
  const categoryCards = [];
  function categoryBuilder(catDataParam) {
    for (const category of catDataParam) {
      categoryCards.push(
        <div key={category.name}>
          <Card size="md" name={category.name}>
            <CardBody>
              <CategoryData
                catData={category}
                queryChange={props.queryChange}
                addQuery={props.addQuery}
                deleteQuery={props.deleteQuery}
                freqChange={props.freqChange}
              />
            </CardBody>
          </Card>
          <br />
          <br />
        </div>
      );
    }
  }
  categoryBuilder(props.categories);
  return categoryCards;
};

export default Category;
