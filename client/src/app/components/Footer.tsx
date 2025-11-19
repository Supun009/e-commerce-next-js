import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="mt-16 flex flex-col gap-8 items-center md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col items-center md:items-start gap-4 ">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={36} height={36} />
          <p className="hidden md:block text-md font-medium tracking-wider text-white">
            Olee Clothing
          </p>
        </Link>
        <p className="text-sm text-gray-400">© 2025 Olee Clothing</p>
        <p className="text-sm text-gray-400">All rights reserved</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">Homepage</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Terms of Services</Link>
        <Link href="/">Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Shop</p>
        <Link href="/products">All Products</Link>
        <Link href="/products?category=men">Men</Link>
        <Link href="/products?category=women">Women</Link>
        <Link href="/products?category=sale">Sale</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Support</p>
        <Link href="/support">Help Center</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/shipping-returns">Shipping &amp; Returns</Link>
        <a
          href="mailto:support@oleeclothing.com"
          className="text-sm text-gray-400"
        >
          support@oleeclothing.com
        </a>
        <a href="tel:+1234567890" className="text-sm text-gray-400">
          +1 (234) 567-890
        </a>
      </div>
    </div>
  );
}
