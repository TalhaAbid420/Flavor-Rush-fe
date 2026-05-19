"use client";

import Link from "next/link";

const cartItems = [
  { name: "Margherita Pizza", quantity: 2, price: "$18.00", status: "Ready" },
  { name: "Classic Beef Burger", quantity: 1, price: "$9.50", status: "Cooking" },
  { name: "Alfredo Pasta", quantity: 1, price: "$11.00", status: "Ready" },
  { name: "Mango Shake", quantity: 3, price: "$12.00", status: "Pending" },
];

export default function CartPage() {
  return (
    <main className="min-h-screen bg-zinc-100 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Your Cart</h1>
          <div className="flex gap-2">
            <Link
              href="/tracking"
              className="rounded-lg bg-zinc-900 px-4 py-2 font-semibold text-white transition hover:bg-zinc-800"
            >
              Track Order
            </Link>
            <Link
              href="/"
              className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-zinc-900 transition hover:bg-yellow-300"
            >
              Back to Menu
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-left text-white">
                <th className="px-4 py-3 font-semibold">Item Name</th>
                <th className="px-4 py-3 font-semibold">Quantity</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.name} className="border-b border-zinc-200">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">{item.price}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-zinc-800">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
