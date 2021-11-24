import React, { ReactNode } from 'react';
import {
    IconButton,
    Avatar,
    Box,
    Flex,
    HStack,
    VStack,
    useColorModeValue,
    Text,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Image
} from '@chakra-ui/react';
import {
    FaBars,
    FaChevronDown,
} from 'react-icons/fa';
import logo from '../../../images/logo_large.png';
import svg2 from '../../../images/user-header.png';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../App';
import { types } from '../../../auth/authReducer';

// Header responsive
const Header = ({ onOpen, ...rest }) => {
    
  const navigate = useNavigate();
    const {user, dispatch} = useAuthContext();
    const handleLogout = () => {
        navigate("/login");
        dispatch({
            type: types.logout
        })
    }
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            backgroundImage={`url(${svg2})`}
            backgroundSize="cover" backgroundRepeat="no-repeat"
            backgroundPosition='center'
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FaBars />}
            />

            <Image
                display={{ base: 'flex', md: 'none' }}
                width="200px"
                src={logo}
                alt="Inicia Sesión"
            />

            <HStack bg="white" px={2} spacing={{ base: '0', md: '6' }} borderRadius="10px">
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    name={user.name + " " + user.lastname}
                                    src="https://bit.ly/broken-link"
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                    >
                                    <Text fontSize="sm">{user.username}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {user.role.name}
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FaChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
export default Header;