/* eslint-disable react/prop-types */
import React from 'react';
import { FormGroup } from 'reactstrap';
import QueryItem from './QueryItem';
import '../stylesheets/style.scss';
// import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const QueryList = props => {
  const queryItems = [];
  for (let i = 0; i < props.queries.length; i += 1) {
    queryItems.push(
      <QueryItem
        key={i}
        id={`${props.name}-${i}`}
        name={`${props.name}-queryItem`}
        queryItem={`${props.queries[i]}`}
        queryChange={props.queryChange}
        deleteQuery={props.deleteQuery}
      />
    );
  }
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
