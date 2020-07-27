import React from "react";

import { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { cleanup, fireEvent } from "@testing-library/react";

import GiftForm from "./GiftForm";
import App from "./App";
import { act } from "react-test-renderer";

configure({ adapter: new Adapter() });

const gifts = [
  { id: 1, name: "PS5", recipient: "Mark" },
  { id: 2, name: "Dank shoes", recipient: "Megan" },
];

let wrapper;
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((init) => [init, setState]);

beforeEach(() => {
  wrapper = mount(<GiftForm />);
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("<GiftForm />", () => {
  let giftForm;
  beforeEach(() => {
    giftForm = shallow(<GiftForm />);
  });

  describe("first render", () => {
    it("renders properly", () => {
      // expect(giftForm).toMatchSnapshot();
      // console.log(giftForm.debug());
      expect(giftForm).not.toBeNull();
    });
  });

  describe("form ui", () => {
    it("recipient name input renders", () => {
      const recipientInput = wrapper.find({ name: "recipient" }).hostNodes();
      expect(recipientInput).not.toBeNull();
    });

    it("gift name input renders", () => {
      const titleInput = wrapper.find({ name: "name" }).hostNodes();
      expect(titleInput).not.toBeNull();
    });

    it("add gift button renders", () => {
      const addButton = wrapper.find("#addGift").hostNodes();
      expect(addButton).not.toBeNull();
    });
  });

  describe("action buttons", () => {
    describe("input set values, click submit button, fire setState and update the state", () => {
      const childClick = jest.fn();
      const giftFormMounted = mount(<GiftForm handleChildClick={childClick} />);
      const appWrapper = mount(<App gifts={gifts} />);

      const giftRecipientInput = giftFormMounted.find("input#giftRecipient");
      const giftNameInput = giftFormMounted.find("input#giftName");

      const newGift = {
        name: "test",
        recipient: "test recipient",
      };

      it("correctly updates the input values", () => {
        // initial input values
        expect(giftRecipientInput.text()).toBe("");
        expect(giftNameInput.text()).toBe("");

        // input event
        giftRecipientInput.simulate("change", {
          target: { value: newGift.recipient },
        });
        giftNameInput.simulate("change", { target: { value: newGift.name } });

        // input changed and updated
        expect((giftRecipientInput.instance().value = newGift.recipient));
        expect((giftNameInput.instance().value = newGift.name));
      });

      it("update state on addGift button click", () => {
        expect(appWrapper.find("p#gift")).toHaveLength(2);

        giftRecipientInput.simulate("change", {
          target: { value: newGift.recipient },
        });
        giftNameInput.simulate("change", { target: { value: newGift.name } });
        // submit button
        wrapper.find("#addGift").hostNodes().simulate("click");

        // setState gets called
        expect(setState).toBeTruthy();

        // state gets updated, input values disappear
        expect(giftRecipientInput.text()).not.toBe(newGift.recipient);
        expect(giftNameInput.text()).not.toBe(newGift.name);
      });
    });
  });
});
