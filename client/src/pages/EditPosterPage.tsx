import React, { useState, useEffect } from "react";
import Heading from "../components/Heading/Heading";
import { useParams, useNavigate } from "react-router";
import styled from "styled-components";
import EditPosterForm from "../components/Forms/EditPosterForm";
import { NewPoster, Poster } from "../models/Poster";
import { getToken } from "../services/localStorageService";
import { editPoster, getPoster } from "../services/postersService";

interface Props {
	isAdmin: boolean;
	setPosters: (posters: Poster[]) => void;
}

function EditPosterPage(props: Props) {
	// Variables
	const { id } = useParams();
	const { isAdmin, setPosters } = props;
	const [errorMessage, setErrorMessage] = useState("");
	const [poster, setPoster] = useState<Poster>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [loadingMessage, setLoadingMessage] = useState<string>("Loading...");
	const navigate = useNavigate();

	// Functions
	function displayErrorMessage(message: string): void {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage("");
		}, 5000);
	}

	async function getData() {
		if (id) {
			const data = await getPoster(id);
			if (data.success) {
				setPoster(data.product);
				setIsLoading(false);
			} else {
				setLoadingMessage(
					`${data.error}. Please try refreshing the page or go back to the home page.`
				);
			}
		}
	}

	// Effects
	useEffect(() => {
		getData();
	}, []);

	async function onEditPosterHandler(editedPoster: NewPoster) {
		setErrorMessage("");
		const token = getToken();
		if (!token) {
			return displayErrorMessage(
				"You must be logged in to edit a poster"
			);
		}
		const data = await editPoster(id as string, editedPoster, token);
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
				<Heading>Edit Poster</Heading>
				{isLoading && <LoadingMessage>{loadingMessage}</LoadingMessage>}
				{!isLoading && poster && (
					<EditPosterForm
						poster={poster}
						submitHandler={onEditPosterHandler}
						errorMessage={errorMessage}
					/>
				)}
			</Wrapper>
		);
	} else {
		return (
			<Wrapper>
				<Heading>Add Poster</Heading>
				<Text>
					You are not authorized to edit posters. Please return to the homepage.
				</Text>
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

const LoadingMessage = styled.p`
	text-align: center;
`;

export default EditPosterPage;
