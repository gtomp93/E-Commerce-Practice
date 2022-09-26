import React, { createContext, useReducer } from "react";
import { item } from "./Item";

type Props = { children: JSX.Element };

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "addToCart":
      return state;
    case "removeFromCart":
      return state;
  }
};

export const CartContext = createContext<{
  state: item[];
  dispatch: React.Dispatch<any>;
}>({
  state: [],
  dispatch: () => {},
});

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
