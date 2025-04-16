import {
    VStack, Heading, Text, Button, Box, Divider
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { get_notes, logout } from "../endpoints/api";
  
  const Menu = () => {
    const [notes, setNotes] = useState([]);
    const nav = useNavigate();
  
    useEffect(() => {
      (async () => {
        const data = await get_notes();
        setNotes(data || []);
      })();
    }, []);
  
    const handleLogout = async () => {
      if (await logout()) nav("/login");
    };
  
    return (
      <Box bg="gray.800" p={8} rounded="lg" shadow="lg" w="full" maxW="500px">
        <VStack spacing={2} mb={6}>
          <Heading size="lg" color="gray.100" textAlign="center">
            Menú MVC ‑ DJANGO ‑ REACT
          </Heading>
          <Text fontSize="sm" color="gray.400" textAlign="justify">
            Esta aplicación utiliza Django REST Framework junto a SimpleJWT para gestionar tokens access y refresh, almacenados en cookies httponly. El frontend, construido con React, Chakra UI y Axios, envía automáticamente las credenciales en cada petición, asegurando un flujo de autenticación seguro basado en JWT.
          </Text>
        </VStack>
  
        <VStack spacing={6}>
          <Heading size="lg" color="gray.100">
            Bienvenido de vuelta!
          </Heading>
  
          {notes.length === 0 ? (
            <Text color="gray.400" textAlign="justify">
              Sin registros
            </Text>
          ) : (
            <VStack w="full" align="stretch" spacing={3}>
              {notes.map(n => (
                <Box
                  key={n.id}
                  p={3}
                  borderWidth="1px"
                  rounded="md"
                  color="gray.100"
                  textAlign="justify"
                >
                  {n.description}
                </Box>
              ))}
            </VStack>
          )}
  
          <Divider borderColor="gray.600" />
  
          <Button colorScheme="red" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </VStack>
      </Box>
    );
  };
  
  export default Menu;
  