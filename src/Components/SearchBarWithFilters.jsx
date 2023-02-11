import React from "react";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import { IconButton } from "@mui/material";
import { options } from "./Filter.constants";
import useStyles from "./SearchBarWithFilters.styled";

const SearchBar = (props) => {
  const {
    handleQueryChange,
    query,
    handleSearch,
    handleClearQuery,
    handleSortChange,
    sortData,
    cardData,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.searchFilterContainer}>
      <div className={classes.searchBar}>
        {/* Searchfield will work on onBlur || onKeyBoardEnter || using searchIcon,
        can be manipulated to work on each character change*/}
        <TextField
          autoComplete="off"
          color="primary"
          value={query}
          onChange={handleQueryChange}
          fullWidth
          label="Search Input"
          id="searchQuery"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onBlur={handleSearch}
          InputProps={{
            maxLength: 250, // Takes in only 250 characters
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
                  onClick={handleSearch}
                >
                  <SearchOutlinedIcon />
                </IconButton>
              </>
            ),
          }}
        />
      </div>
      <div className={classes.filterContainer}>
        {/* Field will be disabled unless there's some card data
        onChange will sort the cards accordingly*/}
        <Autocomplete
          disabled={!cardData.length}
          id="filter-demo"
          options={options}
          getOptionLabel={(option) => option}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Filter On" />}
          onChange={handleSortChange}
          value={sortData}
        />
      </div>
    </div>
  );
};

export default SearchBar;
