import {currencyFormatter} from "../util/formatting.js";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";

function CartItem({item}) {
    const cartContext = useContext(CartContext);

    return (
        <li className="cart-item">
            <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</p>
            <p className="cart-item-actions">
                <button onClick={() => cartContext.removeItem(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => cartContext.addItem(item)}>+</button>
            </p>
        </li>
    );
}

export default CartItem;