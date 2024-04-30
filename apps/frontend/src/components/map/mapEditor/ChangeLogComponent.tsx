import {Button, Stack, SxProps, Theme} from "@mui/material";
import GraphManager from "../../../common/GraphManager.ts";

interface ChangeLogComponentProps {
  sx?: SxProps<Theme>;
}

export default function ChangeLogComponent(props: ChangeLogComponentProps) {
  return (
    <Stack
      sx={props.sx}
    >
      <Button
        variant={"contained"}
        style={{
          width: "100%",
        }}
        onClick={() => GraphManager.getInstance().sync()}
      >
        Sync Changes
      </Button>
    </Stack>
  );
}
