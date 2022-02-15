import React from "react";
import styled from "styled-components";

interface Props {
	orders: [
		{
			id: string;
			createdAt: Date;
			totalPrice: number;
		}
	];
}

function OrderHistory(props: Props) {
	const { orders } = props;

	return (
		<Wrapper>
			<Title>Order History</Title>
			<ul>
				{orders.map((order) => (
					<li key={order.id}>
						<OrderNumber>
							Order no. <span>{order.id}</span>
						</OrderNumber>
						<OrderDetails>
							<p>
								Order placed at{" "}
								{order.createdAt && order.createdAt.toString().slice(0, 10)}
							</p>
							<p>Total price: {order.totalPrice}:-</p>
						</OrderDetails>
					</li>
				))}
			</ul>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	width: 100%;
	border: 1px solid var(--color-primary-lightest);
	position: relative;
	padding: 2rem;

	& ul {
		list-style: none;
		padding: 0;

		& li {
			&:not(:last-child) {
				border-bottom: 1px solid var(--color-primary-lightest);
				padding-bottom: 1rem;
				margin-bottom: 1rem;
			}
		}
	}
`;

const Title = styled.h3`
	font-size: 0.8rem;
	font-weight: 400;
	position: absolute;
	color: var(--color-primary);
	top: -12px;
	left: 16px;
	text-transform: uppercase;
	letter-spacing: 1px;
	padding: 2px;
	background-color: var(--color-white);
`;

const OrderNumber = styled.h4`
	font-size: 1rem;
	font-weight: 400;
	text-transform: uppercase;
	letter-spacing: 1px;

	span {
		letter-spacing: 0;
		font-weight: 500;
		text-transform: none;
	}
`;

const OrderDetails = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	& p {
		font-size: 0.9rem;
	}
`;

export default OrderHistory;
