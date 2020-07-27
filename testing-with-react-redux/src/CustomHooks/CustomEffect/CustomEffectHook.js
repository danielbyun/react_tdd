import React, { Fragment } from "react";
import { usePokemonFetch } from "./usePokemonFetch";
import { usePokemonAxios } from "./usePokemonAxios";

const CustomEffectHook = () => {
  const { pokemon, isLoading, error } = usePokemonFetch("ditto");
  const {
    pokemon: pokemonAxios,
    isLoading: isLoadingAxios,
    error: errorAxios,
  } = usePokemonAxios("pikachu");

  if (isLoading || isLoadingAxios) {
    return <>Loading...</>;
  }

  if (error || errorAxios) {
    return <>Network error</>;
  }

  return (
    <Fragment>
      {pokemon !== null && (
        <>
          <img src={pokemon.sprites.front_default} alt="ditto" />
          <h1>{pokemon.species.name}</h1>
        </>
      )}
      {pokemonAxios !== null && (
        <>
          <img src={pokemonAxios.sprites.front_default} alt="pikachu" />
          <h1>{pokemonAxios.species.name}</h1>
        </>
      )}
    </Fragment>
  );
};

export default CustomEffectHook;
