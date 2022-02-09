import React, { useState, useRef } from "react";
import styled from "styled-components";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";

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

	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

	function onFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		submitHandler(email, password);
		emailInput.current?.blur();
		passwordInput.current?.blur();
	}

	function emailValidator(email: string): [boolean, string] {
		if (email.length === 0) {
			return [false, "Please enter an email"];
		}
		const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		if (isValid) {
			return [true, ""];
		} else {
			return [false, "Please enter a valid email"];
		}
	}

	function passwordValidator(password: string): [boolean, string] {
		if (password.length === 0) {
			return [false, "Please enter a password"];
		}
		const isValid = password.length >= 5;
		if (!isValid) {
			return [false, "Password must be at least 5 characters"];
		} else {
			return [true, ""];
		}
	}

	return (
		<Form onSubmit={onFormSubmit}>
			<TextInput
				ref={emailInput}
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
				ref={passwordInput}
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
				onClick={onFormSubmit}
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
