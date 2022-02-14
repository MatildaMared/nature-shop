import React, { useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Heading from "../components/Heading/Heading";
import { UserContext } from "../context/UserContext";
import Cart from "../components/Cart/Cart";
import { removeFromCart, updateCart } from "../services/localStorageService";
import Button from "../components/Button/Button";
import { AlertOctagon } from "react-feather";

function CartPage() {
	const [context, updateContext] = useContext(UserContext);
	const { isLoggedIn, cart } = context;
	const navigate = useNavigate();

	function removeFromCartHandler(id: string) {
		const newCart = removeFromCart(id);
		updateContext({ cart: newCart });
	}

	function updateItemInCartHandler(id: string, updates: {}) {
		const updatedCart = updateCart(id, updates);
		updateContext({ cart: updatedCart });
	}

	function onPurchaseHandler() {
		window.alert("Thank you for your purchase!");

		localStorage.removeItem("cart");
		updateContext({ cart: [] });

		navigate("/");
	}

	return (
		<Wrapper>
			<Heading>Cart</Heading>
			<Cart
				cart={cart}
				removeFromCartHandler={removeFromCartHandler}
				updateItemInCartHandler={updateItemInCartHandler}
			/>
			<Button
				type="button"
				disabled={!context.isLoggedIn}
				onClick={onPurchaseHandler}
			>
				Proceed to purchase
			</Button>
			{!isLoggedIn && (
				<AlertMessage>
					<AlertOctagon size={14} />
					Please log in to make a purchase.
				</AlertMessage>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.main`
	background-color: var(--color-white);
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: var(--max-width);
	margin: 0 auto;
	padding: 4rem 1rem 8rem 1rem;
`;

const AlertMessage = styled.p`
	margin-top: 0.5rem;
	font-size: 0.9rem;
	display: flex;
	align-items: center;
	color: var(--color-error);

	& svg {
		margin-right: 0.25rem;
	}
`;

export default CartPage;
