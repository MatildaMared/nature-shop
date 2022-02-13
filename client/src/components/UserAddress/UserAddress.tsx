import React from "react";
import styled from "styled-components";

interface Props {
	address: {
		street: string;
		postalCode: string;
		city: string;
	};
	name: string;
}

function UserAddress(props: Props) {
	const { street, postalCode, city } = props.address;
	const { name } = props;

	return (
		<Wrapper>
			<Heading>Shipping Information</Heading>
			<p>{name}</p>
			<p>{street}</p>
			<p>
				{postalCode} {city}
			</p>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	min-width: 300px;
	border: 1px solid var(--color-primary-lightest);
	position: relative;
	padding: 1.5rem 2rem;

	& p:not(:last-child) {
		margin-bottom: .5rem;
	}
`;

const Heading = styled.h3`
	padding: 2px;
	background-color: var(--color-white);
	position: absolute;
	top: -12px;
	left: 16px;
	font-size: 0.8rem;
	font-weight: 400;
	color: var(--color-primary);
	text-transform: uppercase;
	letter-spacing: 1px;
`;

export default UserAddress;
