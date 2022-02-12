import React, { useState } from "react";
import styled from "styled-components";
import {
	posterTitleValidator,
	posterDescriptionValidator,
	posterCategoryValidator,
	posterImageUrlValidator,
	posterPriceValidator,
	posterInStockValidator,
} from "../../utils/validators";
import TextInput from "../Inputs/TextInput";
import TextAreaInput from "../Inputs/TextAreaInput";
import NumberInput from "../Inputs/NumberInput";
import Button from "../Button/Button";
import { NewPoster, Poster } from "../../models/Poster";

interface Props {
	submitHandler: (editedPoster: NewPoster) => void;
	errorMessage: string;
	poster: Poster;
}

function EditPosterForm(props: Props) {
  const { submitHandler, errorMessage, poster } = props;

	// Input values
	const [title, setTitle] = useState<string>(poster.title);
	const [description, setDescription] = useState<string>(poster.description);
	const [category, setCategory] = useState<string>(poster.category);
	const [imageUrl, setImageUrl] = useState<string>(poster.imageUrl);
	const [price, setPrice] = useState<number>(poster.price);
	const [inStock, setInStock] = useState<number>(poster.inStock);

	// Input validation
	const [titleIsValid, setTitleIsValid] = useState<boolean>(true);
	const [descriptionIsValid, setDescriptionIsValid] = useState<boolean>(true);
	const [categoryIsValid, setCategoryIsValid] = useState<boolean>(true);
	const [imageUrlIsValid, setImageUrlIsValid] = useState<boolean>(true);
	const [priceIsValid, setPriceIsValid] = useState<boolean>(true);
	const [inStockIsValid, setInStockIsValid] = useState<boolean>(true);

	// Submit handler
	function onFormSubmit(e: React.FormEvent) {
		e.preventDefault();

		const newPoster: NewPoster = {
			title,
			description,
			category,
			imageUrl,
			price,
			inStock,
		};

		submitHandler(newPoster);
	}

	return (
		<Form onSubmit={onFormSubmit}>
			<TextInput
				type="text"
				name="title"
				value={title}
				setValue={setTitle}
				isValid={titleIsValid}
				setIsValid={setTitleIsValid}
				label="Title"
				validate={posterTitleValidator}
				visible={true}
			/>
			<TextAreaInput
				name="description"
				value={description}
				setValue={setDescription}
				isValid={descriptionIsValid}
				setIsValid={setDescriptionIsValid}
				label="Description"
				validate={posterDescriptionValidator}
				visible={true}
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
				visible={true}
			/>
			<TextInput
				type="text"
				name="image-url"
				value={imageUrl}
				setValue={setImageUrl}
				isValid={imageUrlIsValid}
				setIsValid={setImageUrlIsValid}
				label="Image url"
				validate={posterImageUrlValidator}
				visible={true}
			/>
			<NumbersWrapper>
				<NumberInput
					name="price"
					value={price}
					setValue={setPrice}
					isValid={priceIsValid}
					setIsValid={setPriceIsValid}
					label="Price"
					validate={posterPriceValidator}
					min="0"
					max="999999"
					style={{ width: "50%" }}
					visible={true}
				/>
				<NumberInput
					name="in-stock"
					value={inStock}
					setValue={setInStock}
					isValid={inStockIsValid}
					setIsValid={setInStockIsValid}
					label="In stock"
					validate={posterInStockValidator}
					min="0"
					max="999999"
					style={{ width: "50%" }}
					visible={true}
				/>
			</NumbersWrapper>
			<ErrorMessage>{errorMessage}</ErrorMessage>
			<Button
				type="submit"
				disabled={
					!titleIsValid ||
					!descriptionIsValid ||
					!categoryIsValid ||
					!imageUrlIsValid ||
					!priceIsValid ||
					!inStockIsValid
				}
			>
				Edit poster
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

const NumbersWrapper = styled.div`
	display: flex;
	width: 100%;

	& > *:not(:last-child) {
		margin-right: 10px;
	}
`;

const ErrorMessage = styled.p`
	margin-top: -1rem;
	height: 16px;
	font-size: 0.8rem;
	color: var(--color-error);
	margin-bottom: 0.5rem;
`;

export default EditPosterForm;
