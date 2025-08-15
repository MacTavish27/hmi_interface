import { Button } from "@chakra-ui/react";

interface Props {
  top: string;
  left: string;
  status: boolean;
  onClick: () => void;
}

const ProcessButton = ({ left, top, status, onClick }: Props) => {
  return (
    <Button
      position="absolute"
      top={top}
      left={left}
      onClick={onClick}
      rounded="full"
      w="60px"
      h="60px"
      bgColor={status ? "red" : "green"}
    >
      {status ? "Stop" : "Start"}
    </Button>
  );
};

export default ProcessButton;
