import Modal from "./ui/Modal.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import {currencyFormatter} from "../util/formatting.js";
import Button from "./ui/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

function Cart() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const cartTotal = cartContext.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <Modal className="cart" open={userProgressContext.progress === 'cart'}
               onClose={userProgressContext.progress === 'cart' ? userProgressContext.hideCart : null}>
            <h2>Your Cart</h2>
            <ul>{cartContext.items.map(item => <CartItem key={item.id} item={item}/>)}</ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={userProgressContext.hideCart}>Close</Button>
                {cartContext.items.length !== 0 &&
                    <Button onClick={userProgressContext.showCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    );
}

export default Cart;