/* eslint-disable guard-for-in */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
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
import { useInput } from '../../js/input-hook';
import { Link } from 'react-router-dom';
import { runtime } from 'regenerator-runtime';
import '../stylesheets/style.scss';
import { render } from 'react-dom';
// import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';
import Category from './Category.jsx';
// import { ProjectContext } from './Context/ProjectContext';

const CategoriesContainer = props => {
  // const [profileState, setProfileState] = useState({});
  const [catsBuilt, setCatsBuilt] = useState(false);
  const [catsArrFilled, fillCatsArr] = useState(false);
  const [catsArr, setCatsArr] = useState([]);
  // const [dataFromConfig, setDataFromConfig] = useState(props.configData);
  const [renderOutput, setRenderOutput] = useState('');
  const [catDataOutput, setCatDataOutput] = useState([]);
  const { value, bind, reset } = useInput('');

  // declaring an array to collect each set of data by category
  const localCats = [];
  if (!catsArrFilled) {
    for (const category in props.configData.categories) {
      const lilCats = {};
      lilCats.name = category;
      lilCats.queries = props.configData.categories[category].queries;
      lilCats.frequency = props.configData.categories[category].frequency;
      localCats.push(lilCats);
    }
  }

  return (
    <div className="category">
      {/* <div className="blocks_loop">{categories.map(category => getCategoryCard(category))}</div> */}
      {/*
         <Category
          catData={dataFromConfig}
          key={i}
      catName={catName}
      catFreq={catFreq}
      queries={queries}
      /> */}
      <hr />
      <div>
        <Category
          categories={localCats}
          configData={props.configData}
          queryChange={props.queryChange}
          freqChange={props.freqChange}
        />
      </div>
    </div>
  );
};
export default CategoriesContainer;
