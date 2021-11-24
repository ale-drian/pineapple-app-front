import React from 'react';
import {
    Box, CloseButton, Flex, Icon, useColorModeValue, Image
} from '@chakra-ui/react';

import logo from '../../../images/logo_large.png';

import {
  Link,
} from "react-router-dom";

//Component sidebar a la izquierda y responsive
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
                <Link to="/">
                <Image
                    width="200px"
                    src={logo}
                    borderRadius="8px"
                    alt="Inicia Sesión"
                />
                </Link>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} name={link.name} toRef={link.ref}>
                </NavItem>
            ))}
        </Box>
    );
};

// Component item del menu de navegacion
const NavItem = ({ icon, name, toRef, ...rest }) => {
    return (
        <Link to={toRef} style={{ textDecoration: 'none' }} >
            <Flex
                align="center" p="4" mx="4" borderRadius="lg" role="group" cursor="pointer" color="black" 
                _hover={{
                    bg: 'black',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon mr="4" fontSize="16"
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