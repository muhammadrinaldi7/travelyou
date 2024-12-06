import React from "react";
import { useCartsStore } from "@/stores/cartsStore";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import usePostCart from "@/api/hooks/Cart/usePostCart";
import endpoints from "@/api/endpoints";
import { useTransactionStore } from "@/stores/transactionStore";
// import { ConfirmationPopup } from "../modals/confirmationPopUp";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

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
  const { setTransactionItemsPayload, transactionItemsPayload } =
    useTransactionStore();
  // const [isChecked, setIsChecked] = useState(false); // State untuk checkbox
  const { updateCart } = usePostCart(endpoints.cartUpdate + id);
  const { deleteCart } = usePostCart(endpoints.deleteCart);

  const handleCheckboxChange = () => {
    // setIsChecked(!isChecked);
    setTransactionItemsPayload({
      ...transactionItemsPayload,
      cartIds: transactionItemsPayload.cartIds.includes(id)
        ? transactionItemsPayload.cartIds.filter((idCart) => idCart !== id)
        : [...transactionItemsPayload.cartIds, id],
    });

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

  const handleDelete = (id: string) => {
    deleteCart(id);
    removeCart(id);
  };
  const handleDeleteCart = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="text-center">
          Are you sure you want to delete this cart?
        </p>
        <div className="flex justify-center items-center gap-2">
          <Button
            className="bg-green-600 text-white"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
              toast.success("Cart deleted successfully");
            }}
          >
            Yes
          </Button>
          <Button
            className="bg-red-600 text-white"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col justify-between md:flex-row p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          // checked={isChecked}
          checked={
            useCartsStore((state) => state.selectedItems.includes(activityId))
              ? true
              : false
          }
          onChange={handleCheckboxChange}
          className="h-5 w-5 checked:bg-primary-300"
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
          {/* <p className="text-gray-600">Quantity: {quantity}</p> */}
          <p className="text-gray-600 font-bold">
            Rp. {price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="Quantity" className="sr-only">
          {" "}
          Quantity{" "}
        </label>

        <div className="flex items-center rounded-xl border border-gray-200">
          <button
            onClick={handleRemoveQuantity}
            type="button"
            className={`size-10 leading-10 ${
              quantity === 1 && "opacity-50 pointer-events-none"
            } text-red-600 transition hover:opacity-75`}
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
            className="size-10 leading-10 text-green-600 transition hover:opacity-75"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDeleteCart(id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
