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
import QueryList from './QueryList';

const CategoryData = ({ catData }) => {
  const [categoryData, setCategoryData] = useState({ catData });
  const [queryStrings, setQueryString] = useState(catData.queries);
  const [frequency, setFrequency] = useState(catData.frequency);

  // For handling updates to frequency
  const freqChange = e => {
    const newFreq = e.target.value;
    setFrequency(Number(newFreq));
  };

  return (
    <div>
      <CardTitle>
        <h4>{catData.name}</h4>
      </CardTitle>
      <CardSubtitle>Frequency:</CardSubtitle>
      <Input
        type="text"
        name="frequency"
        id={`${catData.name}-freq`}
        placeholder="Set frequency of query execution"
        value={frequency}
        onChange={freqChange}
      />
      <br />
      <CardSubtitle>Queries:</CardSubtitle>
      <QueryList key={catData.name} name={catData.name} queries={queryStrings} />
    </div>
  );
  {
    /* <Button size="sm">Edit Queries</Button> */
  }
};
export default CategoryData;
