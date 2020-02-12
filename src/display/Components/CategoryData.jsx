/* eslint-disable import/no-cycle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { CardTitle, CardSubtitle, Input } from 'reactstrap';
import '../stylesheets/style.scss';
import QueryList from './QueryList';
// import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const CategoryData = props => {
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
