import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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
    color: "#009CA6",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const results = [
    {label: "Flower Delivery", link: "/services/FlowerDelivery"},
    {label: "Sanitation Service", link: "/services/SanitationService"},
    {label: "Medicine Delivery Service", link: "/services/MedicineDelivery"},
    {label: "Security Service", link: "/services/SecurityService"},
    {label: "Gift Delivery Service", link: "/services/GiftDelivery"},
    {label: "Medical Device Service", link: "/services/DeviceDeliveryService"},
    {label: "Room Scheduling Service", link: "/services/RoomScheduling"},
    {label: "Map Page", link: "/Map"},
    {label: "All Services", link: "/services"},
  ];

  const [value, setValue] = useState<string | null>("");

  const navigate = useNavigate();

  const handleSelectedValue = (selectedValue: string | null) => {
    if (selectedValue) {
      console.log(`Selected value: ${selectedValue}`);
      console.log(`Selected link: ${selectedValue.link}`);
      //@ts-expect-error The selected value's route works perfectly fine
      navigate(selectedValue.link);
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
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
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
