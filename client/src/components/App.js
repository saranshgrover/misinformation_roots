import React from 'react';
import {
  ChakraProvider,
  Box
} from '@chakra-ui/react';
import theme from '../theme'

import { BrowserRouter, Routes, Route } from "react-router-dom";



import Home from './Home';
import Hashtag from './Hashtag';
import Tweet from './Tweet';
import Header from './Header';
import { useStore } from '../store/store';
import BubbleChart from './BubbleChart';



function App() {
  const header = useStore(store => store.header);
  return (
    <ChakraProvider theme={theme}>
      <Box h='100vh' w='100vw'>
        <BrowserRouter>
          {header && <Header />}
          <Routes>
            <Route path="/hashtag/:hashtag" element={<Hashtag />} />
            <Route path="/hashtag/:hashtag/:month" element={<BubbleChart />} />
            <Route path="tweet/:tweetId" element={<Tweet />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Box>

    </ChakraProvider>
  );
}

export default App;
