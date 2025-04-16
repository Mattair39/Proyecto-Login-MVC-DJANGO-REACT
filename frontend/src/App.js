import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme, ColorModeScript, Flex } from "@chakra-ui/react";

import Login     from "./routes/login";
import Register  from "./routes/register";
import Menu      from "./routes/menu";
import PrivateRoute from "./components/private_route";
import { AuthProvider } from "./contexts/useAuth";

const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  fonts: {
    heading: "'Inria Sans', sans-serif",
    body:    "'Inria Sans', sans-serif",
  },
  colors: {
    brand: {
      500: "#38b2ac",   
      600: "#319795",
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="dark" />
      <Router>
        <AuthProvider> {}
          <Flex minH="100vh" align="center" justify="center" bg="gray.900">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PrivateRoute><Menu /></PrivateRoute>} />
            </Routes>
          </Flex>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
