import React, { useEffect, useState } from 'react'
import ProductService from "../../../services/ProductService";
import {
    Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormErrorMessage, FormLabel, FormControl, Input, SimpleGrid, Box, Image, Textarea, NumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, NumberInputField, useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ProductModal = ({ prod, title, nameButton, color, size, productId, imageProduct, listProductsReload }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [valuePrice, setValuePrice] = useState(prod ? prod.unit_price : "0.00")
    const [displayImage, setDisplayImage] = useState(null)

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    useEffect(() => {
        if (prod) {
            if (imageProduct != null) {
                setDisplayImage(imageProduct);
            } else {
                setDisplayImage("https://res.cloudinary.com/pineappleapp/image/upload/v1637705740/ehrpk0cjtnl4i7smi3t7.png")
            }
        }
    }, []);
    const handleDisplayImage = (event) => {
        setDisplayImage(URL.createObjectURL(event.target.files[0]))
    }
    function onSubmit(values, e) {
        if (values.image[0]) {
            const formData = new FormData();
            formData.append("file", values.image[0]);
            formData.append("upload_preset", "cbvwuanq");
            axios.post("https://api.cloudinary.com/v1_1/pineappleapp/image/upload",
                formData).then((response) => {
                    let imgURL = "https://res.cloudinary.com/pineappleapp/image/upload/" + response.data.public_id + ".jpg";
                    values.image = imgURL;

                    if (productId == 0) {
                        ProductService.create(values).then(result => {
                            if (result.status === 201) {
                                listProductsReload();
                                reset(prod);
                                onClose()
                                toast({
                                    title: "Producto creado",
                                    position: "top-right",
                                    isClosable: true,
                                    status: "success",
                                    duration: 3000,
                                })
                            } else {
                                toast({
                                    title: "Producto no creado",
                                    position: "top-right",
                                    isClosable: true,
                                    status: "error",
                                    duration: 3000,
                                })
                            }
                            listProductsReload();
                        }).catch(error => {
                            toast({
                                title: "Producto no creado",
                                position: "top-right",
                                isClosable: true,
                                status: "error",
                                duration: 3000,
                            })
                        });
                    } else {
                        ProductService.update(values, productId).then(result => {
                            if (result.status === 200) {
                                listProductsReload();
                                onClose()
                                toast({
                                    title: "Producto actualizado",
                                    position: "top-right",
                                    isClosable: true,
                                    status: "success",
                                    duration: 3000,
                                })
                            } else {
                                toast({
                                    title: "Producto no actualizado",
                                    position: "top-right",
                                    isClosable: true,
                                    status: "error",
                                    duration: 3000,
                                })
                            }
                            listProductsReload();
                        }).catch(error => {
                            toast({
                                title: "Producto no actualizado",
                                position: "top-right",
                                isClosable: true,
                                status: "error",
                                duration: 3000,
                            })
                        });
                    }
                })
        } else {
            values.image = null
            if (productId == 0) {
                ProductService.create(values).then(result => {
                    if (result.status === 201) {
                        listProductsReload();
                        reset(prod);
                        onClose()
                        toast({
                            title: "Producto creado",
                            position: "top-right",
                            isClosable: true,
                            status: "success",
                            duration: 3000,
                        })
                    } else {
                        toast({
                            title: "Producto no creado",
                            position: "top-right",
                            isClosable: true,
                            status: "error",
                            duration: 3000,
                        })
                    }
                    listProductsReload();
                }).catch(error => {
                    toast({
                        title: "Producto no creado",
                        position: "top-right",
                        isClosable: true,
                        status: "error",
                        duration: 3000,
                    })
                });
            } else {
                ProductService.update(values, productId).then(result => {
                    if (result.status === 200) {
                        listProductsReload();
                        onClose()
                        toast({
                            title: "Producto actualizado",
                            position: "top-right",
                            isClosable: true,
                            status: "success",
                            duration: 3000,
                        })
                    } else {
                        toast({
                            title: "Producto no actualizado",
                            position: "top-right",
                            isClosable: true,
                            status: "error",
                            duration: 3000,
                        })
                    }
                    listProductsReload();
                }).catch(error => {
                    toast({
                        title: "Producto no actualizado",
                        position: "top-right",
                        isClosable: true,
                        status: "error",
                        duration: 3000,
                    })
                });
            }
        }

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
                                            <NumberInputField id="quantity" placeholder="Cantidad"
                                                {...register("quantity", {
                                                    required: "Este campo es obligatorio"
                                                })} />
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
                                            <NumberInputField id="unit_price" placeholder="Ingrese el precio del producto"
                                                defaultValue={prod ? prod.unit_price : ""}
                                                value={parseFloat(valuePrice)}
                                                {...register("unit_price")} />
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

export default ProductModal;