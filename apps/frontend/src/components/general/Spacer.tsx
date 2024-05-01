interface SpacerProps {
  vertical?: boolean
  spaceLength: string | number
}

export default function Spacer(props: SpacerProps) {
  return (
    (
      props.vertical ?
        <div
          style={{
            width: props.spaceLength,
            height: "100%",
          }}
          aria-hidden={true}
        ></div>
      :
        <div
          style={{
            width: "100%",
            height: props.spaceLength,
          }}
          aria-hidden={true}
        ></div>
    )
  );
}
