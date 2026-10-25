import React, { useState } from "react";
import { ZoomIn, Download, Sparkles, X } from "lucide-react";

interface InvitationCardProps {
  id?: string;
  className?: string;
}

export const OFFICIAL_INVITATION_IMAGE = "/convite.png";

export const InvitationCard: React.FC<InvitationCardProps> = ({
  id = "official-invitation-card",
  className = "",
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = OFFICIAL_INVITATION_IMAGE;
    link.download = "Convite_15_Anos_Ruquene_Zango.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div
        id={id}
        onClick={() => setIsZoomed(true)}
        className={`group relative w-full max-w-[500px] aspect-[2/3] mx-auto select-none overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(223,186,115,0.3)] cursor-pointer ${className}`}
        style={{
          boxShadow:
            "0 25px 60px -15px rgba(10, 22, 16, 0.7), 0 0 0 1px rgba(223, 186, 115, 0.35)",
        }}
      >
        <img
          src={OFFICIAL_INVITATION_IMAGE}
          alt="Convite Oficial de 15 Anos de Ruquene Zango"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
        />

        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "linear-gradient(120deg, transparent 20%, rgba(255, 245, 215, 0.15) 45%, rgba(223, 186, 115, 0.25) 50%, transparent 60%)",
          }}
        />

        <div className="no-print absolute bottom-4 inset-x-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[#fae8a9] text-[11px] font-medium border border-[#dfba73]/40">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Clique para Ampliar</span>
          </span>

          <button
            type="button"
            onClick={handleDownload}
            className="pointer-events-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#dfba73] hover:bg-[#ecd38c] text-[#14211a] text-[11px] font-bold shadow-lg transition-transform active:scale-95"
          >
            <Download className="w-3 h-3" />
            <span>Baixar Imagem</span>
          </button>
        </div>
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-lg w-full max-h-[95vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between mb-3 text-white">
              <span className="text-xs sm:text-sm font-medium text-[#ecd38c] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Convite de 15 Anos • Ruquene Zango</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#dfba73] hover:bg-[#cca252] text-[#14211a] text-xs font-bold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Imagem</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsZoomed(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border border-[#dfba73]/50">
              <img
                src={OFFICIAL_INVITATION_IMAGE}
                alt="Convite Oficial de 15 Anos de Ruquene Zango Ampliado"
                className="w-full h-auto max-h-[85vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
