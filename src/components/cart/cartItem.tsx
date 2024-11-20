import React, { useState } from "react";
import { useCartsStore } from "@/stores/cartsStore";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import usePostCart from "@/api/hooks/Cart/usePostCart";
import endpoints from "@/api/endpoints";

const CartItem = ({
  id,
  activityId,
  title,
  quantity,
  imageUrl,
  price,
}: {
  id: string;
  activityId: string;
  title: string;
  quantity: number;
  imageUrl: string;
  price: number;
}) => {
  const { removeCart, addQuantity, removeQuantity, toggleSelectItem } =
    useCartsStore();
  const [isChecked, setIsChecked] = useState(false); // State untuk checkbox
  const { updateCart } = usePostCart(endpoints.cartUpdate + id);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    toggleSelectItem(activityId);
  };

  const handleAddQuantity = () => {
    addQuantity(activityId);
    updateCart({ quantity: quantity + 1 });
  };

  const handleRemoveQuantity = () => {
    if (quantity > 1) {
      removeQuantity(activityId);
      updateCart({ quantity: quantity - 1 });
    }
  };

  return (
    <div className="flex flex-col justify-between md:flex-row p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="h-5 w-5"
        />
        <Image
          src={imageUrl || "/img/favicon.ico"}
          alt={title}
          width={1000}
          height={1000}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">Quantity: {quantity}</p>
          <p className="text-gray-600">Price: {price.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="Quantity" className="sr-only">
          {" "}
          Quantity{" "}
        </label>

        <div className="flex items-center rounded border border-gray-200">
          <button
            onClick={handleRemoveQuantity}
            type="button"
            className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <input
            type="number"
            id="Quantity"
            readOnly
            value={quantity}
            className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />

          <button
            type="button"
            onClick={handleAddQuantity}
            className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => removeCart(activityId)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
