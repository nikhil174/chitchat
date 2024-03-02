import React, { useEffect } from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';
import { useHistory } from 'react-router-dom';

const Homepage = () => {
    const history = useHistory();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("chitchat-userInfo"));

        if (user) history.push("/chats");
    }, [history]);
    
    return (
        <Container maxW='xl' centerContent>
            <Box
                display="flex"
                justifyContent='center'
                p={3}
                bg={"white"}
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text
                    fontSize='4xl'
                    fontFamily="Roboto"
                    color="black"
                >
                    ChitChat
                </Text>
            </Box>
            <Box
                bg="white"
                w="100%"
                p={4}
                borderRadius="lg"
                borderWidth="1px"
            >
                <Tabs
                    variant='soft-rounded'
                    color="black"
                >
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Homepage
