import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { login } from "../../features/auth/authSlice";

interface Props {
	user: any;
}

const Login = (props: Props) => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	if (props.user) {
		navigate("/");
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await fetch("http://localhost:5000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: formData.email,
				password: formData.password,
			}),
		});
		const data = await res.json();

		dispatch(login(data));
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
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
				Don't have an account yet?{" "}
				<Link to='/register'>Create Account</Link>
			</p>
		</div>
	);
};

export default Login;
