import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Activity, AlertTriangle, Upload, Scan } from "lucide-react";
import "@/App.css";

const DIAGNOSTIC_SCENARIOS = [
  {
    id: 1,
    faultCode: "P0A93",
    component: "DC-DC Converter",
    location: "Near drive motor, under hood",
    severity: "CRITICAL",
    hasHighVoltage: true,
    safetyWarning: "HIGH VOLTAGE - Disconnect main service plug before inspection",
    repairSteps: [
      "Check 12V battery state of charge",
      "Inspect wiring harness at junction J3"
    ],
    confidence: 94,
    scanTime: "00:03.0"
  },
  {
    id: 2,
    faultCode: "P0420",
    component: "Catalytic Converter",
    location: "Exhaust system, under vehicle center",
    severity: "MODERATE",
    hasHighVoltage: false,
    safetyWarning: "Hot surface - Allow engine to cool before inspection",
    repairSteps: [
      "Check oxygen sensor readings",
      "Inspect for exhaust leaks",
      "Verify catalytic converter efficiency"
    ],
    confidence: 89,
    scanTime: "00:02.8"
  },
  {
    id: 3,
    faultCode: "P0128",
    component: "Coolant Thermostat",
    location: "Engine block, front left side",
    severity: "LOW",
    hasHighVoltage: false,
    safetyWarning: "Coolant under pressure - Release pressure before opening",
    repairSteps: [
      "Test thermostat operation",
      "Check coolant level and quality",
      "Inspect radiator for blockages"
    ],
    confidence: 91,
    scanTime: "00:02.5"
  },
  {
    id: 4,
    faultCode: "B1A12",
    component: "Battery Management System",
    location: "Under rear seat compartment",
    severity: "CRITICAL",
    hasHighVoltage: true,
    safetyWarning: "HIGH VOLTAGE BATTERY - Use insulated tools and protective equipment",
    repairSteps: [
      "Verify battery pack voltage readings",
      "Check BMS communication signals",
      "Inspect cell balance indicators"
    ],
    confidence: 96,
    scanTime: "00:03.2"
  },
  {
    id: 5,
    faultCode: "P0300",
    component: "Ignition Coil Pack",
    location: "Engine top, cylinder bank 1",
    severity: "MODERATE",
    hasHighVoltage: false,
    safetyWarning: "Engine must be off - Ensure ignition is disabled",
    repairSteps: [
      "Scan for cylinder-specific misfire codes",
      "Test ignition coil resistance",
      "Check spark plug condition and gap"
    ],
    confidence: 87,
    scanTime: "00:02.9"
  },
  {
    id: 6,
    faultCode: "U0100",
    component: "ECM Communication",
    location: "Engine control module, firewall mounted",
    severity: "HIGH",
    hasHighVoltage: false,
    safetyWarning: "Disconnect battery before working on electrical connections",
    repairSteps: [
      "Check CAN bus wiring integrity",
      "Verify ECM power and ground connections",
      "Test communication protocol signals"
    ],
    confidence: 82,
    scanTime: "00:03.1"
  }
];

function App() {
  const [scanStatus, setScanStatus] = useState("idle");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [currentDiagnosis, setCurrentDiagnosis] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleScanClick = () => {
    const randomScenario = DIAGNOSTIC_SCENARIOS[Math.floor(Math.random() * DIAGNOSTIC_SCENARIOS.length)];
    setCurrentDiagnosis(randomScenario);
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("complete");
    }, 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        const randomScenario = DIAGNOSTIC_SCENARIOS[Math.floor(Math.random() * DIAGNOSTIC_SCENARIOS.length)];
        setCurrentDiagnosis(randomScenario);
        setScanStatus("scanning");
        setTimeout(() => {
          setScanStatus("complete");
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setScanStatus("idle");
    setUploadedImage(null);
    setCurrentDiagnosis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'CRITICAL': return 'text-red-500 bg-red-500/20 border-red-500/50';
      case 'HIGH': return 'text-orange-500 bg-orange-500/20 border-orange-500/50';
      case 'MODERATE': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/50';
      case 'LOW': return 'text-blue-400 bg-blue-400/20 border-blue-400/50';
      default: return 'text-cyan-400 bg-cyan-400/20 border-cyan-400/50';
    }
  };

  return (
    <div className="App relative w-screen h-screen bg-slate-950 overflow-hidden">
      <div className="scanline-overlay" />
      <div className="ar-grid-bg absolute inset-0" />
      
      <div className="relative z-10 flex flex-col h-full">
        <header 
          data-testid="header-container" 
          className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/30"
        >
          <h1 className="text-lg md:text-xl font-bold text-cyan-400 tracking-widest uppercase"
              style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}>
            Ayush XR Diagnostic Tool
          </h1>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center gap-2">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-green-400 rounded-full" />
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
              </div>
              <span className="text-xs text-green-400 tracking-widest uppercase font-bold">ONLINE</span>
            </div>
            <span className="text-cyan-100/60 text-sm md:text-base tracking-wider">| Nexon EV Scanner</span>
          </div>
        </header>

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

        <div className="flex-1 flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            {scanStatus === "idle" && (
              <motion.div
                key="scan-buttons"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative flex flex-col md:flex-row gap-8 items-center"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  data-testid="file-input"
                />
                
                <div className="absolute -inset-32 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-96 h-96 border-t-2 border-b-2 border-cyan-500/20 rounded-full slow-spin" />
                  <div className="absolute w-[28rem] h-[28rem] border-t border-b border-cyan-500/15 rounded-full reverse-spin" />
                </div>
                
                <button
                  data-testid="scan-component-button"
                  onClick={handleScanClick}
                  className="relative w-56 h-56 rounded-full border-2 border-cyan-400 bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center gap-3 hover:scale-105 hover:border-cyan-300 transition-all duration-300 group"
                  style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
                >
                  <Scan className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  <span className="text-cyan-400 font-bold text-base tracking-widest uppercase group-hover:text-cyan-300 transition-colors"
                        style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}>
                    Start Scan
                  </span>
                  <span className="text-cyan-400/60 text-xs tracking-wide">Quick Diagnostic</span>
                </button>

                <div className="text-cyan-400/40 text-sm font-bold">OR</div>

                <button
                  data-testid="upload-image-button"
                  onClick={handleUploadClick}
                  className="relative w-56 h-56 rounded-full border-2 border-purple-400 bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center gap-3 hover:scale-105 hover:border-purple-300 transition-all duration-300 group"
                  style={{ boxShadow: '0 0 30px rgba(192, 132, 252, 0.4)' }}
                >
                  <Upload className="w-12 h-12 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <span className="text-purple-400 font-bold text-base tracking-widest uppercase group-hover:text-purple-300 transition-colors"
                        style={{ textShadow: '0 0 8px rgba(192, 132, 252, 0.6)' }}>
                    Upload Image
                  </span>
                  <span className="text-purple-400/60 text-xs tracking-wide">Component Photo</span>
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
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full" />
                    <div className="absolute inset-0 border-t-4 border-cyan-400 rounded-full animate-spin" />
                  </div>
                  <Activity className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-cyan-400" />
                </div>
                <p className="text-cyan-400 text-xl font-bold tracking-widest uppercase"
                   style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}>
                  Analyzing Component...
                </p>
                {uploadedImage && (
                  <div className="mt-4 border-2 border-cyan-500/40 rounded-sm overflow-hidden"
                       style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}>
                    <img src={uploadedImage} alt="Component under analysis" className="w-48 h-48 object-cover" />
                  </div>
                )}
              </motion.div>
            )}

            {scanStatus === "complete" && currentDiagnosis && (
              <motion.div
                key="diagnosis"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                data-testid="diagnosis-card"
                className="relative w-full max-w-3xl bg-slate-950/80 backdrop-blur-xl border border-cyan-500/40 rounded-sm p-8 md:p-12"
                style={{ boxShadow: '0 4px 30px rgba(34, 211, 238, 0.15)' }}
              >
                <div className="ar-corner-bracket top-left" />
                <div className="ar-corner-bracket top-right" />
                <div className="ar-corner-bracket bottom-left" />
                <div className="ar-corner-bracket bottom-right" />
                
                <div className="space-y-6">
                  <div className="flex items-start justify-between border-b border-cyan-500/30 pb-4">
                    <div className="flex-1">
                      <p className="text-cyan-100/60 text-xs uppercase tracking-widest mb-1">Fault Code</p>
                      <h2 className="text-4xl font-bold text-red-400"
                          style={{ textShadow: '0 0 12px rgba(248, 113, 113, 0.6)' }}>
                        {currentDiagnosis.faultCode}
                      </h2>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-green-400 text-sm font-bold" data-testid="ai-confidence">
                            AI Confidence: {currentDiagnosis.confidence}%
                          </span>
                        </div>
                        <span className="text-cyan-100/40">|</span>
                        <span className="text-cyan-400 text-sm font-mono" data-testid="scan-time">
                          Scan Time: {currentDiagnosis.scanTime}s
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-100/60 text-xs uppercase tracking-widest mb-1">Severity</p>
                      <span className={`inline-block px-4 py-2 border font-bold text-lg rounded-sm ${getSeverityColor(currentDiagnosis.severity)}`}>
                        {currentDiagnosis.severity}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-cyan-100/60 text-xs uppercase tracking-widest mb-2">Component</p>
                      <p className="text-cyan-400 font-bold text-lg">{currentDiagnosis.component}</p>
                    </div>
                    <div>
                      <p className="text-cyan-100/60 text-xs uppercase tracking-widest mb-2">Location</p>
                      <p className="text-cyan-400 font-bold text-lg">{currentDiagnosis.location}</p>
                    </div>
                  </div>

                  <div className={`border-2 rounded-sm p-4 ${
                    currentDiagnosis.hasHighVoltage 
                      ? 'bg-red-500/20 border-red-500/50' 
                      : 'bg-orange-500/20 border-orange-500/50'
                  }`}>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-6 h-6 mt-1 flex-shrink-0 ${
                        currentDiagnosis.hasHighVoltage ? 'text-red-500' : 'text-orange-500'
                      }`} />
                      <div>
                        <p className={`font-bold text-sm uppercase tracking-widest mb-1 ${
                          currentDiagnosis.hasHighVoltage ? 'text-red-400' : 'text-orange-400'
                        }`}>Safety Warning</p>
                        <p className={`font-bold ${
                          currentDiagnosis.hasHighVoltage ? 'text-red-300' : 'text-orange-300'
                        }`}>{currentDiagnosis.safetyWarning}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-cyan-100/60 text-xs uppercase tracking-widest mb-3">Repair Steps</p>
                    <ol className="space-y-2 text-cyan-100/90">
                      {currentDiagnosis.repairSteps.map((step, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="text-cyan-400 font-bold">{index + 1})</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

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

        <AnimatePresence>
          {scanStatus === "complete" && currentDiagnosis?.hasHighVoltage && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              data-testid="critical-warning-banner"
              className="fixed bottom-0 left-0 right-0 py-4 px-6 flash-alert z-50"
            >
              <p className="text-white text-center font-bold text-sm md:text-base uppercase tracking-widest flex items-center justify-center gap-3">
                <AlertTriangle className="w-5 h-5" />
                HIGH VOLTAGE ZONE DETECTED - Supervisor Notified
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