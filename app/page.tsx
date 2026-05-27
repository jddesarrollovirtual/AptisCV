'use client';

import React, { useState } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Loader2, Check } from 'lucide-react';
import { FileUploader } from '@/components/upload/file-uploader';
import { CircularProgress } from '@/components/ui/circular-progress';
import { ExportPdfButton } from '@/components/ui/export-pdf-button';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isJdOpen, setIsJdOpen] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(0);

    const steps = [
      { text: 'Extrayendo contenido del PDF...', delay: 1500 },
      { text: 'Analizando experiencia...', delay: 3000 },
      { text: 'Detectando habilidades...', delay: 4500 },
      { text: 'Calculando puntaje ATS...', delay: 6000 },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => setLoadingStep(index + 1), step.delay);
    });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDescription);

    try {
      const res = await fetch('/api/analyze', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Ocurrió un error inesperado');
      }
      setResult(data);
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-100 flex flex-col items-center p-6 md:p-12 relative overflow-hidden">
      <div className="glow-effect" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <span className="text-xl font-bold tracking-tighter">AptisCV</span>
        <div className="flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Características</a>
          <a href="#" className="hover:text-white transition-colors">Precios</a>
          <a href="#" className="hover:text-white transition-colors">Sobre nosotros</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center max-w-2xl mb-16 mt-20 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent">
          Optimiza tu CV para el éxito profesional
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed max-w-lg mx-auto font-light">
          Análisis instantáneo con IA para potenciar tu perfil, mejorar tu puntaje ATS y destacar en las búsquedas.
        </p>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-rose-950/30 border border-rose-500/20 text-rose-200 rounded-2xl animate-in fade-in">
            {error}
          </div>
        )}

        {/* Upload Card */}
        <Card className="bg-slate-900/20 border-white/10 backdrop-blur-3xl p-2 rounded-3xl shadow-2xl border transition-all duration-500 hover:border-white/20">
          <CardContent className="flex flex-col items-center gap-4 p-4">
            <FileUploader onFileSelect={setFile} selectedFile={file} />
            
            <button 
              onClick={() => setIsJdOpen(!isJdOpen)}
              className="w-full flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors py-2 px-1"
            >
              <span>{isJdOpen ? 'Ocultar descripción del puesto' : 'Añadir descripción del puesto (opcional)'}</span>
              <span className="text-xs opacity-50">{isJdOpen ? '▲' : '▼'}</span>
            </button>

            {isJdOpen && (
              <textarea 
                placeholder="Pega aquí la descripción del puesto para mejorar la precisión..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl p-4 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all h-32 animate-in slide-in-from-top-2"
              />
            )}

            <Button 
              onClick={handleUpload} 
              disabled={loading || !file} 
              className="w-full relative bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-2xl py-6 text-base font-semibold transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-[0.98]"
            >
              {loading ? 'Procesando...' : 'Analizar CV'}
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="w-full max-w-2xl animate-in fade-in zoom-in duration-500">
          <Card className="bg-slate-900/20 border-white/10 backdrop-blur-3xl rounded-3xl p-12 text-center border">
            <h2 className="text-xl font-semibold mb-8">Análisis de IA en progreso</h2>
            <div className="flex flex-col gap-4 text-left max-w-sm mx-auto">
              {[
                'Extrayendo contenido del PDF',
                'Analizando experiencia',
                'Detectando habilidades',
                'Calculando puntaje ATS'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  {loadingStep > i ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : loadingStep === i ? (
                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-slate-700"></div>
                  )}
                  <p className={loadingStep >= i ? "text-white" : "text-slate-600"}>{text}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Results Section */}
      {!loading && result && (
        (() => {
          const safeScore = Math.min(
            100,
            Math.max(
              0,
              Number(result?.atsScore) || 72
            )
          );
          return (
            <section className="w-full max-w-2xl relative z-10 animate-in fade-in zoom-in duration-700">
              <Card className="bg-slate-900/20 border-white/10 backdrop-blur-3xl rounded-3xl p-8 shadow-2xl border transition-all duration-500 hover:border-white/20">
                <CardContent className="space-y-8 p-0">
                  <div className="flex justify-center mb-4">
                    <CircularProgress score={safeScore} />
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-medium text-slate-400">Habilidades detectadas</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.skills?.map((skill: string, i: number) => (
                        <Badge 
                          key={i} 
                          variant="outline"
                          className="text-xs py-1 px-3 border-blue-500/20 bg-blue-500/5 text-blue-200 hover:bg-blue-500/10 hover:scale-105 hover:-translate-y-0.5 cursor-default transition-all duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-950/30 p-6 rounded-2xl border border-emerald-500/10 backdrop-blur-xl hover:border-emerald-500/20 hover:scale-[1.02] transition-all duration-300">
                      <h3 className="flex items-center gap-2 font-medium text-emerald-400 mb-4">
                        <CheckCircle2 className="w-4 h-4"/> Fortalezas
                      </h3>
                      <ul className="space-y-3 text-slate-300 text-sm font-light">{result.strengths?.map((f: string, i: number) => <li key={i} className="flex items-start gap-2"><span>•</span> {f}</li>)}</ul>
                    </div>
                    <div className="bg-slate-950/30 p-6 rounded-2xl border border-rose-500/10 backdrop-blur-xl hover:border-rose-500/20 hover:scale-[1.02] transition-all duration-300">
                      <h3 className="flex items-center gap-2 font-medium text-rose-400 mb-4">
                        <AlertTriangle className="w-4 h-4"/> Debilidades
                      </h3>
                      <ul className="space-y-3 text-slate-300 text-sm font-light">{result.weaknesses?.map((d: string, i: number) => <li key={i} className="flex items-start gap-2"><span>•</span> {d}</li>)}</ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          );
        })()
      )}

      {/* How it Works Section */}
      <section className="w-full max-w-4xl mt-24 px-6">
        <h2 className="text-center text-3xl font-bold mb-16">¿Cómo funciona?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Sube tu CV", desc: "Sube tu archivo PDF y añade la descripción del puesto." },
            { step: "2", title: "IA Analiza", desc: "Nuestro motor evalúa tus habilidades y experiencia." },
            { step: "3", title: "Mejora tu score", desc: "Obtén consejos prácticos para superar el ATS." }
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-blue-500/20">
                {s.step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-4xl mt-24 mb-20 px-6">
        <h2 className="text-center text-3xl font-bold mb-12">Confían en AptisCV</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { quote: "Me ayudó a mejorar mi puntaje ATS en minutos.", name: "Alex R.", role: "Ingeniero de Software" },
            { quote: "Finalmente pasé el filtro inicial gracias a los cambios.", name: "Maria G.", role: "Product Manager" },
            { quote: "La herramienta más eficiente que he probado.", name: "Carlos S.", role: "Analista de Datos" }
          ].map((t, i) => (
            <div key={i} className="bg-slate-900/20 border border-white/5 p-6 rounded-2xl backdrop-blur-xl hover:border-white/10 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
              <p className="text-slate-300 mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500"></div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} AptisCV. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
