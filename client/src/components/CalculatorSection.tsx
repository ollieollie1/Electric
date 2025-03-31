import { useState, FormEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const calculatorFormSchema = z.object({
  charge1: z.string().refine((val) => !isNaN(Number(val.replace(/×/g, "*").replace(/⁻/g, "-"))), {
    message: "Must be a valid number in scientific notation",
  }),
  charge2: z.string().refine((val) => !isNaN(Number(val.replace(/×/g, "*").replace(/⁻/g, "-"))), {
    message: "Must be a valid number in scientific notation",
  }),
  distance: z.string().refine((val) => !isNaN(Number(val.replace(/×/g, "*").replace(/⁻/g, "-"))), {
    message: "Must be a valid number in scientific notation",
  }),
});

type CalculatorFormValues = z.infer<typeof calculatorFormSchema>;

const CalculatorSection = () => {
  const [result, setResult] = useState<{ force: string; type: string } | null>(null);

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: {
      charge1: "",
      charge2: "",
      distance: "",
    },
  });

  // Helper function to parse scientific notation
  const parseScientificNotation = (input: string): number => {
    // Replace × with * and ⁻ with - for parsing
    const parseable = input.replace(/×/g, "*").replace(/⁻/g, "-");
    
    // Try to evaluate the expression using Function constructor
    try {
      // This is safe as we've already validated the input is a number
      return Function(`"use strict"; return (${parseable})`)();
    } catch (e) {
      return NaN;
    }
  };

  const calculateForce = (values: CalculatorFormValues) => {
    // Coulomb's constant
    const k = 8.99e9;
    
    // Parse input values
    const q1 = parseScientificNotation(values.charge1);
    const q2 = parseScientificNotation(values.charge2);
    const r = parseScientificNotation(values.distance);
    
    // Calculate force magnitude using Coulomb's law: F = k * |q1 * q2| / r^2
    const forceMagnitude = k * Math.abs(q1 * q2) / (r * r);
    
    // Determine force type (attractive or repulsive)
    const sameSign = (q1 > 0 && q2 > 0) || (q1 < 0 && q2 < 0);
    const forceType = sameSign ? "Repulsive (same signs)" : "Attractive (opposite signs)";
    
    // Format force in scientific notation
    const forceExponent = Math.floor(Math.log10(forceMagnitude));
    const forceMantissa = forceMagnitude / Math.pow(10, forceExponent);
    const formattedForce = `${forceMantissa.toFixed(2)} × 10⁻${Math.abs(forceExponent)} N`;
    
    return {
      force: formattedForce,
      type: forceType
    };
  };

  const handleSubmit = (values: CalculatorFormValues) => {
    try {
      const result = calculateForce(values);
      setResult(result);
    } catch (error) {
      console.error("Calculation error:", error);
      setResult(null);
    }
  };

  return (
    <section id="calculator" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-header font-bold text-2xl md:text-3xl mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Coulomb's Law Calculator
        </h2>

        <div className="max-w-3xl mx-auto bg-card rounded-xl overflow-hidden shadow-md border border-border">
          <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white">
            <h3 className="font-header font-medium text-lg">Calculate Electric Force</h3>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="bg-muted p-4 rounded-lg shadow-sm mb-4 border border-border">
                <div className="font-mono text-center text-xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">F = k × |q₁ × q₂| / r²</div>
                <div className="text-center text-sm text-muted-foreground">
                  <p>k = 8.99 × 10⁹ N·m²/C²</p>
                  <p>(Coulomb's constant)</p>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="charge1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">First Charge (q₁) in Coulombs:</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="e.g., 1.6 × 10⁻¹⁹" 
                              {...field} 
                              className="pr-8"
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">C</div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="charge2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Second Charge (q₂) in Coulombs:</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="e.g., -1.6 × 10⁻¹⁹" 
                              {...field} 
                              className="pr-8"
                            />
                          </FormControl>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">C</div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Distance Between Charges (r) in meters:</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="e.g., 0.01" 
                            {...field} 
                            className="pr-8"
                          />
                        </FormControl>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">m</div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="px-6 py-2 bg-secondary text-white rounded-lg shadow hover:bg-secondary/90 transition-colors"
                  >
                    Calculate Force
                  </Button>
                </div>
              </form>
            </Form>

            {result && (
              <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
                <h4 className="font-header font-medium text-primary mb-2">Result:</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Electric Force (F):</p>
                    <p className="font-mono text-lg">{result.force}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Type of Force:</p>
                    <p>
                      <span className={`inline-flex items-center ${
                        result.type.includes("Attractive") ? "text-secondary" : "text-primary"
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {result.type.includes("Attractive") ? (
                            <path d="M8 12h8M12 16V8" />
                          ) : (
                            <path d="M8 18l4-4 4 4M8 6l4 4 4-4" />
                          )}
                        </svg>
                        {result.type}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          <h3 className="font-header font-medium text-lg text-primary mb-4">Examples:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-4 rounded-lg shadow-md border border-border">
              <h4 className="font-medium mb-2 text-primary">Example 1: Elementary Charges</h4>
              <ul className="text-sm space-y-1">
                <li><strong className="text-primary">q₁:</strong> 1.60 × 10⁻¹⁹ C (proton)</li>
                <li><strong className="text-secondary">q₂:</strong> -1.60 × 10⁻¹⁹ C (electron)</li>
                <li><strong>r:</strong> 5.3 × 10⁻¹¹ m (Bohr radius)</li>
                <li><strong>F:</strong> 8.2 × 10⁻⁸ N <span className="text-secondary">(attractive)</span></li>
              </ul>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-md border border-border">
              <h4 className="font-medium mb-2 text-primary">Example 2: Macro Charges</h4>
              <ul className="text-sm space-y-1">
                <li><strong className="text-primary">q₁:</strong> 2.0 × 10⁻⁶ C</li>
                <li><strong className="text-primary">q₂:</strong> 3.0 × 10⁻⁶ C</li>
                <li><strong>r:</strong> 0.15 m</li>
                <li><strong>F:</strong> 2.4 N <span className="text-primary">(repulsive)</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
