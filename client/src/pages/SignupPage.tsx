import React from "react";
import styled from "styled-components";
import SignupForm from "../components/SignupForm/SignupForm";
import Heading from "../components/Heading/Heading";

function SignupPage() {
	return (
		<Wrapper>
			<Heading>Sign up</Heading>
			<SignupForm />
		</Wrapper>
	);
}

const Wrapper = styled.main`
	background-color: var(--color-white);
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: var(--max-width);
	margin: 0 auto;
	padding: 4rem 1rem 8rem 1rem;
`;

export default SignupPage;
