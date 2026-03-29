import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { DEV_RESET_CODE } from "../config/app.config";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useReadingTimer } from "../contexts/ReadingTimerContext";

interface LoginRegisterModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export function LoginRegisterModal({
  open,
  onClose,
  defaultTab = "login",
}: LoginRegisterModalProps) {
  const { login, register } = useAuth();
  const { t } = useLanguage();
  const { resetTimer } = useReadingTimer();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const result = login(loginUsername.trim(), loginPassword);
    if (result.success) {
      onClose();
    } else {
      setLoginError(t((result.error as any) || "invalid_credentials"));
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");

    // === ENTWICKLER-MODUS ===
    // Wenn Username, Password und Confirm alle gleich DEV_RESET_CODE sind,
    // wird der Free-Timer zurückgesetzt (kein echter Account wird angelegt).
    if (
      regUsername.trim() === DEV_RESET_CODE &&
      regPassword === DEV_RESET_CODE &&
      regConfirm === DEV_RESET_CODE
    ) {
      resetTimer();
      setRegSuccess("🛠️ [DEV] Timer zurückgesetzt.");
      setRegUsername("");
      setRegPassword("");
      setRegConfirm("");
      setRegEmail("");
      return;
    }

    if (regPassword !== regConfirm) {
      setRegError(
        t("passwords_dont_match") || "Passwörter stimmen nicht überein.",
      );
      return;
    }

    // Einfache E-Mail-Validierung
    if (!regEmail.includes("@")) {
      setRegError("Bitte eine gültige E-Mail-Adresse eingeben.");
      return;
    }

    const result = register(regUsername.trim(), regPassword, regEmail.trim());
    if (result.success) {
      // E-Mail-Bestätigung: Hinweis anzeigen (Versand nicht aktiv, bis Plan-Upgrade)
      setRegSuccess(
        `✅ Registrierung erfolgreich! Sobald E-Mail aktiviert ist, erhältst du eine Bestätigungsmail an ${regEmail}.`,
      );
      setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      setRegError(t((result.error as any) || "username_taken"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="sm:max-w-md dark:bg-zinc-900 bg-white dark:border-zinc-700 border-zinc-200"
        data-ocid="auth.modal"
      >
        <DialogHeader>
          <DialogTitle className="dark:text-white text-zinc-900">
            {t("login_register")}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={defaultTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2 dark:bg-zinc-800 bg-zinc-100">
            <TabsTrigger
              value="login"
              className="dark:text-white text-zinc-800 dark:data-[state=active]:bg-zinc-700 data-[state=active]:bg-zinc-200"
              data-ocid="auth.login.tab"
            >
              {t("login")}
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="dark:text-white text-zinc-800 dark:data-[state=active]:bg-zinc-700 data-[state=active]:bg-zinc-200"
              data-ocid="auth.register.tab"
            >
              {t("register")}
            </TabsTrigger>
          </TabsList>

          {/* Login */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="login-user"
                  className="dark:text-white text-zinc-800"
                >
                  {t("username")}
                </Label>
                <Input
                  id="login-user"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white bg-zinc-50 border-zinc-300 text-zinc-800"
                  data-ocid="auth.login.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="login-pass"
                  className="dark:text-white text-zinc-800"
                >
                  {t("password")}
                </Label>
                <Input
                  id="login-pass"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white bg-zinc-50 border-zinc-300 text-zinc-800"
                  data-ocid="auth.login_password.input"
                />
              </div>
              {loginError && (
                <p
                  className="text-sm text-destructive"
                  data-ocid="auth.login.error_state"
                >
                  {loginError}
                </p>
              )}
              <Button
                type="submit"
                className="w-full rounded-full"
                data-ocid="auth.login.submit_button"
              >
                {t("login")}
              </Button>
            </form>
          </TabsContent>

          {/* Register */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-user"
                  className="dark:text-white text-zinc-800"
                >
                  {t("username")}
                </Label>
                <Input
                  id="reg-user"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white bg-zinc-50 border-zinc-300 text-zinc-800"
                  data-ocid="auth.register.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-email"
                  className="dark:text-white text-zinc-800"
                >
                  E-Mail
                </Label>
                <Input
                  id="reg-email"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="deine@email.com"
                  className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-500 bg-zinc-50 border-zinc-300 text-zinc-800 placeholder:text-zinc-400"
                  data-ocid="auth.register_email.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-pass"
                  className="dark:text-white text-zinc-800"
                >
                  {t("password")}
                </Label>
                <Input
                  id="reg-pass"
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white bg-zinc-50 border-zinc-300 text-zinc-800"
                  data-ocid="auth.register_password.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-confirm"
                  className="dark:text-white text-zinc-800"
                >
                  {t("confirm_password")}
                </Label>
                <Input
                  id="reg-confirm"
                  type="password"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white bg-zinc-50 border-zinc-300 text-zinc-800"
                  data-ocid="auth.register_confirm.input"
                />
              </div>
              {regError && (
                <p
                  className="text-sm text-destructive"
                  data-ocid="auth.register.error_state"
                >
                  {regError}
                </p>
              )}
              {regSuccess && (
                <p
                  className="text-sm text-green-400"
                  data-ocid="auth.register.success_state"
                >
                  {regSuccess}
                </p>
              )}
              <Button
                type="submit"
                className="w-full rounded-full"
                data-ocid="auth.register.submit_button"
              >
                {t("register")}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
