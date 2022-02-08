import React from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm/LoginForm";

function LoginPage() {
	return (
		<Wrapper>
			<Heading>Login</Heading>
			<LoginForm />
		</Wrapper>
	);
}

const Wrapper = styled.main`
	max-width: var(--max-width);
	margin: 0 auto;
	background-color: var(--color-white);
	padding: 2rem 1rem;
`;

const Heading = styled.h2`
	font-size: 2.5rem;
	font-family: var(--font-script);
	text-align: center;
	color: var(--color-primary-dark);
`;

export default LoginPage;
