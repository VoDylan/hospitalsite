import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import {Stack} from "@mui/material";

function SearchBar() {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ECECEC",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    height: "100%",
    color: "#1976d2",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const results = [
    "Flower Delivery"
  ];

  const [value, setValue] = useState<string | null>("");

  const handleSelectedValue = (selectedValue: string | null) => {
    if (selectedValue) {
      console.log(`Selected value: ${selectedValue}`);
      // Do something with the selected value, e.g., navigate, fetch data, etc.
    }
  };

  return (
    <Search>
      <Autocomplete
        id="free-solo-demo"
        value={value}
        onChange={(event, newValue: string | null) => {
          setValue(newValue);
          handleSelectedValue(newValue); // handle the selected value here
        }}
        freeSolo
        options={results}
        renderInput={(params) => (
          <TextField
            {...params}
            id={"standard-basic"}
            label="Search"
            focused={false}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                </>
              ),
            }}
          />
        )}
        sx={{
          width: "15vw"
        }}
      />
    </Search>
  );
}

export default SearchBar;
