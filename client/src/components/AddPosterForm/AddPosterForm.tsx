import React, { useState, useRef } from "react";
import styled from "styled-components";
import { posterTitleValidator } from "../../utils/validators";
import TextInput from "../TextInput/TextInput";

interface Props {
	submitHandler: () => void;
	errorMessage: string;
}

function AddPosterForm(props: Props) {
	// Input values
	const [title, setTitle] = useState("");

	// Input validation
	const [titleIsValid, setTitleIsValid] = useState(false);

	// Input refs
	const titleInput = useRef<HTMLInputElement>(null);

	return (
		<Form>
			<TextInput
				ref={titleInput}
				type="text"
				name="title"
				value={title}
				setValue={setTitle}
				isValid={titleIsValid}
				setIsValid={setTitleIsValid}
				label="Title"
				validate={posterTitleValidator}
			/>
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

export default AddPosterForm;
