import endpoints from "@/api/endpoints";
import usePostCart from "@/api/hooks/Cart/usePostCart";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const QtyInputs = ({ qty, id }: { qty: number; id: string }) => {
  const { updateCart } = usePostCart(endpoints.cartUpdate + id);
  const handleAddQty = () => {
    updateCart({ quantity: qty + 1 });
  };
  const handleMinusQty = () => {
    updateCart({ quantity: qty - 1 });
  };
  return (
    <div className="flex items-center rounded border border-gray-200">
      <button
        type="button"
        onClick={handleMinusQty}
        className="size-5 leading-5 text-gray-600 transition hover:opacity-75"
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>

      <input
        type="number"
        id="Quantity"
        readOnly
        value={qty}
        className="h-7 w-10 text-xs border-transparent text-center [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      />

      <button
        type="button"
        onClick={handleAddQty}
        className="size-5 leading-5 text-gray-600 transition hover:opacity-75"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};
