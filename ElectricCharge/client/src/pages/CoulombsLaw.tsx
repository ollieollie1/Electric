import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useQuery } from "@tanstack/react-query";
import CoulombsLawVisualization from "@/components/CoulombsLawVisualization";

const CoulombsLaw = () => {
  const [charge1, setCharge1] = useState(1.6e-19); // Default to elementary charge
  const [charge2, setCharge2] = useState(-1.6e-19); // Default to elementary charge
  const [distance, setDistance] = useState(5.3e-11); // Default to Bohr radius

  const { data: content, isLoading } = useQuery({
    queryKey: ["/api/content/coulombs_law"],
    staleTime: Infinity,
  });

  // Calculate Coulomb's force
  const k = 8.99e9; // Coulomb's constant
  const force = k * Math.abs(charge1 * charge2) / (distance * distance);
  const forceType = (charge1 > 0 && charge2 > 0) || (charge1 < 0 && charge2 < 0) ? "repulsive" : "attractive";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-header font-bold text-3xl md:text-4xl text-primary mb-2">Coulomb's Law</h1>
          <p className="text-lg text-gray-600">Understand the electrostatic force between charged particles</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="bg-primary text-white">
            <CardTitle className="font-header font-medium text-xl">The Law of Electrostatic Force</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <p>Loading content...</p>
            ) : (
              <>
                <p className="mb-4">Coulomb's Law describes the electrostatic force between two charged particles:</p>
                <div className="bg-gray-100 rounded-lg p-4 mb-6 font-mono text-center">
                  <span className="text-xl">F = k × |q₁ × q₂| / r²</span>
                </div>
                <div className="space-y-2 mb-6">
                  <p><strong>Where:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>F</strong> is the electrostatic force (in newtons, N)</li>
                    <li><strong>k</strong> is Coulomb's constant (8.99 × 10⁹ N·m²/C²)</li>
                    <li><strong>q₁, q₂</strong> are the magnitudes of the charges (in coulombs, C)</li>
                    <li><strong>r</strong> is the distance between the charges (in meters, m)</li>
                  </ul>
                </div>
                <p className="mb-4">
                  The force is repulsive if the charges have the same sign, and attractive if they have opposite signs.
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader className="bg-gray-100">
            <CardTitle className="font-header font-medium text-xl text-primary">Interactive Visualization</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CoulombsLawVisualization
              charge1={charge1}
              charge2={charge2}
              distance={distance}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-medium mb-2">Charge Magnitudes</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Charge (q₁):</label>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCharge1(charge1 > 0 ? -Math.abs(charge1) : Math.abs(charge1))}
                      >
                        {charge1 > 0 ? "+" : "−"}
                      </Button>
                      <Slider 
                        value={[Math.log10(Math.abs(charge1)) + 20]} 
                        min={0} 
                        max={40} 
                        step={1}
                        onValueChange={(val) => setCharge1((charge1 > 0 ? 1 : -1) * Math.pow(10, val[0] - 20))}
                      />
                    </div>
                    <p className="text-xs mt-1">
                      Current: {charge1.toExponential(2)} C
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Second Charge (q₂):</label>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCharge2(charge2 > 0 ? -Math.abs(charge2) : Math.abs(charge2))}
                      >
                        {charge2 > 0 ? "+" : "−"}
                      </Button>
                      <Slider 
                        value={[Math.log10(Math.abs(charge2)) + 20]} 
                        min={0} 
                        max={40} 
                        step={1}
                        onValueChange={(val) => setCharge2((charge2 > 0 ? 1 : -1) * Math.pow(10, val[0] - 20))}
                      />
                    </div>
                    <p className="text-xs mt-1">
                      Current: {charge2.toExponential(2)} C
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Distance</h4>
                <div>
                  <label className="block text-sm font-medium mb-1">Separation (r):</label>
                  <Slider 
                    value={[Math.log10(distance) + 12]} 
                    min={0} 
                    max={24} 
                    step={1}
                    onValueChange={(val) => setDistance(Math.pow(10, val[0] - 12))}
                  />
                  <p className="text-xs mt-1">
                    Current: {distance.toExponential(2)} m
                  </p>
                </div>
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Calculated Force</h4>
                  <p className="font-mono">
                    F = {force.toExponential(2)} N
                  </p>
                  <p className="text-sm mt-1">
                    <span className={`inline-flex items-center ${
                      forceType === "attractive" ? "text-secondary" : "text-destructive"
                    }`}>
                      <i className={`ri-arrow-${forceType === "attractive" ? "left-right" : "up-down"}-line mr-1`}></i> 
                      {forceType.charAt(0).toUpperCase() + forceType.slice(1)} Force
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Link href="/basic-charges">
            <Button variant="outline">
              <i className="ri-arrow-left-line mr-2"></i> Previous: Basic Charges
            </Button>
          </Link>
          <Link href="/electric-fields">
            <Button>
              Next: Electric Fields <i className="ri-arrow-right-line ml-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoulombsLaw;
