import React from 'react';
import { shallow } from 'enzyme';
import {Home} from './Home';

it('renders without crashing', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper).toContainReact(<h2>Homer</h2>);
});
