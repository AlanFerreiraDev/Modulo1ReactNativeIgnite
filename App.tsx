import React from 'react';
import { StatusBar } from 'react-native';
// Barra de Status em cima (hora, sinal, bateria), posso colocar em qualquer lugar do componente

import { Home } from './src/pages/Home';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Home />
    </>
  );
}
