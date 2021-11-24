import React, { useEffect, useRef, useState } from 'react'
import UserService from "../../services/UserService";
import {
    Button, Input, Box, Table, Th, Tr, Td, Thead, Tbody, Badge, Stack, Flex, Text, InputRightElement, InputGroup, useBreakpointValue, useColorModeValue
} from '@chakra-ui/react';
import { FaEdit, FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { useAuthContext } from '../../App';
import ConfirmationDelete from './users/ConfirmationDelete';
import UserModal from './users/UserModal';

const columns = [
    { label: "Username", value: "username" },
    { label: "Nombre", value: "name" },
    { label: "Apellido", value: "lastName" },
    { label: "Correo", value: "email" },
    { label: "Rol", value: "role" },
    { label: "Creación", value: "createdDate" }
]

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
    const [listUser, setListUser] = useState({ data: []});
    const [listLocalUser, setListLocalUser] = useState({ data: []});
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
                // console.log("DATA", res.data.data)
                setListLocalUser({
                    data: res.data.data,
                    loading: true
                });
            } else {
                setListUser({ ...listUser})
                setListLocalUser({ ...listLocalUser})
            }
        })
        .catch(err => {
            setListUser({ ...listUser})
            setListLocalUser({ ...listLocalUser})
        })
    }

    useEffect(() => {
        setSelectedColumns([{ label: "Todos", value: "*" }, ...columns]);
    }, []);

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
            setListLocalUser({data: sortedDescending});
        }
    }

    function formateDate (dateToFormat){
        let date = new Date(dateToFormat);
        let day = date.getDate();
        day = day<10 ? "0"+day : day;
        let month = date.getMonth() + 1;
        month = month<10 ? "0"+month : month;
        let year = date.getFullYear();
        let hours = date.getHours();
        hours = hours<10 ? "0"+hours : hours;
        let minutes = date.getMinutes();
        minutes = minutes<10 ? "0"+minutes : minutes;

        let dateFormat = `${day}/${month}/${year} ${hours}:${minutes}`;
        return dateFormat;
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
                                                            :(
                                                                col.value == "createdDate" ?
                                                                <Td>{formateDate(user[col.value])}</Td>
                                                                :
                                                                <Td>{user[col.value]}</Td>
                                                            )
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