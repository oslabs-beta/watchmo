/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, CardTitle, CardSubtitle, Input } from 'reactstrap';
import '../stylesheets/style.scss';
import QueryList from './QueryList';
// import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const CategoryData = props => {
  return (
    <div>
      <CardTitle>
        <h4>{props.catData.name}</h4>
      </CardTitle>
      <CardSubtitle>
        Frequency(ms): <br />{' '}
        <div id="freqExamples">
          (ex: 1 sec = 1000; 1 min = 60000; 30 min = 1800000; 1 hour = 3600000; 1 day = 86400000)
        </div>
      </CardSubtitle>
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
        deleteQuery={props.deleteQuery}
        queryChange={props.queryChange}
      />
      <div id="btnAddQuery">
        <Button
          className="addQueryBtn"
          color="primary"
          size="md"
          id={`${props.catData.name}-addQuery`}
          onClick={props.addQuery}
          block
        >
          Add Query
        </Button>
      </div>
    </div>
  );
};
export default CategoryData;
