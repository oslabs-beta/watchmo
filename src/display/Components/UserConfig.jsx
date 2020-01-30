import * as React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ConfigDashboard from './ConfigDashboard';

// typescript: testing heading and caption
const UserConfig = () => {
  // setting the state for the drop down button with typescript
  const [dropdownCatOpen, setCatOpen] = React.useState;

  // function that is in charge of changing the state
  const toggleCat = () => {
    setCatOpen(!dropdownCatOpen);
  };

  // request file from backend and loop through categories to create category selectors
  // replace this arrayOfCategories with logic that parses the response object into specific cats
  const arrayOfCategories = ['Cat 1', 'Cat 2', 'Cat 3'];
  const categories = [];
  for (let i = 0; i < arrayOfCategories.length; i += 1) {
    categories.push(<DropdownItem key={i}> {arrayOfCategories[i]} </DropdownItem>);
  }
  return (
    <div id="UserConfig">
      <h1> User Config </h1>
      <button type="button" className="userDashboard">
        Back to User Dashboard
      </button>
      <div className="configCategoriesDrop">
        <ButtonDropdown isOpen={dropdownCatOpen} toggle={toggleCat}>
          <DropdownToggle caret color="primary">
            Categories:
          </DropdownToggle>
          <DropdownMenu>{categories}</DropdownMenu>
        </ButtonDropdown>
      </div>
      <div>
        <ConfigDashboard />
      </div>
    </div>
  );
};

export default UserConfig;
