import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/home/HomePage";

interface Props {}

const App = (props: Props) => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path='/' element={<HomePage />}></Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
