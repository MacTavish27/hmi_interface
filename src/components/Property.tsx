import { VStack, HStack, Input, Text } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

interface Props {
  id?: string;
  top?: string;
  left?: string;
  pv_value?: string;
  op_value?: string;
  onSubmit: (value: number) => void;
}

const Property = ({
  id,
  top = "0",
  left = "0",
  pv_value = "",
  op_value = '0',
  onSubmit,
}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState(op_value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  // Update placeholder when props.op_value changes (e.g. from POST result)
  useEffect(() => {
    setPlaceholder(op_value.toString());
  }, [op_value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const parsed = parseFloat(inputValue);
      if (!isNaN(parsed)) {
        onSubmit(parsed);
        setPlaceholder(parsed.toString());
        setInputValue(""); // Clear input
        inputRef.current?.blur();
      }
    }
  };

  return (
    <VStack
      width="100px"
      height="80px"
      id={id}
      alignItems="flex-start"
      justifyContent="center"
      border="1px solid"
      p={2}
      fontSize="12px"
      position="absolute"
      top={top}
      left={left}
      borderColor="gray.400"
      background="white"
    >
      <Text>PV: {pv_value}</Text>
      <HStack>
        <Text>OP:</Text>
        <Input
          ref={inputRef}
          value={inputValue}
          placeholder={placeholder}
          border="none"
          fontSize="12px"
          height="20px"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </HStack>
    </VStack>
  );
};

export default Property;
