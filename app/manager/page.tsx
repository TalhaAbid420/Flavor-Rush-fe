"use client";

import { useMemo, useState } from "react";

type OrderStatus = "Pending" | "Baking" | "On the Way" | "Delivered";

type Order = {
  id: string;
  customer: string;
  item: string;
  total: string;
  status: OrderStatus;
};

const tabs: OrderStatus[] = ["Pending", "Baking", "On the Way", "Delivered"];

const mockOrders: Order[] = [
  { id: "ORD-1001", customer: "Ayesha Khan", item: "2x Margherita Pizza", total: "$22.00", status: "Pending" },
  { id: "ORD-1002", customer: "Ali Raza", item: "1x Chicken Crispy Burger", total: "$9.50", status: "Pending" },
  { id: "ORD-1003", customer: "Sara Ahmed", item: "1x Fajita Pizza", total: "$13.00", status: "Baking" },
  { id: "ORD-1004", customer: "Usman Tariq", item: "3x Alfredo Pasta", total: "$33.00", status: "Baking" },
  { id: "ORD-1005", customer: "Zainab Noor", item: "2x Mango Shake", total: "$8.00", status: "On the Way" },
  { id: "ORD-1006", customer: "Hassan Ali", item: "1x BBQ Smash Burger", total: "$10.00", status: "On the Way" },
  { id: "ORD-1007", customer: "Maham Iqbal", item: "1x Cheese Lover Pizza", total: "$12.00", status: "Delivered" },
  { id: "ORD-1008", customer: "Bilal Aslam", item: "2x Fresh Lime", total: "$6.00", status: "Delivered" },
];

export default function ManagerPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("Pending");

  const filteredOrders = useMemo(
    () => mockOrders.filter((order) => order.status === activeTab),
    [activeTab]
  );

  return (
    <main className="min-h-screen bg-zinc-100 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Manager Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-600">Track and manage live orders by status.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition sm:text-base ${
                activeTab === tab
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="bg-yellow-400 text-left text-zinc-900">
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Item</th>
                <th className="px-4 py-3 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-zinc-200">
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.item}</td>
                  <td className="px-4 py-3">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
