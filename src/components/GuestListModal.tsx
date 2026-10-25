import React, { useState, useEffect } from "react";
import {
  Users,
  CheckCircle2,
  XCircle,
  Copy,
  Download,
  X,
} from "lucide-react";
import { RsvpData, getSavedRsvps } from "../utils/whatsapp";
import { copyToClipboard } from "../utils/clipboard";

interface GuestListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuestListModal: React.FC<GuestListModalProps> = ({ isOpen, onClose }) => {
  const [list, setList] = useState<RsvpData[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setList(getSavedRsvps());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const confirmedList = list.filter((item) => item.attending === "yes");
  const declinedList = list.filter((item) => item.attending === "no");

  const handleCopySummary = async () => {
    let summary = `📋 *LISTA DE CONFIRMAÇÕES • 15 ANOS RUQUENE ZANGO*\n`;
    summary += `Total de Convidados Confirmados: ${confirmedList.length}\n\n`;

    summary += `*Confirmados (${confirmedList.length}):*\n`;
    confirmedList.forEach((g, i) => {
      summary += `${i + 1}. ${g.fullName}`;
      if (g.phone) summary += ` [Tel: ${g.phone}]`;
      if (g.message) summary += ` - "${g.message}"`;
      summary += `\n`;
    });

    if (declinedList.length > 0) {
      summary += `\n*Não Poderão Comparecer (${declinedList.length}):*\n`;
      declinedList.forEach((g, i) => {
        summary += `${i + 1}. ${g.fullName}\n`;
      });
    }

    const success = await copyToClipboard(summary);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleExportCsv = () => {
    const headers = ["Nome", "Status", "Telefone", "Mensagem", "Data Confirmacao"];
    const rows = list.map((item) => [
      `"${item.fullName.replace(/"/g, '""')}"`,
      item.attending === "yes" ? "Confirmado" : "Nao Comparecera",
      `"${(item.phone || "").replace(/"/g, '""')}"`,
      `"${(item.message || "").replace(/"/g, '""')}"`,
      `"${item.timestamp}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "confirmacoes_15anos_ruquene.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#1c2a23] border border-[#dfba73] shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-[#dfba73]/30 flex items-center justify-between bg-[#16221c]">
          <div>
            <h3 className="font-serif-luxury text-xl text-[#fcf9f2] font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-[#dfba73]" />
              <span>Painel de Confirmações (RSVP)</span>
            </h3>
            <p className="font-sans-clean text-xs text-slate-400 mt-0.5">
              Ruquene Zango • Convites Pessoais
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 divide-x divide-[#dfba73]/20 bg-[#192720] border-b border-[#dfba73]/20 text-center py-3">
          <div>
            <span className="block font-serif-luxury text-2xl font-bold text-emerald-400">
              {confirmedList.length}
            </span>
            <span className="block text-[11px] text-slate-300 uppercase tracking-wider">
              Presenças Confirmadas
            </span>
          </div>
          <div>
            <span className="block font-serif-luxury text-2xl font-bold text-slate-400">
              {declinedList.length}
            </span>
            <span className="block text-[11px] text-slate-300 uppercase tracking-wider">
              Não Comparecerão
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {list.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Users className="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" />
              <p className="text-sm font-medium">Nenhuma confirmação registrada ainda neste dispositivo.</p>
              <p className="text-xs text-slate-500 mt-1">
                Conforme os convidados confirmarem presença pelo link, a lista pessoal aparecerá aqui.
              </p>
            </div>
          ) : (
            list.map((rsvp) => (
              <div
                key={rsvp.id}
                className="p-4 rounded-xl bg-[#141e19] border border-slate-700/80 hover:border-[#dfba73]/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {rsvp.attending === "yes" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="font-semibold text-sm text-[#fcf9f2]">
                      {rsvp.fullName}
                    </span>
                    {rsvp.phone && (
                      <span className="text-xs text-slate-400">({rsvp.phone})</span>
                    )}
                  </div>
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                      rsvp.attending === "yes"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-700/50"
                        : "bg-rose-950 text-rose-300 border border-rose-700/50"
                    }`}
                  >
                    {rsvp.attending === "yes" ? "Confirmado" : "Ausente"}
                  </span>
                </div>

                {rsvp.message && (
                  <p className="text-xs text-slate-300 italic mt-2 pl-6 border-l border-slate-700 py-0.5">
                    "{rsvp.message}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-[#16221c] border-t border-[#dfba73]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">Armazenamento seguro local</div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              disabled={list.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#273d32] hover:bg-[#334f41] border border-[#dfba73]/30 text-xs font-medium text-[#ecd38c] transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? "Copiado!" : "Copiar Resumo"}</span>
            </button>
            <button
              onClick={handleExportCsv}
              disabled={list.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#dfba73] hover:bg-[#cca252] text-[#1c2a24] text-xs font-bold transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Excel / CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
