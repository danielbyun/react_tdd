import { act, renderHook } from "@testing-library/react-hooks";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MockAdapter from "axios-mock-adapter";

import { usePokemonAxios } from "./usePokemonAxios";

import axios from "axios";

configure({ adapter: new Adapter() });

// jest.mock("axios");

const getControlledPromise = () => {
  let deferred;

  const promise = new Promise((resolve, reject) => {
    deferred = { resolve, reject };
  });
  return { deferred, promise };
};

describe("usePokemonAxios", () => {
  describe("testing functionalities", () => {
    it("perform get request", async () => {
      const mockData = "pikachu";
      const mock = new MockAdapter(axios);
      const url = "https://pokeapi.co/api/v2/pokemon/pikachu";

      mock.onGet(url).reply(200, mockData);

      const { result, waitForNextUpdate } = renderHook(() =>
        usePokemonAxios("pikachu")
      );

      expect(result.current.isLoading).toBeTruthy();
      expect(result.current.pokemon).toBe(null);

      await waitForNextUpdate();

      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.pokemon).toBe("pikachu");
    });
  });

  describe("while fetching data", () => {
    it("handle loading state correctly", async () => {
      const mockData = "pikachu";
      const mock = new MockAdapter(axios);
      const url = "https://pokeapi.co/api/v2/pokemon/pikachu";

      mock.onGet(url).reply(200, mockData);

      const { result, waitForNextUpdate } = renderHook(() =>
        usePokemonAxios("pikachu")
      );

      expect(result.current.isLoading).toBeTruthy();

      await waitForNextUpdate();

      expect(result.current.isLoading).toBeFalsy();
    });
  });

  describe("data is successfully fetched", () => {
    it("handles successful state correctly", async () => {
      const mockData = "ditto";
      const mock = new MockAdapter(axios);
      const url = "https://pokeapi.co/api/v2/pokemon/ditto";

      mock.onGet(url).reply(200, mockData);

      const { result, waitForNextUpdate } = renderHook(() =>
        usePokemonAxios("ditto")
      );

      await waitForNextUpdate();

      expect(result.current.pokemon).toStrictEqual("ditto");
    });
  });

  describe("error occurred while fetching data", () => {
    it("handles error state correctly", async () => {
      jest.mock("axios");

      const mockData = "fetching error";
      const mock = new MockAdapter(axios);
      const url = "https://pokeapi.co/api/v2/pokemon/ditto";

      mock.onGet(url).reply(500, mockData);

      const { result, waitForNextUpdate } = renderHook(() =>
        usePokemonAxios("ditto")
      );

      await waitForNextUpdate();

      expect(result.current.error).toEqual(
        new Error("Request failed with status code 500")
      );
    });
  });
});
