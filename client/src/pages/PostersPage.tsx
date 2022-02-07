import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Product } from "../models/Product";

function PostersPage() {
	const [products, setProducts] = useState<Product[] | null>(null);
	const [context, updateContext] = useContext(UserContext);

	const fetchData = async () => {
		const response = await fetch("/api/products");
		const data = await response.json();
		setProducts(data.products);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
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

export default PostersPage;
