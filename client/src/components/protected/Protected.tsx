import React, { useEffect } from "react";

interface Props {}

const Protected = (props: Props) => {
	useEffect(() => {
		const fetchData = async () => {
			const token = (await localStorage.getItem("jit")) || "";
			const res = await fetch("http://localhost:5000/api/auth/me", {
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: token,
				}),
				mode: "cors",
			});
			const data = await res.json();
		};

		fetchData();
	});
	return <div>Protected</div>;
};

export default Protected;
