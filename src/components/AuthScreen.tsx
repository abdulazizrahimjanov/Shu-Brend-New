import React, { useState } from 'react';
import { Globe, Sun, Moon, Store as StoreIcon, Loader2, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useT } from '../i18n';
import { PWAInstallButton } from './PWAInstallButton';

export const AuthScreen: React.FC<{ onOpenCatalog?: () => void }> = ({ onOpenCatalog }) => {
  const loginWithGoogle = useAppStore((s) => s.loginWithGoogle);
  const cloudError = useAppStore((s) => s.cloudError);
  const clearCloudError = useAppStore((s) => s.clearCloudError);
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const t = useT();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    if (submitting) return;
    setError('');
    clearCloudError();
    setSubmitting(true);
    try {
      const ok = await loginWithGoogle();
      if (!ok) {
        const latestCloudError = useAppStore.getState().cloudError;
        setError(latestCloudError || t.auth.invalidCredentials);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between p-4 md:p-8">
      <div className="flex items-center justify-between max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/IMG_20261007_140535_653_64e97dff_64e97dff.jpg"
            alt="SHU BREND OMBOR"
            className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-800 shadow-xs"
          />
          <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            SHU BREND OMBOR
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenCatalog && (
            <button
              type="button"
              onClick={onOpenCatalog}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap"
            >
              <StoreIcon className="w-3.5 h-3.5" />
              <span>{t.nav.storefront}</span>
            </button>
          )}
          <PWAInstallButton />
          <button
            type="button"
            onClick={() => setLanguage(language === 'uz' ? 'ru' : 'uz')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language.toUpperCase()}</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto my-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <img
              src="/assets/aistudio/IMG_20261007_140535_653_64e97dff_64e97dff.jpg"
              alt="SHU BREND OMBOR"
              className="w-16 h-16 rounded-full mx-auto object-cover border border-slate-200 dark:border-slate-800 shadow-xs"
            />
            <p className="text-xs font-medium text-teal-700 dark:text-teal-400 pt-1">
              {language === 'uz' ? 'Chakana savdo va ombor platformasi' : 'Платформа розничной торговли и склада'}
            </p>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t.auth.loginTitle}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.auth.loginSubtitle}</p>
          </div>

          <div className="space-y-4">
            {(error || (cloudError && cloudError !== error)) && (
              <p className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-lg px-3 py-2.5">
                {error || cloudError}
              </p>
            )}

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={submitting}
              className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60 text-slate-900 dark:text-white text-sm font-semibold flex items-center justify-center gap-3 shadow-xs transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-teal-700" />
                  <span>{t.auth.signingInWithGoogle}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
                    />
                  </svg>
                  <span>{t.auth.signInWithGoogle}</span>
                </>
              )}
            </button>

            <div className="flex items-start gap-2 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 px-3.5 py-2.5 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>{t.auth.cloudSyncHint}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 dark:text-slate-600">
        SHU BREND OMBOR · {language === 'uz' ? "O'zbekiston chakana savdo tizimi" : 'Система розничной торговли'}
      </div>
    </div>
  );
};
