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
import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';
import Category from './Category.jsx';
// import { ProjectContext } from './Context/ProjectContext';

const CategoriesContainer = props => {
  // const [profileState, setProfileState] = useState({});
  const [catsBuilt, setCatsBuilt] = useState(false);
  const [catsArrFilled, fillCatsArr] = useState(false);
  const [catsArr, setCatsArr] = useState([]);
  const [dataFromConfig, setDataFromConfig] = useState(props.configData);
  const [renderOutput, setRenderOutput] = useState('');
  const [catDataOutput, setCatDataOutput] = useState([]);
  const { value, bind, reset } = useInput('');

  const handleSubmit = evt => {
    evt.preventDefault();
    alert(`Submitting Config ${value}`);
    reset();
  };

  const categoryBuiltArray = [];
  const propTest = JSON.stringify(props.configData);
  const propObj = JSON.parse(propTest);
  console.log('this is propObj', propObj);
  console.log('this is configData', props.configData);
  console.log(categoryBuiltArray);

  // declaring an array to collect each set of data by category

  if (!catsArrFilled) {
    const catEntries = Object.entries(propObj);
    // eslint-disable-next-line no-restricted-syntax
    for (const [categories, data] of catEntries) {
      if (categories === 'categories') {
        console.log(categories, data);
        // declare catElement for storing category data

        const catSet = Object.entries(data);
        for (const [category, catData] of catSet) {
          const catElement = [];
          // pushing name of category to catElement to be used later
          catElement.push(category);
          // console.log(category);
          // catData.queries.forEach(query => {
          //   // console.log(query);
          // });
          catElement.push(catData.queries);
          catElement.push(catData.frequency);
          // console.log(catElement);
          catsArr.push(catElement);
          setRenderOutput(catsArr);
          console.log(catsArr);
        }
      }
    }
    if (catsArr.length > 0) {
      fillCatsArr(true);
    }
  }
  console.log(catsArr);
  // function getCategoryCard(cat) {
  //   console.log('CAT!!!', cat);
  //   categoryBuiltArray.push(<Category key={cat[0]} name={cat[0]} queries={cat[1]} freq={cat[2]} />);
  // }
  const catSlice = catsArr.slice();
  const outputArrData = [];
  catSlice.forEach(cat =>
    outputArrData.push(<Category key={cat[0]} name={cat[0]} queries={cat[1]} freq={cat[2]} />)
  );

  function buildCats() {
    // if (catsArrFilled) {
    console.log(`cats: ${catsArr}`);
    setCatsBuilt(!catsBuilt);
    console.log(catsArr.map(category => getCategoryCard(category)));
    catsArr.map(category => getCategoryCard(category));
    // }
  }

  useEffect(() => {
    setDataFromConfig(dataFromConfig);
    console.log('sup');
    if (!catsBuilt) {
      buildCats();
      console.log('...waiting');
    }
    console.log(categoryBuiltArray);
  }, []);

  // const buildCards = categoryData => {
  //   const cards = [];
  //   const dataArr = Object.entries(categoryData);
  //   const catArr = [...dataArr];
  //   const cats = Object.entries({ ...catArr[1] });
  //   console.log(cats);
  //   for (let i = 0; i < cats.length; i += 1) {
  //     // iterate through cats and create array of child components
  //     // pass down props needed
  //     let catName = cats[i][0];
  //     let catFreq = cats[i][1].frequency.toString();
  //     console.log(typeof catFreq);
  //     let queries = [];
  //     let queryObj = Object.values(cats[i][1].queries);
  //     cats[i][1].queries.forEach(el => queries.push(el));
  //     // console.log(queries);
  //     let curCard = (
  //       <div id={catName} key={catName}>
  //         <Category
  //           catData={categoryData}
  //           key={i}
  //           catName={catName}
  //           catFreq={catFreq}
  //           queries={queries}
  //         />
  //         <hr />
  //       </div>
  //     );
  //     cards.push(curCard);
  //   }

  //   return cards;
  // };
  // const categoryCards = buildCards(dataFromConfig);
  // const propTest = JSON.stringify(configData);
  // const propObj = JSON.parse(propTest);
  // console.log('this is propObj', propObj);
  // console.log('this is configData', configData);

  // const buildCatCards = () => {
  //   console.log(`cats: ${propObj.categories}`);
  //   setCatsBuilt(true);
  //   return catsArr.map(category => getCategoryCard(category));
  // };

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
        <Category categories={catsArr} configData={props.configData} />
      </div>
    </div>
  );
};
export default CategoriesContainer;
