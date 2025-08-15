import { Status } from "@chakra-ui/react";
import { postModel } from "../services/api-client";

interface Props {
  status: boolean;
  top: string;
  left: string;
  id: string;
}
const PumpStatus = ({ status, top, left, id }: Props) => {
  const handleClick = () => {
    const attribute = status ? "stop" : "start";
    const value = 0;

    try {
      postModel(id.toLowerCase(), attribute, value);
      console.log(`Pump ${id} ${attribute} command sent`);
    } catch (err) {
      console.error("Failed to send pump command", err);
    }
  };
  return (
    <Status.Root
      colorPalette={status ? "green" : "red"}
      position="absolute"
      left={left}
      top={top}
      size="lg"
      onClick={handleClick}
      cursor="pointer"
    >
      <Status.Indicator />
    </Status.Root>
  );
};

export default PumpStatus;
