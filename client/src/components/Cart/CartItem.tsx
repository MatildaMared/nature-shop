import React, { useState } from "react";
import { CartItem as CartItemType } from "../../models/Cart";
import styled from "styled-components";
import { XSquare, Edit, Save } from "react-feather";

interface Props {
	item: CartItemType;
	removeFromCartHandler: (id: string) => void;
	updateItemInCartHandler: (id: string, updates: {}) => void;
}

function CartItem(props: Props) {
	const { removeFromCartHandler, updateItemInCartHandler, item } = props;
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [amount, setAmount] = useState<number>(item.amount);
	const [frame, setFrame] = useState<string>(item.frame);
	const [passerPartout, setPasserPartout] = useState<boolean>(
		item.passerPartout
	);

	function onCartUpdate() {
		const updates = {
			amount,
			frame,
			passerPartout,
		};

		updateItemInCartHandler(item.id, updates);
		setIsEditing(false);
	}

	return (
		<Wrapper>
			<SummaryWrapper>
				<div>
					<Title>{item.title}</Title>
					<Details>
						{item.frame} frame,{" "}
						{item.passerPartout ? "passerpartout" : "no passerpartout"},{" "}
						{item.amount}x
					</Details>
				</div>
				<div>
					<Buttons>
						<Button onClick={() => setIsEditing(!isEditing)}>
							<Edit size={14} />
							Edit
						</Button>
						<Button
							className="error"
							onClick={() => removeFromCartHandler(props.item.id)}
						>
							<XSquare size={14} />
							Remove
						</Button>
					</Buttons>
					<Price>Price: {item.price * item.amount}:-</Price>
				</div>
			</SummaryWrapper>
			{isEditing && (
				<EditWrapper>
					<EditTitle>Editing</EditTitle>
					<Inputs>
						<InputWrapper>
							<InputTitle>Frame color</InputTitle>
							<label>
								<input
									type="radio"
									value="black"
									name="frame-color"
									onChange={() => setFrame("black")}
									checked={frame === "black"}
								/>{" "}
								Black
							</label>
							<label>
								<input
									type="radio"
									value="black"
									name="frame-color"
									onChange={() => setFrame("white")}
									checked={frame === "white"}
								/>{" "}
								White
							</label>
						</InputWrapper>
						<InputWrapper>
							<InputTitle>Passerpartout</InputTitle>
							<label>
								<input
									type="radio"
									value="yes"
									name="passerpartout"
									onChange={() => setPasserPartout(true)}
									checked={passerPartout}
								/>{" "}
								Yes
							</label>
							<label>
								<input
									type="radio"
									value="no"
									name="passerpartout"
									onChange={() => setPasserPartout(false)}
									checked={!passerPartout}
								/>{" "}
								No
							</label>
						</InputWrapper>
						<InputWrapper>
							<InputTitle>Amount</InputTitle>
							<Input
								type="number"
								value={amount}
								onChange={(e: any) => setAmount(parseInt(e.target.value))}
								name="amount"
								min="1"
								max={item.inStock.toString()}
							/>
						</InputWrapper>
					</Inputs>
					<Price>New price: {amount * item.price}:-</Price>
					<Buttons>
						<Button onClick={onCartUpdate}>
							<Save size={14} />
							Save changes
						</Button>
						<Button onClick={() => setIsEditing(false)} className="error">
							<XSquare size={14} />
							Cancel
						</Button>
					</Buttons>
				</EditWrapper>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.li`
	padding: 1rem 0;

	&:first-of-type {
		padding-top: 0;
	}
`;

const EditWrapper = styled.section`
	margin-top: 1rem;
	border: 1px solid var(--color-primary-lightest);
	padding: 2rem 1rem 1rem 1rem;
	position: relative;
`;

const EditTitle = styled.h3`
	position: absolute;
	top: -16px;
	color: var(--color-primary);
	left: 50%;
	transform: translateX(-50%);
	font-size: 1rem;
	font-weight: 400;
	padding: 4px;
	background: var(--color-white);
	text-transform: uppercase;
	letter-spacing: 1px;
`;

const SummaryWrapper = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.h3`
	font-weight: 500;
	font-size: 1.2rem;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

const InputTitle = styled.h5`
	position: absolute;
	top: -9px;
	left: 12px;
	font-weight: 400;
	font-size: 0.8rem;
	color: var(--color-primary);
	letter-spacing: 1px;
	text-transform: uppercase;
	background-color: var(--color-white);
`;

const Details = styled.p`
	font-size: 0.9rem;
`;

const Buttons = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.25rem;
	width: fit-content;
	margin-left: auto;
`;

const InputWrapper = styled.div`
	width: 100%;
	padding: 1rem 1rem 0.5rem 1rem;
	display: flex;
	align-items: center;
	position: relative;

	& label {
		font-size: 0.9rem;
	}

	& label:not(:last-of-type) {
		margin-right: 1rem;
	}
`;

const Inputs = styled.div`
	border: 1px solid var(--color-primary-lightest);
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;

	& > *:not(:last-child) {
		border-right: 1px solid var(--color-primary-lightest);
	}

	@media (max-width: 600px) {
		flex-direction: column;

		& > *:not(:last-child) {
			border-right: none;
			border-bottom: 1px solid var(--color-primary-lightest);
			padding-bottom: 1rem;
		}
	}
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	font-size: 0.8rem;
	padding: 5px;
	text-transform: uppercase;
	letter-spacing: 1px;
	border: none;
	color: white;
	cursor: pointer;
	border-radius: 4px;
	transition: all 0.3s;
	line-height: 1;
	background-color: var(--color-primary-lightest);

	& svg {
		margin-right: 0.25rem;
	}

	&:hover {
		background-color: var(--color-primary);
	}

	&.error {
		background-color: var(--color-error);
		margin-left: 0.5rem;

		&:hover {
			background-color: var(--color-primary-lightest);
		}
	}
`;

const Input = styled.input`
	padding: 4px 0.5rem;
	font-size: 0.9rem;
	color: inherit;
	background: transparent;
	border: none;
`;

const Price = styled.p`
	text-align: right;
	margin-bottom: 0.5rem;
`;

export default CartItem;
