import React from "react";
import { Poster } from "../../models/Poster";
import styled from "styled-components";
import { Heart } from "react-feather";

interface Props {
	posters: Poster[] | null;
}

function PostersList(props: Props) {
	const { posters } = props;

	return (
		<Grid>
			{posters &&
				posters.map((poster) => (
					<PosterCard key={poster.id}>
						<PosterContent>
							<LinkText>Click for details</LinkText>
							<PosterTitle>{poster.title}</PosterTitle>
							<PosterImageWrapper>
								<PosterImage src={poster.imageUrl} alt={poster.title} />
							</PosterImageWrapper>
							<PosterDetails>
								<div>
									<PosterPrice>{poster.price}:-</PosterPrice>
								</div>
								<LikeButton>
									<Heart size={22} strokeWidth={1} />
								</LikeButton>
							</PosterDetails>
						</PosterContent>
					</PosterCard>
				))}
		</Grid>
	);
}

const Grid = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(336px, 1fr));
	grid-gap: 1rem;
`;

const PosterImageWrapper = styled.div`
	border: 4px solid var(--color-primary-dark);
	background: #fff;
	padding: 2rem;
	width: 100%;
	max-width: 320px;
	height: 100%;
	max-height: 450px;
	transition: all 0.25s;
	position: relative;
`;

const LinkText = styled.p`
	position: absolute;
	top: 25%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 2;
	background-color: var(--color-black);
	color: var(--color-white);
  font-size: .8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
	padding: 0.25rem 0.5rem;
  display: none;
  width: fit-content;
`;

const PosterContent = styled.div`
	height: 100%;
	width: fit-content;
	max-width: 320px;
	width: 100%;
	margin: 0 auto;
	position: relative;

	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		& ${PosterImageWrapper} {
			padding: 0;
		}

		& ${PosterImageWrapper}:before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			text-align: center;
			background-color: rgba(0, 0, 0, 0.3);
		}

		& ${LinkText} {
			display: block;
		}
	}
`;

const PosterCard = styled.article`
	padding: 1rem;
	height: 100%;
`;

const PosterImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const PosterTitle = styled.h3`
	font-weight: 400;
	font-size: 0.9rem;
	text-transform: uppercase;
	letter-spacing: 2px;
	text-align: center;
	margin-bottom: 0.5rem;
`;

const PosterDetails = styled.div`
	margin-top: 0.25rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const PosterPrice = styled.p`
	font-size: 0.9rem;
`;

const PosterDescription = styled.p``;

const LikeButton = styled.button`
	border: none;
	background: none;
	cursor: pointer;

	&:hover {
		& svg {
			fill: var(--color-primary-dark);
		}
	}
`;

export default PostersList;
