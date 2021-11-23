import React, {Component} from 'react';
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import mySvg from '../images/background.png';
    import svg2 from '../bg-login4.png';

  function Forgot() {
    return (
        <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      position={'relative'} backgroundImage={`url(${mySvg})`} backgroundPosition="center"
      backgroundSize="cover" backgroundRepeat="no-repeat" width="100vw">
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          ¿Olvidaste tu contraseña?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
            Ingresa el correo asociado a tu cuenta
        </Text>
        <FormControl id="email">
          <Input
            placeholder="email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"#FF5757"}
            color={'white'}
            _hover={{
              bg: 'black',
            }}>
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
     )
 
}
export default Forgot;