import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Poster as PosterInterface } from "../models/Poster";
import { getPoster } from "../services/postersService";
import Poster from "../components/Poster/Poster";

function SinglePosterPage() {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [loadingMessage, setLoadingMessage] = useState("Loading...");
	const [poster, setPoster] = useState<PosterInterface | null>(null);

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

	useEffect(() => {
		getData();
	}, []);

	return (
		<Wrapper>
			{isLoading && <LoadingMessage>{loadingMessage}</LoadingMessage>}
			{!isLoading && poster && <Poster poster={poster} />}
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
