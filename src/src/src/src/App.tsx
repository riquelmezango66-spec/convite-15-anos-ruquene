import React, { useState } from "react";
import {
  Share2,
  Printer,
  MessageCircle,
  Sparkles,
  Users,
  Check,
  Heart,
  ChevronDown,
} from "lucide-react";
import { InvitationCard } from "./components/InvitationCard";
import { EventDetails } from "./components/EventDetails";
import { RsvpSection } from "./components/RsvpSection";
import { AudioPlayerButton } from "./components/AudioPlayerButton";
import { GuestListModal } from "./components/GuestListModal";
import { copyToClipboard } from "./utils/clipboard";

export default function App() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showGuestList, setShowGuestList] = useState(false);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToRsvp = () => {
    const el = document.getElementById("confirmacao-presenca");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#14211a] text-slate-100 flex flex-col justify-between selection:bg-[#dfba73] selection:text-[#14211a]">
      {/* HEADER */}
      <header className="no-print sticky top-0 z-30 w-full bg-[#14211a]/90 backdrop-blur-md border-b border-[#dfba73]/25 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
          <a
            href="#"
            className="font-serif-luxury text-lg sm:text-xl font-bold tracking-tight gold-text-champagne whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            Ruquene Zango
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <a href="#convite" className="hover:text-[#ecd38c] transition-colors whitespace-nowrap shrink-0">
              Convite
            </a>
            <a href="#detalhes" className="hover:text-[#ecd38c] transition-colors whitespace-nowrap shrink-0">
              Detalhes
            </a>
            <a href="#confirmacao-presenca" className="hover:text-[#ecd38c] transition-colors whitespace-nowrap shrink-0">
              Confirmar Presença
            </a>
            <button
              onClick={() => setShowGuestList(true)}
              className="text-[#ecd38c] hover:underline flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Painel de Convidados</span>
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handleCopyLink}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dfba73]/40 hover:bg-[#dfba73]/10 text-xs text-[#ecd38c] font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar</span>
                </>
              )}
            </button>

            <button
              onClick={scrollToRsvp}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#dfba73] to-[#c59c47] hover:from-[#ecd38c] hover:to-[#cca14e] text-[#14211a] font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Confirmar Presença (RSVP)
            </button>
          </div>
        </div>
      </header>

      {/* CONVITE */}
      <main className="flex-1 w-full flex flex-col items-center">
        <section id="convite" className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12 flex flex-col items-center">
          <div className="no-print inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1f3026] border border-[#dfba73]/30 text-xs font-medium text-[#ecd38c] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#ecd38c]" />
            <span className="tracking-wide">Convite Oficial de Aniversário de 15 Anos</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ecd38c]" />
          </div>

          <h2 className="no-print font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-center text-[#fcf9f2] font-semibold mb-2">
            15 Anos de <span className="gold-text-metallic">Ruquene Zango</span>
          </h2>
          <p className="no-print font-sans-clean text-xs sm:text-sm text-slate-300 text-center max-w-md mx-auto mb-8">
            Você é nosso convidado de honra para celebrar essa data tão especial e inesquecível.
          </p>

          <div className="no-print flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6 w-full max-w-[540px]">
            <button
              onClick={scrollToRsvp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Confirmar no WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1f3026] hover:bg-[#273d32] border border-[#dfba73]/40 text-[#ecd38c] text-xs font-medium transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1f3026] hover:bg-[#273d32] border border-[#dfba73]/40 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Link Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#dfba73]" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>

          <div className="w-full flex justify-center">
            <InvitationCard />
          </div>

          <button
            onClick={scrollToRsvp}
            className="no-print mt-8 flex flex-col items-center text-slate-400 hover:text-[#ecd38c] transition-colors cursor-pointer group"
          >
            <span className="text-xs font-medium tracking-wider uppercase mb-1">
              Deslize para Confirmar Presença
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-[#dfba73]" />
          </button>
        </section>

        <div id="detalhes" className="no-print w-full scroll-mt-20">
          <EventDetails />
        </div>

        <div className="no-print w-full">
          <RsvpSection onRsvpSubmitted={() => {}} />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="no-print border-t border-[#dfba73]/20 bg-[#0f1914] text-slate-400 py-10 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border border-[#dfba73]/40 flex items-center justify-center text-[#dfba73] mb-3">
            <Heart className="w-4 h-4 fill-current text-[#dfba73]" />
          </div>
          <h4 className="font-serif-luxury text-lg sm:text-xl text-[#fcf9f2] font-semibold mb-1">
            Ruquene Zango • 15 Anos
          </h4>
          <p className="font-sans-clean text-xs text-slate-400 max-w-md mx-auto leading-relaxed mb-4">
            14 de Novembro • 15 horas • Restinga • Restaurante do Hotel Plazza
          </p>
          <p className="text-[11px] text-slate-600">
            © 2026 Celebração de 15 Anos. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <div className="no-print">
        <AudioPlayerButton />
      </div>

      <GuestListModal isOpen={showGuestList} onClose={() => setShowGuestList(false)} />
    </div>
  );
  }
