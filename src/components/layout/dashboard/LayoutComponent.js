import React, { ReactNode } from 'react';
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure
} from '@chakra-ui/react';
import {
    FaHome,
    FaUserFriends,
    FaBoxOpen
} from 'react-icons/fa';


import { Outlet } from 'react-router';
import Sidebar from './SidebarComponent';
import Header from './HeaderComponent';
import { useAuthContext } from '../../../App';

//LAYOUT COMPLETO DE DASHBOARD
const Layout = () => {
    const {user} = useAuthContext();
    const LinkItems = [
        { name: 'Inicio', icon: FaHome, ref: '/dashboard/' },
        ... user.role.id == 1 ? [{ name: 'Usuarios', icon: FaUserFriends, ref: '/dashboard/users' }] : [],
        { name: 'Productos', icon: FaBoxOpen, ref: '/dashboard/products' },
    ];
    const { onOpen, onClose } = useDisclosure();
    

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            {/* Sidebar */}
            <Sidebar
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
                LinkItems={LinkItems}
            />
            {/* Header */}
            <Header onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                    {/* Body */}
                    <Outlet />
            </Box>
        </Box>
    );
}
export default Layout;