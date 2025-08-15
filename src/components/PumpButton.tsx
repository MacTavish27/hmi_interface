import { Button } from "@chakra-ui/react";
import { useState } from "react";

const PumpButton = () => {
  const [statusP1, setStatusP1] = useState(false);
  return (
    <Button onClick={() => setStatusP1(!statusP1)}>
      {(statusP1 && "Stop") || "Start"}
    </Button>
  );
};

export default PumpButton;
