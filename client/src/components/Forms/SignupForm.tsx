import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import TextInput from "../Inputs/TextInput";
import {
	passwordValidator,
	emailValidator,
	nameValidator,
	streetValidator,
	passwordConfirmValidator,
	postalCodeValidator,
	cityValidator,
} from "../../utils/validators";
import { NewUser } from "../../models/User";

interface Props {
	submitHandler: (newUser: NewUser) => void;
	errorMessage: string;
}

function SignupForm(props: Props) {
	const { submitHandler, errorMessage } = props;

	// Input values
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordConfirm, setPasswordConfirm] = useState<string>("");
	const [street, setStreet] = useState<string>("");
	const [postalCode, setPostalCode] = useState<string>("");
	const [city, setCity] = useState<string>("");

	// Input validation
	const [nameIsValid, setNameIsValid] = useState<boolean>(false);
	const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
	const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
	const [passwordConfirmIsValid, setPasswordConfirmIsValid] =
		useState<boolean>(false);
	const [streetIsValid, setStreetIsValid] = useState<boolean>(false);
	const [postalCodeIsValid, setPostalCodeIsValid] = useState<boolean>(false);
	const [cityIsValid, setCityIsValid] = useState<boolean>(false);

	// Submit handler
	function onFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		const newUser = {
			name,
			email,
			password,
			address: {
				street,
				postalCode,
				city,
			},
		};

		submitHandler(newUser);
	}

	return (
		<Form onSubmit={onFormSubmit}>
			<TextInput
				style={{ width: "80%" }}
				type="text"
				name="name"
				value={name}
				setValue={setName}
				isValid={nameIsValid}
				setIsValid={setNameIsValid}
				label="Full name"
				validate={nameValidator}
			/>
			<TextInput
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
			<TextInput
				style={{ width: "80%" }}
				type="password"
				name="password-confirm"
				value={passwordConfirm}
				setValue={setPasswordConfirm}
				isValid={passwordConfirmIsValid}
				setIsValid={setPasswordConfirmIsValid}
				label="Confirm password"
				validate={passwordConfirmValidator}
				compareValue={password}
			/>
			<AddressWrapper>
				<AddressTitle>Address</AddressTitle>
				<TextInput
					type="text"
					name="street"
					value={street}
					setValue={setStreet}
					isValid={streetIsValid}
					setIsValid={setStreetIsValid}
					label="Street"
					validate={streetValidator}
				/>
				<TextInput
					type="text"
					name="postal-code"
					value={postalCode}
					setValue={setPostalCode}
					isValid={postalCodeIsValid}
					setIsValid={setPostalCodeIsValid}
					label="Postal code"
					validate={postalCodeValidator}
				/>
				<TextInput
					type="text"
					name="city"
					value={city}
					setValue={setCity}
					isValid={cityIsValid}
					setIsValid={setCityIsValid}
					label="City"
					validate={cityValidator}
				/>
			</AddressWrapper>
			<ErrorMessage>{errorMessage}</ErrorMessage>
			<Button
				type="submit"
				disabled={
					!emailIsValid ||
					!passwordIsValid ||
					!passwordConfirmIsValid ||
					!nameIsValid ||
					!streetIsValid ||
					!postalCodeIsValid ||
					!cityIsValid
				}
			>
				Sign up
			</Button>
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
	padding: 2rem 1.5rem 0rem 1.5rem;
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

const ErrorMessage = styled.p`
	height: 16px;
	font-size: 0.8rem;
	color: var(--color-error);
	margin-bottom: 0.5rem;
`;

export default SignupForm;
