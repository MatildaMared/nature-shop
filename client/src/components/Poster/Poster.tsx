import React, { useState } from "react";
import { Poster as PosterInterface } from "../../models/Poster";
import styled from "styled-components";
import Heading from "../Heading/Heading";

interface Props {
	poster: PosterInterface;
}

function Poster(props: Props) {
	const { title, description, category, imageUrl, price, inStock } =
		props.poster;

	const [frameColor, setFrameColor] = useState<"black" | "white">("black");
	const [passerPartout, setPasserPartout] = useState<boolean>(true);

	return (
		<Wrapper>
			<Heading>{title}</Heading>
			<ContentWrapper>
				<FrameWrapper className={frameColor}>
					<ImageWrapper
						className={`${frameColor} ${passerPartout ? "passerpartout" : ""}`}
					>
						<Image src={imageUrl} alt={title} />
					</ImageWrapper>
				</FrameWrapper>
				<Content>
					<Description>{description}</Description>
				</Content>
			</ContentWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	padding: 0 2rem;
	max-width: 1000px;
	margin: 0 auto;
`;

const ContentWrapper = styled.div`
	display: flex;
`;

const FrameWrapper = styled.div`
	width: 100%;
	max-width: 400px;
	height: 550px;
	margin-right: 1rem;
	&.white {
		border: 1px solid #ddd;
	}

	@media (max-width: 768px) {
		max-width: 300px;
		height: 425px;
	}
`;

const ImageWrapper = styled.div`
	width: 400px;
	height: 100%;
	border: 6px solid;

	@media (max-width: 768px) {
		width: 300px;
	}

	&.black {
		border-color: var(--color-black);
	}

	&.white {
		border-color: hsla(0, 0%, 100%, 1);
	}

	&.passerpartout {
		padding: 2rem;
	}
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
`;

const Content = styled.div``;

const Description = styled.p``;

export default Poster;
