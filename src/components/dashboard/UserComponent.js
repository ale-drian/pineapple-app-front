import React, { useEffect, useRef, useState } from 'react'
import UserService from "../../services/UserService";
import Layout from '../layout/dashboard/LayoutComponent';
import {
    Button, Lorem, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormErrorMessage, FormLabel, FormControl, Input, SimpleGrid, Box, Select, Table, Th, Tr, Td, Tfoot, Thead, Tbody, Badge, Stack, Flex, Text, InputRightElement, InputGroup, 
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaArrowDown, FaArrowUp, FaSearch,FaUserAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { useAuthContext } from '../../App';

const columns = [
    { label: "Username", value: "username" },
    { label: "Nombre", value: "name" },
    { label: "Apellido", value: "lastName" },
    { label: "Correo", value: "email" },
    { label: "Rol", value: "role" }
]

function ConfirmationDelete({userId, listUsersReload}) {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    const onDelete = () => {
        UserService.delete(userId).then(result => {
            if (result.status === 201) {
              console.log("correct delete");
              listUsersReload()
              onClose();
            } else {
            console.log("error_if")
            }
          }).catch(error => {
              console.log("error_catch")
          })
    }
    return (
      <>
        <Button onClick={() => setIsOpen(true)} colorScheme="red" size="sm" p={0} m={0.5}><FaTrash /></Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Eliminar Usuario
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Estas seguro de eliminar a este usuario, toda la informacion relacionada a este usuario se eliminará.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme="red" onClick={onDelete} ml={3}>
                  Eliminar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

const UserModal = ({ user, title, nameButton, color, size, userId, listUsersReload }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    function onSubmit(values, e) {
        if(userId == 0){
            UserService.create(values).then(result => {
                if (result.status === 201) {
                  console.log("correct create");
                  listUsersReload();
                  onClose()
                  e.target.reset(); 
                  reset(user);
                } else {
                //   setIsError(true);
                }
                listUsersReload();
              }).catch(error => {
                // setIsError(true);
              });
        }else{
            UserService.update(values, userId).then(result => {
                if (result.status === 200) {
                  console.log("correct update");
                  listUsersReload();
                  e.target.reset();
                  onClose()
                } else {
                //   setIsError(true);
                }
              }).catch(error => {
                // setIsError(true);
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
                                    <FormControl isInvalid={errors.password} isRequired={user ? false:true} mb={3}>
                                        <FormLabel htmlFor="password" >Contraseña</FormLabel>
                                        <Input id="password" placeholder="Ingrese una contraseña" type="password"
                                            {...register("password", {
                                                ...(!user && {required: "Este campo es obligatorio"}),
                                                minLength: { value: 4, message: "La contraseña debe terner al menos 4 caracteres" },
                                                // pattern: {
                                                //     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
                                                //     message: "La contraseña debe contener al menos un número, mayuscula y minuscula"
                                                // }
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

function Search({ listUser, setListLocalUser}) {
    
    const [searchValue, setSearchValue] = useState("")
    const handleClick = () => {
        let newListUser = listUser.data.filter(user => 
            {
                return (user.name.toUpperCase().includes(searchValue.toUpperCase()) || 
                user.lastName.toUpperCase().includes(searchValue.toUpperCase()) ||
                user.username.toUpperCase().includes(searchValue.toUpperCase()) ||
                user.email.toUpperCase().includes(searchValue.toUpperCase()) ||
                user.role.name.toUpperCase().includes(searchValue.toUpperCase()) 
                );
            });
        console.log("searchValue",searchValue)
        console.log("listUser",listUser)
        console.log("newListUser",newListUser)
        setListLocalUser({data: newListUser});
    }

    return (
        <InputGroup size="md" width="250px">
            <Input bg="white"
                pr="4.5rem"
                type="text"
                placeholder="Buscar.."
                onChange={event => setSearchValue(event.target.value)}
                onKeyUp={event => {
                        if (event.key === "Enter") {
                            handleClick();
                        }
                    }
                }
            />
            <InputRightElement width="4.5rem" >
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    <FaSearch />
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}
function Content() {

    
    const {user} = useAuthContext();
    console.log("user", user);
    const [listUser, setListUser] = useState({ data: [], loading: false });
    const [listLocalUser, setListLocalUser] = useState({ data: [], loading: false });
    const [updateData, setUpdateData] = useState(0);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [filter, setFilter] = useState({
        type: "",
        activate: false,
        column: ""
    })




    const listUsersReload = () => {
        UserService.list().then(res => {
            if (res.data.status === 200) {
                setListUser({
                    data: res.data.data,
                    loading: true
                })
                setListLocalUser({
                    data: res.data.data,
                    loading: true
                });
                console.log("user", user);
            } else {
                setListUser({ ...listUser, loading: false })
            }
        })
        .catch(err => {
            // setIsError({error: true, message: err.toString()})
            setListUser({ ...listUser, loading: false })
        })
    }

    useEffect(() => {
        setSelectedColumns([{ label: "Todos", value: "*" }, ...columns]);
    }, []);
    const hola = () => {
        console.log("Holi")
    }
    useEffect(() => {
        listUsersReload();

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

    function handleOrder(type, column){
        if(type == "asc"){

            setFilter({
                type: "asc",
                activate: true,
                column: column
            })

            let sortedAsceding = null
            if(column == "role"){
                sortedAsceding = [].concat(listLocalUser.data).sort((a, b) =>  ( a[column].id > b[column].id) ? 1 : -1);
            }else{
                sortedAsceding = [].concat(listLocalUser.data).sort((a, b) =>  ( a[column].toUpperCase() > b[column].toUpperCase()) ? 1 : -1);
            }
            console.log("sortedAsceding",sortedAsceding)
            setListLocalUser({data: sortedAsceding});
        
        }
        if(type == "des"){
            setFilter({
                type: "des",
                activate: true,
                column: column
            })
            let sortedDescending = null;
            if(column == "role"){
                sortedDescending = [].concat(listLocalUser.data).sort((a, b) =>  ( a[column].id < b[column].id) ? 1 : -1);
            }else{
                sortedDescending = [].concat(listLocalUser.data).sort((a, b) =>  ( a[column].toUpperCase() < b[column].toUpperCase()) ? 1 : -1);
            }
            console.log("sortedDescending",sortedDescending)
            setListLocalUser({data: sortedDescending});
        }
    }

    return (
        <div>
            <Box>
            <Flex
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                my={4}
                borderBottom={4}
                borderStyle={'solid'}
                borderBottomColor={useColorModeValue('gray.300', 'gray.900')}
                align={'center'}
                bg={useColorModeValue('gray.300', 'gray.900')}
                borderRadius={20}>
                <Flex
                flex={{ base: 1, md: 'auto' }}
                ml={{ base: -2 }}
                display={{ base: 'flex', md: 'none' }}> 
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                <Text
                    textAlign={useBreakpointValue({ base: 'center', sm:'right', md: 'center' })}
                    fontFamily={'heading'}
                    color="gray"
                    color={useColorModeValue('gray.800', 'white')}
                    fontSize="20px">
                  <strong>  Administración de Usuarios</strong>
                </Text>
                
                </Flex>
        
            </Flex>
         </Box>

            <Flex alignContent="center" justifyContent="space-between">
                <UserModal listUsersReload={listUsersReload}  nameButton="Crear Usuario" title="Crear Usuario" color="red" userId={0} />
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
                    <Search listUser={listUser} setListLocalUser={setListLocalUser} />
                </Flex>
            </Flex>
            <br />

            <Box overflowX="auto">

                <Table variant="simple" bg="white" id="table_users">
                    <Thead>
                        <Tr>
                            {selectedColumns.map(col => {
                                return (
                                    <>{
                                        col.value !== "*" ?
                                            <Th>
                                                <Stack direction={["column", "row"]} spacing="0px">
                                                    <Text mr={2}>{col.label}</Text>
                                                    <button onClick={()=>handleOrder("des", col.value)}>
                                                        <FaArrowDown color={filter.type == "des" && filter.column == col.value ? "red" : ""}/>
                                                    </button>
                                                    <button onClick={()=>handleOrder("asc", col.value)}>
                                                        <FaArrowUp color={filter.type == "asc" && filter.column == col.value ? "red" : ""}/>
                                                    </button>
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
                        {listLocalUser.data.map((user) => {
                            return (
                                <Tr>

                                    {selectedColumns.map(col => {
                                        return (
                                            <>{
                                                col.value !== "*" ?
                                                    (
                                                        col.value === "role"
                                                            ?
                                                            <Td>{user.role.id == '1' ?
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
                                        <Button size="sm" p={0} m={0.5}><UserModal listUsersReload={listUsersReload} nameButton={<FaEdit />} color="blue" size="sm" title="Editar Usuario" user={user} userId={user["id"]} /></Button>
                                        <ConfirmationDelete listUsersReload={listUsersReload} userId={user["id"]}/>
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