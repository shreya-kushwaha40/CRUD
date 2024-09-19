import React, { useState } from 'react';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import UserTable from './components/UserTable';
import AddUserForm from './components/AddUserForm';

function App() {
  const [users, setUsers] = useState([]);


  const addUser = (user) => {
    setUsers([...users, { ...user, id: Date.now() }]);
  };


  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <ChakraProvider>
     <Box
        minHeight="100vh"
        backgroundImage="url('/ss.png')" 
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        flexDirection="column"
        p={5}
      >
        <Heading as="h2" size="lg" mb={5} color={'white'}>User Management App</Heading>
        <AddUserForm addUser={addUser} />
        <UserTable users={users} deleteUser={deleteUser} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
