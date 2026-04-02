import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Activity, AlertTriangle } from "lucide-react";
import "@/App.css";

function App() {
  const [scanStatus, setScanStatus] = useState("idle"); // 'idle' | 'scanning' | 'complete'

  const handleScanClick = () => {
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("complete");
    }, 2000);
  };

  const handleReset = () => {
    setScanStatus("idle");
  };

  return (
    <div className="App relative w-screen h-screen bg-slate-950 overflow-hidden">
      {/* Scanline overlay */}
      <div className="scanline-overlay" />
      
      {/* Grid background */}
      <div className="ar-grid-bg absolute inset-0" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header 
          data-testid="header-container" 
          className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/30"
        >
          <h1 className="text-lg md:text-xl font-bold text-cyan-400 tracking-widest uppercase"
              style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}>
            ARIA — X-Ray Vision Diagnostics
          </h1>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center gap-2">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-green-400 rounded-full" />
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
              </div>
              <span className="text-xs text-green-400 tracking-widest uppercase font-bold">SYSTEM ACTIVE</span>
            </div>
            <span className="text-cyan-100/60 text-sm md:text-base tracking-wider">| Metadome AI</span>
          </div>
        </header>

        {/* Vehicle status bar */}
        <div 
          data-testid="vehicle-status-bar" 
          className="px-6 py-3 bg-cyan-900/20 border-b border-cyan-500/30"
        >
          <div className="flex flex-wrap gap-4 md:gap-8 text-xs uppercase tracking-widest text-cyan-100/80">
            <span>Vehicle: <span className="text-cyan-400 font-bold">Tata Nexon EV 2024</span></span>
            <span>|</span>
            <span>Active Faults: <span className="text-red-400 font-bold">3</span></span>
            <span>|</span>
            <span>Battery Temp: <span className="text-orange-400 font-bold">47°C</span> <AlertTriangle className="inline w-4 h-4 text-orange-400" /></span>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            {scanStatus === "idle" && (
              <motion.div
                key="scan-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
              >
                {/* Rotating reticle rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-72 h-72 border-t-2 border-b-2 border-cyan-500/30 rounded-full slow-spin" />
                  <div className="absolute w-80 h-80 border-t border-b border-cyan-500/20 rounded-full reverse-spin" />
                </div>
                
                {/* Scan button */}
                <button
                  data-testid="scan-component-button"
                  onClick={handleScanClick}
                  className="relative w-64 h-64 rounded-full border-2 border-cyan-400 bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center gap-4 hover:scale-105 hover:border-cyan-300 transition-all duration-300 group"
                  style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
                >
                  <Camera className="w-16 h-16 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  <span className="text-cyan-400 font-bold text-lg tracking-widest uppercase group-hover:text-cyan-300 transition-colors"
                        style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}>
                    Scan Component
                  </span>
                </button>
              </motion.div>
            )}

            {scanStatus === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                data-testid="scan-loading-indicator"
                className="flex flex-col items-center gap-6"
              >
                <div className="relative">
                  {/* Scanning circles */}
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full" />
                    <div className="absolute inset-0 border-t-4 border-cyan-400 rounded-full animate-spin" />
                  </div>
                  <Activity className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-cyan-400" />
                </div>
                <p className="text-cyan-400 text-xl font-bold tracking-widest uppercase"
                   style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}>
                  ARIA Analyzing Component...
                </p>
              </motion.div>
            )}

            {scanStatus === "complete" && (
              <motion.div
                key="diagnosis"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                data-testid="diagnosis-card"
                className="w-full max-w-3xl bg-slate-950/80 backdrop-blur-xl border border-cyan-500/40 rounded-sm p-8 md:p-12"
                style={{ boxShadow: '0 4px 30px rgba(34, 211, 238, 0.15)' }}
              >
                <div className="space-y-6">
                  {/* Fault code header */}
                  <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
                    <div>
                      <p className="text-cyan-100/60 text-xs uppercase tracking-widest mb-1">Fault Code</p>
                      <h2 className="text-4xl font-bold text-red-400"
                          style={{ textShadow: '0 0 12px rgba(248, 113, 113, 0.6)' }}>
                        P0A93
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-100/60 text-xs uppercase tracking-widest mb-1">Severity</p>
                      <span className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-500 font-bold text-lg rounded-sm">
                        CRITICAL
                      </span>
                    </div>
                  </div>

                  {/* Component details grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-cyan-100/60 text-xs uppercase tracking-widest mb-2">Component</p>
                      <p className="text-cyan-400 font-bold text-lg">DC-DC Converter</p>
                    </div>
                    <div>
                      <p className="text-cyan-100/60 text-xs uppercase tracking-widest mb-2">Location</p>
                      <p className="text-cyan-400 font-bold text-lg">Near drive motor, under hood</p>
                    </div>
                  </div>

                  {/* Safety warning */}
                  <div className="bg-red-500/20 border-2 border-red-500/50 rounded-sm p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-red-400 font-bold text-sm uppercase tracking-widest mb-1">Safety Warning</p>
                        <p className="text-red-300 font-bold">HIGH VOLTAGE — Disconnect main service plug before inspection</p>
                      </div>
                    </div>
                  </div>

                  {/* Repair steps */}
                  <div>
                    <p className="text-cyan-100/60 text-xs uppercase tracking-widest mb-3">Repair Steps</p>
                    <ol className="space-y-2 text-cyan-100/90">
                      <li className="flex gap-3">
                        <span className="text-cyan-400 font-bold">1)</span>
                        <span>Check 12V battery state of charge</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-cyan-400 font-bold">2)</span>
                        <span>Inspect wiring harness at junction J3</span>
                      </li>
                    </ol>
                  </div>

                  {/* Reset button */}
                  <div className="pt-4 border-t border-cyan-500/30">
                    <button
                      onClick={handleReset}
                      className="w-full py-3 border border-cyan-400 text-cyan-400 font-bold uppercase tracking-widest rounded-sm hover:bg-cyan-400/10 transition-colors"
                      style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}
                    >
                      Scan Another Component
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Critical warning banner */}
        <AnimatePresence>
          {scanStatus === "complete" && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              data-testid="critical-warning-banner"
              className="fixed bottom-0 left-0 right-0 py-4 px-6 flash-alert z-50"
            >
              <p className="text-white text-center font-bold text-sm md:text-base uppercase tracking-widest flex items-center justify-center gap-3">
                <AlertTriangle className="w-5 h-5" />
                HIGH VOLTAGE ZONE DETECTED — Supervisor Notified
                <AlertTriangle className="w-5 h-5" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;