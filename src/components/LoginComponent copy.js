import { Button, Flex, Heading, Input, Image, Center, FormControl, InputRightElement, InputGroup, FormErrorMessage } from '@chakra-ui/react';
import mySvg from '../bg-1.svg';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../App';
import UserService from '../services/UserService';



function Login() {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  function onSubmit(data, e) {
    console.log("data");
    console.log(data);
    UserService.login(data).then(result => {
      if (result.status === 200) {
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(error => {
      setIsError(true);
    });
    e.target.reset(); //borra el contenido de los inputs
    // UserService.login(data).then(result => {
    //   if (result.status === 200) {
        
    //     setLoggedIn(true);
    //   } else {
    //     setIsError(true);
    //   }
    // }).catch(error => {
    //   setIsError(true);
    // });
    // e.target.reset(); //borra el contenido de los inputs
  }

  return (
    <div
      className="someClassName"
      style={{
        backgroundImage: `url(${mySvg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        position: 'fixed'
      }}
    >

      <Flex height="80vh" alignItems="center" justifyContent="center" m={20} >
        <Flex bg="white" width="80%" backgroundImage="url(https://i.ibb.co/6Zy05DV/bg-2.png)"
          boxShadow="2xl" p={20} rounded={6} backgroundSize='cover' backgroundPosition='center'>
          <Flex direction="column" width="50vh" rounded={6} mt={10} ml={30}>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email} isRequired mb={3}>
                <Input colorScheme="yellow" placeholder="user@pineaple.com" variant="filled"
                  {...register("email", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Escriba un correo valido"
                    }
                  })}
                />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
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

              <Button isLoading={isSubmitting} width="100%" type="submit" py={5} borderRadius="full" bg="#F2B705" colorScheme="yellow">
                Guardar
              </Button>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default Login;
