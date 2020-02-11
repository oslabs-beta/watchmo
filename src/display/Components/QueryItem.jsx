/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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

const QueryItem = props => {
  const [queryStrings, setQueryString] = useState(props.queryItem);

  const queryChange = e => {
    const query = e.target.value;
    setQueryString(query);
  };

  return (
    <div id={`${props.queryItem}-queryItem`}>
      <Input
        type="textarea"
        name="queryString"
        id={`${props.queryItem}-queries`}
        placeholder="Input your GraphQL queries"
        value={queryStrings}
        onChange={queryChange}
      />
    </div>
  );
};

export default QueryItem;
