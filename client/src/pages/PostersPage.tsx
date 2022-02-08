import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Product } from "../models/Product";
import styled from "styled-components";
import PostersList from "../components/PostersList/PostersList";

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
		<Wrapper>
			<PostersList />
		</Wrapper>
	);
}

const Wrapper = styled.main`
	max-width: var(--max-width);
	margin: 0 auto;
	background-color: var(--color-white);
	height: 100%;
	padding: 4rem 2rem;
`;

export default PostersPage;
