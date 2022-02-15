import React from "react";
import styled from "styled-components";
import { CartItem } from "../../models/Cart";

interface Props {
	cart: CartItem[];
}

function CartOverview(props: Props) {
	const { cart } = props;
	const totalPrice = cart.reduce(
		(acc, curr) => acc + curr.price * curr.amount,
		0
	);

	return (
		<Wrapper>
			<Title>Cart OverView</Title>
			<ul>
				{cart.map((item) => (
					<li key={item.id}>
						<ItemTitle>{item.title}</ItemTitle>
						<Details>
							{item.frame} frame,{" "}
							{item.passerPartout ? "passerpartout" : "no passerpartout"},{" "}
							{item.amount}x, {item.price * item.amount}:-
						</Details>
					</li>
				))}
			</ul>
			<TotalPrice>Total price: {totalPrice}:-</TotalPrice>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	width: 100%;
	border: 1px solid var(--color-primary-lightest);
	padding: 2rem;
	margin-bottom: 2rem;
	position: relative;

	& ul {
		list-style: none;
		padding: 0;

		& li {
			margin-bottom: 1rem;
			padding-bottom: 1rem;
			border-bottom: 1px solid var(--color-primary-lightest);
		}
	}
`;

const Title = styled.h3`
	font-weight: 400;
	position: absolute;
	top: -12px;
	left: 16px;
	font-size: 0.8rem;
	text-transform: uppercase;
	color: var(--color-primary);
	padding: 2px;
	background-color: var(--color-white);
	letter-spacing: 1px;
`;

const ItemTitle = styled.h4`
	font-weight: 500;
	font-size: 1rem;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

const Details = styled.p`
	font-size: 0.9rem;
`;

const TotalPrice = styled.p`
	text-align: right;
`;

export default CartOverview;
