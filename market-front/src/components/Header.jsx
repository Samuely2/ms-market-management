import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">Market Dashboard</div>
        <nav>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
        </nav>
      </div>
    </header>

  );
};

export default Header; 

