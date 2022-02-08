import React from "react";
import styled from "styled-components";

function Footer() {
	return (
		<Wrapper>
			<Content>
				<Copy>Design and code by Matilda Mared 2022 &copy;</Copy>
			</Content>
		</Wrapper>
	);
}

const Wrapper = styled.footer`
	background-color: hsla(90, 9%, 65%, 0.03);
	border-top: 1px solid hsla(90, 9%, 65%, 0.25);
`;

const Content = styled.div`
	padding: 1rem;
	max-width: var(--max-width);
	margin: 0 auto;
`;

const Copy = styled.p`
	text-align: center;
  font-size: .8rem;
  letter-spacing: 1px;
	color: hsla(90, 9%, 85%, 0.65);
`;

export default Footer;
