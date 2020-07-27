import { useEffect, useState } from "react";
import axios from "axios";

export const usePokemonAxios = (pokemonName) => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // axios version
      try {
        await axios({
          method: "get",
          url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
        })
          .then((res) => {
            setPokemon(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err);
          });
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [pokemonName]);

  return { pokemon, error, isLoading };
};
