import React, { useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, Checkbox, Button, AlertDialog, AlertDialogBody,
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, Center
} from '@chakra-ui/react';

const UserTable = ({ users, deleteUser }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    onOpen();
  };

  const confirmDelete = () => {
    deleteUser(userToDelete.id);
    onClose();
  };

  return (
    <>
      <Table
        mt={5}
        p={4}
        backdropFilter="blur(10px)"
        bg="rgba(255, 255, 255, 0.2)"
        border="1px solid rgba(255, 255, 255, 0.3)"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        color={'white'}
      >
        <Thead>
          <Tr>
            <Th color={'white'}>Select</Th>
            <Th color={'white'}>First Name</Th>
            <Th color={'white'}>Last Name</Th>
            <Th color={'white'}>Email</Th>
            <Th color={'white'}>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Checkbox
                    isChecked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                    border='2px blue'
                  />
                </Td>
                <Td>{user.firstname}</Td>
                <Td>{user.lastname}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button colorScheme="red" onClick={() => handleDelete(user)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="5" textAlign="center">No users found</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered // Ensures the modal is centered
      >
        <AlertDialogOverlay>
          <Center h="100vh"> {/* Centering the modal vertically */}
            <AlertDialogContent
              p={4}
              backdropFilter="blur(10px)"
              bg="rgba(255, 255, 255, 0.2)"
              border="1px solid rgba(255, 255, 255, 0.3)"
              borderRadius="10px"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
              color={'white'}
            >
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete User
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this user?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Center>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default UserTable;
