import React from 'react'
import UserService from "../../../services/UserService";
import {
    Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormErrorMessage, FormLabel, FormControl, Input, SimpleGrid, Box, Select, useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const UserModal = ({ user, title, nameButton, color, size, userId, listUsersReload }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    function onSubmit(values, e) {
        if (userId == 0) {
            UserService.create(values).then(result => {
                if (result.status === 201) {
                    listUsersReload();
                    onClose()
                    reset(user);
                    toast({
                        title: "Usuario creado",
                        position: "top-right",
                        isClosable: true,
                        status: "success",
                        duration: 3000,
                    })
                } else {
                    toast({
                        title: "Usuario no creado",
                        position: "top-right",
                        isClosable: true,
                        status: "error",
                        duration: 3000,
                    })
                }
                listUsersReload();
            }).catch(error => {
                toast({
                    title: "Usuario no creado",
                    position: "top-right",
                    isClosable: true,
                    status: "error",
                    duration: 3000,
                })
            });
        } else {
            UserService.update(values, userId).then(result => {
                if (result.status === 200) {
                    listUsersReload();
                    onClose()
                    toast({
                        title: "Usuario actualizado",
                        position: "top-right",
                        isClosable: true,
                        status: "success",
                        duration: 3000,
                    })
                } else {
                    toast({
                        title: "Usuario no actualizado",
                        position: "top-right",
                        isClosable: true,
                        status: "error",
                        duration: 3000,
                    })
                }
            }).catch(error => {
                toast({
                    title: "Usuario no actualizado",
                    position: "top-right",
                    isClosable: true,
                    status: "error",
                    duration: 3000,
                })
            })
        }
        e.target.reset();
    }
    return (
        <div>
            <Button colorScheme={color} size={size} onClick={onOpen}>{nameButton}</Button>

            <Modal isOpen={isOpen} size="4xl" onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px">
                                <Box>
                                    <FormControl isInvalid={errors.username} isRequired mb={3}>
                                        <FormLabel htmlFor="username" >Username</FormLabel>
                                        <Input id="username" placeholder="Ingrese un nombre para el usuario" defaultValue={user ? user.username : ""}
                                            {...register("username", {
                                                required: "Este campo es obligatorio",
                                                minLength: { value: 4, message: "El nombre debe contener al menos 4 caracteres" }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.email} isRequired mb={3}>
                                        <FormLabel htmlFor="email" >Correo electrónico</FormLabel>
                                        <Input id="email" placeholder="Ingrese un coreeo electronico" defaultValue={user ? user.email : ""}
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
                                    <FormControl isInvalid={errors.password} isRequired={user ? false : true} mb={3}>
                                        <FormLabel htmlFor="password" >Contraseña</FormLabel>
                                        <Input id="password" placeholder="Ingrese una contraseña" type="password"
                                            {...register("password", {
                                                ...(!user && { required: "Este campo es obligatorio" }),
                                                minLength: { value: 4, message: "La contraseña debe terner al menos 4 caracteres" }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl isInvalid={errors.name} isRequired mb={3}>
                                        <FormLabel htmlFor="name" >Nombre</FormLabel>
                                        <Input id="name" placeholder="Ingrese un nombre" defaultValue={user ? user.name : ""}
                                            {...register("name", {
                                                required: "Este campo es obligatorio",
                                                minLength: { value: 4, message: "El nombre debe contener al menos 4 caracteres" }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.lastName} isRequired mb={3}>
                                        <FormLabel htmlFor="lastName" >Apellido</FormLabel>
                                        <Input id="lastName" placeholder="Ingrese un apellido" defaultValue={user ? user.lastName : ""}
                                            {...register("lastName", {
                                                required: "Este campo es obligatorio",
                                                minLength: { value: 4, message: "El apellido debe contener al menos 4 caracteres" }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.role} isRequired mb={3}>
                                        <FormLabel htmlFor="role" >Rol</FormLabel>
                                        <Select placeholder="Seleccionar un rol" defaultValue={user ? user.role.id : ""}
                                            {...register("role", {
                                                required: "Selecciona una opcion valida",
                                            })}>
                                            <option value="1">Administrador</option>
                                            <option value="2">Usuario</option>
                                        </Select>
                                        <FormErrorMessage>{errors.role && errors.role.message}</FormErrorMessage>
                                    </FormControl>
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

export default UserModal;