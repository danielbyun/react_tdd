import React, { useState } from "react";
import styled from "styled-components";
import SearchButton from "./SearchButton";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchBox = ({ requestSearch }) => {
  const [query, setQuery] = useState("");

  const searchClick = () => {
    if (query) {
      requestSearch(query);
    }
  };

  const updateQuery = (e) => {
    const { value } = e.target;

    setQuery(value);
  };
  return (
    <Container>
      <input
        id="search"
        type="text"
        name="search"
        placeholder="Search"
        value={query}
        onChange={updateQuery}
      />
      <input type="text" placeholder="Test" />
      <SearchButton
        id="search-button"
        data-testid="search-button"
        onClick={searchClick}
      />
    </Container>
  );
};

export default SearchBox;
