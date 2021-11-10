import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';

function Home() {
    const navigate = useNavigate();
    const handleClick = () => navigate('/login');
    return (
        <div>
            <p>Home</p>
            <Button colorScheme="blue" onClick={handleClick}>Login</Button>
        </div>
    );
}

export default Home;
