// Import React 
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
// Import services
import { useAuthContext } from '../App';
import { types } from '../auth/authReducer';
import UserService from '../services/UserService';
// Import Designe 
import {
  Box, Stack, Heading, Text, Container, Input, Button, SimpleGrid, Center, Image, FormControl, FormErrorMessage, InputGroup, InputRightElement, Link, useToast
} from '@chakra-ui/react';

// Import Icons
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// Import Images 
import mySvg from '../images/background.png';
import svg2 from '../bg-login4.png';

// Component Login
const Login = () => {

  const navigate = useNavigate(); //Navegacion Route
  const [show, setShow] = useState(false) //Mostrar ocultar contraseña
  const handleClick = () => setShow(!show) //Mostrar ocultar contraseña

  const {
    dispatch
  } = useAuthContext(); //Contexto Global de autenticacion

  const toast = useToast(); //Hook de chacra para el manejo de toast

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm(); //manejo de formularios con react-hook-form

  function onSubmit(data, e) {
    UserService.login(data).then(result => {
      if (!result.error && result.status === 200) {
        toast({
          title: "Login Correcto",
          position: "top-right",
          isClosable: true,
          status: "success",
          duration: 3000,
        })
        dispatch({
            type: types.login,
            payload: result.data.data
        })
        navigate("/dashboard");
      } else {
        // console.log(result.data.error)
        toast({
          title: "Creadenciales incorrectas",
          position: "top-right",
          isClosable: true,
          status: "error",
          duration: 3000,
        })
      }
    }).catch(error => {
      // console.log(error);
      toast({
        title: "Algo salió mal. Revise las credenciales",
        position: "top-right",
        isClosable: true,
        status: "error",
        duration: 3000,
      })
    });
  }

  return (

    <Box position={'relative'} backgroundImage={`url(${mySvg})`} backgroundPosition="center"
      backgroundSize="cover" backgroundRepeat="no-repeat" width="100vw"
      py={{ base: 0, sm: 0, md: 0, lg: 10 }}
      px={{ base: 0, sm: 0, md: 0, lg: 10 }}
      height={{ base: "100vh", sm: "100vh", md: "100vh", lg: "100vh" }} >

      <Container
        backgroundImage={`url(${svg2})`}
        bgColor="white"
        backgroundSize="cover" backgroundRepeat="no-repeat"
        backgroundPosition='center'
        as={SimpleGrid}
        maxW={'5xl'}
        height={{ base: "100vh", sm: "100vh", md: "100vh", lg: "80vh" }}
        boxShadow="2xl"
        borderRadius="md"
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 5, lg: 32 }}
        py={{ base: 20, sm: 20, lg: 20 }}>

        <Stack spacing={{ base: 10, md: 20, lg: 20 }}
          pt={{ base: 10, sm: '10px', md: 0, lg: 10 }}>
          <Center>
            <Image
              borderRadius="10"
              boxSize="fit-content"
              src="https://i.ibb.co/LxBSmKF/logo-large.png"
              alt="Inicia Sesión"
              ml={{ base: 0, sm: 0, md: 0, lg: 50 }}
              mt={{ base: 0, sm: 0, md: 100, lg: 50 }}
              maxWidth={{ base: "80vw", sm: "300px", lg: "400px" }}
            />
          </Center>

        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          boxShadow="2xl"
          p={{ base: 4, sm: 6, md: 8 }}
          mt={{ base: 0, sm: 0, lg: 0 }}
          spacing={{ base: 8 }}
          display="inline-block"
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Bienvenid@
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,yellow.400)"
                bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Ingrese los datos solicitados:
            </Text>

          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} >
              <FormControl isInvalid={errors.username} isRequired mt={1}>

                <Input
                  placeholder="Username"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  {...register("username", {
                    required: "Este campo es obligatorio"
                  })}
                />

                <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password} isRequired mb={10}>
                <InputGroup>
                  <Input colorScheme="yellow" placeholder="*********" variant="filled"
                    type={show ? "text" : "password"}
                    {...register("password", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <Text>Username: johnsmith</Text>
              <Text>Contraseña: 1234</Text>
              <Button isLoading={isSubmitting} width="100%" type="submit" py={5} borderRadius="full" bg="#F2B705" colorScheme="yellow">
                Login
              </Button>
              <Text>
              <Link color="teal.500"  href="/forgot">
                ¿Olvidaste tu contraseña?
              </Link>
            </Text>
            </Stack>
          </form>

        </Stack>
      </Container>
    </Box>


  );
}

export default Login;
