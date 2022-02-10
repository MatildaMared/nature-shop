import React, { useState, useRef } from "react";
import styled from "styled-components";
import TextInput from "../TextInput/TextInput";
import {
	passwordValidator,
	emailValidator,
	nameValidator,
	streetValidator,
} from "./../../utils/validators";

interface Props {
	submitHandler: () => void;
	errorMessage: string;
}

function SignupForm(props: Props) {
	const { submitHandler, errorMessage } = props;

	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [street, setStreet] = useState<string>("");

	const [nameIsValid, setNameIsValid] = useState<boolean>(false);
	const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
	const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
	const [streetIsValid, setStreetIsValid] = useState<boolean>(false);

	const nameInput = useRef<HTMLInputElement>(null);
	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);
	const streetInput = useRef<HTMLInputElement>(null);

	return (
		<Form>
			<TextInput
				style={{ width: "80%" }}
				ref={nameInput}
				type="text"
				name="name"
				value={name}
				setValue={setName}
				isValid={nameIsValid}
				setIsValid={setNameIsValid}
				label="Name"
				validate={nameValidator}
			/>
			<TextInput
				ref={emailInput}
				style={{ width: "80%" }}
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
				style={{ width: "80%" }}
				type="password"
				name="password"
				value={password}
				setValue={setPassword}
				isValid={passwordIsValid}
				setIsValid={setPasswordIsValid}
				label="Password"
				validate={passwordValidator}
			/>
			<AddressWrapper>
				<AddressTitle>Address</AddressTitle>
				<TextInput
					ref={streetInput}
					type="text"
					name="street"
					value={street}
					setValue={setStreet}
					isValid={streetIsValid}
					setIsValid={setStreetIsValid}
					label="Email"
					validate={streetValidator}
				/>
			</AddressWrapper>
		</Form>
	);
}

const Form = styled.form`
	width: 100%;
	max-width: 500px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const AddressWrapper = styled.div`
	margin: 1rem 0;
	position: relative;
	width: 100%;
	border: 1px solid hsla(90, 9%, 70%, 0.5);
	padding: 2rem 1rem 1rem 1rem;
`;

const AddressTitle = styled.h3`
	position: absolute;
	top: -1rem;
	font-size: 1rem;
	font-weight: 400;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 0.9rem;
	background-color: var(--color-white);
	padding: 4px;
`;

export default SignupForm;
