import {AppBar, Box, Tabs, Typography} from "@mui/material";
import {useState} from "react";
import Tab from "@mui/material/Tab";

export default function CreditsPage() {
const [tabValue, setTabValue] = useState(0);
const handleChange = (event: React.ChangeEvent<object>, newValue: number) => {
  setTabValue(newValue);
};

return (
  <>
    <Box
      sx={{
        mt: 15,
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#003A96",
          position: "relative",
          height: "3.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: "90%",
        }}
      >
        <Typography variant={"h1"} color={"white"} fontSize={46}>
          Credits
        </Typography>
      </Box>

      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Credits Tabs"
        >
          <Tab label="Libraries" />
          <Tab label="Tools" />
          <Tab label="Frameworks" />
        </Tabs>
      </AppBar>

      <Box hidden={tabValue !== 0}>
        <Typography variant="body1">Content for Libraries tab</Typography>
      </Box>
      <Box hidden={tabValue !== 1}>
        <Typography variant="body1">Content for Tools tab</Typography>
      </Box>
      <Box hidden={tabValue !== 2}>
        <Typography variant="body1">Content for Frameworks tab</Typography>
      </Box>
    </Box>
  </>
);
}
