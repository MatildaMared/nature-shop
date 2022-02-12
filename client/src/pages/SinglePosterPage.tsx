import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Poster as PosterInterface } from "../models/Poster";
import { getPoster } from "../services/postersService";
import Poster from "../components/Poster/Poster";

interface Props {
	isAdmin: boolean;
	isLoggedIn: boolean;
}

function SinglePosterPage(props: Props) {
	// Variables
	const { isAdmin, isLoggedIn } = props;
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [loadingMessage, setLoadingMessage] = useState("Loading...");
	const [poster, setPoster] = useState<PosterInterface | null>(null);

	// Functions
	async function getData() {
		if (id) {
			const data = await getPoster(id);
			if (data.success) {
				setPoster(data.product);
				setIsLoading(false);
			} else {
				setLoadingMessage(
					`${data.error}. Please try refreshing the page or go back to the home page.`
				);
			}
		}
	}

	async function onDeletePoster(id: string) {
		console.log("Will delete poster with id: " + id);
	}

	async function onEditPoster(id: string) {
		console.log("Will edit poster with id: " + id);
	}

	async function onAddToCart(id: string) {
		console.log("Will add to cart");
	}

	// Effects
	useEffect(() => {
		getData();
	}, []);

	return (
		<Wrapper>
			{isLoading && <LoadingMessage>{loadingMessage}</LoadingMessage>}
			{!isLoading && poster && (
				<Poster
					poster={poster}
					isAdmin={isAdmin}
					isLoggedIn={isLoggedIn}
					onDeletePoster={onDeletePoster}
					onEditPoster={onEditPoster}
					onAddToCart={onAddToCart}
				/>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.main`
	background-color: var(--color-white);
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: var(--max-width);
	margin: 0 auto;
	padding: 4rem 1rem 8rem 1rem;
`;

const LoadingMessage = styled.p`
	text-align: center;
`;

export default SinglePosterPage;
