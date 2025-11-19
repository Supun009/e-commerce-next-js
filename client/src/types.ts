import { z } from "zod";

export type ProductType = {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type CartType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  // state: z.string().min(1, "State is required"),
  // zip: z.string().min(1, "Zip is required"),
  phone: z
    .string()
    .min(7, "Phone is required")
    .max(10, "Phone is required")
    .regex(/^[0-9]+$/, "Phone can only contain numbers"),
});

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z
    .string()
    .min(16, "Card Number is required!")
    .max(16, "Card Number is required!"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format!"
    ),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

export type CartStoreStateType = {
  cart: CartType[];
  hasHydrated: boolean;
};

export type CartStoreActionType = {
  addToCart: (item: CartType) => void;
  addToCartFromProductPage: (item: CartType) => void;
  removeFromCart: (item: CartType) => void;
  clearCart: () => void;
};

export type ShippingFormType = z.infer<typeof shippingFormSchema>;
export type PaymentFormType = z.infer<typeof paymentFormSchema>;
