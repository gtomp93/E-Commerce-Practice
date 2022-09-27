import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { item } from "./ItemModel";
import Item from "./Item";

const Homepage = () => {
  const [items, setItems] = useState<item[]>([]);
  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data.result);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);
  return (
    <Container>
      {items.map((item) => (
        <Item item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Homepage;

const Container = styled.div`
  margin: 0;
  display: flex;
  justify-content: space-between;
  /* width: 100vw; */
  width: 100%;
  overflow: hidden;
  flex-wrap: wrap;
`;
