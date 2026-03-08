"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      const res = await fetch("https://formspree.io/f/meelrqqq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-2">Contact</h1>
        <p className="text-white/50 mb-10 text-sm">
          お仕事のご依頼・ご相談はお気軽にどうぞ。
        </p>

        {formState === "success" ? (
          <div className="bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#3b82f6]/20 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">送信完了しました</h2>
            <p className="text-white/50 text-sm mb-6">
              お問い合わせありがとうございます。内容を確認の上、折り返しご連絡いたします。
            </p>
            <button
              onClick={() => setFormState("idle")}
              className="text-sm text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
            >
              もう一件送る →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">
                お名前 <span className="text-[#3b82f6]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="山田 太郎"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#3b82f6]/50 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">
                メールアドレス <span className="text-[#3b82f6]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#3b82f6]/50 transition-all"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">
                お問い合わせ種別
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3b82f6]/50 transition-all appearance-none"
              >
                <option value="" className="bg-[#111]">選択してください</option>
                <option value="お仕事のご依頼" className="bg-[#111]">お仕事のご依頼</option>
                <option value="コラボレーション" className="bg-[#111]">コラボレーション</option>
                <option value="メディア取材・インタビュー" className="bg-[#111]">メディア取材・インタビュー</option>
                <option value="その他" className="bg-[#111]">その他</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">
                メッセージ <span className="text-[#3b82f6]">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="お気軽にご相談ください。"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#3b82f6]/50 transition-all resize-none"
              />
            </div>

            {/* Error message */}
            {formState === "error" && (
              <p className="text-red-400 text-sm">
                送信に失敗しました。時間をおいて再度お試しください。
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={formState === "submitting"}
              className="w-full flex items-center justify-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#3b82f6]/20"
            >
              {formState === "submitting" ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  送信中...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  送信する
                </>
              )}
            </button>
          </form>
        )}


      </main>

      <Footer />
    </div>
  );
}
