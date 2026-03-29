import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const METHODS = [
  {
    icon: "💳",
    label: "PayPal | Visa | Mastercard",
    ocid: "payment.card.button",
  },
  {
    icon: "🪙",
    label: "CoinX Token",
    ocid: "payment.coinx.button",
  },
  {
    icon: "🖼️",
    label: "NFT",
    ocid: "payment.nft.button",
  },
];

export function PaymentMethods() {
  const { t } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
        {t("payment_title")}
      </h2>
      <div className="flex flex-row gap-4 justify-center flex-wrap">
        {METHODS.map((method) => (
          <button
            key={method.ocid}
            type="button"
            onClick={() => setSelectedMethod(method.label)}
            className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center hover:border-primary/40 transition-colors group max-w-xs w-36"
            data-ocid={method.ocid}
          >
            <span className="text-3xl">{method.icon}</span>
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
              {method.label}
            </span>
          </button>
        ))}
      </div>

      {/* Payment modal */}
      {selectedMethod && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full max-w-none m-0 p-0"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          data-ocid="payment.modal"
        >
          <div className="bg-black border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-3">
              {selectedMethod}
            </h3>
            <p className="text-zinc-400 mb-6">
              Payment integration coming soon / Zahlung wird hier eingebettet
            </p>
            <button
              type="button"
              onClick={() => setSelectedMethod(null)}
              className="w-full py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
              data-ocid="payment.modal.close_button"
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </section>
  );
}
