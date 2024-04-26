import {useParams} from "react-router-dom";

export default function TestRoute() {
  const {startnode, endnode} = useParams();

  console.log(startnode);
  console.log(endnode);

  return (
    <></>
  );
}
