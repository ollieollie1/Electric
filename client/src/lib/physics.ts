// Constants
const COULOMB_CONSTANT = 8.99e9; // k in N·m²/C²

// Types
export interface Charge {
  id: string;
  x: number;
  y: number;
  sign: "positive" | "negative";
  value: number; // in coulombs
}

export interface Point {
  x: number;
  y: number;
}

export interface Vector {
  x: number;
  y: number;
  magnitude: number;
}

// Calculate electric field at a given point
export function calculateElectricFieldVector(charges: Charge[], x: number, y: number): Vector {
  let fieldX = 0;
  let fieldY = 0;

  charges.forEach(charge => {
    // Vector from charge to point
    const dx = x - (charge.x + 24); // Adding 24px to get center of charge element
    const dy = y - (charge.y + 24);
    
    // Distance squared (r²)
    const rSquared = dx * dx + dy * dy;
    
    if (rSquared < 100) {
      // Skip if too close to the charge to avoid division by zero
      return;
    }
    
    // Magnitude of field at this point from this charge (k * q / r²)
    const fieldMagnitude = COULOMB_CONSTANT * Math.abs(charge.value) / rSquared;
    
    // Direction of field (unit vector)
    const distance = Math.sqrt(rSquared);
    const ux = dx / distance;
    const uy = dy / distance;
    
    // Add field contribution (positive charges point outward, negative inward)
    const sign = charge.value > 0 ? 1 : -1;
    fieldX += sign * fieldMagnitude * ux;
    fieldY += sign * fieldMagnitude * uy;
  });

  const magnitude = Math.sqrt(fieldX * fieldX + fieldY * fieldY);
  
  return {
    x: fieldX,
    y: fieldY,
    magnitude
  };
}

// Calculate electric field line starting from a given point
export function calculateElectricField(
  charges: Charge[], 
  startX: number, 
  startY: number, 
  initialAngle: number,
  outward: boolean,
  maxWidth: number,
  maxHeight: number,
  fieldStrength: number = 1
): Point[] {
  const points: Point[] = [];
  const stepSize = 5 * fieldStrength;
  const maxSteps = 100;
  
  let x = startX;
  let y = startY;
  
  // Add initial offset based on angle to start outside charge
  x += Math.cos(initialAngle) * 15;
  y += Math.sin(initialAngle) * 15;
  
  points.push({ x, y });
  
  for (let i = 0; i < maxSteps; i++) {
    const field = calculateElectricFieldVector(charges, x, y);
    
    if (field.magnitude < 1e-6) break; // Stop if field too weak
    
    // Normalize field direction
    const fx = field.x / field.magnitude;
    const fy = field.y / field.magnitude;
    
    // Move in the direction of the field (or opposite if outward is false)
    const direction = outward ? 1 : -1;
    x += direction * fx * stepSize;
    y += direction * fy * stepSize;
    
    // Check if point is out of bounds
    if (x < 0 || x > maxWidth || y < 0 || y > maxHeight) {
      break;
    }
    
    // Check if point is too close to a charge
    let tooCloseToCharge = false;
    for (const charge of charges) {
      const dx = x - (charge.x + 24);
      const dy = y - (charge.y + 24);
      const distanceSquared = dx * dx + dy * dy;
      
      if (distanceSquared < 225) { // 15px radius
        tooCloseToCharge = true;
        break;
      }
    }
    
    if (tooCloseToCharge) break;
    
    points.push({ x, y });
  }
  
  return points;
}

// Calculate equipotential lines
export function calculateEquipotential(
  charges: Charge[],
  potentialValue: number,
  width: number,
  height: number
): Point[] {
  const points: Point[] = [];
  const gridSize = 10;
  
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      const potential1 = calculateElectricPotential(charges, x, y);
      
      // Check adjacent points
      const adjacentPoints = [
        { x: x + gridSize, y },
        { x, y: y + gridSize }
      ];
      
      for (const adjPoint of adjacentPoints) {
        if (adjPoint.x >= width || adjPoint.y >= height) continue;
        
        const potential2 = calculateElectricPotential(charges, adjPoint.x, adjPoint.y);
        
        // Check if equipotential line crosses between these points
        if ((potential1 - potentialValue) * (potential2 - potentialValue) <= 0) {
          // Linear interpolation to find more precise point
          const t = Math.abs((potential1 - potentialValue) / (potential1 - potential2));
          const interpX = x + t * (adjPoint.x - x);
          const interpY = y + t * (adjPoint.y - y);
          
          points.push({ x: interpX, y: interpY });
        }
      }
    }
  }
  
  return points;
}

// Calculate electric potential at a point
export function calculateElectricPotential(charges: Charge[], x: number, y: number): number {
  let potential = 0;
  
  charges.forEach(charge => {
    const dx = x - (charge.x + 24);
    const dy = y - (charge.y + 24);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 10) return; // Skip if too close
    
    // V = k * q / r
    potential += COULOMB_CONSTANT * charge.value / distance;
  });
  
  return potential;
}

// Calculate Coulomb's force between two charges
export function calculateCoulombForce(
  charge1: number, 
  charge2: number, 
  distance: number
): { forceMagnitude: number; isAttractive: boolean } {
  const forceMagnitude = COULOMB_CONSTANT * Math.abs(charge1 * charge2) / (distance * distance);
  const isAttractive = (charge1 > 0 && charge2 < 0) || (charge1 < 0 && charge2 > 0);
  
  return { forceMagnitude, isAttractive };
}
