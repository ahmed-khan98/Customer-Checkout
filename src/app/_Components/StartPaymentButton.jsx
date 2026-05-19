"use client";

import { useRouter } from 'next/navigation';

export default function StartPaymentButton({ paymentId }) {
  const router = useRouter();

  const handleClick = () => {
    if (!paymentId) return;
    router.push(`/pay/${paymentId}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!paymentId}
      className="rounded-md bg-sky-600 px-5 py-3 text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {paymentId ? 'Open Payment Link' : 'Payment ID not available'}
    </button>
  );
}
