import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../Inputs/TextInput";
import Button from "../Button/Button";
import { passwordValidator, emailValidator } from "../../utils/validators";

interface Props {
	submitHandler: (email: string, password: string) => void;
	errorMessage: string;
}

function LoginForm(props: Props) {
	const { submitHandler, errorMessage } = props;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailIsValid, setEmailIsValid] = useState(false);
	const [passwordIsValid, setPasswordIsValid] = useState(false);

	function onFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		submitHandler(email, password);
	}

	return (
		<Form onSubmit={onFormSubmit}>
			<TextInput
				type="email"
				name="email"
				value={email}
				setValue={setEmail}
				isValid={emailIsValid}
				setIsValid={setEmailIsValid}
				label="Email"
				validate={emailValidator}
			/>
			<TextInput
				type="password"
				name="password"
				value={password}
				setValue={setPassword}
				isValid={passwordIsValid}
				setIsValid={setPasswordIsValid}
				label="Password"
				validate={passwordValidator}
			/>
			<ErrorMessage>{errorMessage}</ErrorMessage>
			<Button
				type="submit"
				disabled={!emailIsValid || !passwordIsValid}
			>
				Log in
			</Button>
		</Form>
	);
}

const Form = styled.form`
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ErrorMessage = styled.p`
	margin-top: -1rem;
	height: 16px;
	font-size: 0.8rem;
	color: var(--color-error);
	margin-bottom: 0.5rem;
`;

export default LoginForm;
