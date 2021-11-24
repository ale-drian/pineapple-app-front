import React, { useEffect, useRef, useState } from 'react'
import {
    Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useToast
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import UserService from '../../../services/UserService';


function ConfirmationDelete({ userId, listUsersReload }) {
    const toast = useToast();
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    const onDelete = () => {
        UserService.delete(userId).then(result => {
            if (result.status === 201) {
                toast({
                    title: "Usuario eliminado",
                    position: "top-right",
                    isClosable: true,
                    status: "success",
                    duration: 3000,
                })
                listUsersReload()
                onClose();
            } else {
                toast({
                    title: "Usuario no eliminado",
                    position: "top-right",
                    isClosable: true,
                    status: "error",
                    duration: 3000,
                })
            }
        }).catch(error => {
            toast({
                title: "Algo salio mal. Usuario no eliminado",
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


export default ConfirmationDelete;