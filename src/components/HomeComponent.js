// Import React 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../App';
// Import Designe 
import { 
    Button, Center, AspectRatio, Image, Box, Text, Heading, Avatar, Stack, Link, useColorModeValue
} from '@chakra-ui/react';
// Import Icons 
import { FaGithub, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import { GrHeroku } from "react-icons/gr";
// Import Images 
import pmlogo from '../images/logo.jpeg';
import aleImg from '../images/members/ale.jpg'
import luImg from '../images/members/lucia.jpg'
import marImg from '../images/members/mariam.jpg'
import sheyImg from '../images/members/sheyla.jpg'
import ariImg from '../images/members/ariadna.jpg'

// members data
const members = [
    {
        name: "Lucía Paulina Pereyra",
        skills: "Back End",
        image: { luImg },
        imageName: "luImg",
        github: "https://github.com/luciapaulinapereyra",
        email: "luciapaulinapereyra@gmail.com",
        linkedin: "https://www.linkedin.com/in/luc%C3%ADa-pereyra-9178621ba"
    },
    {
        name: "Alejandra Adrian Tejada",
        skills: "Front End",
        image: { aleImg },
        imageName: "aleImg",
        github: "https://github.com/ale-drian",
        email: "thalia.adrian@tecsup.edu.pe",
        linkedin: "https://www.linkedin.com/in/alejandraadrian/"
    },
    {
        name: "Mariam Apaza Santillana",
        skills: "Front End",
        image: { marImg },
        imageName: "marImg",
        github: "https://github.com/mapaza",
        email: "mariam.apaza@tecsup.edu.pe",
        linkedin: "https://www.linkedin.com/in/mariam-dalia-apaza-santillana-0b7a49223/"
    },
    {
        name: "Ariadna Eyzaguirre Cuellar",
        skills: "Diseño",
        image: { ariImg },
        imageName: "ariImg",
        github: "https://github.com/ariaeyza",
        email: "ariadna.eyzaguirre@gmail.com",
        linkedin: "https://www.linkedin.com/in/ariadnaeyzaguirre/"
    },
    {
        name: "Sheyla Breña Sicha",
        skills: "Diseño",
        image: { sheyImg },
        imageName: "sheyImg",
        github: "https://github.com/ariaeyza",
        email: "sheylabrenasicha@gmail.com",
        linkedin: "https://www.linkedin.com/in/sheylabre/"
    }
]

// Componente -> Card para mostrar detalle de cada miembro
const MemberCard = ({ member, image}) => {
    return (
        <Center py={4}>
            <Box maxW={'320px'} minW={'280px'} w={'auto'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'xl'} rounded={'lg'} p={4} textAlign={'center'}>
                <Avatar size={'2xl'} src={image} alt={'Avatar Alt'} mb={4} pos={'relative'} />
                <Heading fontSize={'xl'} fontFamily={'body'}>
                    {member.name}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={2}>
                    {member.skills}
                </Text>
                <Stack align={'center'} justify={'center'} direction={'row'} mt={2}>
                    <Link isExternal href={member.linkedin}><Button bgColor="#ff5757" color="white" _hover={{ bgColor: "red" }}><FaLinkedinIn /></Button></Link>
                    <Link isExternal href={member.github}><Button bgColor="#ff5757" color="white" _hover={{ bgColor: "red" }}><FaGithub /></Button></Link>
                    <Link isExternal href={"mailto:" + member.email}><Button bgColor="#ff5757" color="white" _hover={{ bgColor: "red" }}><FaGoogle /></Button></Link>
                </Stack>
            </Box>
        </Center>
    );
}

//Componente principal
const Home = () => {
    //Hook para navegar entre las rutas de route
    const navigate = useNavigate();
    //Hook contexto para variables globales (autenticacion)
    const { user } = useAuthContext();
    //Navegar al Login o Dashboard
    const handleClickLogin = () => navigate('/login');
    const handleClickDashboard = () => navigate('/dashboard');
    console.log("members",members)
    return (
        <>
            <Center w="100%" minH="100vh" backgroundColor="#f5cf64" >
                <Box p={4}>
                    <AspectRatio maxW="256px" ratio={1} mx="auto" mb="10">
                        <Image borderRadius="15px" alt="logoPineappleMarket" objectFit="contains" src={pmlogo} />
                    </AspectRatio>
                    <Heading w="100%" fontSize="4xl" mb="4" textAlign="center"> Pen-Pinneapple-Apple-Pen (PPAP)</Heading>
                    <Text textAlign="center" w="100%" mb={4}>By:</Text>
                    <Text w="100%" fontSize="md" mb="4" textAlign="center">Alejandra Adrian <Box w="1" h="1" bg="orange" display="inline-block" mx={2} /> Lucia Pereyra <Box w="1" h="1" bg="orange" display="inline-block" mx={2} /> Mariam Apaza </Text>
                    <Text w="100%" fontSize="md" mb="4" textAlign="center"> Ariadna Eyzaguirre <Box w="1" h="1" bg="orange" display="inline-block" mx={2} />  Sheyla Breña </Text>
                    <Center my={10}>
                        {
                            user.logged ?
                                <Button marginBottom="1.5rem" fontSize="2xl" h="48px" w="40%" backgroundColor="#ff5757" _hover={{ bgColor: "red" }} color="white" mx={4} onClick={handleClickDashboard}>Dashboard</Button>
                                :
                                <Button marginBottom="1.5rem" fontSize="2xl" h="48px" w="40%" backgroundColor="#ff5757" _hover={{ bgColor: "red" }} color="white" mx={4} onClick={handleClickLogin}>Login</Button>
                        }
                    </Center>
                    {/* Links Github */}
                    <Center mb={5}>
                        <Stack direction={["column", "row"]} spacing="20px">

                            <Link href="https://github.com/ale-drian/pineapple-app-front" isExternal h="48px">
                                <Button leftIcon={<FaGithub />} fontSize="xl" color="white" backgroundColor="#2e3339" _hover={{ bgColor: "black" }} mx={2} > GitHub Front </Button>
                            </Link>
                            <Link href="https://github.com/luciapaulinapereyra/pineapple-app-back" isExternal h="48px">
                                <Button leftIcon={<FaGithub />} fontSize="xl" color="white" backgroundColor="#2e3339" _hover={{ bgColor: "black" }} mx={2} > GitHub Back</Button>
                            </Link>
                        </Stack>
                    </Center>
                    {/* Links Despliegue */}
                    <Center>
                        <Stack direction={["column", "row"]} spacing="20px">

                            <Link href="https://github.com/ale-drian/pineapple-app-front" isExternal h="48px">
                                <Button leftIcon={<GrHeroku />} fontSize="xl" color="white" backgroundColor="#2e3339" _hover={{ bgColor: "black" }} mx={2} > Heroku App </Button>
                            </Link>
                            <Link href="https://github.com/luciapaulinapereyra/pineapple-app-back" isExternal h="48px">
                                <Button leftIcon={<GrHeroku />} fontSize="xl" color="white" backgroundColor="#2e3339" _hover={{ bgColor: "black" }} mx={2} > Heroku API </Button>
                            </Link>
                        </Stack>
                    </Center>

                </Box>
            </Center>
            {/* Muestra nuestro equipo */}
            <Center w="100%" minH="100vh" backgroundColor="#F2B70f" >
                <Box p={4} pt={10}>

                    <Heading w="100%" fontSize="4xl" mb="4" textAlign="center" color="white"> NUESTRO EQUIPO</Heading>

                    <Stack direction={{ base: 'column', lg: 'row', md: 'col' }}
                        spacing={{ base: 4, md: 4, lg: 10 }}>
                        <MemberCard member={members[0]} image={members[0].image[members[0].imageName]} />
                        <MemberCard member={members[1]} image={members[1].image[members[1].imageName]} />
                        <MemberCard member={members[2]} image={members[2].image[members[2].imageName]} />
                    </Stack>
                    <Center>

                        <Stack direction={{ base: 'column', lg: 'row' }}
                            spacing={{ base: 4, md: 4, lg: 10 }}>
                            <MemberCard member={members[3]} image={members[3].image[members[3].imageName]} />
                            <MemberCard member={members[4]} image={members[4].image[members[4].imageName]} />
                        </Stack>
                    </Center>
                </Box>
            </Center>
        </>
    );
}

export default Home;