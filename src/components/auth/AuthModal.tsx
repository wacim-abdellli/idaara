'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  X,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ArrowRight,
  LogOut,
  Copy,
  Check,
  Shield,
  Cloud,
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
  const [signingOut, setSigningOut] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  // React 19 safe hydration mount guard without cascading renders
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const handleClose = () => {
    setLoading(false);
    setSigningOut(false);
    setErrorMsg(null);
    setCopied(false);
    onClose();
  };

  // Lock scroll & handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  const handleCopyEmail = () => {
    if (!user?.email) return;
    navigator.clipboard.writeText(user.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      handleClose();
    } catch {
      setSigningOut(false);
    }
  };

  // Resolve user display details
  const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Citoyen';
  const userEmail = user?.email || '';

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md transition-all duration-200"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[420px] rounded-2xl bg-zinc-950 border border-zinc-800 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.85)] p-6 sm:p-7 text-left my-auto overflow-hidden ${
          isRtl ? 'text-right' : 'text-left'
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 ${
            isRtl ? 'left-4' : 'right-4'
          } p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer`}
          aria-label={locale === 'ar' ? 'إغلاق' : 'Fermer'}
        >
          <X className="w-4 h-4" />
        </button>

        {user ? (
          // ── Professional Logged-In Profile View ──
          <div className="space-y-6 pt-1">
            {/* Header: Avatar + User Info */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative">
                {userAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-500/30 p-0.5 bg-zinc-900 shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-emerald-300 font-bold text-xl flex items-center justify-center ring-2 ring-emerald-500/30 shadow-md">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span
                  className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-950 flex items-center justify-center text-zinc-950"
                  title={locale === 'ar' ? 'جلسة نشطة' : locale === 'en' ? 'Active session' : 'Session active'}
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </div>

              <div className="space-y-1 max-w-full">
                <h3 className="text-base font-semibold text-white tracking-tight truncate px-2">
                  {userName}
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400">
                  <span className="truncate max-w-[220px] select-all">{userEmail}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 text-zinc-500 hover:text-zinc-200 rounded transition-colors"
                    title={copied ? 'Copié !' : 'Copier l\'adresse email'}
                  >
                    {copied ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              {/* Status Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {locale === 'ar'
                    ? 'حساب موثق · مزامنة سحابية'
                    : locale === 'derja'
                    ? 'Compte vérifié · Cloud Sync'
                    : locale === 'en'
                    ? 'Verified Account · Cloud Sync'
                    : 'Compte Citoyen · Synchronisé'}
                </span>
              </div>
            </div>

            {/* Cloud Status Card */}
            <div className="rounded-xl bg-zinc-900/70 border border-zinc-850 p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-zinc-300 font-medium">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Cloud className="w-4 h-4" />
                  <span>
                    {locale === 'ar'
                      ? 'مساحة المزامنة'
                      : locale === 'derja'
                      ? 'Cloud Sync'
                      : locale === 'en'
                      ? 'Cloud Storage'
                      : 'Espace Cloud'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">AES-256</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? 'جلساتك مع المساعد الذكي، حسابات التنابر ونماذج الوثائق محفوظة ومتاحة على جميع أجهزتك.'
                  : locale === 'derja'
                  ? 'Kol el conversations mte3ek m3a Idaara Copilot yet7afdhou en temps réel m3a el cloud.'
                  : locale === 'en'
                  ? 'Your Idaara Copilot consultations, fiscal stamp calculations, and drafts are synced across all devices.'
                  : 'Vos consultations Copilot, calculs de timbres et modèles sont synchronisés en continu sur tous vos appareils.'}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <a
                href="/copilot"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/15 cursor-pointer"
              >
                <span>
                  {locale === 'ar'
                    ? 'الانتقال إلى المساعد الذكي Copilot'
                    : locale === 'derja'
                    ? 'Accéder à Idaara Copilot'
                    : locale === 'en'
                    ? 'Open Idaara Copilot'
                    : 'Accéder à Idaara Copilot'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </a>

              <button
                type="button"
                disabled={signingOut}
                onClick={handleSignOut}
                className="w-full py-2 px-4 rounded-xl text-xs font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 border border-zinc-800/80 hover:border-red-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {signingOut ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <LogOut className="w-3.5 h-3.5" />
                )}
                <span>
                  {signingOut
                    ? locale === 'ar'
                      ? 'جارِ الخروج...'
                      : 'Déconnexion...'
                    : locale === 'ar'
                    ? 'تسجيل الخروج'
                    : locale === 'en'
                    ? 'Sign Out'
                    : 'Se déconnecter'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          // ── Professional Sign-In View ──
          <div className="space-y-5 pt-1">
            {/* Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-semibold tracking-wide uppercase">
                <ShieldCheck className="w-3 h-3" />
                <span>
                  {locale === 'ar'
                    ? 'فضاء المواطن المؤمن'
                    : locale === 'derja'
                    ? 'Espace Citoyen Sécurisé'
                    : locale === 'en'
                    ? 'Secure Citizen Space'
                    : 'Espace Citoyen Sécurisé'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                {locale === 'ar'
                  ? 'تسجيل الدخول إلى إضبارة'
                  : locale === 'derja'
                  ? 'Connexion Citoyenne'
                  : locale === 'en'
                  ? 'Sign in to Idaara'
                  : 'Connexion Citoyenne'}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {locale === 'ar'
                  ? 'احفظ استشاراتك مع المساعد الذكي، تابع ملفاتك الإدارية ومزامنتها بأمان.'
                  : locale === 'derja'
                  ? 'Sauvegardez vos démarches, synchronisez vos sessions IA Copilot et accédez à vos dossiers en toute sécurité.'
                  : locale === 'en'
                  ? 'Save your AI chats, sync administrative dossiers and access your tools anywhere.'
                  : 'Sauvegardez vos démarches, synchronisez vos sessions IA Copilot et accédez à vos dossiers en toute sécurité.'}
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span className="text-[11px] leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {!isConfigured && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <span className="text-[11px] leading-relaxed">
                  Supabase non configuré. Vos démarches sont conservées localement dans ce navigateur.
                </span>
              </div>
            )}

            {magicLinkSent ? (
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-center space-y-2.5">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
                <h4 className="text-xs font-bold text-white">
                  {locale === 'ar' ? 'تم إرسال رابط الدخول السريع' : 'Lien magique envoyé'}
                </h4>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  {locale === 'ar'
                    ? `تفقد بريدك الإلكتروني في ${email} لتسجيل الدخول مباشرة بنقرة واحدة.`
                    : `Consultez votre boîte de réception à ${email} pour vous connecter instantanément.`}
                </p>
                <button
                  onClick={() => setMagicLinkSent(false)}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 underline cursor-pointer pt-1 block mx-auto"
                >
                  {locale === 'ar' ? 'استخدام بريد إلكتروني آخر' : 'Utiliser une autre adresse'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Primary Google Auth Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-100 active:scale-[0.99] text-zinc-950 font-semibold text-xs transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                  ) : (
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
                  )}
                  <span>
                    {locale === 'ar'
                      ? 'المتابعة بحساب Google'
                      : locale === 'en'
                      ? 'Continue with Google'
                      : 'Continuer avec Google'}
                  </span>
                </button>

                {/* Clean Minimalist Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-zinc-850 w-full" />
                  <span className="bg-zinc-950 px-2.5 text-[10px] text-zinc-500 uppercase tracking-wider font-mono shrink-0">
                    {locale === 'ar'
                      ? 'أو عبر البريد'
                      : locale === 'en'
                      ? 'or with email'
                      : 'ou par e-mail'}
                  </span>
                  <div className="border-t border-zinc-850 w-full" />
                </div>

                {/* Email Magic Link Form */}
                <form onSubmit={handleEmailSignIn} className="space-y-2">
                  <div className="relative">
                    <Mail
                      className={`w-4 h-4 absolute ${
                        isRtl ? 'right-3' : 'left-3'
                      } top-1/2 -translate-y-1/2 text-zinc-500`}
                    />
                    <input
                      type="email"
                      required
                      placeholder={locale === 'ar' ? 'name@example.tn' : 'nom@exemple.tn'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full ${
                        isRtl ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
                      } py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold transition-all border cursor-pointer active:scale-[0.99] ${
                      email.trim()
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 shadow-xs'
                        : 'bg-zinc-900/50 text-zinc-500 border-zinc-850 disabled:opacity-40'
                    }`}
                  >
                    {loading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-300" />
                    ) : (
                      <span>
                        {locale === 'ar'
                          ? 'إرسال رابط الدخول الفوري'
                          : locale === 'en'
                          ? 'Send Passwordless Link'
                          : 'Envoyer le lien magique'}
                      </span>
                    )}
                  </button>
                </form>

                {/* Minimalist Trust Footer */}
                <div className="pt-2 text-center">
                  <p className="text-[10px] text-zinc-500 flex items-center justify-center gap-1.5">
                    <Shield className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>
                      {locale === 'ar'
                        ? 'حماية مشفرة ومطابقة لمعايير الإدارة الرقمية'
                        : locale === 'en'
                        ? 'Encrypted data protection · Passwordless security'
                        : 'Données protégées · Authentification sécurisée'}
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
