import React from "react";
import styled from "styled-components";

interface Props {
	children: React.ReactNode;
	type: "button" | "submit";
	disabled?: boolean;
	onClick: (...args: any) => void;
}

function Button(props: Props) {
	const { children, type, onClick, disabled } = props;

	return (
		<PrimaryButton onClick={onClick} type={type} disabled={disabled}>
			{children}
		</PrimaryButton>
	);
}

const PrimaryButton = styled.button`
	border: none;
	background-color: var(--color-secondary);
	color: hsla(0, 0%, 100%, 0.8);
	font-size: 0.9rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	padding: 4px 12px;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.3s;
	display: flex;
	align-items: center;

	&:hover {
		background-color: var(--color-primary-light);
	}

	&:disabled {
		background-color: hsla(0, 0%, 0%, 0.2);
		cursor: default;
	}
`;

export default Button;
