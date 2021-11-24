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

const Sidebar = ({ onClose,LinkItems, ...rest }) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            bgColor="#f2b705"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Image
                    width="200px"
                    src={logo}
                    borderRadius="8px"
                    alt="Inicia Sesión"
                />
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} name={link.name} toRef={link.ref}>
                </NavItem>
            ))}
        </Box>
    );
};


const NavItem = ({ icon, name, toRef, ...rest }) => {
    return (
        <Link to={toRef} style={{ textDecoration: 'none' }} >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                color="black"
                _hover={{
                    bg: 'black',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {name}
            </Flex>
        </Link>
    );
};

export default Sidebar;