import PropTypes from "prop-types";
import { useCart } from "react-use-cart";
import TrashIcon from "./icons/TrashIcon";
const Cart = ({ className }) => {
  const { items, removeItem } = useCart();
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className="grid grid-cols-4  items-center gap-4 font-medium"
          >
            <img
              src={item.image}
              className="w-[60px] h-[40px] object-cover flex-shrink-0 rounded-md"
            ></img>
            <span>{item.name}</span>
            <span>{item.price}Đ</span>
            <button onClick={() => removeItem(item.id)}>
              <TrashIcon></TrashIcon>
            </button>
          </div>
        );
      })}
      <div className="font-medium flex items-center justify-around">
        <span>Tổng:</span>
        <span>{items.reduce((total, item) => total + item.price, 0)}Đ</span>
      </div>
    </div>
  );
};

Cart.propTypes = {
  className: PropTypes.string,
};
export default Cart;
