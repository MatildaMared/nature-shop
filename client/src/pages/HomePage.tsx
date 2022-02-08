import React from "react";
import styled from "styled-components";

function HomePage() {
	return (
		<Wrapper>
			<h1>Hello gorgeous!! 🐳 🦄</h1>
		</Wrapper>
	);
}

const Wrapper = styled.main`
	max-width: var(--max-width);
	margin: 0 auto;
	background-color: var(--color-white);
	padding: 2rem 1rem;
`;

export default HomePage;
