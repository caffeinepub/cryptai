import { useLanguage } from "../contexts/LanguageContext";

interface RegisterPromptProps {
  onRegister: () => void;
  onLogin: () => void;
}

export function RegisterPrompt({ onRegister, onLogin }: RegisterPromptProps) {
  const { t } = useLanguage();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      data-ocid="register_prompt.modal"
    >
      <div className="mx-4 w-full max-w-md rounded-2xl border dark:border-zinc-700 border-zinc-200 dark:bg-zinc-900 bg-white p-8 text-center shadow-2xl">
        <div className="mb-4 text-5xl">🔒</div>
        <h2 className="mb-3 text-2xl font-bold text-foreground">
          {t("register_prompt_title")}
        </h2>
        <p className="mb-8 text-muted-foreground leading-relaxed">
          {t("register_prompt_desc")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onRegister}
            className="flex-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            data-ocid="register_prompt.register_button"
          >
            {t("register")}
          </button>
          <button
            type="button"
            onClick={onLogin}
            className="flex-1 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            data-ocid="register_prompt.login_button"
          >
            {t("login")}
          </button>
        </div>
      </div>
    </div>
  );
}
