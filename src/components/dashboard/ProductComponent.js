import React, { useEffect, useRef, useState } from 'react'
import ProductService from "../../services/ProductService";
import {
    Button, Lorem, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormErrorMessage, FormLabel, FormControl, Input, SimpleGrid, Box, Select, Table, Th, Tr, Td, Tfoot, Thead, Tbody, Badge, Stack, Flex, Text, InputRightElement, InputGroup, Image, Textarea, NumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, NumberInputField,
    useBreakpointValue,
    useColorModeValue,
    Container
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaArrowDown, FaArrowUp, FaSearch,FaCartPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import axios, { Axios } from 'axios';


const columns = [
    { label: "ID", value: "id" },
    { label: "Nombre", value: "name" },
    { label: "Descripción", value: "description" },
    { label: "Cantidad", value: "quantity" },
    { label: "Precio", value: "unit_price" },
    { label: "Imagen", value: "url_image" },
    { label: "Categoría", value: "category" }
]


const CreateModal = ({ prod, title, nameButton, color, size }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
        
    const formatPrice = (val) => `$` + parseFloat(val).toFixed( 2 )
    const parsePrice = (val) => val.replace(/^\$/, "")

    const [valuePrice, setValuePrice] = useState(prod ? prod.unit_price : "0.00")
    const [displayImage, setDisplayImage] = useState(null)
    const [imageSelected, setImageSelected] = useState("")
    const [imageURL, setImageURL] = useState("")
    
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm();

    const handleDisplayImage = (event) => {
        setDisplayImage(URL.createObjectURL(event.target.files[0]))
    }
    function onSubmit(values, e) {
        // uploadImage();
        console.log("values", values.image[0])
        const formData = new FormData();
        formData.append("file",values.image[0]);
        formData.append("upload_preset","cbvwuanq");
        axios.post( "https://api.cloudinary.com/v1_1/pineappleapp/image/upload",
        formData).then((response)=>{
            console.log("response_1",response);
            console.log("response_2",response.data.public_id);
            let imgURL = "https://res.cloudinary.com/pineappleapp/image/upload/"+response.data.public_id+".jpg";
            values.image = imgURL;
            ProductService.create(values).then(result => {
                if (result.status === 201) {
                console.log("Pasó")
                } else {
                console.log("error status")
                }
            }).catch(error => {
                console.log("error catch")
            });
        })
        
    }
    function uploadImage(){
        const formData = new FormData();
        formData.append("file",imageSelected);
        formData.append("upload_preset","cbvwuanq");
        axios.post( "https://api.cloudinary.com/v1_1/pineappleapp/image/upload",
        formData).then((response)=>{
            console.log("response_1",response);
            console.log("response_2",response.data.public_id);
            setImageURL("https://res.cloudinary.com/pineappleapp/image/upload/"+response.data.public_id+".jpg")
        })
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
                                    <FormControl isInvalid={errors.id} isRequired mb={3}>
                                        <FormLabel htmlFor="id" >Codigo (todaia no esta)</FormLabel>
                                        <Input id="id" placeholder="Ingrese un codigo para el producto" defaultValue={prod ? prod.id : ""}
                                            {...register("id", {
                                                required: "Este campo es obligatorio",
                                                minLength: { value: 4, message: "El codigo debe contener al menos 4 caracteres" }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.id && errors.id.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.name} isRequired mb={3}>
                                        <FormLabel htmlFor="name" >Nombre</FormLabel>
                                        <Input id="name" placeholder="Ingrese un coreeo electronico" defaultValue={prod ? prod.name : ""}
                                            {...register("name", {
                                                required: "Este campo es obligatorio",
                                                minLength: { value: 4, message: "El nombre debe contener al menos 4 caracteres" }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.description} mb={3}>
                                        <FormLabel htmlFor="description" >Descripción</FormLabel>
                                        <Textarea
                                            id="description"
                                            placeholder="Escribir la descripcion del producto"
                                            size="sm"
                                            defaultValue={prod ? prod.description : ""}
                                            resize="none"
                                            {...register("description")}
                                        />
                                        <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.quantity} isRequired mb={3}>
                                        <FormLabel htmlFor="quantity" >Cantidad</FormLabel>
                                        <NumberInput defaultValue={prod ? prod.quantity : 0} min={0} clampValueOnBlur={false}
                                            >
                                            <NumberInputField id="quantity" placeholder="Ingrese un coreeo electronico" defaultValue={prod ? prod.quantity : ""}
                                            {...register("quantity", {
                                                required: "Este campo es obligatorio"
                                            })}/>
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <FormErrorMessage>{errors.quantity && errors.quantity.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.unit_price} isRequired mb={3}>
                                        <FormLabel htmlFor="unit_price" >Precio Unitario</FormLabel>
                                        <NumberInput min={0.00} step={0.1} precision={2}
                                            onChange={(valueString) => setValuePrice((valueString))}
                                            value={(valuePrice)}
                                            >
                                                {console.log("valuePrice", valuePrice)}
                                            <NumberInputField id="unit_price" placeholder="Ingrese el precio del producto" 
                                                defaultValue={prod ? prod.unit_price : ""}
                                                value={parseFloat(valuePrice)}
                                                {...register("unit_price" )}/>
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <FormErrorMessage>{errors.unit_price && errors.unit_price.message}</FormErrorMessage>
                                    </FormControl>
                                    
                                </Box>
                                <Box>
                                    <FormControl isInvalid={errors.category} isRequired mb={3}>
                                        <FormLabel htmlFor="category" >Categoria</FormLabel>
                                        <Input id="category" placeholder="Ingrese un nombre" defaultValue={prod ? prod.category : ""}
                                            {...register("category", {
                                                required: "Este campo es obligatorio",
                                                minLength: { value: 4, message: "El nombre debe contener al menos 4 caracteres" }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.category && errors.category.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.image} mb={3}>
                                        <FormLabel htmlFor="image" >Imagen</FormLabel>
                                        <Input id="image" placeholder="Ingrese un nombre" type="file"
                                            {...register("image")}
                                            onChange={handleDisplayImage}
                                        />
                                        <Image
                                            boxSize="200px"
                                            objectFit="cover"
                                            src={displayImage}
                                        />
                                        <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
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

    const [listProduct, setListProduct] = useState({ data: [], loading: false });
    const [updateData, setUpdateData] = useState(0);
    const [selectedColumns, setSelectedColumns] = useState([]);

    useEffect(() => {
        setSelectedColumns([{ label: "Todos", value: "*" }, ...columns]);
    }, []);
    const hola = () => {
        console.log("Holi")
    }
    useEffect(() => {
        ProductService.list()
            .then(res => {
                if (res.data.status === 200) {
                    setListProduct({
                        data: res.data.data,
                        loading: true
                    })
                    console.log(listProduct.data);
                } else {
                    setListProduct({ ...listProduct, loading: false })
                }
            })
            .catch(err => {
                // setIsError({error: true, message: err.toString()})
                setListProduct({ ...listProduct, loading: false })
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
                  <strong>  Inventario de Productos</strong>
                </Text>
                
                </Flex>
        
            </Flex>
         </Box>
            <Flex alignContent="center" justifyContent="space-between">
                <CreateModal nameButton="Crear Producto" title="Crear Producto" color="red" />
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
                        {listProduct.data.map((prod) => {
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
                                                                    src={prod[col.value]}
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

                                    <Td>
                                        <Button size="sm" p={0} m={0.5} >
                                            <CreateModal nameButton={<FaEdit />} color="blue" size="sm" title="Editar Producto" prod={prod} />
                                        </Button>
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

function Product() {
    return (
        <Content />
    );
}

export default Product;