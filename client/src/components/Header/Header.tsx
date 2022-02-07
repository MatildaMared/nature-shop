import React from "react";
import styled from "styled-components";
import headerImage from "../../images/header.jpg";

function Header() {
	return (
		<Wrapper>
			<HeadingWrapper>
				<Heading>Wild Posters</Heading>
				<SubHeading>Bringing nature home</SubHeading>
			</HeadingWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.header`
	background-image: url(${headerImage});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 575px;
	display: flex;
	align-items: center;
	flex-direction: column;
	border-bottom: 1px solid hsla(0, 0%, 100%, 0.25);
`;

const HeadingWrapper = styled.div`
	width: fit-content;
`;

const Heading = styled.h1`
	padding-top: 150px;
	font-family: var(--font-decorative);
	color: var(--color-primary-light-transparent);
	font-size: 5rem;
	text-shadow: 0 0 1rem hsla(0, 0%, 0%, 0.7);
	user-select: none;
`;

const SubHeading = styled.h2`
	margin-top: -55px;
	font-family: var(--font-script);
	color: hsla(0, 0%, 100%, 0.8);
	text-shadow: 0 0 10px hsla(0, 0%, 0%, 0.6);
	font-size: 3rem;
	text-align: right;
	user-select: none;
`;

export default Header;
