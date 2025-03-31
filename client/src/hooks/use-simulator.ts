import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

interface Charge {
  id: string;
  x: number;
  y: number;
  sign: "positive" | "negative";
  value: number;
}

interface AddChargeParams {
  sign: "positive" | "negative";
  value: number;
}

export function useSimulator(containerRef: React.RefObject<HTMLDivElement>) {
  const [charges, setCharges] = useState<Charge[]>([]);
  const [fieldStrength, setFieldStrength] = useState(0.5); // 0 to 1
  const [chargeMagnitude, setChargeMagnitude] = useState(5); // 1 to 10

  // Add a new charge to the simulator
  const addCharge = ({ sign, value }: AddChargeParams) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Random position within the container
    const x = Math.random() * (containerWidth - 50) + 25;
    const y = Math.random() * (containerHeight - 50) + 25;

    const newCharge: Charge = {
      id: nanoid(),
      x,
      y,
      sign,
      value: sign === "positive" ? Math.abs(value) : -Math.abs(value)
    };

    setCharges((prevCharges) => [...prevCharges, newCharge]);
  };

  // Reset the simulation
  const resetSimulation = () => {
    setCharges([]);
  };

  // Update field strength
  const updateFieldStrength = (value: number) => {
    setFieldStrength(value / 100); // Convert 0-100 to 0-1
  };

  // Update charge magnitude
  const updateChargeMagnitude = (value: number) => {
    setChargeMagnitude(value);
  };

  // Initialize with two charges for demo
  useEffect(() => {
    if (charges.length === 0 && containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Create initial charges
      const initialCharges: Charge[] = [
        {
          id: nanoid(),
          x: containerWidth * 0.25 - 24,
          y: containerHeight * 0.33 - 24,
          sign: "positive",
          value: 1
        },
        {
          id: nanoid(),
          x: containerWidth * 0.75 - 24,
          y: containerHeight * 0.66 - 24,
          sign: "negative",
          value: -1
        }
      ];

      setCharges(initialCharges);
    }
  }, [containerRef.current]);

  return {
    charges,
    addCharge,
    resetSimulation,
    updateFieldStrength,
    updateChargeMagnitude,
  };
}
