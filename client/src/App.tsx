import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
	const [data, setData] = useState("hopp");
	const [context, updateContext] = useContext(UserContext);

	const fetchData = async () => {
		const result = await fetch("/api/test");
		const data = await result.json();
		setData(data.message);
	};

	useEffect(() => {
		fetchData();
	});

	return (
		<div className="App">
			<h1>Hello {context.name}!! 🐳</h1>
			<h1>{data}</h1>
		</div>
	);
}

export default App;
