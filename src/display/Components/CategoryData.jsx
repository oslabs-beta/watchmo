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
import QueryList from './QueryList';

const CategoryData = props => {
  // For handling updates to frequency
  const freqChange = e => {
    const newFreq = e.target.value;
    setFrequency(Number(newFreq));
  };

  return (
    <div>
      <CardTitle>
        <h4>{props.catData.name}</h4>
      </CardTitle>
      <CardSubtitle>Frequency:</CardSubtitle>
      <Input
        type="text"
        name="frequency"
        id={`${props.catData.name}-freq`}
        placeholder="Set frequency of query execution"
        value={props.catData.frequency}
        onChange={props.freqChange}
      />
      <br />
      <CardSubtitle>Queries:</CardSubtitle>
      <QueryList
        key={props.catData.name}
        name={props.catData.name}
        queries={props.catData.queries}
        queryChange={props.queryChange}
      />
    </div>
  );
};
export default CategoryData;
