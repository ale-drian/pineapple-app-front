import React, {useEffect, useRef, useState} from 'react'
import UserService from "../../services/UserService";
import Layout from '../layout/LayoutComponent';
import {
    Button,
    Lorem,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    SimpleGrid,
    Box
  } from '@chakra-ui/react';
import { useForm } from "react-hook-form";



function FormControlItems({title, name, placeholder, errors, register}) {
    
  
    return (
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Input
            id={name}
            placeholder={placeholder}
            {...register({name}, {
              required: "El campo ${name} es requerido",
              minLength: { value: 4, message: "Minimum length should be 4" }
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
    );
}

const CreateUserModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
      } = useForm();
    
      function onSubmit(values) {
        return new Promise((resolve) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resolve();
          }, 3000);
        });
      }
    //   {
    //     required: "Este campo es obligatorio",
    //     minLength: { value: 4, message: "Debe ser mas largo" }
    // },
    // {
    //     required: "Este campo es obligatorio",
    //     pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //             message: "Escriba un correo valido"}
    // }
    return (
        <div>
        <Button colorScheme="red" onClick={onOpen}>Crear Usuario</Button>

        <Modal isOpen={isOpen} size="4xl" onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Crear Usuario</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <SimpleGrid columns={{sm: 1, md: 2}} spacing="40px">
                            <Box>
                                <FormControl isInvalid={errors.name} isRequired>
                                    <FormLabel htmlFor="name" >Nombre</FormLabel>
                                    <Input id="name" placeholder="Ingrese un nombre"
                                        {...register("name", {
                                            required: "Este campo es obligatorio",
                                            minLength: { value: 4, message: "El nombre debe contener al menos 4 caracteres" }
                                        })}
                                        />
                                    <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.lastname} isRequired>
                                    <FormLabel htmlFor="lastname" >Apellido</FormLabel>
                                    <Input id="lastname" placeholder="Ingrese un nombre"
                                        {...register("lastname", {
                                            required: "Este campo es obligatorio---",
                                            minLength: { value: 4, message: "El nombre debe contener al menos 4 caracteres" }
                                        })}
                                        />
                                    <FormErrorMessage>{errors.lastname && errors.lastname.message}</FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Box>
                                
                            </Box>
                        </SimpleGrid>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button mr={3} colorScheme="teal" isLoading={isSubmitting} type="submit">
                            Guardar
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Cerrar
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
        </div>
    )

}

function Content(){
    

    const [listUser, setListUser] = useState({data: [], loading: false});
    const [updateData, setUpdateData] = useState(0);

    useEffect(() => {
        UserService.list()
            .then(res => {
                if (res.data.status === 200) {
                    setListUser({
                        data: res.data.data,
                        loading: true
                     })
                } else {
                    setListUser({...listUser, loading: false})
                }
            })
            .catch(err => {
                // setIsError({error: true, message: err.toString()})
                setListUser({...listUser, loading: false})
            })

    }, [updateData]);

    return (
        <div>
            <h2>Users</h2>
            <CreateUserModal/>
            <ul>
                {listUser.data.map((user)=>{
                    return(
                        <li>{user.name}</li>
                    );
                })}
            </ul>
        </div>
    );
}

function User() {
    return (
        <Layout children={<Content/>}/>
    );
}

export default User;