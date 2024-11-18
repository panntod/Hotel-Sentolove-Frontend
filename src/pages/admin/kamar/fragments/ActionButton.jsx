import { Flex } from "@chakra-ui/react";
import Delete from "./action/Delete";
import Edit from "./action/Edit";

export default function ActionButton({ payload }) {
  return (
    <Flex dir="row" gap={3}>
      <Edit payload={payload} />
      <Delete payload={payload} />
    </Flex>
  );
}
