import React, { useContext } from "react";
import styled from "styled-components";
import CartContext from "./CartContext";
import { ItemInCart } from "./itemInCart";
import { item } from "./ItemModel";

interface Props {
  item: item;
}

const Item: React.FC<Props> = ({ item }) => {
  const { dispatch, state } = useContext(CartContext);

  const isInCart = state.find(
    (cartItem: ItemInCart) => item._id === cartItem.item._id
  );

  const addtoCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("hey");
    isInCart
      ? dispatch({ type: "removeFromCart", payload: { id: item._id } })
      : dispatch({ type: "addToCart", payload: { item, quantity: 1 } });
  };

  return (
    <Container>
      <Title>{item.name}</Title>
      <button onClick={addtoCart}>
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </Container>
  );
};

export default Item;

const Container = styled.div`
  width: 15%;
  border: 1px solid red;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
`;
