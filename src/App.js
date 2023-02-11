import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardActionArea, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import Autocomplete from "@mui/material/Autocomplete";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin: 10px;
`;

const options = [
  "Stars",
  "Watchers Count",
  "Score",
  "Name",
  "Created At",
  "Updated At",
];
const App = () => {
  const [sortData, setSortData] = useState("");
  const [cardData, setCardData] = useState([]);
  const [query, setQuery] = useState("");

  const fetchCardDetails = async () => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}`
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
    const num = e.target.value;
    if (num.length <= 250) setQuery(num);
  };

  const handleSortChange = (event, newValue) => {
    setSortData(newValue);
    const sortedRepos = sortRepos(cardData, newValue);
    setCardData(sortedRepos);
  };

  const handleSearch = () => {
    if (query.trim().length) {
      fetchCardDetails();
    }
  };

  const handleClearQuery = () => {
    setQuery("");
    setCardData([]);
    setSortData("");
  };

  const sortRepos = (cardData, sortBy) => {
    return cardData.sort((a, b) => {
      console.log(sortBy);
      switch (sortBy) {
        case "Stars":
          return b.stargazers_count - a.stargazers_count;
        case "Watchers Count":
          return b.watchers_count - a.watchers_count;
        case "Score":
          return b.score - a.score;
        case "Name":
          return a.name.localeCompare(b.name);
        case "Created At":
          return new Date(b.created_at) - new Date(a.created_at);
        case "Updated At":
          return new Date(b.updated_at) - new Date(a.updated_at);
        default:
          return 0;
      }
    });
  };

  return (
    <div style={{ marginTop: 40 }} className="github-repo-explorer">
      <Box
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: 1000 }}>
            <TextField
              autoComplete="off"
              color="primary"
              value={query}
              onChange={handleQueryChange}
              fullWidth
              label="Search Input"
              id="searchQuery"
              width={800}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              onBlur={handleSearch}
              InputProps={{
                endAdornment: (
                  <>
                    {query !== "" && (
                      <IconButton
                        aria-label="Clear search input"
                        color="white"
                        onClick={handleClearQuery}
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                    <IconButton
                      aria-label="Open drawer"
                      color="white"
                      onClick={() => handleSearch()}
                    >
                      <SearchOutlinedIcon />
                    </IconButton>
                  </>
                ),
              }}
            />
          </div>
          <div style={{ marginLeft: 10 }}>
            <Autocomplete
              disabled={!cardData.length}
              id="filter-demo"
              options={options}
              getOptionLabel={(option) => option}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} value={sortData} label="Filter On" />
              )}
              onChange={handleSortChange}
            />
          </div>
        </div>
      </Box>
      <GridContainer>
        {cardData.map((val) => {
          return (
            <Card
              style={{ margin: "10px", marginLeft: "15px" }}
              sx={{ height: 420, width: 420 }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="240px"
                  image={val.owner.avatar_url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`Stars: ${val.name}`}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {`Stars: ${val.stargazers_count}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Description: ${val.description}`}
                  </Typography>
                  <Typography
                    style={{ marginTop: 12 }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {`Language: ${val.language}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </GridContainer>
    </div>
  );
};

export default App;
