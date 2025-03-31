import { useRef, useEffect } from 'react';
import { calculateElectricField, calculateEquipotential } from '@/lib/physics';

interface ElectricFieldProps {
  charges: Array<{
    id: string;
    x: number;
    y: number;
    sign: "positive" | "negative";
    value: number;
  }>;
  isSimulationRunning: boolean;
  visualizationMode: "fieldLines" | "equipotential";
  fieldStrength: number;
}

const ElectricField = ({ 
  charges, 
  isSimulationRunning, 
  visualizationMode,
  fieldStrength 
}: ElectricFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Draw electric field lines
  useEffect(() => {
    if (!svgRef.current || charges.length === 0 || !isSimulationRunning) return;

    const svg = svgRef.current;
    // Clear previous lines
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    if (visualizationMode === "fieldLines") {
      // Draw field lines
      const svgNS = "http://www.w3.org/2000/svg";
      const svgWidth = svg.clientWidth;
      const svgHeight = svg.clientHeight;

      charges.forEach(charge => {
        const numLines = Math.abs(charge.value) * 8; // More lines for stronger charges
        const angleStep = (2 * Math.PI) / numLines;

        for (let i = 0; i < numLines; i++) {
          const angle = i * angleStep;
          const startX = charge.x + 24; // Center of charge (12px radius)
          const startY = charge.y + 24;

          // Create path for field line
          const path = document.createElementNS(svgNS, "path");
          
          let pathData = `M ${startX},${startY}`;
          
          // Calculate field line points
          const points = calculateElectricField(
            charges, 
            startX, 
            startY, 
            angle, 
            charge.sign === "positive",
            svgWidth,
            svgHeight,
            fieldStrength
          );
          
          points.forEach(point => {
            pathData += ` L ${point.x},${point.y}`;
          });
          
          path.setAttribute("d", pathData);
          path.setAttribute("stroke", "#42a5f5");
          path.setAttribute("stroke-width", "1.5");
          path.setAttribute("fill", "none");
          path.classList.add("field-line");
          
          svg.appendChild(path);
        }
      });
    } else {
      // Draw equipotential lines
      const svgNS = "http://www.w3.org/2000/svg";
      const svgWidth = svg.clientWidth;
      const svgHeight = svg.clientHeight;
      
      // Create contours at different potential values
      const potentialLevels = [-500, -200, -100, -50, -20, -10, 10, 20, 50, 100, 200, 500];
      
      potentialLevels.forEach(level => {
        const contour = calculateEquipotential(
          charges, 
          level, 
          svgWidth, 
          svgHeight
        );
        
        if (contour.length > 2) {
          const path = document.createElementNS(svgNS, "path");
          
          let pathData = `M ${contour[0].x},${contour[0].y}`;
          
          for (let i = 1; i < contour.length; i++) {
            pathData += ` L ${contour[i].x},${contour[i].y}`;
          }
          
          path.setAttribute("d", pathData);
          path.setAttribute("stroke", "#9c27b0");
          path.setAttribute("stroke-width", "1");
          path.setAttribute("fill", "none");
          path.setAttribute("stroke-dasharray", "3,3");
          
          svg.appendChild(path);
        }
      });
    }
    
  }, [charges, isSimulationRunning, visualizationMode, fieldStrength]);

  return (
    <svg 
      ref={svgRef}
      className="absolute inset-0"
      width="100%"
      height="100%"
      style={{ pointerEvents: 'none' }}
    ></svg>
  );
};

export default ElectricField;
