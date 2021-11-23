import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useAuthContext } from '../App';

function Home() {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const handleClickLogin = () => navigate('/login');
    const handleClickDashboard = () => navigate('/dashboard');
    console.log("user", user.logged)
    return (
        <div>
            <p>Home</p>
            {
                user.logged ?
                <Button colorScheme="red" onClick={handleClickDashboard}>Dashboard</Button>
                :
                <Button colorScheme="blue" onClick={handleClickLogin}>Login</Button>
            }
        </div>
    );
}

export default Home;
