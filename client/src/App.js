import logo from './logo.svg';
import './App.css';
import NavHeader from './components/NavHeader';
import HomePage from './Pages/HomePage';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  const handleUserLogin = (user) => {
    setUser(user);
  }

  return (
    <div className="dark-mode">
      <NavHeader handleUserLogin={handleUserLogin} />
      <HomePage user={user} />
    </div>
  );
}

export default App;