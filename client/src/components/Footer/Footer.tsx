import React from "react";
import styled from "styled-components";
import { GitHub, Linkedin, Mail } from "react-feather";

function Footer() {
	return (
		<Wrapper>
			<Content>
				<Copy>&copy; Matilda Mared 2022</Copy>
				<Nav>
						<NavItem href="https://github.com/MatildaMared" target="_blank">
							<GitHub size={24} strokeWidth={1} aria-hidden="true" />
							<span>GitHub</span>
						</NavItem>
						<NavItem href="mailto:matildamared@live.se">
							<Mail size={24} strokeWidth={1} aria-hidden="true" />
							<span>Mail</span>
						</NavItem>
						<NavItem
							href="https://www.linkedin.com/in/matilda-mared"
							target="_blank"
						>
							<Linkedin size={24} strokeWidth={1} aria-hidden="true" />
							<span>LinkedIn</span>
						</NavItem>
				</Nav>
			</Content>
		</Wrapper>
	);
}

const Wrapper = styled.footer`
	background-color: var(--color-primary-dark);
	border-top: 1px solid var(--color-primary-dark);
`;

const Content = styled.div`
	padding: 2rem 1rem;
	max-width: var(--max-width);
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Copy = styled.p`
	font-size: 0.8rem;
	color: hsla(90, 9%, 85%, 0.55);
	text-transform: uppercase;
	letter-spacing: 1px;
`;

const Nav = styled.nav`
	display: flex;
	align-items: center;
	margin-top: 0.5rem;
`;

const NavItem = styled.a`
	color: hsla(90, 9%, 38%, 1);
	transition: all 0.3s;

	&:hover {
		color: var(--color-primary-light);
	}

	& span {
		border: 0;
		clip: rect(1px 1px 1px 1px);
		clip: rect(1px, 1px, 1px, 1px);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
	}

	&:not(:last-child) {
		margin-right: 0.75rem;
	}
`;

export default Footer;
