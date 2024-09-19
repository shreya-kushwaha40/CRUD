import React, { useState } from 'react';
import { Input, Button, Stack } from '@chakra-ui/react';

const AddUserForm = ({ addUser }) => {
  const [user, setUser] = useState({ firstname: '', lastname: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.firstname && user.lastname && user.email) {
      addUser(user);
      setUser({ firstname: '', lastname: '', email: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={3}
        direction={{ base: 'column', md: 'row' }} 
        width="100%"  
      >
        <Input
          name="firstname"
          value={user.firstname}
          onChange={handleChange}
          placeholder="First Name"
          flexGrow={1} 
          color={'white'}
        />
        <Input
          name="lastname"
          value={user.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          flexGrow={1} 
          color={'white'} 
        />
        <Input
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          flexGrow={1}  
          color={'white'}
        />
        <Button colorScheme="blue" type="submit" flexShrink={0}>
          Add User
        </Button>
      </Stack>
    </form>
  );
};

export default AddUserForm;
