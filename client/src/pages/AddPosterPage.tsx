import React, { useState } from "react";
import Heading from "../components/Heading/Heading";
import styled from "styled-components";
import AddPosterForm from "../components/AddPosterForm/AddPosterForm";

interface Props {
	isAdmin: boolean;
}

function AddPosterPage(props: Props) {
	const { isAdmin } = props;
	const [errorMessage, setErrorMessage] = useState("");

	function onSubmit() {
		console.log("Submitted");
	}

	if (isAdmin) {
		return (
			<Wrapper>
				<Heading>Add Poster</Heading>
				<AddPosterForm submitHandler={onSubmit} errorMessage={errorMessage} />
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
