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
import QueryItem from './QueryItem';

const QueryList = props => {
  const [queryStrings, setQueryString] = useState(props.queries);

  const queryItems = [];
  queryStrings.forEach(query => {
    queryItems.push(
      <QueryItem key={query} name={`${props.name}-queryItem`} queryItem={`${query}`} />
    );
  });

  return (
    <div>
      <FormGroup>
        {queryItems}
        {/* <GraphqlCodeBlock className="GraphqlCodeBlock" queryBody={`${queryStrings}`} /> */}
      </FormGroup>
    </div>
  );
};

export default QueryList;
