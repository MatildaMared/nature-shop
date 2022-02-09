import React from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm/LoginForm";

async function login(email: string, password: string) {
	const response = await fetch("/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	const data = await response.json();
	return data;
}

function LoginPage() {
	async function onLoginHandler(email: string, password: string) {
		const data = await login(email, password);
		console.log(data);
	}

	return (
		<Wrapper>
			<Heading>Login</Heading>
			<LoginForm submitHandler={onLoginHandler} />
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
