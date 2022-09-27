import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
const ItemDetails = () => {
  const { id } = useParams();
  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return <div>ItemDetails</div>;
};

export default ItemDetails;
