import { useState, useEffect, useRef } from "react";

interface ChargeProps {
  charge: {
    id: string;
    x: number;
    y: number;
    sign: "positive" | "negative";
    value: number;
  };
  containerRef: React.RefObject<HTMLDivElement>;
}

const ElectricCharge = ({ charge, containerRef }: ChargeProps) => {
  const [position, setPosition] = useState({ x: charge.x, y: charge.y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chargeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update position when charge prop changes
    setPosition({ x: charge.x, y: charge.y });
  }, [charge.x, charge.y]);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (chargeRef.current) {
      const rect = chargeRef.current.getBoundingClientRect();
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top
      });
    }
  };

  const drag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current || !chargeRef.current) return;
    e.preventDefault();

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const chargeRect = chargeRef.current.getBoundingClientRect();
    
    // Calculate new position within container bounds
    const newX = clientX - containerRect.left - dragOffset.x;
    const newY = clientY - containerRect.top - dragOffset.y;
    
    // Keep charge within container bounds
    const minX = 0;
    const maxX = containerRect.width - chargeRect.width;
    const minY = 0;
    const maxY = containerRect.height - chargeRect.height;
    
    setPosition({
      x: Math.max(minX, Math.min(newX, maxX)),
      y: Math.max(minY, Math.min(newY, maxY))
    });
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', drag);
      window.addEventListener('touchmove', drag, { passive: false });
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchend', stopDrag);
    } else {
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('touchmove', drag);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    }

    return () => {
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('touchmove', drag);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging, containerRef]);

  const chargeSize = 48; // 12 * 4px (h-12 w-12 in original design)

  return (
    <div
      ref={chargeRef}
      className={`electric-particle absolute h-12 w-12 rounded-full ${
        charge.sign === 'positive' ? 'bg-destructive' : 'bg-primary'
      } flex items-center justify-center text-white text-xl font-bold cursor-move shadow-md`}
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      data-charge={charge.sign}
      data-value={charge.value}
    >
      {charge.sign === 'positive' ? '+' : '−'}
    </div>
  );
};

export default ElectricCharge;
