import React, { useContext } from "react";
import styled from "styled-components";
import Heading from "../components/Heading/Heading";
import UserAddress from "../components/UserAddress/UserAddress";
import { UserContext } from "../context/UserContext";

function PurchasePage() {
	const [context, updateContext] = useContext(UserContext);
	const { isLoggedIn, user } = context;

	return (
		<Wrapper>
			<Heading>Purchase</Heading>
			{!isLoggedIn ? (
				<AlertText>You need to be logged in to make a purchase.</AlertText>
			) : (
				<>
					<UserAddress address={user.address} name={user.name} />
					<Text>
						Please make sure the shipping information is correct. If you need to
						update it, please do so on your account page.
					</Text>
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

const AlertText = styled.p`
	text-align: center;
`;

const Text = styled.p`
	margin: 0.5rem 0;
	font-size: 0.9rem;
	text-align: center;
	max-width: 400px;
`;

export default PurchasePage;
