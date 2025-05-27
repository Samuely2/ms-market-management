import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/layout.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/')
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">Market Dashboard</div>
        <nav>
          <button className="logout-btn" onClick={handleLogout}>Sair</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
