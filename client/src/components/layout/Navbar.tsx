import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";

interface Props {}

const Navbar = (props: Props) => {
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch();
	return (
		<nav>
			<div>Reddit Clone</div>

			<div>
				{user ? (
					<>
						<a onClick={() => dispatch(logout())}>Logout</a>
					</>
				) : (
					<>
						<Link to='/login'>Login</Link>
						<Link to='/Register'>Register</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
