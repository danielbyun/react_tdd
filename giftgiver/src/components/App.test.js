import React from "react";

// helper function from enzyme
// shallowly render a react component
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App.js";

configure({ adapter: new Adapter() });

// unit test
const app = shallow(<App />);

it("renders correctly", () => {
  expect(app).toMatchSnapshot();
});
