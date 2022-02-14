import React, { useState, useEffect } from "react";
import { Poster } from "../../models/Poster";
import styled from "styled-components";
import PosterCard from "../PosterCard/PosterCard";

interface Props {
	posters: Poster[] | null | [];
}

function PostersList(props: Props) {
	const { posters } = props;

	return (
		<Grid>
			{posters &&
				posters.map((poster) => <PosterCard key={poster.id} poster={poster} />)}
			{posters && posters.length === 0 && (
				<Message>No posters found...</Message>
			)}
		</Grid>
	);
}

const Grid = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(336px, 1fr));
	grid-gap: 1rem;
`;

const Message = styled.p`
	text-align: center;
`;

export default PostersList;
