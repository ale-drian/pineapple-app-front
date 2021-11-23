import React, {Component, useState, useEffect} from 'react';
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Modal, ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,
    FormLabel, ModalFooter, useDisclosure
  } from '@chakra-ui/react';
    import mySvg from '../images/background.png';
    import svg2 from '../bg-login4.png';
    import { v1 as uuidv1 } from 'uuid';
    import emailjs from 'emailjs-com';

  function Forgot() {
    var val = Math.floor(Math.random()*90000) + 10000;
    const { isOpen: isFirstModalOpen , onOpen: onFirstModalOpen, onClose: onFirstModalClose } = useDisclosure()
    const { isOpen: isSecondModalOpen , onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure()
    const [ResetCode, setResetCode] = useState(val);
    const [valueI, setValue] = useState();
    const [userEmail, setUserEmail] = useState();


     function sendEmail(event) { 
        emailjs.init('user_7zXitI5CX8W3YrCmA5ZaF')
        event.preventDefault();
     
        const serviceID = 'default_service';
        const templateID = 'template_3fb41pe';
     
        emailjs.sendForm(serviceID, templateID,event.target, 'user_7zXitI5CX8W3YrCmA5ZaF')
         .then(() => {
           
           alert('Hemos enviado el email. Revisa tu correo!');
         }, (err) => {
           
           alert(JSON.stringify(err));
         });
      
     }

    function validateResetCode() {
        console.log(ResetCode)
        console.log(valueI)
        const stringcode = valueI.toString();
        if(ResetCode == stringcode){
            //console.log("igualess")   
            onSecondModalOpen();
        }else{
            //console.log("diferentess")
        }
        }
    
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    
    return (
        <>
       
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
        <form onSubmit={sendEmail} id="form1">
        <FormControl id="email">
          <Input
          mb={5}
            placeholder="email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            name="user_email"
            onChange={e => setUserEmail(e.target.value)}
          />
          <input name="code" type="hidden"  value={ResetCode}></input>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"#FF5757"}
            color={'white'}
            type="submit" form="form1" value="Submit"
            _hover={{
              bg: 'black',
            }}>
                Solicitar Nueva Contraseña
          </Button>
          <Button colorScheme="blackAlpha" onClick={onFirstModalOpen}>Ingresar Código de Recuperación</Button>
         
        </Stack>
        </form>
      </Stack>
    </Flex>
    <Modal
    initialFocusRef={initialRef}
    finalFocusRef={finalRef}
    isOpen={isFirstModalOpen}
    onClose={onFirstModalClose}
    
  >
    <ModalOverlay />
    <ModalContent borderRadius='20px'>
      <ModalHeader bg='gray.200' borderRadius='20px'>Ingrese el código enviado a su correo: </ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Código:</FormLabel>
          <Input name = "code" onChange={e => setValue(e.target.value)} ref={initialRef} placeholder="Ingrese el código de 5 dígitos" />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button onClick={validateResetCode} colorScheme="yellow" mr={3}>
          Ok
        </Button>
        <Button onClick={onFirstModalClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>

  <Modal  id="resetPassword" isOpen={isSecondModalOpen} onClose={onSecondModalClose}>
    <ModalOverlay />
    <ModalContent>
    <ModalHeader>Cambio de Contraseña</ModalHeader>
    <ModalCloseButton />
    <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Ingrese la nueva contraseña:</FormLabel>
              <Input ref={initialRef} placeholder="Nueva Contraseña" type="password" />
            </FormControl>
          </ModalBody>
    <ModalFooter>   
        <Button colorScheme="teal">
            Aceptar
        </Button>      
    </ModalFooter>
    </ModalContent>
</Modal>
  
  </>
     )
 
}
export default Forgot;