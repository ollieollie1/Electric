import { useState, useEffect, useRef } from 'react';

interface CoulombsLawVisualizationProps {
  charge1: number;
  charge2: number;
  distance: number;
}

const CoulombsLawVisualization = ({ charge1, charge2, distance }: CoulombsLawVisualizationProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [forceStrength, setForceStrength] = useState(0);
  const [forceType, setForceType] = useState<'attractive' | 'repulsive'>('attractive');

  useEffect(() => {
    // Calculate Coulomb's Law
    const k = 8.99e9; // Coulomb's constant
    const force = k * Math.abs(charge1 * charge2) / (distance * distance);
    
    // Normalize force for visualization
    const maxForce = 1e-7;
    const normalizedForce = Math.min(force / maxForce, 1);
    
    setForceStrength(normalizedForce);
    
    // Determine force type
    const sameSign = (charge1 > 0 && charge2 > 0) || (charge1 < 0 && charge2 < 0);
    setForceType(sameSign ? 'repulsive' : 'attractive');
  }, [charge1, charge2, distance]);

  const charge1Sign = charge1 > 0 ? 'positive' : 'negative';
  const charge2Sign = charge2 > 0 ? 'positive' : 'negative';

  return (
    <div 
      ref={canvasRef}
      className="aspect-video bg-white rounded-lg shadow-inner mb-4 relative overflow-hidden"
    >
      {/* Left charge */}
      <div 
        className={`absolute left-1/4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full ${
          charge1Sign === 'positive' ? 'bg-destructive' : 'bg-primary'
        } flex items-center justify-center text-white font-bold`}
      >
        {charge1Sign === 'positive' ? '+' : '−'}
      </div>
      
      {/* Right charge */}
      <div 
        className={`absolute right-1/4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full ${
          charge2Sign === 'positive' ? 'bg-destructive' : 'bg-primary'
        } flex items-center justify-center text-white font-bold`}
      >
        {charge2Sign === 'positive' ? '+' : '−'}
      </div>
      
      {/* Force line indicator */}
      <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-center">
        <div 
          className={`h-0.5 ${forceType === 'attractive' ? 'bg-secondary' : 'bg-destructive'} pulse`}
          style={{ 
            width: `${50 * forceStrength}%`,
            opacity: forceStrength
          }}
        ></div>
      </div>
      
      {/* Directional arrows based on force type */}
      {forceType === 'attractive' ? (
        <>
          <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 text-secondary">
            <i className="ri-arrow-right-line text-xl"></i>
          </div>
          <div className="absolute right-1/3 top-1/2 transform -translate-y-1/2 text-secondary">
            <i className="ri-arrow-left-line text-xl"></i>
          </div>
        </>
      ) : (
        <>
          <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 text-destructive">
            <i className="ri-arrow-left-line text-xl"></i>
          </div>
          <div className="absolute right-1/3 top-1/2 transform -translate-y-1/2 text-destructive">
            <i className="ri-arrow-right-line text-xl"></i>
          </div>
        </>
      )}
    </div>
  );
};

export default CoulombsLawVisualization;
