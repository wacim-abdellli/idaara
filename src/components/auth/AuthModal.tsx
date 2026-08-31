'use client';

import React, { useState } from 'react';
import { X, Mail, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocale } from '../../context/LocaleContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { isConfigured, signInWithGoogle, signInWithEmail, user, signOut } = useAuth();
  const { locale } = useLocale();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setErrorMsg(error);
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    const { error } = await signInWithEmail(email.trim());
    setLoading(false);
    if (error) {
      setErrorMsg(error);
    } else {
      setMagicLinkSent(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-7 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          // Signed-in State
          <div className="space-y-5 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {locale === 'ar' ? 'أنت مسجل الدخول' : locale === 'derja' ? 'Rak connecte' : 'Connecté à Idaara Cloud'}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">{user.email}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300 text-left space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'المزامنة السحابية مفعلة' : 'Synchronisation Cloud Active'}</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? 'يتم حفظ محادثات واستشارات Idaara Copilot الخاصة بك تلقائيًا وبأمان في حسابك.'
                  : 'Vos sessions et consultations Idaara Copilot sont synchronisées en continu sur vos appareils.'}
              </p>
            </div>

            <button
              type="button"
              onClick={async () => {
                await signOut();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-red-500/20 hover:text-red-300 text-zinc-300 border border-zinc-700 transition-all cursor-pointer"
            >
              {locale === 'ar' ? 'تسجيل الخروج' : locale === 'derja' ? 'Deconnecti' : 'Se déconnecter'}
            </button>
          </div>
        ) : (
          // Sign-in Form
          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Sparkles className="w-3 h-3" />
                <span>Idaara Cloud Account</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {locale === 'ar' ? 'تسجيل الدخول إلى إضبارة' : locale === 'derja' ? 'Connecti 3la Idaara' : 'Connexion Citoyenne'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? 'احفظ محادثاتك مع المساعد الذكي وتابع وثائقك الإدارية من أي جهاز.'
                  : 'Sauvegardez vos démarches, synchronisez vos sessions IA Copilot et accédez à vos dossiers en toute sécurité.'}
              </p>
            </div>

            {!isConfigured && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <strong>Mode Démo / Local:</strong> Supabase Auth non configuré dans .env.local. Vos sessions sont sauvegardées localement sur ce navigateur.
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-[11px]">{errorMsg}</span>
              </div>
            )}

            {magicLinkSent ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-7 h-7 mx-auto text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Lien magique envoyé !</h4>
                <p className="text-xs text-zinc-400">
                  Consultez votre boîte de réception à <strong className="text-zinc-200">{email}</strong> pour vous connecter sans mot de passe.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-900 font-semibold text-xs transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continuer avec Google</span>
                </button>

                <div className="relative flex items-center justify-center py-2">
                  <div className="border-t border-zinc-800 w-full" />
                  <span className="bg-zinc-900 px-3 text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                    ou par email
                  </span>
                  <div className="border-t border-zinc-800 w-full" />
                </div>

                {/* Magic Link Email Form */}
                <form onSubmit={handleEmailSignIn} className="space-y-2.5">
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="votre.email@domaine.tn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-all border border-zinc-700 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    ) : (
                      <span>Envoyer un lien magique (sans mot de passe)</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
