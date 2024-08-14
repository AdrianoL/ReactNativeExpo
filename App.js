import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import Navigation from './components/Navigation';

function App() {
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
