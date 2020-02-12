import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ProjectContext } from './Context/ProjectContext';
import '../stylesheets/style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesContainer from './CategoriesContainer';
// import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';

const ConfigDashboard = props => {
  const [origConfig, setOrigConfig] = useState({});
  const [dataFromConfig, setDataFromConfig] = useState({});
  const [endpointConfig, setEndpointConfig] = useState('');
  const { project } = useContext(ProjectContext);

  async function fetchData() {
    const response = await fetch(`${project.projects}/config.json`);
    const result = await response
      .json()
      .then(res => {
        setOrigConfig(res);
        setDataFromConfig(res);
        setEndpointConfig(res.endpoint);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleEndpointChange = e => {
    const url = e.target.value;
    const JSONified = JSON.stringify(dataFromConfig);
    const newDataFromConfig = JSON.parse(JSONified);
    newDataFromConfig.endpoint = url;
    setDataFromConfig(newDataFromConfig);
    setEndpointConfig(url);
  };

  const queryChange = e => {
    const catName = e.target.id.split('-')[0];
    const queryIdx = e.target.id.split('-')[1];
    const JSONified = JSON.stringify(dataFromConfig);
    const newDataFromConfig = JSON.parse(JSONified);
    newDataFromConfig.categories[catName].queries[queryIdx] = e.target.value;
    setDataFromConfig(newDataFromConfig);
  };

  const frequencyChange = e => {
    const catName = e.target.id.split('-')[0];
    const JSONified = JSON.stringify(dataFromConfig);
    const newDataFromConfig = JSON.parse(JSONified);
    newDataFromConfig.categories[catName].frequency = e.target.value;
    setDataFromConfig(newDataFromConfig);
  };

  // func to update data within config file
  async function handleSubmit(event) {
    event.preventDefault();
    const data = { project: project.projects, data: dataFromConfig };

    await fetch('/api/configDash', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  return (
    <div id="configDashboard">
      <div id="navBtn">
        <Link to="/">
          <button type="button" className="btnSecondary">
            Back to Project Select
          </button>
        </Link>
      </div>
      <div id="configHeader">
        <h1>Config Dashboard</h1>
        <Form id="configForm">
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
              <CategoriesContainer
                configData={dataFromConfig}
                queryChange={queryChange}
                freqChange={frequencyChange}
              />
            </FormGroup>
          </div>
          <span>
            <Button color="primary" type="button" onClick={handleSubmit}>
              Save
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                setDataFromConfig(origConfig);
                setEndpointConfig(origConfig.endpoint);
                props.history.push('/configDash');
              }}
            >
              Cancel
            </Button>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default ConfigDashboard;
