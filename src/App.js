import React, { useState } from "react";
import Box from "@mui/material/Box";
import SearchFieldWithFilters from "./Components/SearchBarWithFilters";
import Cards from "./Components/CardContainer";
import useStyles from "./App.styled";

const App = () => {
  const [cardData, setCardData] = useState([]);
  const [sortData, setSortData] = useState("");
  const [yourQuery, setYourQuery] = useState("");

  const classes = useStyles();
  const fetchCardDetails = async () => {
    // fetch data from the query api and store only the required values
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${yourQuery}`
    );
    const data = await response.json();
    const list = data.items.map((items) => {
      return {
        stargazers_count: items.stargazers_count,
        score: items.score,
        name: items.name,
        owner: items.owner,
        watchers_count: items.watchers_count,
        created_at: items.created_at,
        updated_at: items.updated_at,
        description: items.description,
        language: items.language,
      };
    });
    setCardData(list);
  };

  const handleQueryChange = (e) => {
    const query = e.target.value;
    setYourQuery(query);
  };

  const sortRepos = (cardData, sortBy) => {
    // sorts the cards based on the filter selected
    return cardData.sort((x, y) => {
      switch (sortBy) {
        case "Stars":
          return y.stargazers_count - x.stargazers_count;
        case "Watchers Count":
          return y.watchers_count - x.watchers_count;
        case "Score":
          return y.score - x.score;
        case "Name":
          return x.name.localeCompare(y.name);
        case "Created At":
          return new Date(y.created_at) - new Date(x.created_at);
        case "Updated At":
          return new Date(y.updated_at) - new Date(x.updated_at);
        default:
          return null;
      }
    });
  };

  const handleSortChange = (event, newValue) => {
    setSortData(newValue);
    const sortedRepos = sortRepos(cardData, newValue);
    setCardData(sortedRepos);
  };

  const handleSearch = () => {
    setSortData("");
    if (yourQuery.trim().length) {
      fetchCardDetails();
    }
  };

  const handleClearQuery = () => {
    setYourQuery("");
    setCardData([]);
    setSortData("");
  };

  return (
    <div className={classes.repoContainer} id="repo-explorer">
      <Box className={classes.searchFieldContainer}>
        <SearchFieldWithFilters
          handleQueryChange={handleQueryChange}
          query={yourQuery}
          handleSearch={handleSearch}
          handleClearQuery={handleClearQuery}
          handleSortChange={handleSortChange}
          sortData={sortData}
          cardData={cardData}
        />
      </Box>
      <Cards cardData={cardData} />
    </div>
  );
};

export default App;
