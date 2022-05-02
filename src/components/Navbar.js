import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar = (props) => {

    const navigate = useNavigate();
    const handleSignOut = async () => {
        try{
            await axios.get('/signout');
            navigate('/');
            window.location.reload(false);
        } catch (error) {
            console.log(error.response);
        }
    }

    return(
        <nav className="navbar fixed-top navbar-expand-md navbar-light bg-white border-bottom shadow-sm">
            <div className="container">
                <span className="navbar-brand logo">
                    Jordan Walke
                </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mb-2 mb-lg-0 mb-md-0" id="navbarContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 mb-md-0">
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        { props.name !== "" && !props.isAdmin &&
                        <>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/editor">Create</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/uploads">Uploads</NavLink>
                            </li>
                        </>
                        }
                    </ul>
                    { props.name === ""?
                    <>
                        <NavLink to="/signin" className="ms-auto"><button className="me-2 btn btn-primary non-reactive">Sign&nbsp;in</button></NavLink>
                        <NavLink to="/register"><button className="btn btn-primary non-reactive">Register</button></NavLink>
                    </> :
                    <>
                        <span className="ms-auto me-3 navbar-text">{props.name}</span>
                        <button onClick={handleSignOut} className="btn btn-primary non-reactive">Sign&nbsp;out</button>   
                    </>
                    }
                </div>
            </div>
        </nav> 
      );
}

export default Navbar;