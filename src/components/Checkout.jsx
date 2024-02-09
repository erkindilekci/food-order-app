import Modal from "./ui/Modal.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import {currencyFormatter} from "../util/formatting.js";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
};

function Checkout() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const cartTotal = cartContext.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    const {data, isLoading, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig);

    const handleFinish = () => {
        userProgressContext.hideCheckout();
        cartContext.clearCart();
        clearData();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartContext.items,
                customer: data
            }
        }));
    };

    let actions = (
        <>
            <Button onClick={userProgressContext.hideCheckout} type="button" textOnly>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isLoading) actions = <span>Sending order data...</span>;

    if (data && !error) {
        return (
            <Modal open={userProgressContext.progress === 'checkout'} onClose={handleFinish}>
                <h2>Success</h2>
                <p>Your order was submitted successfully.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={userProgressContext.progress === 'checkout'} onClose={userProgressContext.hideCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name"/>
                <Input label="E-mail Address" type="email" id="email"/>
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>

                {error && <Error title="Failed to submit order" message={error}/>}

                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}

export default Checkout;