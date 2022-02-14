import React from "react";
import { CartItem as CartItemType } from "../../models/Cart";
import styled from "styled-components";
import CartItem from "./CartItem";

interface Props {
	cart: CartItemType[];
	removeFromCartHandler: (id: string) => void;
	updateItemInCartHandler: (id: string, updates: {}) => void;
}

function Cart(props: Props) {
	const { cart, removeFromCartHandler, updateItemInCartHandler } = props;
	const total =
		cart && cart.reduce((acc, cur) => acc + cur.price * cur.amount, 0);

	return (
		<Wrapper>
			<List>
				{cart &&
					cart.map((item) => (
						<CartItem
							updateItemInCartHandler={updateItemInCartHandler}
							removeFromCartHandler={removeFromCartHandler}
							key={item.id}
							item={item}
						/>
					))}
			</List>
			<Price>
				Total: <span>{total}:-</span>
			</Price>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	border: 1px solid var(--color-primary-lightest);
	padding: 1rem;
	margin-bottom: 3rem;
	width: 100%;
	max-width: 700px;
`;

const List = styled.ul`
	list-style: none;
	padding: 0;
	margin-bottom: 1rem;

	& li {
		border-bottom: 1px solid var(--color-primary-lightest);
	}
`;

const Price = styled.p`
	font-size: 1.2rem;
	text-transform: uppercase;
	text-align: right;
	letter-spacing: 1px;
	font-weight: 500;

	& span {
		font-weight: 400;
		letter-spacing: 0;
	}
`;

export default Cart;
