import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Props {
	type: string;
	name: string;
	value: string;
	setValue: (value: string) => void;
	label: string;
}

const TextInput = React.forwardRef(
	(props: Props, ref: React.Ref<HTMLInputElement>) => {
		const { type, name, value, setValue, label } = props;
		const [isEmpty, setIsEmpty] = useState(true);

		useEffect(() => {
			if (value.length > 0) {
				setIsEmpty(false);
			} else {
				setIsEmpty(true);
			}
		}, [value]);

		return (
			<Wrapper>
				<Input
					ref={ref}
					type={type}
					name={name}
					id={name}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className={!isEmpty ? "non-empty" : ""}
				/>
				<Label htmlFor={name}>{label}</Label>
			</Wrapper>
		);
	}
);

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 1.5rem;
	position: relative;
`;

const Input = styled.input`
	border-radius: 4px;
	padding: 8px 16px;
	border: none;
	border: 1px solid var(--color-primary-lightest);
	font-size: 1rem;
	color: inherit;
	background: transparent;
	transition: border-color 0.3s;
	outline: none;
	&:hover,
	&:focus {
		border-color: var(--color-primary);
		border: 2px solid var(--color-primary);
		padding: 7px 15px;
		& ~ label {
			color: var(--color-primary);
		}
	}
	&:focus,
	&.non-empty {
		& ~ label {
			transform: translateY(-16px);
			text-transform: uppercase;
			font-size: 0.8rem;
			letter-spacing: 1px;
		}
	}
`;

const Label = styled.label`
	position: absolute;
	left: 16px;
	top: 8px;
	background-color: var(--color-white);
	padding: 0 6px;
	transition: transform 0.3s, color 0.3s;
  cursor: text;
`;

export default TextInput;
