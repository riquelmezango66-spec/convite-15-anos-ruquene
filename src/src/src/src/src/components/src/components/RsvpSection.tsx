import React, { useState, useEffect } from "react";
import {
  Send,
  MessageCircle,
  User,
  Phone,
  CheckCircle2,
  Copy,
  Settings,
  Heart,
  Sparkles,
  XCircle,
} from "lucide-react";
import {
  RsvpData,
  createWhatsAppUrl,
  formatWhatsAppMessage,
  saveRsvpLocal,
  getHostWhatsAppNumber,
  setHostWhatsAppNumber,
} from "../utils/whatsapp";
import { copyToClipboard } from "../utils/clipboard";

interface RsvpSectionProps {
  onRsvpSubmitted?: () => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onRsvpSubmitted }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [hostPhoneInput, setHostPhoneInput] = useState("");
  const [currentHostPhone, setCurrentHostPhone] = useState("");
  const [configError, setConfigError] = useState("");

  useEffect(() => {
    const savedHost = getHostWhatsAppNumber();
    setCurrentHostPhone(savedHost);
    setHostPhoneInput(savedHost);
  }, []);

  const handleSaveHostPhone = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigError("");
    const clean = hostPhoneInput.replace(/\D/g, "");
    if (clean.length < 8) {
      setConfigError("Por favor, digite um número de WhatsApp válido.");
      return;
    }
    setHostWhatsAppNumber(clean);
    setCurrentHostPhone(clean);
    setShowConfigModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Por favor, informe seu nome completo.");
      return;
    }

    const rsvpRecord: RsvpData = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      attending,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    saveRsvpLocal(rsvpRecord);
    if (onRsvpSubmitted) {
      onRsvpSubmitted();
    }

    const waUrl = createWhatsAppUrl(rsvpRecord, currentHostPhone);
    setIsSuccess(true);

    try {
      const link = document.createElement("a");
      link.href = waUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.warn("Auto-open blocked", e);
    }
  };

  const handleCopyText = async () => {
    if (!fullName.trim()) {
      setErrorMsg("Digite pelo menos seu nome para gerar o texto da mensagem.");
      return;
    }
    const rsvpRecord: RsvpData = {
      id: "preview",
      fullName: fullName.trim(),
      phone: phone.trim(),
      attending,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };
    const formatted = formatWhatsAppMessage(rsvpRecord);
    const success = await copyToClipboard(formatted);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section id="confirmacao-presenca" className="relative w-full max-w-xl mx-auto my-12 px-4 sm:px-6 scroll-mt-16">
      <div className="relative rounded-2xl bg-[#1f2e26]/95 border border-[#dfba73]/40 p-6 sm:p-9 shadow-2xl backdrop-blur-md overflow-hidden">
        <div className="relative z-10 text-center mb-7">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ecd38c]" />
            <span className="font-sans-clean text-xs font-semibold text-[#ecd38c] uppercase tracking-[0.3em]">
              RSVP • Convite Pessoal
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#ecd38c]" />
          </div>

          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#fcf9f2]">
            Confirmação de Presença
          </h2>

          <p className="font-sans-clean text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
            Sua presença é muito especial! Por favor, confirme até o dia{" "}
            <span className="text-[#ecd38c] font-medium">05 de Novembro</span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300 mt-3">
            <span className="inline-flex items-center gap-1.5 text-[#25D366] font-medium">
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp: +244 955 654 264</span>
            </span>
            <span className="text-slate-500">·</span>
            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center gap-1 text-[#ecd38c] hover:underline cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Alterar Número</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-lg bg-red-900/40 border border-red-500/50 text-red-200 text-xs text-center">
            {errorMsg}
          </div>
        )}

        {isSuccess ? (
          <div className="relative z-10 p-6 rounded-xl bg-[#283d32] border border-[#dfba73]/60 text-center">
            <CheckCircle2 className="w-12 h-12 text-[#ecd38c] mx-auto mb-3" />
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#fcf9f2] font-semibold">
              Obrigado pela sua resposta, {fullName}!
            </h3>
            <p className="font-sans-clean text-sm text-slate-200 mt-2 leading-relaxed">
              {attending === "yes"
                ? "Estamos muito felizes e ansiosos para comemorar os 15 anos da Ruquene Zango com você!"
                : "Agradecemos o carinho da sua mensagem para a Ruquene!"}
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={createWhatsAppUrl(
                  { id: "retry", fullName, phone, attending, message, timestamp: new Date().toISOString() },
                  currentHostPhone
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-sm transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir Mensagem no WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-500 hover:border-slate-300 text-slate-300 text-xs font-medium transition-colors"
              >
                Editar Resposta
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#ecd38c] uppercase tracking-wider mb-2">
                Você poderá comparecer? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    attending === "yes"
                      ? "bg-[#2e4739] border-[#dfba73] text-[#fcf9f2] shadow-md ring-1 ring-[#dfba73]"
                      : "bg-[#18241e]/70 border-slate-700/80 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <Sparkles className={`w-4 h-4 ${attending === "yes" ? "text-[#dfba73]" : "text-slate-500"}`} />
                  <span>Sim, estarei presente! ✨</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    attending === "no"
                      ? "bg-[#332225] border-red-400 text-red-100 shadow-md ring-1 ring-red-400"
                      : "bg-[#18241e]/70 border-slate-700/80 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <XCircle className={`w-4 h-4 ${attending === "no" ? "text-red-300" : "text-slate-500"}`} />
                  <span>Infelizmente não poderei 🕊️</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#ecd38c] uppercase tracking-wider mb-1.5">
                Seu Nome Completo *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Ex: Teresa da Costa"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#15201a] border border-[#dfba73]/30 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-[#dfba73]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#ecd38c] uppercase tracking-wider mb-1.5">
                Seu WhatsApp ou Telefone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  placeholder="Ex: +244 9XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#15201a] border border-[#dfba73]/30 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-[#dfba73]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#ecd38c] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-300" />
                <span>Mensagem de Carinho para Ruquene (Opcional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Deixe uma mensagem especial de felicitações e carinho para a aniversariante..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#15201a] border border-[#dfba73]/30 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#dfba73] resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f7a6e] text-white font-semibold text-sm sm:text-base shadow-xl transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Confirmar Presença no WhatsApp</span>
                <Send className="w-4 h-4 ml-1 opacity-90" />
              </button>

              <button
                type="button"
                onClick={handleCopyText}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#dfba73]/50 hover:bg-[#dfba73]/10 text-[#ecd38c] text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Texto</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#1d2a23] border border-[#dfba73] p-6 shadow-2xl">
            <h3 className="font-serif-luxury text-xl text-[#fcf9f2] font-semibold mb-2">
              Configurar WhatsApp da Anfitriã
            </h3>
            <p className="font-sans-clean text-xs text-slate-300 leading-relaxed mb-4">
              Informe o número de WhatsApp de destino (atualmente: +244 955 654 264).
            </p>

            <form onSubmit={handleSaveHostPhone} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#ecd38c] mb-1">
                  Número de WhatsApp:
                </label>
                <input
                  type="text"
                  value={hostPhoneInput}
                  onChange={(e) => setHostPhoneInput(e.target.value)}
                  placeholder="Ex: 244955654264"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141d18] border border-[#dfba73]/40 text-white text-sm focus:outline-none focus:border-[#dfba73]"
                />
                {configError && <p className="text-rose-400 text-xs mt-1.5">{configError}</p>}
                <span className="block text-[11px] text-slate-400 mt-1">
                  Atualmente configurado: +{currentHostPhone || "244955654264"}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 rounded-lg text-xs text-slate-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#dfba73] hover:bg-[#cca252] text-[#1c2a24] text-xs font-bold transition-colors"
                >
                  Salvar Número
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
