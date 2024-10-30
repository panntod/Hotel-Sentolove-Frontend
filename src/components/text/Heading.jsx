import { Heading as HeadingText } from "@chakra-ui/react";

export default function Heading(props) {
  return (
    <HeadingText
      as="h1"
      size="lg"
      fontWeight={600}
      color={"blue.500"}
      fontFamily={"Poppins"}
      textTransform={props.textTransform}
    >
      {props.text}
    </HeadingText>
  );
}
