import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {
	user: any;
}

const Register = (props: Props) => {
	const [formData, setFormData] = useState({
		email: "",
		username: "",
		password: "",
	});
	const navigate = useNavigate();

	if (props.user) {
		navigate("/");
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("nice");

		const res = await fetch("http://localhost:5000/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: formData.email,
				username: formData.username,
				password: formData.password,
			}),
		});
		const data = await res.json();
		console.log(data);
	};
	return (
		<div>
			<h1>Register</h1>

			<form onSubmit={(e) => handleSubmit(e)}>
				<div className=''>
					<label>Username </label>
					<input
						type='text'
						name='username'
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className=''>
					<label>Email </label>
					<input
						type='email'
						name='email'
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className=''>
					<label>Password</label>

					<input
						type='password'
						name='password'
						onChange={(e) => handleChange(e)}
					/>
				</div>

				<button type='submit'>Login</button>
			</form>
			<p>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</div>
	);
};

export default Register;
