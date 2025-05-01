import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, token, loadCreditsData, setShowLogin } =
    useContext(AppContext);

  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        try {
          
          const {data} = await axios.post(`${backendUrl}/api/user/verify-razor`,res,{headers:{token}})

          if(data.success){
            loadCreditsData()
            navigate('/')
            toast.success("Credit Added")
          }

        } catch (error) {
          console.log(error.message)
          toast.error(error.message)
        }
      },
    };

    const rzp = new window.Razorpay(options)
    rzp.open()
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razor`,
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 70 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10 "
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6 ">
        Our Plans
      </button>

      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10 ">
        Choose the plan
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left ">
        {plans.map((plan, index) => (
          <div
            className="bg-white drop-shadow-sm border border-gray-200 rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500 "
            key={index}
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{plan.id}</p>
            <p className="text-sm">{plan.desc}</p>
            <p className="mt-6 ">
              <span className="text-3xl font-medium">${plan.price}</span> /{" "}
              {plan.credits} credits
            </p>

            <button
              onClick={() => paymentRazorpay(plan.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer "
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
