import React from 'react';
import ReactDOM from 'react-dom';
import VertColViz from '../VertColViz';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VertColViz />, div);
    ReactDOM.unmountComponentAtNode(div);
});
