import React from "react";
import styled from "styled-components";

interface Props {
	children: React.ReactNode;
}

function Heading(props: Props) {
	const { children } = props;

	return <StyledHeading>{children}</StyledHeading>;
}

const StyledHeading = styled.h2`
	font-size: 2.5rem;
	font-family: var(--font-script);
	text-align: center;
	color: var(--color-primary-dark);
	margin-bottom: 2rem;
`;

export default Heading;
