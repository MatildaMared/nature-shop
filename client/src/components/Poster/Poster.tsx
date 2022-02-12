import React, { useState } from "react";
import { Poster as PosterInterface } from "../../models/Poster";
import styled from "styled-components";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import { AlertOctagon } from "react-feather";

interface Props {
	poster: PosterInterface;
	isAdmin: boolean;
	isLoggedIn: boolean;
	onDeletePoster: (id: string) => void;
	onEditPoster: (id: string) => void;
	onAddToCart: (id: string) => void;
}

function Poster(props: Props) {
	const { title, description, category, imageUrl, price, inStock } =
		props.poster;
	const { isAdmin, isLoggedIn, onDeletePoster, onEditPoster, onAddToCart } =
		props;

	const [frameColor, setFrameColor] = useState<"black" | "white">("black");
	const [passerPartout, setPasserPartout] = useState<boolean>(true);
	const [amount, setAmount] = useState<number>(1);

	return (
		<Wrapper>
			<Heading>{title}</Heading>
			<ContentWrapper>
				<ImageWrapper
					className={`${frameColor} ${passerPartout ? "passerpartout" : ""}`}
				>
					<Image src={imageUrl} alt={title} />
				</ImageWrapper>
				<Content>
					<Description>{description}</Description>
					<InformationWrapper>
						<div>
							<InfoTitle>Category: </InfoTitle> <InfoText>{category}</InfoText>
						</div>
						<div>
							<InfoTitle>Measurements: </InfoTitle>{" "}
							<InfoText>70x100cm</InfoText>
						</div>
						<div>
							<InfoTitle>Left in stock: </InfoTitle>{" "}
							<InfoText>{inStock}</InfoText>
						</div>
					</InformationWrapper>
					<Choices>
						<ChoiceWrapper>
							<Title>Frame color</Title>
							<label onClick={() => setFrameColor("black")}>
								<input
									type="radio"
									value="black"
									name="frame-color"
									checked={frameColor === "black"}
								/>{" "}
								Black
							</label>
							<label onClick={() => setFrameColor("white")}>
								<input
									type="radio"
									value="black"
									name="frame-color"
									checked={frameColor === "white"}
								/>{" "}
								White
							</label>
						</ChoiceWrapper>
						<ChoiceWrapper>
							<Title>Passerpartout</Title>
							<label onClick={() => setPasserPartout(true)}>
								<input
									type="radio"
									value="yes"
									name="passerpartout"
									checked={passerPartout}
								/>{" "}
								Yes
							</label>
							<label onClick={() => setPasserPartout(false)}>
								<input
									type="radio"
									value="no"
									name="passerpartout"
									checked={!passerPartout}
								/>{" "}
								No
							</label>
						</ChoiceWrapper>
					</Choices>
					<AmountWrapper>
						<Label htmlFor="amount">Amount</Label>
						<Input
							type="number"
							value={amount}
							onChange={(e) => setAmount(parseInt(e.target.value))}
							name="amount"
							min="1"
							max={inStock.toString()}
						/>
					</AmountWrapper>
					<Total>
						Total: <span>{price * amount}:-</span>
					</Total>
					<Button type="button" disabled={!isLoggedIn}>
						Add to cart
					</Button>
					{!isLoggedIn && (
						<Alert>
							<AlertOctagon size={14} />
							Please log in to add a poster to your cart
						</Alert>
					)}
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

	@media (max-width: 900px) {
		flex-direction: column;
	}
`;

const ImageWrapper = styled.div`
	width: 100%;
	min-width: 400px;
	max-width: 400px;
	height: 550px;
	margin-right: 2rem;
	align-self: center;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
	border: 6px solid;

	@media (max-width: 900px) {
		margin-bottom: 2rem;
	}

	@media (max-width: 768px) {
		min-width: 300px;
		max-width: 300px;
		height: 100%;
		height: 425px;
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

const ChoiceWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 2rem;
	position: relative;
	padding: 1rem;
	border: 1px solid var(--color-primary-lightest);
	width: 50%;
	max-width: 200px;
`;

const Title = styled.h3`
	font-weight: 400;
	font-size: 0.8rem;
	text-transform: uppercase;
	position: absolute;
	top: -11px;
	background-color: var(--color-white);
	padding: 2px;
	color: #7a7a7a;
	letter-spacing: 1px;
`;

const Description = styled.p`
	margin-bottom: 2rem;
`;

const InformationWrapper = styled.div`
	border: 1px solid var(--color-primary-lightest);
	width: fit-content;
	margin-bottom: 2rem;
	padding: 1rem 1rem 0.5rem 1rem;
	position: relative;

	&:after {
		content: "Details";
		position: absolute;
		top: -11px;
		font-size: 0.8rem;
		background-color: var(--color-white);
		padding: 2px;
		color: #7a7a7a;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	& > div {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
	}
`;

const Choices = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	& :not(:last-child) {
		margin-right: 1rem;
	}
`;

const InfoTitle = styled.h4`
	text-transform: uppercase;
	font-size: 0.9rem;
	margin-right: 0.5rem;
	letter-spacing: 1px;
	font-weight: 500;
`;

const InfoText = styled.span`
	font-size: 0.9rem;
`;

const AmountWrapper = styled.div`
	position: relative;
	margin-bottom: 1rem;
`;

const Input = styled.input`
	width: 100px;
	padding: 12px 16px;
	border: none;
	border: 1px solid var(--color-primary-lightest);
	font-size: 1rem;
	color: inherit;
	background: transparent;
	transition: border-color 0.3s;
	outline: none;

	&:hover,
	&:focus {
		border-color: var(--color-primary);
		border: 2px solid var(--color-primary);
		padding: 11px 15px;
		& ~ label {
			color: var(--color-primary);
		}
	}
`;

const Label = styled.label`
	color: #7a7a7a;
	display: flex;
	align-items: center;
	position: absolute;
	font-size: 0.8rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	left: 8px;
	top: -8px;
	background-color: var(--color-white);
	padding: 0 6px;
	transition: transform 0.3s, color 0.3s;
	cursor: text;
`;

const Total = styled.p`
	font-size: 1.2rem;
	margin-bottom: 1rem;
	text-transform: uppercase;
	font-weight: 500;
	letter-spacing: 1px;

	& span {
		font-weight: 300;
	}
`;

const Alert = styled.p`
	font-size: 0.8rem;
	color: var(--color-error);
	margin: 1rem 0;
	display: flex;
	align-items: center;

	& > svg {
		margin-right: 0.25rem;
		stroke: var(--color-error);
	}
`;

export default Poster;
