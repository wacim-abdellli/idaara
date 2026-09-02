'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Zap,
  ArrowRight,
  LogOut,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocale } from '../../context/LocaleContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { isConfigured, signInWithGoogle, signInWithEmail, user, signOut } = useAuth();
  const { locale, isRtl } = useLocale();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll & handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || user) {
      setLoading(false);
      setErrorMsg(null);
    }
  }, [isOpen, user]);

  if (!isOpen || !mounted) return null;

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

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl transition-all duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-zinc-950/95 border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-left my-auto overflow-hidden ${
          isRtl ? 'text-right' : 'text-left'
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Subtle Ambient Emerald Glow Behind Modal */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-36 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 ${
            isRtl ? 'left-5' : 'right-5'
          } p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 transition-all cursor-pointer`}
          aria-label={locale === 'ar' ? 'إغلاق' : 'Fermer'}
        >
          <X className="w-4 h-4" />
        </button>

        {user ? (
          // ── Signed-in Profile State ──
          <div className="space-y-6 text-center pt-2">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/25 to-teal-500/15 text-emerald-300 font-bold text-2xl flex items-center justify-center border border-emerald-500/40 shadow-lg shadow-emerald-950/40">
                {user.email ? user.email.charAt(0).toUpperCase() : 'I'}
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-zinc-950 flex items-center justify-center text-zinc-950">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {locale === 'ar'
                    ? 'الحساب مفعل والمتصل'
                    : locale === 'derja'
                    ? 'Compte connecte w mrigel'
                    : locale === 'en'
                    ? 'Active Cloud Account'
                    : 'Compte Citoyen Connecté'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-[280px] mx-auto font-mono">
                {user.email}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 text-xs text-zinc-300 text-left space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  {locale === 'ar'
                    ? 'المزامنة السحابية مفعلة'
                    : locale === 'derja'
                    ? 'Synchronisation mrigla'
                    : locale === 'en'
                    ? 'Cloud Sync Active'
                    : 'Synchronisation Cloud Active'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? 'محادثاتك مع المساعد الذكي، وثائقك الإدارية وتفضيلاتك محفوظة بأمان ومتاحة على جميع أجهزتك.'
                  : locale === 'derja'
                  ? 'Kol el conversations mte3ek m3a Idaara AI Copilot yet7afdhou en temps réel m3a el cloud.'
                  : locale === 'en'
                  ? 'Your Idaara Copilot conversations, dossiers and legal tools are securely synced across all devices.'
                  : 'Vos sessions et consultations Idaara Copilot sont synchronisées en continu sur tous vos appareils.'}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href="/copilot"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/60 cursor-pointer"
              >
                <span>
                  {locale === 'ar'
                    ? 'فتح المساعد الذكي Copilot'
                    : locale === 'derja'
                    ? '7el Idaara Copilot'
                    : locale === 'en'
                    ? 'Open Idaara Copilot'
                    : 'Accéder à Idaara Copilot'}
                </span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>
                  {locale === 'ar'
                    ? 'تسجيل الخروج'
                    : locale === 'derja'
                    ? 'Deconnecti'
                    : locale === 'en'
                    ? 'Sign Out'
                    : 'Se déconnecter'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          // ── Sign-in Form ──
          <div className="space-y-5 pt-1">
            {/* Header / Brand */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {locale === 'ar'
                    ? 'المزامنة السحابية الذكية'
                    : locale === 'derja'
                    ? 'Idaara Cloud Sync'
                    : 'Idaara Cloud Sync'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {locale === 'ar'
                  ? 'تسجيل الدخول إلى إضبارة'
                  : locale === 'derja'
                  ? 'Connecti 3la Idaara'
                  : locale === 'en'
                  ? 'Sign in to Idaara'
                  : 'Connexion Citoyenne'}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? 'احفظ استشاراتك مع المساعد الذكي وتابع ملفاتك الإدارية من أي هاتف أو حاسوب.'
                  : locale === 'derja'
                  ? 'A7fedh el conversations mte3ek w taba3 awra9ek men ay talifoun walla pc.'
                  : locale === 'en'
                  ? 'Save your AI chats, sync administrative dossiers and access your tools anywhere.'
                  : 'Sauvegardez vos démarches, synchronisez vos sessions IA Copilot et accédez à vos dossiers en toute sécurité.'}
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-3 gap-2 py-1">
              <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col items-center justify-center text-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-semibold text-zinc-300">
                  {locale === 'ar' ? 'مزامنة فورية' : 'Sync instantané'}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col items-center justify-center text-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[10px] font-semibold text-zinc-300">
                  {locale === 'ar' ? 'حماية مشفرة' : 'Chiffré & privé'}
                </span>
              </div>

              <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col items-center justify-center text-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-semibold text-zinc-300">
                  {locale === 'ar' ? 'مجاني 100%' : '100% Gratuit'}
                </span>
              </div>
            </div>

            {!isConfigured && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <strong>Mode Démo / Local:</strong> Supabase non configuré. Vos sessions sont sauvegardées localement sur ce navigateur.
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
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2.5">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
                <h4 className="text-sm font-bold text-white">
                  {locale === 'ar' ? 'تم إرسال رابط الدخول السريع !' : 'Lien magique envoyé !'}
                </h4>
                <p className="text-xs text-zinc-300">
                  {locale === 'ar'
                    ? `تفقد بريدك الإلكتروني في ${email} لتسجيل الدخول مباشرة بنقرة واحدة.`
                    : `Consultez votre boîte de réception à ${email} pour vous connecter instantanément sans mot de passe.`}
                </p>
                <button
                  onClick={() => setMagicLinkSent(false)}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 underline cursor-pointer pt-1 block mx-auto"
                >
                  {locale === 'ar' ? 'استخدام بريد إلكتروني آخر' : 'Utiliser une autre adresse'}
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-zinc-100 active:scale-[0.99] text-zinc-950 font-bold text-xs transition-all shadow-md hover:shadow-lg hover:shadow-white/10 disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                  <span>
                    {locale === 'ar'
                      ? 'المتابعة بحساب Google'
                      : locale === 'derja'
                      ? 'Kemmel b compte Google'
                      : locale === 'en'
                      ? 'Continue with Google'
                      : 'Continuer avec Google'}
                  </span>
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center py-1">
                  <div className="border-t border-zinc-850 w-full" />
                  <span className="bg-zinc-950 px-3 text-[10px] text-zinc-500 uppercase tracking-wider font-mono shrink-0">
                    {locale === 'ar'
                      ? 'أو برابط مباشر'
                      : locale === 'derja'
                      ? 'walla bel email'
                      : locale === 'en'
                      ? 'or with email link'
                      : 'ou par lien magique'}
                  </span>
                  <div className="border-t border-zinc-850 w-full" />
                </div>

                {/* Magic Link Email Form */}
                <form onSubmit={handleEmailSignIn} className="space-y-2.5">
                  <div className="relative">
                    <Mail
                      className={`w-4 h-4 absolute ${
                        isRtl ? 'right-3.5' : 'left-3.5'
                      } top-1/2 -translate-y-1/2 text-zinc-500`}
                    />
                    <input
                      type="email"
                      required
                      placeholder="votre.email@domaine.tn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full ${
                        isRtl ? 'pr-10 pl-3.5 text-right' : 'pl-10 pr-3.5 text-left'
                      } py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/40 transition-all`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all border cursor-pointer active:scale-[0.99] ${
                      email.trim()
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500/50 shadow-md shadow-emerald-950/60'
                        : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:bg-zinc-850 disabled:opacity-50'
                    }`}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <span>
                        {locale === 'ar'
                          ? 'إرسال رابط الدخول الفوري'
                          : locale === 'derja'
                          ? 'Ab3eth lien magique (men ghir mot de passe)'
                          : locale === 'en'
                          ? 'Send Passwordless Magic Link'
                          : 'Envoyer le lien magique (sans mot de passe)'}
                      </span>
                    )}
                  </button>
                </form>

                {/* Privacy Footer */}
                <div className="text-center pt-2">
                  <p className="text-[10px] text-zinc-500 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>
                      {locale === 'ar'
                        ? 'بياناتك الشخصية مشفرة ومحمية بالكامل · بدون كلمة سر'
                        : locale === 'derja'
                        ? 'Awra9ek m7amya w chiffrée · men ghir mot de passe'
                        : locale === 'en'
                        ? 'Private & zero-storage encryption · No password needed'
                        : 'Données chiffrées & protégées · Aucun mot de passe requis'}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
