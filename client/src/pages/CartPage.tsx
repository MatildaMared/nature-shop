import React, { useContext } from "react";
import styled from "styled-components";
import Heading from "../components/Heading/Heading";
import UserAddress from "../components/UserAddress/UserAddress";
import { UserContext } from "../context/UserContext";
import Cart from "../components/Cart/Cart";

function CartPage() {
	const [context, updateContext] = useContext(UserContext);
	const { isLoggedIn, cart, user } = context;

	return (
		<Wrapper>
      <Heading>Cart</Heading>
      <Cart cart={cart} />
			{isLoggedIn && (
				<>
					<UserAddress address={user.address} name={user.name} />
				</>
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

export default CartPage;
