import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../components/Button/Button";
import CartOverview from "../components/Cart/CartOverview";
import Heading from "../components/Heading/Heading";
import UserAddress from "../components/UserAddress/UserAddress";
import { UserContext } from "../context/UserContext";
import { CartItem } from "../models/Cart";
import { placeOrder } from "../services/orderService";
import { getToken } from "../services/localStorageService";

function PurchasePage() {
	const [context, updateContext] = useContext(UserContext);
	const [successfulPurchase, setSuccessfulPurchase] = useState(false);
	const { isLoggedIn, user } = context;
	const cart: CartItem[] = context.cart;
	const navigate = useNavigate();

	async function purchaseHandler() {
		const token = getToken();
		if (token) {
			const response = await placeOrder({ products: cart }, token);
			if (response.success) {
				updateContext({ cart: [], user: response.user });
				localStorage.removeItem("cart");
				setSuccessfulPurchase(true);
				setTimeout(() => {
					navigate("/");
				}, 5000);
			}
		}
	}

	return (
		<Wrapper>
			<Heading>Purchase Summary</Heading>
			{successfulPurchase && (
				<AlertText>Purchase successful! Redirecting to homepage.</AlertText>
			)}
			{!isLoggedIn && !successfulPurchase ? (
				<AlertText>You need to be logged in to make a purchase.</AlertText>
			) : (
				<Content>
					{cart && cart.length > 0 && <CartOverview cart={cart} />}
					{!successfulPurchase && (
						<>
							<UserAddress address={user.address} name={user.name} />
							<Text>
								Please make sure the shipping information is correct. If you
								need to update it, please do so on your account page.
							</Text>
							<Button type="button" onClick={purchaseHandler}>
								Confirm Purchase
							</Button>
						</>
					)}
				</Content>
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

const Content = styled.section`
	width: 100%;
	max-width: 600px;

	& button {
		margin: 0 auto;
		margin-top: 1rem;
	}
`;

const AlertText = styled.p`
	text-align: center;
`;

const Text = styled.p`
	font-size: 0.9rem;
	text-align: center;
	max-width: 400px;
	width: fit-content;
	margin: 0 auto;
	margin-top: 1rem;
`;

export default PurchasePage;
