import { act, renderHook } from "@testing-library/react-hooks";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { usePokemonFetch } from "./usePokemonFetch";

configure({ adapter: new Adapter() });

const getControlledPromise = () => {
  let deferred;

  const promise = new Promise((resolve, reject) => {
    deferred = { resolve, reject };
  });

  return { deferred, promise };
};

describe("usePokemonFetch", () => {
  describe("testing functionalities", () => {
    it("fetches pokemon by the url constructed from pokemonName", async () => {
      global.fetch = jest.fn();
      await act(async () => renderHook(() => usePokemonFetch("ditto")));
      expect(global.fetch).toBeCalledWith(
        `https://pokeapi.co/api/v2/pokemon/ditto`
      );
    });
    describe("while fetching data using", () => {
      it("handles loading state correctly", async () => {
        const { deferred, promise } = getControlledPromise();
        global.fetch = jest.fn(() => promise);
        const { result, waitForNextUpdate } = renderHook(usePokemonFetch);

        expect(result.current.isLoading).toBe(true);
        deferred.resolve();

        await waitForNextUpdate();
        expect(result.current.isLoading).toBe(false);
      });
    });
    describe("when data is fetched successfully", () => {
      it("handles successful state correctly", async () => {
        const { deferred, promise } = getControlledPromise();
        global.fetch = jest.fn(() => promise);
        const { result, waitForNextUpdate } = renderHook(usePokemonFetch);

        deferred.resolve({ json: () => ({ pokemon: "ditto" }) });

        await waitForNextUpdate();

        expect(result.current.pokemon).toStrictEqual({ pokemon: "ditto" });
      });
    });
    describe("with an error during request", () => {
      it("handles error correctly", async () => {
        global.fetch = jest.fn(() => {
          return new Promise(() => {
            throw "fetch error";
          });
        });

        const { result, waitForNextUpdate } = renderHook(usePokemonFetch);
        await waitForNextUpdate();

        expect(result.current.error).toStrictEqual("fetch error");
      });
    });
  });
});
