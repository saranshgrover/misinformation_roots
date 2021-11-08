import React from 'react';
import {
  ChakraProvider,
  Box
} from '@chakra-ui/react';
import theme from '../theme'

import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";



import Home from './Home';
import Hashtag from './Hashtag';
import Tweet from './Tweet';
import Header from './Header';
import { useStore } from '../store/store';



function App() {
  const header = useStore(store => store.header);
  return (
    <ChakraProvider theme={theme}>
      <Box h='100vh' w='100vw'>
        {header && <Header />}
        <BrowserRouter>
          <Routes>
            <Route path="/hashtag/:hashtag" element={<Hashtag />} />
            <Route path="tweet/:tweetId" element={<Tweet />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Box>

    </ChakraProvider>
  );
}

export default App;
