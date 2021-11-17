import React, { useEffect, useRef, useState } from 'react'
import UserService from "../../services/UserService";
import Layout from '../layout/dashboard/LayoutComponent';
import {
    Button, Lorem, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormErrorMessage, FormLabel, FormControl, Input, SimpleGrid, Box, Select, Table, Th, Tr, Td, Tfoot, Thead, Tbody, Badge, Stack, Flex, Text, InputRightElement, InputGroup
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

const columns = [
    { label: "Username", value: "username" },
    { label: "Nombre", value: "name" },
    { label: "Apellido", value: "lastname" },
    { label: "Correo", value: "email" },
    { label: "Rol", value: "role" }
]

function FormControlItems({ title, name, placeholder, errors, register }) {
    return (
        <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor={name}>{title}</FormLabel>
            <Input
                id={name}
                placeholder={placeholder}
                {...register({ name }, {
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

const CreateUserModal = ({ user, title, nameButton, color, size }) => {
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
                                    <FormControl isInvalid={errors.password} isRequired mb={3}>
                                        <FormLabel htmlFor="password" >Contraseña</FormLabel>
                                        <Input id="password" placeholder="Ingrese una contraseña" type="password"
                                            {...register("password", {
                                                required: "Este campo es obligatorio",
                                                minLength: { value: 6, message: "La contraseña debe terner al menos 6 caracteres" },
                                                pattern: {
                                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
                                                    message: "La contraseña debe contener al menos un número, mayuscula y minuscula"
                                                }
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
                                    <FormControl isInvalid={errors.lastname} isRequired mb={3}>
                                        <FormLabel htmlFor="lastname" >Apellido</FormLabel>
                                        <Input id="lastname" placeholder="Ingrese un apellido" defaultValue={user ? user.lastname : ""}
                                            {...register("lastname", {
                                                required: "Este campo es obligatorio",
                                                minLength: { value: 4, message: "El apellido debe contener al menos 4 caracteres" }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.lastname && errors.lastname.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.role} isRequired mb={3}>
                                        <FormLabel htmlFor="role" >Rol</FormLabel>
                                        <Select placeholder="Seleccionar un rol" defaultValue={user ? user.role : ""}
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

function Search() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size="md" width="250px">
            <Input bg="white"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Buscar.."
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    <FaSearch />
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}
function Content() {

    const [listUser, setListUser] = useState({ data: [], loading: false });
    const [updateData, setUpdateData] = useState(0);
    const [selectedColumns, setSelectedColumns] = useState([]);

    useEffect(() => {
        setSelectedColumns([{ label: "Todos", value: "*" }, ...columns]);
    }, []);
    const hola = () => {
        console.log("Holi")
    }
    useEffect(() => {
        UserService.list()
            .then(res => {
                if (res.data.status === 200) {
                    setListUser({
                        data: res.data.data,
                        loading: true
                    })
                    console.log(listUser.data);
                } else {
                    setListUser({ ...listUser, loading: false })
                }
            })
            .catch(err => {
                // setIsError({error: true, message: err.toString()})
                setListUser({ ...listUser, loading: false })
            })

    }, [updateData]);

    function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
        return `${placeholderButtonLabel}`;
    }

    function onChange(value, event) {
        if (event.action === "select-option" && event.option.value === "*") {
            this.setState(this.options);
        } else if (
            event.action === "deselect-option" &&
            event.option.value === "*"
        ) {
            this.setState([]);
        } else if (event.action === "deselect-option") {
            this.setState(value.filter((o) => o.value !== "*"));
        } else if (value.length === this.options.length - 1) {
            this.setState(this.options);
        } else {
            this.setState(value);
        }
    }

    return (
        <div>
            <h2>Users</h2>
            <Flex alignContent="center" justifyContent="space-between">
                <CreateUserModal nameButton="Crear Usuario" title="Crear Usuario" color="red" />
                <Flex alignContent="center" justifyContent="end">
                    <ReactMultiSelectCheckboxes width="250px"
                        style="height: 40px;"
                        options={[{ label: "Todas", value: "*" }, ...columns]}
                        placeholderButtonLabel="Columnas"
                        getDropdownButtonLabel={getDropdownButtonLabel}
                        value={selectedColumns}
                        onChange={onChange}
                        setState={setSelectedColumns}
                        hideSearch={true}
                    />
                    <Search />
                </Flex>
            </Flex>
            <br />

            <Box overflowX="auto">

                <Table variant="simple" bg="white">
                    <Thead>
                        <Tr>
                            {selectedColumns.map(col => {
                                return (
                                    <>{
                                        col.value !== "*" ?
                                            <Th>
                                                <Stack direction={["column", "row"]} spacing="0px">
                                                    <Text mr={2}>{col.label}</Text>
                                                    <button onClick={hola}><FaArrowDown /></button>
                                                    <button onClick={hola}><FaArrowUp /></button>
                                                </Stack>
                                            </Th>
                                            : ''
                                    }
                                    </>
                                );
                            })}
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {listUser.data.map((user) => {
                            return (
                                <Tr>

                                    {selectedColumns.map(col => {
                                        return (
                                            <>{
                                                col.value !== "*" ?
                                                    (
                                                        col.value === "role"
                                                            ?
                                                            <Td>{user.role == '1' ?
                                                                <Badge colorScheme="green">Administrador</Badge> :
                                                                <Badge colorScheme="purple">Usuario</Badge>
                                                            }</Td>
                                                            :
                                                            <Td>{user[col.value]}</Td>
                                                    )
                                                    :
                                                    ''
                                            }
                                            </>
                                        )
                                    })}

                                    <Td>
                                        <Button size="sm" p={0} m={0.5} ><CreateUserModal nameButton={<FaEdit />} color="blue" size="sm" title="Editar Usuario" user={user} /></Button>
                                        <Button colorScheme="red" size="sm" p={0} m={0.5}><FaTrash /></Button>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Box>
        </div>
    );
}

function User() {
    return (
        <Content />
    );
}

export default User;