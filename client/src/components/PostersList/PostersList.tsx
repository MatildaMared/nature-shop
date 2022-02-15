import React from "react";
import { Poster } from "../../models/Poster";
import styled from "styled-components";
import PosterCard from "../PosterCard/PosterCard";

interface Props {
	posters: Poster[] | null | [];
	onFavoriteClick: (id: string) => void;
	favorites: string[];
}

function PostersList(props: Props) {
	const { posters, onFavoriteClick, favorites } = props;

	return (
		<Grid>
			{posters &&
				posters.map((poster) => (
					<PosterCard
						favorites={favorites}
						onFavoriteClick={onFavoriteClick}
						key={poster.id}
						poster={poster}
					/>
				))}
			{posters && posters.length === 0 && (
				<Message>No posters found...</Message>
			)}
		</Grid>
	);
}

const Grid = styled.ul`
	padding: 0;
	list-style: none;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(336px, 1fr));
	grid-gap: 1rem;
`;

const Message = styled.p`
	text-align: center;
`;

export default PostersList;
