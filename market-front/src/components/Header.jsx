import { Link } from 'react-router-dom';
import '../styles/layout.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/products" className="logo">Market Dashboard</Link>
        <nav>
          <button className="logout-btn">Sair</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;