/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Input } from 'reactstrap';
import { runtime } from 'regenerator-runtime';
import '../stylesheets/style.scss';
// import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const QueryItem = props => {
  // const [queryStrings, setQueryString] = useState(props.queryItem);

  return (
    <div id={`${props.id}-queryItem`}>
      <Input
        type="textarea"
        name="queryString"
        id={`${props.id}-queries`}
        placeholder="Input your GraphQL queries"
        value={props.queryItem}
        onChange={props.queryChange}
      />
    </div>
  );
};

export default QueryItem;
