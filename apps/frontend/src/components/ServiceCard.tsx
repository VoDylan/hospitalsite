import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

interface ServiceProps {
  service: string;
  imagePath: string;
  imageAlt: string;
}

export function ServiceCard(props: ServiceProps) {
  return (
    <Card
      sx={{
        maxWidth: 360,
        maxHeight: 400,
      }}
    >
      <CardActionArea>
        <CardMedia
          component={"img"}
          image={props.imagePath}
          alt={props.imageAlt}
        />
        <CardContent>
          <Typography variant={"body2"}>{props.service}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
