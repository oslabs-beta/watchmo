import * as React from 'react';
import { shallow } from 'enzyme';
import TimeViz from '../src/display/Components/TimeViztsx';
import renderer from 'react-test-renderer';
import { stratify } from 'd3';

const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });

describe('<TimeViz/>', () => {
    let wrapper;
    const props = {
        timeData: { "test": [{ time: "str", response: { key: "value" }, timing: [0, 3333] }] },
        selectedQueries: ["test"],
    }
    it('Should render <TimeViz />', () => {

        wrapper = shallow(< TimeViz {...props} />)
        expect(wrapper).toBeDefined();
    })

})