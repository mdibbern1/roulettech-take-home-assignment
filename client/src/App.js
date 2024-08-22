import logo from './logo.svg';
import './App.css';
import NavHeader from './components/NavHeader';
import HomePage from './Pages/HomePage';
import { useState } from 'react';

function App() {

  return (
    <div className="dark-mode">
      <NavHeader />
      <HomePage />
    </div>
  );
}

export default App;