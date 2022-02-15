import React, { useContext } from "react";
import styled from "styled-components";
import Heading from "../components/Heading/Heading";
import OrderHistory from "../components/OrderHistory/OrderHistory";
import { UserContext } from "../context/UserContext";
import { getToken } from "../services/localStorageService";
import { updateUser } from "../services/userService";
import PersonalInformationForm from "../components/Forms/PersonalInformationForm";

function AccountPage() {
	const [context, updateContext] = useContext(UserContext);
	const { user } = context;

	async function onUserChanges(updates: {}) {
		const token = getToken();
		if (token) {
			const response = await updateUser(updates, user.id, token);
			if (response.success) {
				updateContext({ user: response.user });
			}
		}
	}

	return (
		<Wrapper>
			<Heading>Account</Heading>
			{!context.isLoggedIn && (
				<AlertText>You need to be logged in to access this page.</AlertText>
			)}
			{context.isLoggedIn && (
				<Content>
					{user && (
						<PersonalInformationForm
							userChangeHandler={onUserChanges}
							user={user}
						/>
					)}
					{user && user.orders && user.orders.length > 0 && (
						<OrderHistory orders={user.orders} />
					)}
				</Content>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.main`
	max-width: var(--max-width);
	margin: 0 auto;
	background-color: var(--color-white);
	padding: 4rem 1rem 8rem 1rem;
`;

const Content = styled.div`
	width: 100%;
	max-width: 600px;
	margin: 0 auto;

  & > * {
    &:first-of-type {
      margin-bottom: 4rem;
    }
  }
`;

const AlertText = styled.p`
	text-align: center;
`;

export default AccountPage;
