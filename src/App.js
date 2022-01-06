import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Editor from './components/Editor';
import Register from './components/Register';
import Signin from './components/Signin';
import Home from './components/Home';
import Uploads from './components/Uploads'


//logo-color: 1B6DC1  

function App() {

	const [signedInUser, setSignedInUser] = useState({
		id:"",
		name:"",
		email:""
	});
	
	useEffect(() => {
		const getUser = async () => {
			try{
				const response = await axios.get('/finduser');
				console.log(response);
				setSignedInUser({id:response.data._id, name:response.data.name, email:response.data.email});
			} catch (error) {
				console.log(error.response);
			}
		}
		getUser();
	},[])

	return(
		<>
			<Navbar name={signedInUser.name} />
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/uploads" element={<Uploads authorId={signedInUser.id} />} />

				<Route path="/editor" element={<Editor userData={signedInUser} />} />

				<Route path="/register" element={<Register />} />

				<Route path="/signin" element={<Signin />} />
			</Routes>
		</>	
	);
}

export default App;

