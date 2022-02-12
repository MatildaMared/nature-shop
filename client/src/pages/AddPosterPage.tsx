import React, { useState } from "react";
import Heading from "../components/Heading/Heading";
import { useNavigate } from "react-router";
import styled from "styled-components";
import AddPosterForm from "../components/Forms/AddPosterForm";
import { NewPoster, Poster } from "../models/Poster";
import { getToken } from "../services/localStorageService";
import { createPoster } from "../services/postersService";

interface Props {
	isAdmin: boolean;
	setPosters: (posters: Poster[]) => void;
}

function AddPosterPage(props: Props) {
	const { isAdmin, setPosters } = props;
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	function displayErrorMessage(message: string): void {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage("");
		}, 5000);
	}

	async function onCreateNewPosterHandler(newPoster: NewPoster) {
		setErrorMessage("");
		const token = getToken();
		if (!token) {
			return displayErrorMessage(
				"You must be logged in to create a new poster"
			);
		}
		const data = await createPoster(newPoster, token);
		if (data.success === false) {
			displayErrorMessage(data.error);
		} else {
			setPosters(data.products);
			navigate(`/posters/${data.product.id}`);
		}
	}

	if (isAdmin) {
		return (
			<Wrapper>
				<Heading>Add Poster</Heading>
				<AddPosterForm
					submitHandler={onCreateNewPosterHandler}
					errorMessage={errorMessage}
				/>
			</Wrapper>
		);
	} else {
		return (
			<Wrapper>
				<Heading>Add Poster</Heading>
				{!isAdmin && (
					<Text>
						You are not authorized to add posters. Please return to the
						homepage.
					</Text>
				)}
			</Wrapper>
		);
	}
}

const Wrapper = styled.main`
	max-width: var(--max-width);
	margin: 0 auto;
	background-color: var(--color-white);
	padding: 4rem 1rem 8rem 1rem;
`;

const Text = styled.p`
	text-align: center;
`;

export default AddPosterPage;
