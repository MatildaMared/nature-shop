import React from "react";
import { Poster } from "../models/Poster";
import styled from "styled-components";
import PostersList from "../components/PostersList/PostersList";
import Heading from "../components/Heading/Heading";

interface Props {
	posters: Poster[] | null;
}

function PostersPage(props: Props) {
	const { posters } = props;

	return (
		<Wrapper>
			<Heading>Our Posters</Heading>
			<PostersList posters={posters} />
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
