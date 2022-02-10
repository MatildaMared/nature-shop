import React from "react";
import styled from "styled-components";
import { User } from "../models/User";
import Heading from "../components/Heading/Heading";

interface Props {
	user: User | null;
	isLoggedIn: boolean;
}

function HomePage(props: Props) {
	const { user, isLoggedIn } = props;

	return (
		<Wrapper>
			{!isLoggedIn && <Heading>Hello gorgeous!! 🐳 🦄</Heading>}
			{isLoggedIn && user && <Heading>Hello, {user.name}</Heading>}
		</Wrapper>
	);
}

const Wrapper = styled.main`
	max-width: var(--max-width);
	margin: 0 auto;
	background-color: var(--color-white);
	padding: 4rem 1rem 8rem 1rem;
`;

export default HomePage;
