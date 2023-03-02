import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { clearErrors } from "../../actions/userAction";

const Payment = () => {
  const purchaseInfo = JSON.parse(sessionStorage.getItem("purchaseInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
//   const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(purchaseInfo.totalPrice * 100),
  };

  const purchase = {
    purchaseItems: cartItems,
    totalPrice: purchaseInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
        //   order.paymentInfo = {
        //     id: result.paymentIntent.id,
        //     status: result.paymentIntent.status,
        //   };

        //   dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, error, alert]);

  return (
    <Fragment>
         {/* <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, distinctio suscipit quod illo debitis explicabo obcaecati maiores non esse placeat incidunt, accusantium dicta consequatur porro laudantium in voluptatum ipsa exercitationem quasi impedit eveniet quia cupiditate asperiores eius! Maiores, harum fugiat. Fuga dolor quae placeat perspiciatis ratione, nesciunt et harum nulla.</p> */}
      <MetaData title="Udemy | Payment" />
      <div className="h-screen w-screen bg-slate-100 flex justify-center items-center">
        <form className="paymentForm bg-slate-200 w-1/3 h-2/3 flex justify-around flex-col" onSubmit={(e) => submitHandler(e)}>
          <p className="text-center text-5xl font-semibold">Card Info</p>
          <div className="flex items-center justify-center relative">
            <CreditCardIcon className="absolute left-24" />
            <CardNumberElement className="paymentInput w-2/3 bg-white pl-14 pr-5 py-3" />
          </div>
          <div className="flex items-center justify-center relative">
            <EventIcon className="absolute left-24"/>
            <CardExpiryElement className="paymentInput w-2/3 bg-white pl-14 pr-5 py-3" />
          </div>
          <div className="flex items-center justify-center relative">
            <VpnKeyIcon className="absolute left-24"/>
            <CardCvcElement className="paymentInput w-2/3 bg-white pl-14 pr-5 py-3" />
          </div>
          <div className="flex items-center justify-center">
            <input
              type="submit"
              value={`Pay - ₹${purchaseInfo && purchaseInfo.totalPrice}`}
              ref={payBtn}
              className="paymentFormBtn font-bold text-2xl bg-blue-500 text-white px-3 py-2 w-2/3 hover:bg-white hover:text-blue-500 hover:cursor-pointer transition ease-in-out duration-300"
            />
          </div>
          
        </form>
      </div>

    </Fragment>
  );
};

export default Payment;
