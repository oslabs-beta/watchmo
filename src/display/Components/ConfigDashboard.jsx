import React, { useState, useEffect, useContext } from 'react';
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
import Category from './Category';

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

const ConfigDashboard = (props) => {
  const { project, updateProject } = useContext(ProjectContext)

  if (!project.projects) {
    props.history.push("/");
  }


  const [dataFromConfig, setDataFromConfig] = useState({});
  const [endpointConfig, setEndpointConfig] = useState('');
  const [categories, setCategories] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [queryString, setQueryString] = useState('');
  const [freq, setFrequency] = useState('');



  async function fetchData() {
    const response = await fetch(`${project.projects}/config.json`);
    const result = await response
      .json()
      .then(res => {
        setEndpointConfig(res.endpoint);
        setCategories(Object.keys(res.categories));
        setDataFromConfig(res);
        localStorage.setItem(`${res}`, JSON.stringify({ ...res }));
      })
      .catch(err => setErrors(err));
  }

  // For updating the config values in UI
  const handleEndpointChange = e => {
    const url = e.target.value;
    setEndpointConfig(url);
  };

  // For handling updates to frequency
  const freqChange = e => {
    const newFreq = e.target.value;
    setFrequency(newFreq);
  };

  // func to create array of cards to represent each category within config file
  const buildCards = categoryData => {
    const cards = [];
    const dataArr = Object.values(categoryData);
    const catArr = [...dataArr];
    const cats = Object.entries({ ...catArr[1] });
    console.log(cats);
    for (let i = 0; i < cats.length; i += 1) {
      // iterate through cats and create array of child components
      // pass down props needed
      let catName = cats[i][0];
      let catFreq = cats[i][1].frequency.toString();
      console.log(typeof catFreq);
      let queries = [];
      let queryObj = Object.values(cats[i][1].queries);
      cats[i][1].queries.forEach(el => queries.push(el));
      // console.log(queries);
      let curCard = (
        <div id={catName} key={catName}>
          <Category
            catData={categoryData}
            key={i}
            catName={catName}
            catFreq={catFreq}
            queries={queries}
          />
          <hr />
        </div>
      );
      cards.push(curCard);
    }

    return cards;
  };

  const categoryCards = buildCards(dataFromConfig);
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);

    await fetch('http://localhost:3333/configDash', {
      method: 'POST',
      body: data
    });
  }

  React.useEffect(() => {
    fetchData();
  }, []);

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
          <div id="categories">
            <FormGroup>
              <Label for="categories">
                <h4>Categories</h4>
              </Label>
              {categoryCards}
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
