import { Box, Stack, Typography } from "@mui/material";

function Legend() {
  // Define legend items
  const legendItems = [
    { label: "Item 1", color: "#FF0000" },
    { label: "Item 2", color: "#00FF00" },
    { label: "Item 3", color: "#0000FF" },
    // Add more items as needed
  ];

  return (
    <Box
      sx={{
        width: "14%",
        height: "40%",
        backgroundColor: "white",
        display: "flex",
        alignItems: "top",
        justifyContent: "start",
        position: "fixed",
        right: "1%",
        top: "14%",
        marginTop: "1%",
        borderRadius: "1%",
        border: "3px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <Stack direction={"column"} sx={{ marginLeft: "6%", marginTop: "4%" }}>
        {/* Title */}
        <Typography
          color={"#767674"}
          fontStyle={"Open Sans"}
          fontSize={20}
          sx={{ marginBottom: "4%" }} // Add margin to separate title from items
        >
          Map Symbols
        </Typography>

        {/* Render legend items */}
        {legendItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "2%", // Adjust spacing between items
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: item.color,
                marginRight: "8px", // Adjust spacing between color box and label
              }}
            ></div>
            <Typography>{item.label}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default Legend;
