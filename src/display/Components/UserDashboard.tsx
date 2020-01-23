import * as React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


//typescript: testing heading and caption
const UserDashboard: React.FC = () => {
    //setting the state for the drop down button with typescript
    const [dropdownCatOpen, setCatOpen] = React.useState<boolean>(false);
    const [dropdownDateOpen, setDateOpen] = React.useState<boolean>(false);

    //function that is in charge of changing the state
    const toggleCat = (): void => {
        setCatOpen(!dropdownCatOpen);
    }
    const toggleDate = (): void => {
        setDateOpen(!dropdownDateOpen);
    }

    return (
        <div id='UserDashboard'>
            <h1> User Dashboard  </h1>
            <button className="configButton">CONFIG</button>
            <div className="categoriesDrop">
                <ButtonDropdown isOpen={dropdownCatOpen} toggle={toggleCat}>
                    <DropdownToggle caret color="primary">
                        Catagories:
  </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Category 1</DropdownItem>
                        <DropdownItem> Category 2 </DropdownItem>
                        <DropdownItem>Category 3</DropdownItem>
                        <DropdownItem>Category 4</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>

                <ButtonDropdown isOpen={dropdownDateOpen} toggle={toggleDate}>
                    <DropdownToggle caret color="info">
                        Dates:
  </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Date 1</DropdownItem>
                        <DropdownItem> Date 2 </DropdownItem>
                        <DropdownItem> Date 3 </DropdownItem>
                        <DropdownItem> Date 4 </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown></div>
        </div>
    )
}

export default UserDashboard;