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

const Category = ({ catData, catName, catFreq, queries }) => {
  // const [categories, setCategories] = useInput([]);
  // const [hasError, setErrors] = useState(false);
  const [queryStrings, setQueryString] = useState(queries);
  const [freq, setFrequency] = useState(catFreq);

  // For handling query string on change
  const queryChange = e => {
    const query = e.target.value;
    setQueryString(query);
  };

  // For handling updates to frequency
  const freqChange = e => {
    const newFreq = e.target.value;
    setFrequency(newFreq);
  };

  return (
    <Card size="md" name={catName}>
      <CardBody>
        <CardTitle>
          <h4>{catName}</h4>
        </CardTitle>
        <CardSubtitle>Frequency:</CardSubtitle>
        <Input
          type="text"
          name="frequency"
          id={`${catName}-freq`}
          placeholder="Set frequency of query execution"
          value={freq}
          onChange={freqChange}
        />
        {/* <Button size="sm">Update</Button>
        <br /> */}
        <br />
        <CardSubtitle>Queries:</CardSubtitle>
        <FormGroup>
          <Input
            type="textarea"
            name="queryString"
            id={queryStrings}
            placeholder="Input your GraphQL queries"
            value={queryStrings}
            onChange={queryChange}
          />
        </FormGroup>

        {/* <Button size="sm">Edit Queries</Button> */}
      </CardBody>
    </Card>
  );
};

export default Category;
