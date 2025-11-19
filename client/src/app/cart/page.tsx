import { Suspense } from "react";
import CartView from "./CartView";

export default function CartPage() {
  return (
    <Suspense
      fallback={<div className="text-center mt-12">Loading cart...</div>}
    >
      <CartView />
    </Suspense>
  );
}
