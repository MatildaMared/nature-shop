import React from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm/LoginForm";

function LoginPage() {
	function onLoginHandler(email: string, password: string) {}

	return (
		<Wrapper>
			<Heading>Login</Heading>
			<LoginForm onSubmit={onLoginHandler} />
		</Wrapper>
	);
}

const Wrapper = styled.main`
	max-width: var(--max-width);
	margin: 0 auto;
	background-color: var(--color-white);
	padding: 4rem 1rem 8rem 1rem;
`;

const Heading = styled.h2`
	font-size: 2.5rem;
	font-family: var(--font-script);
	text-align: center;
	color: var(--color-primary-dark);
	margin-bottom: 2rem;
`;

export default LoginPage;
