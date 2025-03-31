import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useSimulator } from "@/hooks/use-simulator";
import ElectricField from "@/components/ElectricField";
import ElectricCharge from "@/components/ElectricCharge";

const ElectricFields = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [fieldMode, setFieldMode] = useState<"point" | "dipole" | "uniform">("point");
  const [isSimulationRunning, setIsSimulationRunning] = useState(true);
  
  const {
    charges,
    addCharge,
    resetSimulation,
  } = useSimulator(canvasRef);

  const { data: content, isLoading } = useQuery({
    queryKey: ["/api/content/electric_fields"],
    staleTime: Infinity,
  });

  // Change the field visualization based on selected mode
  useEffect(() => {
    resetSimulation();
    
    if (canvasRef.current) {
      const container = canvasRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      switch (fieldMode) {
        case "point":
          // Single positive charge
          addCharge({ sign: "positive", value: 5 });
          break;
        case "dipole":
          // Positive and negative charge
          addCharge({ sign: "positive", value: 5 });
          addCharge({ sign: "negative", value: -5 });
          break;
        case "uniform":
          // Multiple charges to create a uniform field
          const numCharges = 5;
          for (let i = 0; i < numCharges; i++) {
            addCharge({ sign: "positive", value: 3 });
            addCharge({ sign: "negative", value: -3 });
          }
          break;
      }
    }
  }, [fieldMode, canvasRef.current]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-header font-bold text-3xl md:text-4xl text-primary mb-2">Electric Fields</h1>
          <p className="text-lg text-gray-600">Visualize and understand electric fields and their properties</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="bg-primary text-white">
            <CardTitle className="font-header font-medium text-xl">Understanding Electric Fields</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <p>Loading content...</p>
            ) : (
              <>
                <p className="mb-4">
                  An electric field is a region where electric charges experience a force. The electric field at a point is defined as the force per unit charge that would be exerted on a small test charge placed at that point.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-6 font-mono text-center">
                  <span className="text-xl">E = F / q</span>
                </div>
                <p className="mb-4"><strong>Where:</strong></p>
                <ul className="list-disc pl-5 space-y-1 mb-6">
                  <li><strong>E</strong> is the electric field (in N/C)</li>
                  <li><strong>F</strong> is the force experienced by the charge (in N)</li>
                  <li><strong>q</strong> is the magnitude of the test charge (in C)</li>
                </ul>
                <p className="mb-2">Electric field lines:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Start from positive charges and end at negative charges</li>
                  <li>Never cross each other</li>
                  <li>The denser the lines, the stronger the field</li>
                </ul>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader className="bg-gray-100">
            <CardTitle className="font-header font-medium text-xl text-primary">Field Visualization</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div 
              ref={canvasRef}
              className="aspect-video bg-white rounded-lg shadow-inner mb-4 relative overflow-hidden"
            >
              {/* Electric field visualization */}
              <ElectricField 
                charges={charges} 
                isSimulationRunning={isSimulationRunning}
                visualizationMode="fieldLines"
                fieldStrength={0.5}
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
            
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button 
                variant={fieldMode === "point" ? "default" : "outline"}
                onClick={() => setFieldMode("point")}
              >
                Point Charge
              </Button>
              <Button 
                variant={fieldMode === "dipole" ? "default" : "outline"}
                onClick={() => setFieldMode("dipole")}
              >
                Dipole
              </Button>
              <Button 
                variant={fieldMode === "uniform" ? "default" : "outline"}
                onClick={() => setFieldMode("uniform")}
              >
                Uniform Field
              </Button>
            </div>
            <p className="text-sm text-center text-gray-600">
              Electric field lines show the direction a positive test charge would move if placed in the field.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader className="bg-secondary text-white">
            <CardTitle className="font-header font-medium text-xl">Applications of Electric Fields</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-lg mb-2">Cathode Ray Tubes</h4>
                <p className="text-sm">
                  Older televisions and monitors used electric fields to direct electrons to create images on a phosphor screen.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2">Particle Accelerators</h4>
                <p className="text-sm">
                  Electric fields are used to accelerate charged particles to high speeds for research and medical applications.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2">Electrostatic Precipitators</h4>
                <p className="text-sm">
                  Used in industry to remove particles from gas streams, helping reduce air pollution.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2">Photocopiers</h4>
                <p className="text-sm">
                  Electric fields control the movement of toner particles to create copies of documents.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Link href="/coulombs-law">
            <Button variant="outline">
              <i className="ri-arrow-left-line mr-2"></i> Previous: Coulomb's Law
            </Button>
          </Link>
          <Link href="/">
            <Button>
              Back to Home <i className="ri-home-line ml-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ElectricFields;
