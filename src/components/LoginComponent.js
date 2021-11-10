import { Button, Flex, Heading, Input } from '@chakra-ui/react';

function Login() {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" width="450px" background="tomato" p={20} rounded={6}>
            <Heading mb={6}>Iniciar Sesion</Heading>
            <Input placeholder="user@pineaple.com" variant="filled" mb={3} type="email"/>
            <Input placeholder="*********" variant="filled" mb={6} type="password"/>
            <Button colorScheme="blue">Login</Button>
        </Flex>
    </Flex>
  );
}

export default Login;
