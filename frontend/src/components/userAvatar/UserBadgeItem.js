import { CloseIcon } from "@chakra-ui/icons";
import {  Badge, Tooltip } from "@chakra-ui/react";


const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <Tooltip label="Remove user" hasArrow>
        <CloseIcon
          boxSize={2.5}
          cursor="pointer"
          _hover={{ color: "white.400", transform: "scale(1.1)" }}
          onClick={handleFunction}
        />
      </Tooltip>
    </Badge>
  );
};

export default UserBadgeItem;
