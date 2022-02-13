import React from "react";
import { CartItem } from "../../models/Cart";
import styled from "styled-components";

interface Props {
	cart: CartItem[];
}

function Cart(props: Props) {
  const { cart } = props;
  console.log(cart);

	return (
		<Wrapper>
			{cart && cart.map((item) => (
				<div key={item.id}>{item.title}</div>
			))}
		</Wrapper>
	);
}

const Wrapper = styled.div`
  margin-bottom: 3rem;
`;

export default Cart;
