import React, { useEffect, useState, useContext } from "react";
import Header from "./components/Header/Header";
import { UserContext } from "./context/UserContext";

interface Product {
	id: number;
	title: string;
	description: string;
	imageUrl: string;
	price: number;
	inStock: number;
}

function App() {
	const [products, setProducts] = useState<Product[] | null>(null);
	const [context, updateContext] = useContext(UserContext);

	const fetchData = async () => {
		const response = await fetch("/api/products");
		const data = await response.json();
		setProducts(data.products);
	};

	useEffect(() => {
		fetchData();
	});

	return (
		<div className="App">
			<Header />
			<h1>Hello {context.name}!! 🐳 🦄</h1>
			{products &&
				products.map((product) => (
					<div key={product.id}>
						<h2>{product.title}</h2>
						<img src={product.imageUrl} alt={product.title} />
						<p>{product.description}</p>
						<p>{product.price}</p>
						<p>{product.inStock}</p>
					</div>
				))}
		</div>
	);
}

export default App;
