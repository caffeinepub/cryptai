import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ALL_LANGUAGES, useLanguage } from "../contexts/LanguageContext";

interface AccountSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function AccountSettingsModal({
  open,
  onClose,
}: AccountSettingsModalProps) {
  const { currentUser, updatePreferredLanguage, updatePassword } = useAuth();
  const { t, setLanguage, currentLanguage } = useLanguage();

  const [selectedLang, setSelectedLang] = useState(currentLanguage);
  const [langSaved, setLangSaved] = useState(false);

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);

  const handleSaveLang = () => {
    setLanguage(selectedLang as any);
    updatePreferredLanguage(selectedLang);
    setLangSaved(true);
    setTimeout(() => setLangSaved(false), 2000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess(false);
    if (newPwd !== confirmPwd) {
      setPwdError(t("passwords_dont_match"));
      return;
    }
    const result = updatePassword(oldPwd, newPwd);
    if (result.success) {
      setPwdSuccess(true);
      setOldPwd("");
      setNewPwd("");
      setConfirmPwd("");
    } else {
      setPwdError(t((result.error as any) || "invalid_credentials"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="sm:max-w-md dark:bg-zinc-900 bg-white dark:border-zinc-700 border-zinc-200"
        data-ocid="account_settings.modal"
      >
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {t("account_settings")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Username display */}
          <div>
            <p className="text-sm text-muted-foreground">{t("username")}</p>
            <p className="font-semibold text-foreground mt-1">
              {currentUser?.username}
            </p>
          </div>

          <Separator />

          {/* Language preference */}
          <div className="space-y-3">
            <Label>{t("account_settings")} — Language</Label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full rounded-md border border-border dark:bg-zinc-800 bg-zinc-50 px-3 py-2 text-sm text-foreground"
              data-ocid="account_settings.language.select"
            >
              {ALL_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-card">
                  {lang.label}
                </option>
              ))}
            </select>
            <Button
              type="button"
              size="sm"
              onClick={handleSaveLang}
              className="rounded-full"
              data-ocid="account_settings.language.save_button"
            >
              {langSaved ? "✓ Saved" : "Save"}
            </Button>
          </div>

          <Separator />

          {/* Change password */}
          <form onSubmit={handleChangePassword} className="space-y-3">
            <Label>{t("change_password")}</Label>
            <Input
              type="password"
              placeholder={t("old_password")}
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              required
              data-ocid="account_settings.old_password.input"
            />
            <Input
              type="password"
              placeholder={t("new_password")}
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              required
              data-ocid="account_settings.new_password.input"
            />
            <Input
              type="password"
              placeholder={t("confirm_password")}
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              required
              data-ocid="account_settings.confirm_password.input"
            />
            {pwdError && (
              <p
                className="text-sm text-destructive"
                data-ocid="account_settings.password.error_state"
              >
                {pwdError}
              </p>
            )}
            {pwdSuccess && (
              <p
                className="text-sm text-success"
                data-ocid="account_settings.password.success_state"
              >
                ✓ Password changed
              </p>
            )}
            <Button
              type="submit"
              size="sm"
              className="rounded-full"
              data-ocid="account_settings.change_password.submit_button"
            >
              {t("change_password")}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
