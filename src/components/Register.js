import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = (props) => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]:value });
    };


    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = user;
        try{
            const response = await axios.post('/register',payload); 
            console.log(response);
            window.alert(response.data.message);
            navigate('/signin');
        } catch (error) {
            console.log(error.response);
            window.alert(error.response.data.error);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card sign-card">
                    <div className="card-body">
                        <h3 className="logo">Jordan Walke</h3>
                        <h5 className="mb-4">Create your Jordan Walke account</h5>
                        <form className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control mb-3" name="name" 
                                value={user.name} onChange={handleInput} 
                            />
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control mb-3" name="email" 
                                value={user.email} onChange={handleInput} 
                            />
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control mb-3" name="password" 
                                value={user.password} onChange={handleInput}
                            />    
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-5 non-reactive">Register</button>          
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;