import React, { useContext } from 'react';
import { shallow, mount } from 'enzyme';
import fetchCatData from './fetchCatData'
import fetchProjData from './fetchProjData'
import ProjectSelect from '../src/display/Components/ProjectSelect'
import UserDashboard from '../src/display/Components/UserDashboard'
import VertColViz from '../src/display/Components/VertColViztsx';
import TimeViz from '../src/display/Components/TimeViztsx';
import renderer from 'react-test-renderer';
import ProjectContext, { useProjectContext } from './mockContext'
import * as ProjectContextModule from "./mockContext";
import { stratify } from 'd3';

const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });


describe('<ProjectSelect/>', () => {
  global.fetch = fetchProjData;
  let wrapper;
  let context = { project: "default" }
  it('Should render <ProjectSelect />', () => {
    jest.spyOn(ProjectContextModule, "useProjectContext").mockImplementation(() => ({
      project: ""
    }))
    wrapper = shallow(
      <ProjectContext.Provider>
        <UserDashboard /> {context}
      </ProjectContext.Provider>
    );
    expect(wrapper).toBeDefined();
  })
})

describe('<UserDashboard/>', () => {
  global.fetch = fetchCatData;
  let wrapper;
  let context = { project: "default" }
  it('Should render <UserDashboard />', () => {
    jest.spyOn(ProjectContextModule, "useProjectContext").mockImplementation(() => ({
      project: "default"
    }))
    wrapper = shallow(
      <ProjectContext.Provider>
        <UserDashboard /> {context}
      </ProjectContext.Provider>
    );
    expect(wrapper).toBeDefined();
  })
})

describe('<VertColViz/>', () => {
  let wrapper;
  let context = { project: "default" }
  const props = {
    dataCat: { "test": [{ time: "str", response: { key: "value" }, timing: [0, 3333] }] },
  }
  it('Should render <VertColViz />', () => {
    wrapper = shallow(<VertColViz {...props} />, { context })
    expect(wrapper).toBeDefined();
  })
})

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