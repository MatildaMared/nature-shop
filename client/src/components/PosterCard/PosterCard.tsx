import React, { useEffect, useState } from "react";
import { Poster } from "../../models/Poster";
import styled from "styled-components";
import { Heart } from "react-feather";
import { useNavigate } from "react-router-dom";

interface Props {
	poster: Poster;
	onFavoriteClick: (id: string) => void;
	favorites: string[];
}

function PosterCard(props: Props) {
	const [likeBtnClassName, setLikeBtnClassName] = useState<string>("");
	const { poster, onFavoriteClick, favorites } = props;
	const navigate = useNavigate();

	function redirectToPosterPage() {
		navigate(`/posters/${poster.id}`);
	}

	function likeButtonClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		onFavoriteClick(poster.id);
	}

	useEffect(() => {
		if (favorites && favorites.includes(poster.id)) {
			setLikeBtnClassName("favorite");
		} else {
			setLikeBtnClassName("");
		}
	}, [favorites]);

	return (
		<Wrapper key={poster.id}>
			<Content onClick={redirectToPosterPage} data-testid="poster-card">
				<LinkText>Click for details</LinkText>
				<Title>{poster.title}</Title>
				<ImageWrapper>
					<Image src={poster.imageUrl} alt={poster.title} />
				</ImageWrapper>
				<Details>
					<div>
						<Price>{poster.price}:-</Price>
					</div>
					<LikeButton
						onClick={likeButtonClickHandler}
						className={likeBtnClassName}
					>
						<Heart size={22} strokeWidth={1} />
					</LikeButton>
				</Details>
			</Content>
		</Wrapper>
	);
}

const ImageWrapper = styled.div`
	border: 4px solid var(--color-primary-dark);
	background: #fff;
	padding: 2rem;
	width: 100%;
	max-width: 320px;
	height: 100%;
	max-height: 450px;
	transition: all 0.25s;
	position: relative;
	box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
`;

const LinkText = styled.p`
	position: absolute;
	top: 25%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 2;
	background-color: var(--color-black);
	color: var(--color-white);
	font-size: 0.8rem;
	text-transform: uppercase;
	letter-spacing: 2px;
	padding: 0.25rem 0.5rem;
	display: none;
	width: fit-content;
`;

const Content = styled.li`
	height: 100%;
	max-width: 320px;
	width: 100%;
	margin: 0 auto;
	position: relative;
	height: 520px;

	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		& ${ImageWrapper} {
			padding: 0;
		}

		& ${ImageWrapper}:before {
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

const Wrapper = styled.article`
	padding: 1rem;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const Title = styled.h3`
	font-weight: 400;
	font-size: 0.9rem;
	text-transform: uppercase;
	letter-spacing: 2px;
	text-align: center;
	margin-bottom: 0.5rem;
`;

const Details = styled.div`
	height: auto;
	margin: 0.25rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Price = styled.p`
	font-size: 0.9rem;
`;

const LikeButton = styled.button`
	border: none;
	background: none;
	cursor: pointer;

	& svg {
		transition: all 0.3s;
	}

	&.favorite {
		& svg {
			fill: var(--color-primary-dark);
		}

		&:hover {
			& svg {
				fill: var(--color-primary);
			}
		}
	}
	&:hover {
		& svg {
			fill: var(--color-primary);
			color: var(--color-primary);
		}
	}
`;

export default PosterCard;
