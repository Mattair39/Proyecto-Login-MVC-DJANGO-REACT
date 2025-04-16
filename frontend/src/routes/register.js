import {
    VStack, Button, FormControl, FormLabel,
    Input, Heading, Box
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useAuth } from "../contexts/useAuth";
  
  const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [cPass, setCPass]       = useState("");
    const { register_user }       = useAuth();
  
    return (
      <Box bg="gray.800" p={8} rounded="lg" shadow="lg" w="full" maxW="420px">
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" size="lg" color="gray.100">
            Crear Cuenta
          </Heading>
  
          <FormControl>
            <FormLabel color="gray.300">Nombre de Usuario</FormLabel>
            <Input
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              color="gray.100"
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>
  
          <FormControl>
            <FormLabel color="gray.300">Correo Electrónico</FormLabel>
            <Input
              type="email"
              placeholder="correo@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="gray.100"
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>
  
          <FormControl>
            <FormLabel color="gray.300">Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color="gray.100"
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>
  
          <FormControl>
            <FormLabel color="gray.300">Confirmar Contraseña</FormLabel>
            <Input
              type="password"
              value={cPass}
              onChange={(e) => setCPass(e.target.value)}
              color="gray.100"
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>
  
          <Button
            colorScheme="teal"
            onClick={() => register_user(username, email, password, cPass)}
          >
            Registrarme
          </Button>
        </VStack>
      </Box>
    );
  };
  
  export default Register;
  