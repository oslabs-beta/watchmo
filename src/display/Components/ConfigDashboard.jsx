/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ProjectContext } from './Context/ProjectContext';
import '../stylesheets/style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesContainer from './CategoriesContainer';
import ConfigSaveModal from './ConfigSaveModal';
import ConfigResetModal from './ConfigResetModal';
// import FileSavedAlert from './FileSavedAlert';

const ConfigDashboard = props => {
  const [origConfig, setOrigConfig] = useState({});
  const [dataFromConfig, setDataFromConfig] = useState({});
  const [endpointConfig, setEndpointConfig] = useState('');
  const [typedCat, setTypedCat] = useState('');
  // const [fileSavedAlert, setFileSavedAlert] = useState(false);
  const { project } = useContext(ProjectContext);

  if (!project.projects) {
    props.history.push('/');
  }

  async function fetchData() {
    const response = await fetch(`${project.projects}/config.json`);
    const result = await response.json().then(res => {
      setOrigConfig(res);
      setDataFromConfig(res);
      setEndpointConfig(res.endpoint);
    });
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

  const addTypedCat = e => {
    setTypedCat(e.target.value);
  };

  const addCategory = () => {
    const JSONified = JSON.stringify(dataFromConfig);
    const newDataFromConfig = JSON.parse(JSONified);
    newDataFromConfig.categories[typedCat] = {};
    newDataFromConfig.categories[typedCat].queries = [''];
    newDataFromConfig.categories[typedCat].frequency = '';
    setTypedCat('');
    setDataFromConfig(newDataFromConfig);
  };

  const delCategory = () => {
    const JSONified = JSON.stringify(dataFromConfig);
    const newDataFromConfig = JSON.parse(JSONified);
    delete newDataFromConfig.categories[typedCat];
    setTypedCat('');
    setDataFromConfig(newDataFromConfig);
  };

  const queryChange = e => {
    const catName = e.target.id.split('-')[0];
    const queryIdx = e.target.id.split('-')[1];
    const JSONified = JSON.stringify(dataFromConfig);
    const newDataFromConfig = JSON.parse(JSONified);
    newDataFromConfig.categories[catName].queries[queryIdx] = e.target.value;
    setDataFromConfig(newDataFromConfig);
  };

  const addQuery = e => {
    const catName = e.target.id.split('-')[0];
    const JSONified = JSON.stringify(dataFromConfig);
    const newDataFromConfig = JSON.parse(JSONified);
    newDataFromConfig.categories[catName].queries.push('');
    setDataFromConfig(newDataFromConfig);
  };

  const deleteQuery = e => {
    const catName = e.target.id.split('-')[0];
    const queryIdx = e.target.id.split('-')[1];
    const JSONified = JSON.stringify(dataFromConfig);
    const newDataFromConfig = JSON.parse(JSONified);
    newDataFromConfig.categories[catName].queries.splice(queryIdx, 1);
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
  async function handleSubmit() {
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

  const handleReset = () => {
    setDataFromConfig(origConfig);
    setEndpointConfig(origConfig.endpoint);
    props.history.push('/configDash');
  };

  // const fileSaved = () => {
  //   setFileSavedAlert(true);
  // };

  return (
    <div id="configDashboard">
      <div id="navBtn">
        <Container>
          <Row xs="1">
            <Col xs="6">
              <Link id="navUserDashLink" to="/userDashBoard">
                <Button id="navUserDash" type="button" color="secondary" className="btnSecondary">
                  Back&nbsp;to User&nbsp;Dashboard
                </Button>
              </Link>
            </Col>
            <Col xs="6">
              <Link id="navProjLink" to="/">
                <Button
                  id="navProjectSelect"
                  type="button"
                  color="secondary"
                  className="btnSecondary"
                >
                  Back&nbsp;to Project&nbsp;Select
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <div id="configHeader">
        <br />
        <h1>Config Dashboard</h1>
        <hr />
        <Form id="configForm">
          <div id="categories">
            <FormGroup>
              <Label for="endpointLabel">
                <h4 id="endpointHeader">Endpoint</h4>
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
                <h4 id="categoriesHeader">Categories</h4>
              </Label>
              <CategoriesContainer
                configData={dataFromConfig}
                addCategory={addCategory}
                delCategory={delCategory}
                addTypedCat={addTypedCat}
                typedCat={typedCat}
                queryChange={queryChange}
                addQuery={addQuery}
                deleteQuery={deleteQuery}
                freqChange={frequencyChange}
              />
            </FormGroup>
          </div>
          {/* <FileSavedAlert visible={false} /> */}
          <ConfigSaveModal
            handleSubmit={handleSubmit}
            buttonLabel="Save Configuration"
            className="saveConfig"
            // fileSaved={fileSavedAlert}
          />
          <ConfigResetModal
            handleReset={handleReset}
            buttonLabel="Reset Configuration"
            className="resetConfig"
          />
        </Form>
      </div>
    </div>
  );
};

export default ConfigDashboard;
