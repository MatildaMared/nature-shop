import { userInfo } from "os";
import React from "react";
import styled from "styled-components";
import Heading from "../components/Heading/Heading";
import UserAddress from "../components/UserAddress/UserAddress";
import { CartItem } from "../models/Cart";
import { User } from "../models/User";

interface Props {
	isLoggedIn: boolean;
	cart: CartItem[] | [];
	user: User;
	updateContext: () => void;
}

function CartPage(props: Props) {
	const { isLoggedIn, cart, user, updateContext } = props;

	return (
		<Wrapper>
			<Heading>Cart</Heading>
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
