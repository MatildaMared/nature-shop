import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";

interface Props {
	onSubmit: (email: string, password: string) => void;
}

function LoginForm(props: Props) {
	const { onSubmit } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Form>
			<TextInput
				type="email"
				name="email"
				value={email}
				setValue={setEmail}
				label="Email"
			/>
			<TextInput
				type="password"
				name="password"
				value={password}
				setValue={setPassword}
				label="Password"
			/>
			<Button type="submit" onClick={onSubmit}>
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
