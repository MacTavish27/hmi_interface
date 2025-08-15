import { Box, VStack, Text } from "@chakra-ui/react";

interface Props {
  value: number;
  pressure?: number;
}
const Indicator = ({ value, pressure = 2 }: Props) => {
  return (
    <>
      <Text left="32%" top="28%" position="absolute" fontSize="14px">
        {pressure} bar
      </Text>
      <VStack
        width="24px"
        border="1px solid"
        borderColor="gray.400"
        borderRadius={5}
        overflow="hidden"
        height="100px"
        position="absolute"
        top="29%"
        left="28%"
      >
        <Box height={`${100 - value}%`} />
        <Box height={`${value}%`} bgColor="green.400" width="100%" />
      </VStack>
    </>
  );
};

export default Indicator;
