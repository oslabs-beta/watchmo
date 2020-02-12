/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { runtime } from 'regenerator-runtime';
import '../stylesheets/style.scss';
import { render } from 'react-dom';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';
import useInput from '../../js/input-hook.js';
import CategoryData from './CategoryData';

const Category = props => {
  const categoryCards = [];
  function categoryBuilder(catDataParam) {
    // eslint-disable-next-line no-restricted-syntax
    for (const category of catDataParam) {
      categoryCards.push(
        <div key={category.name}>
          <Card size="md" name={category.name}>
            <CardBody>
              <CategoryData
                catData={category}
                queryChange={props.queryChange}
                freqChange={props.freqChange}
              />
            </CardBody>
          </Card>
        </div>
      );
    }
  }
  categoryBuilder(props.categories);
  // useEffect(() => {
  //   categoryBuilder(catArrOfObjs);
  // }, []);
  return categoryCards;
};

export default Category;
