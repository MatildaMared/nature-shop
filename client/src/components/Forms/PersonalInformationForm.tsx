import React, { useState } from "react";
import styled from "styled-components";
import { User } from "../../models/User";
import TextInput from "../Inputs/TextInput";
import {
	nameValidator,
	cityValidator,
	streetValidator,
	postalCodeValidator,
} from "../../utils/validators";
import Button from "../Button/Button";

interface Props {
	user: User;
	userChangeHandler: (updates: {}) => void;
}

function PersonalInformationForm(props: Props) {
	const { user, userChangeHandler } = props;
	const [isEditing, setIsEditing] = useState(false);

	const [name, setName] = useState<string>(user.name);
	const [street, setStreet] = useState<string>(user.address.street);
	const [postalCode, setPostalCode] = useState<string>(user.address.postalCode);
	const [city, setCity] = useState<string>(user.address.city);

	const [nameIsValid, setNameIsValid] = useState<boolean>(true);
	const [streetIsValid, setStreetIsValid] = useState<boolean>(true);
	const [postalCodeIsValid, setPostalCodeIsValid] = useState<boolean>(true);
	const [cityIsValid, setCityIsValid] = useState<boolean>(true);

	function onUserChanges() {
		const updates = {
			name,
			address: {
				street,
				postalCode,
				city,
			},
		};

		userChangeHandler(updates);
		setIsEditing(false);
	}

	return (
		<Wrapper>
			<Title>Personal Information</Title>
			{isEditing ? (
				<>
					<TextInput
						name="name"
						type="text"
						label="Name"
						value={name}
						setValue={setName}
						isValid={nameIsValid}
						setIsValid={setNameIsValid}
						validate={nameValidator}
					/>
					<TextInput
						name="street"
						type="text"
						label="Street"
						value={street}
						setValue={setStreet}
						isValid={streetIsValid}
						setIsValid={setStreetIsValid}
						validate={streetValidator}
					/>
					<TextInput
						name="postal-code"
						type="text"
						label="Postal Code"
						value={postalCode}
						setValue={setPostalCode}
						isValid={postalCodeIsValid}
						setIsValid={setPostalCodeIsValid}
						validate={postalCodeValidator}
					/>
					<TextInput
						name="city"
						type="text"
						label="City"
						value={city}
						setValue={setCity}
						isValid={cityIsValid}
						setIsValid={setCityIsValid}
						validate={cityValidator}
					/>
					<Button type="button" onClick={onUserChanges}>
						Save changes
					</Button>
				</>
			) : (
				<>
					<p>{user.name}</p>
					<p>{user.address.street}</p>
					<p>
						{user.address.postalCode} {user.address.city}
					</p>
					<Button type="button" onClick={() => setIsEditing(true)}>
						Edit Information
					</Button>
				</>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.section`
	padding: 2rem;
	border: 1px solid var(--color-primary-lightest);
	margin-bottom: 2rem;
	position: relative;

	& p {
		margin-bottom: 0.5rem;
	}

	& button {
		margin: 0 auto;
	}

	& div {
		&:first-of-type {
			margin-top: 1rem;
		}
	}
`;

const Title = styled.h3`
	font-size: 0.8rem;
	font-weight: 400;
	position: absolute;
	color: var(--color-primary);
	top: -12px;
	left: 16px;
	text-transform: uppercase;
	letter-spacing: 1px;
	padding: 2px;
	background-color: var(--color-white);
`;

export default PersonalInformationForm;
