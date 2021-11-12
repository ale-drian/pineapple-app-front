import { Button, Flex, Heading, Input, Image, Center } from '@chakra-ui/react';
import mySvg from '../bg-1.svg';

function Login() {

  return (
    <div
       className="someClassName"
       style={{ backgroundImage: `url(${mySvg})`,
       backgroundPosition: 'center',
       backgroundSize: 'cover',
       backgroundRepeat: 'no-repeat',
       width: '100vw',
       height: '100vh',
      position:'fixed'}}
    >
      
    <Flex height="80vh" alignItems="center" justifyContent="center" m={20} >
      <Flex bg="white" width="80%"  backgroundImage="url(https://i.ibb.co/6Zy05DV/bg-2.png)" 
      boxShadow="2xl" p={20} rounded={6} backgroundSize='cover' backgroundPosition='center'>
        <Flex direction="column" width="50vh" rounded={6} mt={10}  ml={30}>
        <Heading as="cite" mb={6} font="heading" color="#F2B705 " >Pineapple Supermarket</Heading>
          <Center>
              <Image
              borderRadius="10"
              width="100vh"
              src="https://i.ibb.co/HD8Rkht/img.png"
              alt="Inicia Sesión"
              mb={6}
            />
            </Center>
        </Flex>
        <Flex direction="column" width="50vh" background="white" boxShadow="2xl" p={20} ml={40} rounded={6}>
        <Heading mb={6}>Hola de Nuevo!</Heading>
          <Center>
              <Image
              borderRadius="10"
              boxSize="150px"
              src="https://i.ibb.co/YbnBfjn/logo-rojo.png"
              alt="Inicia Sesión"
              mb={6}
            />
            </Center>
            
            <Input colorScheme="yellow"  placeholder="user@pineaple.com" variant="filled" mb={3} type="email"/>
            <Input colorScheme="yellow" placeholder="*********" variant="filled" mb={6} type="password"/>
            <Button p={10} borderRadius="full" bg="#F2B705" colorScheme="yellow">Login</Button>
        </Flex>
        </Flex>
    </Flex>
    </div>
  );
}

export default Login;
