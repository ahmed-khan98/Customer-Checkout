import ErrorState from "./ErrorState";
import PaymentDetailPayPal from "./PaymentDetailPayPal";
import PaidPaymentLink from "./PaidPaymentLink";
import PaymentLinkDisabled from "./PaymentLinkDisabled";
import PaymentOrderSummary from "./PaymentOrderSummary";
import PaymentPagHeader from "./PaymentPagHeader";

async function getPaymentData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}paymentlink/${id}`,
    {
      cache: "no-store", // Taake hamesha fresh data aaye
    },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data;
}

const PaymentDetail = async ({ id }) => {

  const paymentData = await getPaymentData(id);

  if (!paymentData)
    return <ErrorState message={error ? "Link Expired" : "Not Found"} />;

  if (paymentData?.paymentStatus === "paid")
    return (
      <PaidPaymentLink
        currency={paymentData?.currency}
        amount={paymentData?.amount}
        name={paymentData?.name}
        email={paymentData?.email}
        brand={paymentData?.brandId?.name}
      />
    );

  if (paymentData?.isActive === false)
    return <PaymentLinkDisabled paymentData={paymentData} />;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-slate-900">
      {/* Top Brand Bar */}
      <PaymentPagHeader image={paymentData?.brandId?.image} />

      <main className="max-w-5xl mx-auto sm:px-2 px-4  overflow-visible">
        <div className="grid lg:grid-cols-12 gap-8 items-start relative h-[calc(100vh-80px)]">
          {/* LEFT: Invoice Summary */}
          <div className="lg:col-span-7 lg:h-full lg:overflow-y-auto space-y-4">
            <PaymentOrderSummary
              name={paymentData?.name}
              email={paymentData?.email}
              brand={paymentData?.brandId?.name}
              currency={paymentData?.currency}
              amount={paymentData?.amount}
              service={paymentData?.service}
            />

            <div className="block lg:hidden">
              <PaymentDetailPayPal
                position="mobile"
                id={paymentData?._id}
                paypalClientId={paymentData?.paypalClientId}
              />
            </div>
          </div>
          {/* RIGHT: Payment Options */}
          <aside className="hidden lg:flex lg:col-span-5 flex-col sticky top-6 h-[calc(100vh-100px)]">
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar cursor-pointer">
              <PaymentDetailPayPal
                position="desktop"
                id={paymentData?._id}
                paypalClientId={paymentData?.paypalClientId}
              />
              {/* <div className="h-10"></div> */}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PaymentDetail;
