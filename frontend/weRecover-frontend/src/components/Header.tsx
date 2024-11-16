import logo from '../assets/logo.png';
import userAvatar from '../assets/userAvatar.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="weRecover Logo" className="img-fluid" style={{ height: '50px' }} />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
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
                    <div className="dropdown ml-3">
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
                </div>
            </div>
        </header>
    );
};

export default Header;
