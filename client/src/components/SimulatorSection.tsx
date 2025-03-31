import { useRef, useEffect, useState } from "react";
import { useSimulator } from "@/hooks/use-simulator";
import ElectricCharge from "@/components/ElectricCharge";
import ElectricField from "@/components/ElectricField";

const SimulatorSection = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [visualizationMode, setVisualizationMode] = useState<"fieldLines" | "equipotential">("fieldLines"); // Will update UI but keep functionality
  const [fieldStrength, setFieldStrength] = useState(50);
  const [chargeMagnitude, setChargeMagnitude] = useState(5);
  
  const {
    charges,
    addCharge,
    resetSimulation,
    updateFieldStrength,
    updateChargeMagnitude,
  } = useSimulator(canvasRef);

  const toggleSimulation = () => {
    setIsSimulationRunning(!isSimulationRunning);
  };

  const handleAddPositiveCharge = () => {
    addCharge({ sign: "positive", value: chargeMagnitude });
  };

  const handleAddNegativeCharge = () => {
    addCharge({ sign: "negative", value: -chargeMagnitude });
  };

  const handleFieldStrengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFieldStrength(value);
    updateFieldStrength(value);
  };

  const handleChargeMagnitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setChargeMagnitude(value);
    updateChargeMagnitude(value);
  };

  return (
    <section id="simulator" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-header font-bold text-3xl md:text-4xl mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Interactive Simulator
        </h2>

        <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border border-border">
          <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white flex justify-between items-center">
            <h3 className="font-header font-medium text-lg">Electric Charge Simulator</h3>
            <div className="flex space-x-2">
              <button 
                className="px-3 py-1 bg-white/20 rounded hover:bg-white/30 text-sm font-medium"
                onClick={resetSimulation}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
                Reset
              </button>
              <button 
                className="px-3 py-1 bg-card text-primary hover:bg-card/90 rounded text-sm font-medium"
                onClick={toggleSimulation}
              >
                {isSimulationRunning ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
                {isSimulationRunning ? 'Pause' : 'Start'}
              </button>
            </div>
          </div>

          <div className="simulator-container">
            <div 
              ref={canvasRef}
              className="canvas-container aspect-[16/9] bg-muted border-b border-border relative"
            >
              {charges.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
                      <path d="M12 13v9"></path>
                      <path d="M12 2v4"></path>
                    </svg>
                    <p>Add charges to see Coulomb's Law in action</p>
                  </div>
                </div>
              )}

              {/* Electric field visualization */}
              <ElectricField 
                charges={charges} 
                isSimulationRunning={isSimulationRunning}
                visualizationMode={visualizationMode}
                fieldStrength={fieldStrength / 100}
              />

              {/* Electric charges */}
              {charges.map((charge, index) => (
                <ElectricCharge 
                  key={index}
                  charge={charge}
                  containerRef={canvasRef}
                />
              ))}
            </div>

            <div className="p-4 border-b border-border">
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                <div className="w-full md:w-1/2">
                  <p className="text-sm font-medium mb-2">Add Charges:</p>
                  <div className="flex space-x-3">
                    <button 
                      className="flex-1 py-2 px-3 bg-primary text-white rounded flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity"
                      onClick={handleAddPositiveCharge}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg> 
                      Positive
                    </button>
                    <button 
                      className="flex-1 py-2 px-3 bg-secondary text-white rounded flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity"
                      onClick={handleAddNegativeCharge}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                      Negative
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-sm font-medium mb-2">Interaction Display:</p>
                  <div className="flex space-x-3">
                    <button 
                      className={`flex-1 py-2 px-3 rounded flex items-center justify-center transition-colors ${
                        visualizationMode === "fieldLines" 
                          ? "bg-primary text-white" 
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => setVisualizationMode("fieldLines")}
                    >
                      Force Lines
                    </button>
                    <button 
                      className={`flex-1 py-2 px-3 rounded flex items-center justify-center transition-colors ${
                        visualizationMode === "equipotential" 
                          ? "bg-secondary text-white" 
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => setVisualizationMode("equipotential")}
                    >
                      Intensity Map
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-header font-medium text-primary mb-3">Simulation Controls</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Force Visibility: {fieldStrength}%</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={fieldStrength} 
                    onChange={handleFieldStrengthChange}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Subtle</span>
                    <span>Intense</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Charge Magnitude: {chargeMagnitude} μC</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={chargeMagnitude} 
                    onChange={handleChargeMagnitudeChange}
                    className="w-full accent-secondary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 μC</span>
                    <span>10 μC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
          <h3 className="font-header font-medium text-lg text-primary mb-2">What You're Seeing</h3>
          <p className="text-muted-foreground">
            This simulator demonstrates how electric charges interact with each other according to Coulomb's Law. 
            The force lines show the attraction and repulsion between charges.
            Like charges repel (red-red or blue-blue) while opposite charges attract (red-blue).
          </p>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
