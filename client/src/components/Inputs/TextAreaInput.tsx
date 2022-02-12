import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AlertOctagon, CheckSquare } from "react-feather";

interface Props {
	name: string;
	value: string;
	setValue: (value: string) => void;
	isValid: boolean;
	setIsValid: (isValid: boolean) => void;
	validate?: (value: string, compareValue?: string) => [boolean, string];
	label: string;
	style?: React.CSSProperties;
	compareValue?: string;
	visible?: boolean;
}

const TextAreaInput = (props: Props) => {
	const {
		name,
		value,
		setValue,
		label,
		validate,
		isValid,
		setIsValid,
		style,
		compareValue,
		visible
	} = props;
	const [isEmpty, setIsEmpty] = useState(true);
	const [isVisited, setIsVisited] = useState(visible ? true : false);
	const [errorMessage, setErrorMessage] = useState("");

	const onBlurHandler = () => {
		setIsVisited(true);
		if (validate) {
			if (compareValue) {
				const [isValid, errorMessage] = validate(value, compareValue);
				setIsValid(isValid);
				setErrorMessage(errorMessage);
			} else {
				const [isValid, errorMessage] = validate(value);
				setIsValid(isValid);
				setErrorMessage(errorMessage);
			}
		}
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
		if (validate) {
			const [validatedValue, message] = validate(e.target.value);
			setIsValid(validatedValue);
			setErrorMessage(message);
		}
	};

	useEffect(() => {
		if (value.length > 0) {
			setIsEmpty(false);
		} else {
			setIsEmpty(true);
			setErrorMessage("");
		}
	}, [value]);

	const inputClassName = `${
		(!isEmpty ? "non-empty" : "") +
		(validate && isVisited && !isValid ? " invalid" : "")
	}`;

	return (
		<Wrapper style={style}>
      <TextArea
        rows={3}
				name={name}
				id={name}
				value={value}
				onBlur={onBlurHandler}
				onChange={onChangeHandler}
				className={inputClassName}
			/>
			<Label htmlFor={name}>
				{label}
				{isVisited && !isEmpty && isValid && <CheckSquare size={12} />}
			</Label>
			<ErrorMessage>
				{errorMessage && isVisited && (
					<>
						<AlertOctagon size={16} /> {errorMessage}
					</>
				)}
			</ErrorMessage>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
	position: relative;
`;

const TextArea = styled.textarea`
	border-radius: 4px;
	padding: 8px 16px;
	border: none;
	border: 1px solid var(--color-primary-lightest);
	font-size: 1rem;
	color: inherit;
	background: transparent;
	transition: border-color 0.3s;
	outline: none;
  resize: none;

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

	&.invalid {
		border-color: var(--color-error);
	}

	&:focus.valid {
		border-color: var(--color-success);
	}
`;

const Label = styled.label`
	color: #7a7a7a;
	display: flex;
	align-items: center;
	position: absolute;
	left: 16px;
	top: 8px;
	background-color: var(--color-white);
	padding: 0 6px;
	transition: transform 0.3s, color 0.3s;
	cursor: text;

	& > svg {
		margin-left: 4px;
		transform: translateY(-1px);
		color: var(--color-success);
	}
`;

const ErrorMessage = styled.p`
	color: var(--color-error);
	display: flex;
	align-items: center;
	font-size: 0.8rem;
	margin-top: 4px;
	height: 16px;

	& svg {
		margin-right: 4px;
	}
`;

export default TextAreaInput;
