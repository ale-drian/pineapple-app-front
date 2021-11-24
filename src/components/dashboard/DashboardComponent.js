import React from 'react'; 
import { useAuthContext } from '../../App';
import { Box, Text } from '@chakra-ui/react';

function Content(){
    
    const {user} = useAuthContext();

    return(
        
        <Box>
            <Text fontSize={'xl'}>Bienvenido {user.name} {user.lastName}!</Text>
        </Box>
    );
}

function Dashboard() {
    return (
        <Content/>
    );
}

export default Dashboard;
