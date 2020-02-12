/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Button, Input } from 'reactstrap';
import { runtime } from 'regenerator-runtime';
import '../stylesheets/style.scss';
// import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const QueryItem = props => {
  // const [queryStrings, setQueryString] = useState(props.queryItem);

  return (
    <div key={`${props.id}-queryItem`} id={`${props.id}-queryItem`}>
      <span className="querySpan">
        <Input
          type="textarea"
          name="queryString"
          id={`${props.id}-queries`}
          placeholder="Input your GraphQL queries"
          value={props.queryItem}
          onChange={props.queryChange}
        />
        <Button
          key={`button-${props.id}`}
          className="deleteBtn"
          type="button"
          size="sm"
          id={`${props.id}-delete`}
          onClick={props.deleteQuery}
          color="secondary"
        >
          X
        </Button>
      </span>

    </div>
  );
};

export default QueryItem;
