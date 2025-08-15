import { Box } from "@chakra-ui/react";
import bgImage from "../assets/hmi.jpg";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Background = ({ children }: Props) => {
  return (
    <Box
      position="relative"
      width="100%"
      height="auto"
      maxWidth="1200px"
      margin="0 auto"
    >
      {/* Background image as a layer */}
      <Box
        backgroundImage={`url(${bgImage})`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        width="100%"
        paddingTop="56.25%" // Aspect ratio trick (e.g. 16:9)
      />

      {/* Children like Property overlays */}
      <Box position="absolute" top={0} left={0} width="100%" height="100%">
        {children}
      </Box>
    </Box>
  );
};

export default Background;
