import React, { useState } from "react";
import styled from "styled-components";
import {
	posterTitleValidator,
	posterDescriptionValidator,
	posterCategoryValidator,
} from "../../utils/validators";
import TextInput from "../Inputs/TextInput";
import TextAreaInput from "../Inputs/TextAreaInput";

/* 
  title,
  description,
  category,
  imageUrl,
  price,
  inStock
*/

interface Props {
	submitHandler: () => void;
	errorMessage: string;
}

function AddPosterForm(props: Props) {
	const { submitHandler, errorMessage } = props;

	// Input values
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [category, setCategory] = useState<string>("");

	// Input validation
	const [titleIsValid, setTitleIsValid] = useState<boolean>(false);
	const [descriptionIsValid, setDescriptionIsValid] = useState<boolean>(false);
	const [categoryIsValid, setCategoryIsValid] = useState<boolean>(false);

	return (
		<Form>
			<TextInput
				type="text"
				name="title"
				value={title}
				setValue={setTitle}
				isValid={titleIsValid}
				setIsValid={setTitleIsValid}
				label="Title"
				validate={posterTitleValidator}
			/>
			<TextAreaInput
				name="description"
				value={description}
				setValue={setDescription}
				isValid={descriptionIsValid}
				setIsValid={setDescriptionIsValid}
				label="Description"
				validate={posterDescriptionValidator}
			/>
			<TextInput
				type="text"
				name="category"
				value={category}
				setValue={setCategory}
				isValid={categoryIsValid}
				setIsValid={setCategoryIsValid}
				label="Category"
				validate={posterCategoryValidator}
			/>
			<ErrorMessage>{errorMessage}</ErrorMessage>
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
