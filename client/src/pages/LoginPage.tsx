import React, { useState, useContext } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm/LoginForm";
import { login } from "../services/userService";
import { UserContext } from "../context/UserContext";
import { saveToken } from "../services/localStorageService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
	const [errorMessage, setErrorMessage] = useState("");
	const [context, updateContext] = useContext(UserContext);

	const navigate = useNavigate();

	async function onLoginHandler(email: string, password: string) {
		setErrorMessage("");
		const data = await login(email, password);
		if (data.success === false) {
			setErrorMessage(data.error);
			setTimeout(() => {
				setErrorMessage("");
			}, 5000);
		} else {
			updateContext(data.user);
			saveToken(data.token);
			navigate("/");
		}
	}

	return (
		<Wrapper>
			<Heading>Login</Heading>
			<LoginForm submitHandler={onLoginHandler} errorMessage={errorMessage} />
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
