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

const Category = props => {
  // const [categories, setCategories] = useInput([]);
  // const [hasError, setErrors] = useState(false);
  const [dataFromConfig, setDataFromConfig] = useState({});
  // const [endpointConfig, setEndpointConfig] = useState(endpoint);
  // const [categories, updateCategories] = useState([]);
  const [queryStrings, setQueryString] = useState([]);
  const [frequency, setFrequency] = useState(0);

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

  const copiedConfig = { ...props.configData };
  const cats = [...props.categories];

  const catArrOfObjs = [];
  cats.forEach(catEl => {
    const catObj = {};
    catObj.name = catEl[0];
    catObj.queries = catEl[1];
    catObj.frequency = catEl[2];
    catArrOfObjs.push(catObj);
  });

  useEffect(() => {
    setDataFromConfig(copiedConfig);
  }, []);

  console.log(copiedConfig);
  console.log(catArrOfObjs);
  const categoryCards = [];
  function categoryBuilder(cats) {
    // eslint-disable-next-line no-restricted-syntax
    for (const category of cats) {
      categoryCards.push(
        <div key={category.name}>
          <Card size="md" name={category.name}>
            <CardBody>
              <CardTitle>
                <h4>{category.name}</h4>
              </CardTitle>
              <CardSubtitle>Frequency:</CardSubtitle>
              <Input
                type="text"
                name="frequency"
                id={`${category.name}-freq`}
                placeholder="Set frequency of query execution"
                value={category.frequency}
                onChange={() => freqChange}
              />
              <br />
              <CardSubtitle>Queries:</CardSubtitle>
              <FormGroup>
                <Input
                  type="textarea"
                  name="queryString"
                  id={`${category.name}-queries`}
                  placeholder="Input your GraphQL queries"
                  value={category.queries}
                  onChange={queryChange}
                />
              </FormGroup>
              {/* <GraphqlCodeBlock className="GraphqlCodeBlock" queryBody={queryStrings} /> */}

              {/* <Button size="sm">Edit Queries</Button> */}
            </CardBody>
          </Card>
        </div>
      );
    }
  }
  categoryBuilder(catArrOfObjs);
  return [...categoryCards];
};

export default Category;
