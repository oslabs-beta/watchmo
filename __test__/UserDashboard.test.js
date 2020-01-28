import * as React from 'react';
import { shallow } from 'enzyme';
import UserDashboard from '../../src/display/Components/UserDashboard';
import renderer from 'react-test-renderer';

// setup file
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
Enzyme.configure({ adapter: new Adapter() });

describe('<UserDashboard />', () => {
    let wrapper;
    it('Should render <UserDashboard />', () => {
        // test file syntax
        wrapper = shallow(<UserDashboard />)
        expect(wrapper).toBeDefined();
    })

    it('should render correctly with no props', () => {
        const UserDashboardComponent = renderer.create(<UserDashboard />).toJSON();
        expect(UserDashBoardComponent).toMatchSnapshot();
    })
})