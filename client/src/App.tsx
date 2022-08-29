import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import HomePage from "./components/home/HomePage";
import Protected from "./components/protected/Protected";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "./features/auth/authSlice";
import { RootState } from "./app/store";
import Navbar from "./components/layout/Navbar";
import Form from "./Form";

interface Props {}

const App = (props: Props) => {
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem("jit");

			if (!token) {
				return;
			}

			const res = await fetch("/api/user/me", {
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: token,
				}),
			});
			const data = await res.json();
			dispatch(initializeAuth(data.user));
		};
		fetchUser();
		console.log(user);
	}, []);

	return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />}></Route>
					<Route path='/protected' element={<Protected />}></Route>
					<Route
						path='/login'
						element={<Login user={user} />}
					></Route>
					<Route
						path='/register'
						element={<Register user={user} />}
					></Route>
					<Route path='/form' element={<Form />}></Route>
					<Route
						path='*'
						element={<p>There is nothing here</p>}
					></Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
