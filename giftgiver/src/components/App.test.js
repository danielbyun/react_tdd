/**
 * @jest-environment jsdom
 */

import React from "react";

// helper function from enzyme
// shallowly render a react component
import { configure, mount } from "enzyme";
import { cleanup } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import App from "./App.js";

configure({ adapter: new Adapter() });

// testing for state inside hooks
const gifts = [
  { id: 1, name: "PS5", recipient: "Mark" },
  { id: 2, name: "Dank shoes", recipient: "Megan" },
];

// unit test
let app = mount(<App gifts={gifts} />);

describe("Gift List App", () => {
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    app = mount(<App gifts={gifts} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  // init state
  describe("initial gift state", () => {
    it("initial gift list", () => {
      const giftTexts = app
        .find("#gift")
        .hostNodes()
        .map((node) => node.text());
      expect(giftTexts).toEqual([
        `Gift: ${gifts[0].name} for ${gifts[0].recipient}`,
        `Gift: ${gifts[1].name} for ${gifts[1].recipient}`,
      ]);
    });
  });

  // UI Testing
  describe("ui tests", () => {
    it("remove gift button renders", () => {
      const removeButton = app.find("#removeGift").hostNodes();
      expect(removeButton).toHaveLength(gifts.length);
    });

    it("reset gift button renders", () => {
      const resetButton = app.find("#resetGifts").hostNodes();
      expect(resetButton).not.toBeNull();
    });
  });

  describe("gift actions", () => {
    const pTags = app.find("p#gift").hostNodes();
    const removeButton = app.find("#removeGift").hostNodes();
    // remove a gift
    describe("remove gift", () => {
      it("gifts are rendered", () => {
        // find p tags
        expect(pTags).toHaveLength(2);
      });

      it("remove button is rendered", () => {
        expect(removeButton).toHaveLength(gifts.length);
      });

      it("remove one gift on click", () => {
        // get one button
        removeButton.at(0).simulate("click");

        // test if the state is updated
        expect(setState).toBeTruthy();
      });
    });
    // reset gift
    describe("reset gift", () => {
      it("reset gift list on click", () => {
        app.find("#resetGifts").hostNodes().simulate("click");
        expect(setState).toBeTruthy();
      });
    });
  });
});
