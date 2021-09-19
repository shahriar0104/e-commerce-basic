import ShoppingContext from "../../context/ShoppingContext";
import Navbar from "../navbar/Navbar";
import ProductList from "../product-list/ProductList";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProductOverview from "../product-overview/ProductOverview";
import Checkout from "../checkout/Checkout";
import AboutUs from "../about/AboutUs";
import ContactUs from "../contact/ContactUs";
import ErrorPage from "../error/ErrorPage";
import OrderSummary from "../order-summary/OrderSummary";

const Home = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() =>
                    <ShoppingContext>
                        <Navbar/>
                        <ProductList/>
                    </ShoppingContext>
                }/>

                <Route exact path="/product/:productId" render={() =>
                    <ShoppingContext>
                        <Navbar/>
                        <ProductOverview/>
                    </ShoppingContext>
                }/>

                <Route exact path="/about" render={() =>
                    <ShoppingContext>
                        <Navbar/>
                        <AboutUs/>
                    </ShoppingContext>
                }/>

                <Route exact path="/contact" render={() =>
                    <ShoppingContext>
                        <Navbar/>
                        <ContactUs/>
                    </ShoppingContext>
                }/>

                <Route exact path="/checkout" render={() =>
                    <ShoppingContext>
                        <Navbar/>
                        <Checkout/>
                    </ShoppingContext>
                }/>

                <Route exact path="/order-summary" render={() =>
                    <ShoppingContext>
                        <Navbar/>
                        <OrderSummary/>
                    </ShoppingContext>
                }/>

                <Route exact path="*" render={() =>
                    <ShoppingContext>
                        <Navbar/>
                        <ErrorPage/>
                    </ShoppingContext>
                }/>
            </Switch>
        </Router>
    )
}

export default Home;
