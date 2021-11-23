import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Center, AspectRatio, Image, Box, Text, Heading} from '@chakra-ui/react';
import { useAuthContext } from '../App';
import pmlogo from '../images/logo.jpeg';
import { FaGithub} from "react-icons/fa";

function Home() {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const handleClickLogin = () => navigate('/login');
    const handleClickDashboard = () => navigate('/dashboard');
    //console.log("user", user.role.id)//
    return (
        <Center w="100%" minH="100vh">
            <Box p={4} >
                <AspectRatio maxW="256px" ratio={1} mx="auto" mb="14"  
                    w={{ base: '100%', sm: '50%', md: '35%', lg: '100%' }} 
                    h={{ base: '100%', sm: '50%', md: '35%', lg: '100%' }} >
                    <Image alt="logoPineappleMarket" objectFit="contains" src={pmlogo} />
                </AspectRatio>
                <Heading w="100%" fontSize="2xl" mb="4" textAlign="center"> Pen Pinneapple Apple Pen</Heading>
                <Text w="100%"  fontSize="md" mb="4" textAlign="center">Alejandra Adrian <Box w="1" h="1" bg="orange" display="inline-block" mx={2}/> Sheyla Breña <Box w="1" h="1" bg="orange" display="inline-block" mx={2}/> Ariadna Eyzaguirre <Box w="1" h="1" bg="orange" display="inline-block" mx={2}/> Mafer Lopez <Box w="1" h="1" bg="orange" display="inline-block" mx={2}/> Lucia Pereyra</Text>
                <Center>
                    {
                            user.logged ?
                            <Button marginBottom="1.5rem" size="md" h="48px" w="40%" colorScheme="red" mx={4} onClick={handleClickDashboard}>Dashboard</Button>
                            :
                            <Button marginBottom="1.5rem" size="md" h="48px" w="40%" backgroundColor="#F2B705" color="white" mx={4} onClick={handleClickLogin}>Login</Button>
                    }       
                </Center>   
                <Center>                                       
                    <Button leftIcon={<FaGithub />} size="lg" h="48px" w="40%" color="white" backgroundColor="#24292F" mx={2} href="https://github.com/ale-drian/pineapple-app-front"> GitHub Front </Button>
                    <br />
                    <Button leftIcon={<FaGithub />} size="lg" h="48px" w="40%" color="white" backgroundColor="#24292F" mx={2} href="https://github.com/luciapaulinapereyra/pineapple-app-back"> GitHub Back</Button>
                </Center> 
                                
            </Box>
            
        </Center>
    );
}

export default Home;