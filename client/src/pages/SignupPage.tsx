import React, { useState } from "react";
import styled from "styled-components";
import SignupForm from "../components/SignupForm/SignupForm";
import Heading from "../components/Heading/Heading";

function SignupPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  
	async function onSignupHandler() {
		setErrorMessage("");
		// const data = await login(email, password);
		// if (data.success === false) {
		// 	setErrorMessage(data.error);
		// 	setTimeout(() => {
		// 		setErrorMessage("");
		// 	}, 5000);
		// } else {
		// 	updateContext({
		// 		user: data.user,
		// 		isLoggedIn: true,
		// 		isAdmin: data.user.role === "admin",
		// 	});
		// 	saveToken(data.token);
		// 	navigate("/");
		// }
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
