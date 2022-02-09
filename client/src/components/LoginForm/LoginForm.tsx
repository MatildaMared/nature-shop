import React, { useState, useRef } from "react";
import styled from "styled-components";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";

interface Props {
	submitHandler: (email: string, password: string) => void;
}

function LoginForm(props: Props) {
	const { submitHandler } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

	function onFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		submitHandler(email, password);
		setEmail("");
		setPassword("");
		console.log(passwordInput.current);
		console.log(emailInput.current);
		passwordInput.current?.blur();
		emailInput.current?.blur();
	}

	return (
		<Form onSubmit={onFormSubmit}>
			<TextInput
				ref={emailInput}
				type="email"
				name="email"
				value={email}
				setValue={setEmail}
				label="Email"
			/>
			<TextInput
				ref={passwordInput}
				type="password"
				name="password"
				value={password}
				setValue={setPassword}
				label="Password"
			/>
			<Button type="submit" onClick={onFormSubmit}>
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

export default LoginForm;
