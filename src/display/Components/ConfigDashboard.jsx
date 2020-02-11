import React, { useState, useContext, useEffect } from 'react';
import { ProjectContext } from './Context/ProjectContext';
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
import 'bootstrap/dist/css/bootstrap.css';
import { render } from 'react-dom';
import CategoriesContainer from './CategoriesContainer';
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

// Custom hook for handling input boxes
// saves us from creating onChange handlers for them individually
// const useInput = init => {
//   const [value, setValue] = useState(init);
//   const onChange = e => {
//     setValue(e.target.value);
//   };
//   // return the value with the onChange function instead of setValue function
//   return [value, onChange];
// };

const ConfigDashboard = props => {
  const [dataFromConfig, setDataFromConfig] = useState({});
  const [hasError, setErrors] = useState(false);
  const [endpointConfig, setEndpointConfig] = useState('');
  // const [categories, setCategories] = useState([]);
  // const [queryString, setQueryString] = useState('');
  // const [freq, setFrequency] = useState('');
  const { project, updateProject } = useContext(ProjectContext);

  async function fetchData() {
    const response = await fetch(`${project.projects}/config.json`);
    const result = await response
      .json()
      .then(res => {
        setDataFromConfig(res);
        setEndpointConfig(res.endpoint);
        localStorage.setItem(`${res}`, JSON.stringify({ ...res }));
      })
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleEndpointChange = e => {
    const url = e.target.value;
    setEndpointConfig(url);
  };

  // func to update data within config file
  async function handleSubmit(event) {
    event.preventDefault();
    const data = dataFromConfig;
    console.log(data);

    await fetch('http://localhost:3333/configDash', {
      method: 'POST',
      body: data
    });
  }

  return (
    <div id="configDashboard">
      <div id="navBtn">
        <Link to="/">
          <button type="button" className="btnSecondary">
            Back to Dashboard
          </button>
        </Link>
      </div>
      <div id="configHeader">
        <h1>Config Dashboard</h1>
        <Form id="configForm" action="/configDash">
          <div id="categories">
            <FormGroup>
              <Label for="endpointLabel">
                <h4>Endpoint</h4>
              </Label>
              <Input
                type="text"
                name="endpoint"
                id="endpoint"
                placeholder="Input your GraphQL endpoint"
                value={endpointConfig}
                onChange={handleEndpointChange}
              />
              <hr />
              <Label for="categories">
                <h4>Categories</h4>
              </Label>
              <CategoriesContainer configData={dataFromConfig} />
            </FormGroup>
          </div>
          <span>
            <Button color="primary" type="submit" onSubmit={handleSubmit}>
              Save
            </Button>
            <Button color="secondary" onClick={() => window.location.reload()}>
              Cancel
            </Button>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default ConfigDashboard;
