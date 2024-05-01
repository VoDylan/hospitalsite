import { Card, CardMedia, Box, Typography, Stack, CardActions} from "@mui/material";

interface PurchaseProps {
  imagePath: string;
  title: string;
  description: string;
}

export function PurchaseCard(props: PurchaseProps) {
  return (
    <CardActions style={{ marginTop: "auto", justifyContent: "center" }}>
        <Box
          component={Card}
          sx={{
            boxShadow: 3,
            display: "flex",
            width: "200px", // Set the width of each card
            height: "250px" // Set the height of each card
            }}
        >
          <Box sx={{ position: "relative", display: "flex", backgroundColor: "#186BD9" }} >
            <Stack>
              <CardMedia
                component={"img"}
                image={props.imagePath}
                sx={{ objectFit: "fill", width: "200px", height: "140px", display: "flex", marginBottom: "15px"}} // Ensure the image fills the entire card
              />
              <Typography
                gutterBottom variant="h5" component="div"
                sx={{
                  textAlign: "center",
                  color: "white"
                }}
              >
                {props.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  marginLeft: "5%",
                  marginRight: "5%",
                  color: "white"
                }}
              >
                {props.description}
              </Typography>
            </Stack>
          </Box>
        </Box>
    </CardActions>
  );
}
