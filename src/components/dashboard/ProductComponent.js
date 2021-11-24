import React, { useEffect, useRef, useState } from 'react'
import ProductService from "../../services/ProductService";
import {
    Button, Input, Box, Table, Th, Tr, Td, Thead, Tbody, Stack, Flex, Text, InputRightElement, InputGroup, Image,  useBreakpointValue, useColorModeValue, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Center, useToast
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaArrowDown, FaArrowUp, FaSearch} from 'react-icons/fa';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { useAuthContext } from '../../App';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ProductModal from './products/ProductModal';


const columns = [
    { label: "ID", value: "id" },
    { label: "Nombre", value: "name" },
    { label: "Descripción", value: "description" },
    { label: "Cantidad", value: "quantity" },
    { label: "Precio", value: "unit_price" },
    { label: "Imagen", value: "url_image" },
    { label: "Categoría", value: "category" }
]

//Exportar Tabla
ReactHTMLTableToExcel.format = (s, c) => {
    if (c && c['table']) {
        const html = c.table;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rows = doc.querySelectorAll('tr');

        for (const row of rows) row.removeChild(row.lastChild);

        c.table = doc.querySelector('table').outerHTML;
    }

    return s.replace(/{(\w+)}/g, (m, p) => c[p]);
};

function ConfirmationDelete({ productId, listProductsReload }) {
    const toast = useToast();
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    const onDelete = () => {
        ProductService.delete(productId).then(result => {
            if (result.status === 201) {
                console.log("correct delete");
                listProductsReload()
                onClose();
                toast({
                    title: "Producto Eliminado",
                    position: "top-right",
                    isClosable: true,
                    status: "success",
                    duration: 3000,
                })
            } else {
                toast({
                    title: "Producto No Eliminado",
                    position: "top-right",
                    isClosable: true,
                    status: "error",
                    duration: 3000,
                })
            }
        }).catch(error => {
            toast({
                title: "Producto No Eliminado",
                position: "top-right",
                isClosable: true,
                status: "error",
                duration: 3000,
            })
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
                            Eliminar Producto
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Estas seguro de eliminar a este producto, toda la informacion relacionada a este producto se eliminará.
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

function Search({ listProduct, setListLocalProduct }) {
    const [searchValue, setSearchValue] = useState("")

    const handleClick = () => {
        let newListProduct = listProduct.data.filter(product => {
            return (product.name.toUpperCase().includes(searchValue.toUpperCase()) ||
                product.description.toUpperCase().includes(searchValue.toUpperCase()) ||
                product.category.toUpperCase().includes(searchValue.toUpperCase())
            );
        });
        console.log("searchValue", searchValue)
        console.log("listProduct", listProduct)
        console.log("newListProduct", newListProduct)
        setListLocalProduct({ data: newListProduct });
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

    const { user } = useAuthContext();
    const [listProduct, setListProduct] = useState({ data: [], loading: false });
    const [listLocalProduct, setListLocalProduct] = useState({ data: [], loading: false });
    const [updateData, setUpdateData] = useState(0);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [filter, setFilter] = useState({
        type: "",
        activate: false,
        column: ""
    })

    const listProductsReload = () => {
        ProductService.list().then(res => {
            if (res.data.status === 200) {
                setListProduct({
                    data: res.data.data,
                    loading: true
                })
                setListLocalProduct({
                    data: res.data.data,
                    loading: true
                });
            } else {
                setListProduct({ ...listProduct, loading: false })
            }
        })
            .catch(err => {
                // setIsError({error: true, message: err.toString()})
                setListProduct({ ...listProduct, loading: false })
            })
    }

    useEffect(() => {
        setSelectedColumns([{ label: "Todos", value: "*" }, ...columns]);
    }, []);

    useEffect(() => {
        listProductsReload()
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

    function handleOrder(type, column) {

        if (type == "asc") {

            setFilter({
                type: "asc",
                activate: true,
                column: column
            })

            let sortedAsceding = null
            if (column == "id" || column == "quantity" || column == "unit_price") {
                sortedAsceding = [].concat(listLocalProduct.data).sort((a, b) => (a[column] > b[column]) ? 1 : -1);
            } else {
                sortedAsceding = [].concat(listLocalProduct.data).sort((a, b) => (a[column].toUpperCase() > b[column].toUpperCase()) ? 1 : -1);
            }
            console.log("sortedAsceding", sortedAsceding)
            setListLocalProduct({ data: sortedAsceding });

        }
        if (type == "des") {
            setFilter({
                type: "des",
                activate: true,
                column: column
            })
            let sortedDescending = null
            if (column == "id" || column == "quantity" || column == "unit_price") {
                sortedDescending = [].concat(listLocalProduct.data).sort((a, b) => (a[column] < b[column]) ? 1 : -1);
            } else {
                sortedDescending = [].concat(listLocalProduct.data).sort((a, b) => (a[column].toUpperCase() < b[column].toUpperCase()) ? 1 : -1);
            }
            console.log("sortedDescending", sortedDescending)
            setListLocalProduct({ data: sortedDescending });
        }
    }

    return (
        <div>
            <Box>
                <Flex
                    color={useColorModeValue('gray.600', 'white')}
                    minH={'60px'}
                    pr={{ base: 2 }}
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
                            textAlign={useBreakpointValue({ base: 'center', sm: 'right', md: 'center' })}
                            fontFamily={'heading'}
                            color="gray"
                            color={useColorModeValue('gray.800', 'white')}
                            fontSize="20px"
                           >
                            <strong>  Inventario de Productos</strong>
                        </Text>

                    </Flex>

                    <ReactHTMLTableToExcel
                        id="btnExportToExcel"
                        table="table_products"
                        filename="Products"
                        sheet="pagina 1"
                        buttonText={<Text>Exportar Excel</Text>}
                        className="download-table-xls-button"
                    />
                </Flex>
            </Box>
            <Flex alignContent="center" justifyContent="space-between">
                <ProductModal nameButton="Crear Producto" title="Crear Producto" color="red" listProductsReload={listProductsReload} productId={0} />
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
                    <Search listProduct={listProduct} setListLocalProduct={setListLocalProduct} />
                </Flex>
            </Flex>
            <br />

            <Box overflowX="auto">

                <Table variant="simple" bg="white" id="table_products">
                    <Thead>
                        <Tr>
                            {selectedColumns.map(col => {
                                return (
                                    <>{
                                        col.value !== "*" ?
                                            <Th>
                                                <Stack direction={["column", "row"]} spacing="0px">
                                                    <Text mr={2}>{col.label}</Text>
                                                    {col.value != "url_image" ?
                                                        <button onClick={() => handleOrder("des", col.value)}>
                                                            <FaArrowDown color={filter.type == "des" && filter.column == col.value ? "red" : ""} />
                                                        </button>
                                                        : ''
                                                    }
                                                    {col.value != "url_image" ?
                                                        <button onClick={() => handleOrder("asc", col.value)}>
                                                            <FaArrowUp color={filter.type == "asc" && filter.column == col.value ? "red" : ""} />
                                                        </button>
                                                        : ''
                                                    }
                                                </Stack>
                                            </Th>
                                            : ''
                                    }
                                    </>
                                );
                            })}
                            {
                                user.role.id == 1 ?
                                    <Th>Acciones</Th>
                                    : ''
                            }
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            listLocalProduct.data.length > 0 ?
                                listLocalProduct.data.map((prod) => {
                                    return (
                                        <Tr>
                                            {selectedColumns.map(col => {
                                                return (
                                                    <>{
                                                        col.value !== "*" ?
                                                            (
                                                                col.value === "url_image"
                                                                    ?
                                                                    <Td>
                                                                        <Image
                                                                            boxSize="50px"
                                                                            objectFit="cover"
                                                                            src={prod[col.value] ? prod[col.value] : "https://res.cloudinary.com/pineappleapp/image/upload/v1637705740/ehrpk0cjtnl4i7smi3t7.png"}
                                                                            alt={prod.name}
                                                                        />
                                                                    </Td>
                                                                    :
                                                                    <Td>{prod[col.value]}</Td>
                                                            )
                                                            :
                                                            ''
                                                    }
                                                    </>
                                                )
                                            })}

                                            {
                                                user.role.id == 1 ?
                                                    <Td>
                                                        <Button size="sm" p={0} m={0.5} >
                                                            <ProductModal nameButton={<FaEdit />} color="blue" size="sm" title="Editar Producto" prod={prod} productId={prod["id"]} listProductsReload={listProductsReload} imageProduct={prod["url_image"]} />
                                                        </Button>
                                                        <ConfirmationDelete listProductsReload={listProductsReload} productId={prod["id"]} />
                                                    </Td>
                                                    : ''
                                            }
                                        </Tr>
                                    );
                                })
                            :
                            <Tr h="40px"><Td colSpan={10}><Center w="100%"><Text>No hay productos</Text></Center></Td></Tr>
                        }
                    </Tbody>
                </Table>
            </Box>
        </div>
    );
}

function Product() {
    return (
        <Content />
    );
}

export default Product;