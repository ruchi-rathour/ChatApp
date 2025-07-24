import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!user) return null;

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
          variant="ghost"
          _hover={{ bg: "blue.50", color: "blue.600", transform: "scale(1.1)" }}
          transition="all 0.2s"
        />
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          h="410px"
          bg="white"
          boxShadow="xl"
          borderRadius="lg"
          px={4}
        >
          <ModalHeader
            fontSize="2xl"
            fontWeight="bold"
            fontFamily="Work Sans"
            textAlign="center"
            color="blue.700"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-evenly"
            gap={4}
          >
            <Image
              borderRadius="full"
              boxSize="120px"
              src={user.pic}
              alt={user.name}
              boxShadow="lg"
            />
            <Box
              bg="gray.100"
              p={3}
              borderRadius="md"
              w="100%"
              textAlign="center"
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontFamily="Work Sans"
                color="gray.700"
              >
                📧 Email: <strong>{user.email}</strong>
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              px={6}
              _hover={{ bg: "blue.600" }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
