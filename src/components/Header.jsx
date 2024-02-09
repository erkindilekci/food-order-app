import Button from "./ui/Button.jsx";
import {useContext} from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

function Header() {
    const cartContext = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const totalCartItems = cartContext.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header id="main-header">
            <div id="title">
                <h1>Food Order App</h1>
            </div>
            <nav>
                <Button textOnly onClick={userProgressContext.showCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}

export default Header;