import React, { ReactNode } from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Center,
    Image
} from '@chakra-ui/react';
import {
    FaHome,
    FaUserFriends,
    FaBoxOpen,
    FaBars,
    FaBell,
    FaChevronDown,
} from 'react-icons/fa';
import logo from '../../../images/logo_large.png';

import { useNavigate } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Routes
} from "react-router-dom";
import { Outlet } from 'react-router';
import Sidebar from './SidebarComponent';
import MobileNav from './HeaderComponent';
import { useAuthContext } from '../../../App';


export default function Layout(){
    const {user} = useAuthContext();
    const LinkItems = [
        { name: 'Inicio', icon: FaHome, ref: '/dashboard/' },
        ... user.role.id == 1 ? [{ name: 'Usuarios', icon: FaUserFriends, ref: '/dashboard/users' }] : [],
        { name: 'Productos', icon: FaBoxOpen, ref: '/dashboard/products' },
    ];
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const navigate = useNavigate();

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <Sidebar
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
                LinkItems={LinkItems}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <Sidebar onClose={onClose} 
                        LinkItems={LinkItems}/>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                    <Outlet />
            </Box>
        </Box>
    );
}
