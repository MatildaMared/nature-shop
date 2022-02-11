import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import SignupForm from "../components/Forms/SignupForm";
import Heading from "../components/Heading/Heading";
import { NewUser } from "../models/User";
import { signup } from "../services/userService";
import { UserContext } from "../context/UserContext";
import { saveToken } from "../services/localStorageService";

function SignupPage() {
	const [context, updateContext] = useContext(UserContext);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const navigate = useNavigate();

	async function onSignupHandler(newUser: NewUser) {
		setErrorMessage("");
		const data = await signup(newUser);
		if (data.success === false) {
			setErrorMessage(data.error);
			setTimeout(() => {
				setErrorMessage("");
			}, 5000);
		} else {
			updateContext({
				user: data.user,
				isLoggedIn: true,
				isAdmin: data.user.role === "admin",
			});
			saveToken(data.token);
			navigate("/");
		}
	}

	return (
		<Wrapper>
			<Heading>Sign up</Heading>
			<SignupForm submitHandler={onSignupHandler} errorMessage={errorMessage} />
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
