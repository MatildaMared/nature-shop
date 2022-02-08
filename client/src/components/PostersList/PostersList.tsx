import React from "react";
import { Poster } from "../../models/Poster";
import styled from "styled-components";
import PosterCard from "../PosterCard/PosterCard";

interface Props {
	posters: Poster[] | null;
}

function PostersList(props: Props) {
	const { posters } = props;

	return (
		<Grid>
			{posters &&
				posters.map((poster) => <PosterCard key={poster.id} poster={poster} />)}
		</Grid>
	);
}

const Grid = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(336px, 1fr));
	grid-gap: 1rem;
`;

export default PostersList;
