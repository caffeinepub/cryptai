import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useActor } from "../hooks/useActor";

export function Newsletter() {
  const { t } = useLanguage();
  const { actor } = useActor();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      if (actor) {
        await actor.addNewsletterSubscriber(email);
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 text-center max-w-2xl mx-auto">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Mail size={24} />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          {t("newsletter_title")}
        </h2>
        <p className="text-muted-foreground mb-6">{t("newsletter_hint")}</p>

        {status === "success" ? (
          <div
            className="flex items-center justify-center gap-2 text-success font-medium"
            data-ocid="newsletter.success_state"
          >
            <CheckCircle2 size={20} />
            <span>{t("subscribe_success")}</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
            data-ocid="newsletter.form"
          >
            <div className="flex-1">
              <Input
                type="email"
                placeholder={t("email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border h-11"
                disabled={status === "loading"}
                data-ocid="newsletter.input"
              />
              {errorMsg && (
                <p
                  className="text-destructive text-xs mt-1 text-left"
                  data-ocid="newsletter.error_state"
                >
                  {errorMsg}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={status === "loading" || !email}
              className="h-11 px-6 bg-primary text-primary-foreground hover:opacity-90 font-semibold"
              data-ocid="newsletter.submit_button"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                t("subscribe")
              )}
            </Button>
          </form>
        )}
        {status === "error" && (
          <p
            className="text-destructive text-sm mt-3"
            data-ocid="newsletter.error_state"
          >
            {t("subscribe_error")}
          </p>
        )}
      </div>
    </section>
  );
}
