import React from "react";
import { configure, mount } from "enzyme";
import SearchBox from "./SearchBox";

import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// mock function to see if it was called
const requestSearch = jest.fn();

let wrapper;
beforeEach(() => {
  wrapper = mount(<SearchBox requestSearch={requestSearch} />);
});
afterEach(() => {
  jest.clearAllMocks();
});

// verify that the component renders
describe("<SearchBox />", () => {
  it("component renders correctly", () => {
    // if button is rendered
    expect(wrapper.find("#search-button")).toBeTruthy();

    // if search input is renderd
    expect(wrapper.find("input").at(0)).toBeTruthy();

    // if test input is rendered
    expect(wrapper.find("input").at(1)).toBeTruthy();
  });

  describe("input value", () => {
    it("updates on change", () => {
      const searchInput = wrapper.find("input").first();

      searchInput.simulate("change", { target: { value: "test" } });
      expect(searchInput.instance().value).toBe("test");
    });
  });

  describe("search button", () => {
    describe("with empty query", () => {
      it("does not trigger requestSearch function", () => {
        const searchButton = wrapper.find("#search-button");
        searchButton.simulate("click");
        expect(requestSearch).not.toHaveBeenCalled();
      });
    });

    describe("with data inside query", () => {
      it("triggers requestSearch function", () => {
        const searchButton = wrapper.find("#search-button");
        const searchInput = wrapper.find("input").first();

        searchInput.simulate("change", { target: { value: "test" } });
        searchButton.simulate("click");
        expect(requestSearch).toHaveBeenCalled();
      });
    });
  });
});
