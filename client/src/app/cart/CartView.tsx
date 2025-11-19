"use client";

import { ShippingFormType } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import { useState } from "react";
import Image from "next/image";
import useCartStore from "@/stores/cartStore";

const steps = [
  {
    id: 1,
    name: "Shopping Cart",
    href: "/cart",
    status: "current",
  },
  {
    id: 2,
    name: "Shipping",
    href: "/shipping",
    status: "complete",
  },
  {
    id: 3,
    name: "Payment",
    href: "/payment",
    status: "incomplete",
  },
];

// const cart: CartType[] = [
//   {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quentity: 1,
//     selectedSize: "s",
//     selectedColor: "gray",
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     quentity: 1,
//     selectedSize: "m",
//     selectedColor: "blue",
//   },
// ];

export default function CartView() {
  const [shippingForm, setShippingForm] = useState<ShippingFormType>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { cart, removeFromCart } = useCartStore();

  const activeStep = parseInt(searchParams.get("step") || "1");

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-12">
      <h1 className="text-2xl font-medium">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 border-b-2 pb-2 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-500"
              }`}
            >
              {step.name}
            </p>
          </div>
        ))}
      </div>
      {/* STEP AND DETAILS */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* steps  */}
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cart.map((item) => (
              <div
                className="flex items-center justify-between gap-4"
                key={item.id + item.selectedSize + item.selectedColor}
              >
                {/* item details  */}
                <div className="flex gap-8">
                  {/* image  */}
                  <div className="w-32 h-32 relative bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      className="object-contain"
                      fill
                      src={item.images[item.selectedColor]}
                      alt="product"
                    />
                  </div>
                  {/* item details  */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="font-xs text-gray-500">
                        Quentity: {item.quantity}
                      </p>
                      <p className="font-xs text-gray-500">
                        Size: {item.selectedSize}
                      </p>
                      <p className="font-xs text-gray-500">
                        Color: {item.selectedColor}
                      </p>
                      <p className="font-sm font-medium">Rs: {item.price}</p>
                    </div>
                  </div>
                </div>
                {/* delete button  */}
                <button
                  onClick={() => removeFromCart(item)}
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please select shipping method
            </p>
          )}
        </div>
        {/* details  */}
        <div className="w-full lg:w-5/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-sm">Cart Details</h2>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">
                Rs $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount 10%</p>
              <p className="font-medium">Rs</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping fee</p>
              <p className="font-medium">Rs</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="font-medium">
                Rs $
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-800 text-white rounded-lg cursor-pointer flex items-center justify-center gap-2 p-2
          hover:bg-gray-900 transition-all duration-300
          "
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
