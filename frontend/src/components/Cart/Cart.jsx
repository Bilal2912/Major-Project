import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import CartItemCard from "./CartItemCard";
import MetaData from "../layout/MetaData";
import { removeItemsFromCart } from "../../actions/cartAction";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);

  let total = 0;
  {cartItems.length>0 && cartItems.forEach(e => {
    total+=e.price;
  })}

  const data = {
    totalPrice: total,
  }

  sessionStorage.setItem("purchaseInfo", JSON.stringify(data));

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  return (
    <Fragment>
      <MetaData title={`Yashika | Cart`} />
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="w-5/6 flex items-center">
          {cartItems.length > 0 && (
            <div className="w-3/4 bg-slate-100 border-t-2 border-l-2 border-r-2 border-zinc-400">
              {cartItems &&
                cartItems.map((item) => (
                  <div
                    className="px-5 py-5 flex justify-between items-center border-b-2 border-zinc-400"
                    key={item.course}
                  >
                    <CartItemCard item={item} />
                    <div className="w-1/2 flex">
                      <p className="text-2xl font-bold text-blue-500 relative right-7 w-1/2 text-center">
                        ₹{item.price}
                      </p>
                      <button
                        className="bg-blue-500 text-white font-semibold px-4 h-12 hover:bg-blue-700 text-2xl relative right-8 w-1/2"
                        onClick={() => deleteCartItems(item.course)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {cartItems.length === 0 && (
            <div className="text-center text-5xl font-semibold w-full">
              <div className="flex justify-center items-center border-2 border-zinc-400 bg-slate-100 py-4">
                <RemoveShoppingCartIcon
                  className="mr-5"
                  sx={{ fontSize: 52 }}
                />
                <div className="">Cart is Empty</div>
              </div>
              <Link
                to="/courses"
                className="relative top-14 bg-blue-500 text-white px-5 py-3 text-4xl hover:bg-blue-700"
              >
                Browse Courses
              </Link>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="w-1/4 bg-slate-100 border-2 border-zinc-400 h-full flex flex-col justify-start ml-14">
              <p className="mx-5 mt-10 text-2xl">Total:</p>
              <p className="mx-5 mt-2 text-6xl font-bold">{`₹${cartItems.reduce(
                (acc, item) => acc + item.price,
                0
              )}`}</p>
              <div className="flex justify-center items-center">
                <button className="my-10 py-3 font-semibold bg-blue-500 text-white hover:bg-white hover:text-black transition ease-in-out duration-500 w-3/4 text-xl">
                  <Link to="/payment">Proceed to Pay</Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
