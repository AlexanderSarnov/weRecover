import logo from '../assets/logo.png'; // Adjust the path as needed
import userAvatar from '../assets/userAvatar.png'; // Adjust the path as needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

const Header = () => {
    return (
        <header className="d-flex align-items-center p-3 bg-light">
            <div className="logo">
                <img src={logo} alt="weRecover Logo" className="img-fluid" style={{ height: '50px' }} />
            </div>
            <nav className="ml-auto">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/steps">
                            Steps
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/progress">
                            Progress
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/settings">
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="user-avatar ml-3 dropdown">
                <img
                    src={userAvatar}
                    alt="User Avatar"
                    className="rounded-circle dropdown-toggle"
                    style={{ height: '40px' }}
                    id="userAvatarDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                />
                <div className="dropdown-menu" aria-labelledby="userAvatarDropdown">
                    <a className="dropdown-item" href="/profile">
                        Profile
                    </a>
                    <a className="dropdown-item" href="/logout">
                        Logout
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
