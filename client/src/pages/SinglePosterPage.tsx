import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Poster as PosterInterface } from "../models/Poster";
import { getPoster, deletePoster } from "../services/postersService";
import Poster from "../components/Poster/Poster";
import { NewCart } from "../models/Cart";
import { getToken } from "../services/localStorageService";

interface Props {
	isAdmin: boolean;
	isLoggedIn: boolean;
	setPosters: (posters: PosterInterface[]) => void;
}

function SinglePosterPage(props: Props) {
	// Variables
	const { isAdmin, isLoggedIn, setPosters } = props;
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [loadingMessage, setLoadingMessage] = useState("Loading...");
	const [poster, setPoster] = useState<PosterInterface | null>(null);
	const navigate = useNavigate();

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
		if (
			window.confirm(
				"Would you really like to delete this poster? This decision cannot be undone."
			)
		) {
			const token = getToken();
			if (token) {
				const response = await deletePoster(id, token);
				if (response.success) {
					setPosters(response.products);
					navigate("/");
				}
			}
		}
	}

	async function onEditPoster(id: string) {
		console.log("Will edit poster with id: " + id);
	}

	async function onAddToCart(cartObj: NewCart) {
		console.log("Will add to cart");
		console.log(cartObj);
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
					deletePosterHandler={onDeletePoster}
					editPosterHandler={onEditPoster}
					addToCartHandler={onAddToCart}
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
