import React, { useEffect, useState } from "react";

function App() {
	const [data, setData] = useState("hopp");

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
			<h1>Hello!! 🐳</h1>
			<h1>{data}</h1>
		</div>
	);
}

export default App;
