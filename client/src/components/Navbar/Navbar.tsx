import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "../../models/Cart";
import Button from "../Button/Button";
import { ShoppingCart } from "react-feather";

interface Props {
	isLoggedIn: boolean;
	isAdmin: boolean;
	updateContext: (context: any) => void;
	cart: CartItem[] | [];
}

function Navbar(props: Props) {
	const { isLoggedIn, isAdmin, updateContext, cart } = props;
	const navigate = useNavigate();

	function logoutHandler() {
		localStorage.removeItem("token");
		updateContext({
			user: {},
			isLoggedIn: false,
			isAdmin: false,
		});
		navigate("/");
	}

	function cartClickHandler() {
		navigate("/cart");
	}

	return (
		<Nav>
			<Content>
				<Logo>WP</Logo>
				<List>
					<Item>
						<Link to="/">Home</Link>
					</Item>
					<Item>
						<Link to="/posters">Posters</Link>
					</Item>
					{!isLoggedIn && (
						<>
							<Item>
								<Link to="/login">Log in</Link>
							</Item>
							<Item>
								<Link to="/signup">Sign up</Link>
							</Item>
						</>
					)}
					{isAdmin && (
						<Item>
							<Link to="/add">Add poster</Link>
						</Item>
					)}
					{isLoggedIn && (
						<Item>
							<Link to="" onClick={logoutHandler}>
								Log out
							</Link>
						</Item>
					)}
					{cart && cart.length > 0 && (
						<Item>
							<Amount>{cart.length}</Amount>
							<Button onClick={cartClickHandler} type="button">
								<ShoppingCart size={14} />
								Cart
							</Button>
						</Item>
					)}
				</List>
			</Content>
		</Nav>
	);
}

const Nav = styled.nav`
	z-index: 10;
	background-color: var(--color-primary-dark-transparent);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding: 0.5rem 1rem;
	border-bottom: 1px solid hsla(90, 9%, 65%, 0.2);
	backdrop-filter: blur(3px);
`;

const Content = styled.div`
	max-width: var(--max-width);
	margin: 0 auto;
	display: flex;
	align-items: center;
`;

const Logo = styled.h1`
	font-family: var(--font-decorative);
	color: var(--color-primary-light);
	user-select: none;
	font-size: 1.5rem;
	flex: 1;
`;

const List = styled.ul`
	padding: 0;
	list-style-type: none;
	display: flex;
	align-items: center;
`;

const Item = styled.li`
	position: relative;
	&:not(:last-child) {
		margin-right: 1rem;
	}

	& a {
		color: var(--color-white);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 2px;
		font-size: 0.8rem;
		transition: all 0.3s;

		&:hover {
			color: var(--color-primary-light);
		}
	}
`;

const Amount = styled.span`
	line-height: 1;
	padding: 2px;
	position: absolute;
	top: -7px;
	right: -7px;
	border-radius: 50%;
	background-color: #940000;
	font-size: 0.8rem;
	color: #fff;
	min-width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default Navbar;
