"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductCard({ product }: { product: ProductType }) {
  const [productType, setProductType] = useState({
    color: product.colors[0],
    size: product.sizes[0],
  });

  const { addToCart } = useCartStore();

  const handleProductTypeChange = (type: "color" | "size", value: string) => {
    setProductType((prev) => ({ ...prev, [type]: value }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productType.size,
      selectedColor: productType.color,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden ">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[productType.color]}
            alt="product image"
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          ></Image>
        </div>
      </Link>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        <div className="flex items-center text-xs gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-300 rounded-md px-2 py-1"
              onChange={(e) => handleProductTypeChange("size", e.target.value)}
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  className={`cursor-pointer border-1 ${
                    productType.color === color
                      ? "border-gray-400"
                      : "border-gray-200"
                  } rounded-full p-[1.2px]`}
                  key={color}
                  onClick={() => handleProductTypeChange("color", color)}
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full "
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* PRICE AND ADD TO CART  */}
        <div className="flex items-center justify-between">
          <p className="font-medium">Rs {product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm 
          cursor-pointer hover:bg-black hover:text-white transition-all duration-300
          flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
