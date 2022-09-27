import React, { createContext, useReducer } from "react";
import { item } from "./ItemModel";
import { ItemInCart } from "./itemInCart";
type Props = { children: JSX.Element };

const reducer = (state: any, action: any) => {
  console.log({ action });
  switch (action.type) {
    case "addToCart":
      const { item, quantity } = action.payload;
      return [...state, { item, quantity }];
    case "removeFromCart":
      const { id } = action.payload;
      return state.filter((item: ItemInCart) => item.item._id !== id);
    case "changeQuantity":
      return state;
  }
};

export const CartContext = createContext<{
  state: ItemInCart[];
  dispatch: React.Dispatch<any>;
}>({
  state: [],
  dispatch: () => {},
});

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  console.log(state);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
