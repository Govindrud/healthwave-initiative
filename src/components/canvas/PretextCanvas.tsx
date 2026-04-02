import { useEffect, useRef, useCallback } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

interface PretextCanvasProps {
  text: string;
  font?: string;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  gradientColors?: string[];
  maxWidth?: number;
  className?: string;
  animate?: boolean;
}

const PretextCanvas = ({
  text,
  font = 'Inter',
  fontSize = 48,
  lineHeight = 1.3,
  color,
  gradientColors = ['#6b21a8', '#4f46e5'],
  maxWidth = 600,
  className = '',
  animate = true,
}: PretextCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const progressRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const fontStr = `bold ${fontSize}px ${font}`;
    const lh = Math.round(fontSize * lineHeight);

    const prepared = prepareWithSegments(text, fontStr);
    const { lines, height } = layoutWithLines(prepared, maxWidth, lh);

    const canvasW = maxWidth + 40;
    const canvasH = height + 20;

    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = `${canvasW}px`;
    canvas.style.height = `${canvasH}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.font = fontStr;
    ctx.textBaseline = 'top';

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvasW, canvasH);
    gradient.addColorStop(0, gradientColors[0]);
    gradient.addColorStop(1, gradientColors[1]);
    ctx.fillStyle = color || gradient;

    const progress = animate ? progressRef.current : 1;

    for (let i = 0; i < lines.length; i++) {
      const lineProgress = Math.min(1, Math.max(0, progress * lines.length - i));
      if (lineProgress <= 0) continue;

      const y = i * lh + 10;
      const lineText = lines[i].text;

      if (animate && lineProgress < 1) {
        ctx.globalAlpha = lineProgress;
        const charsToShow = Math.ceil(lineText.length * lineProgress);
        ctx.fillText(lineText.substring(0, charsToShow), 10, y);
        ctx.globalAlpha = 1;
      } else {
        ctx.fillText(lineText, 10, y);
      }
    }
  }, [text, font, fontSize, lineHeight, color, gradientColors, maxWidth, animate]);

  useEffect(() => {
    if (!animate) {
      progressRef.current = 1;
      draw();
      return;
    }

    const startTime = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      progressRef.current = Math.min(1, elapsed / duration);
      draw();
      if (progressRef.current < 1) {
        animRef.current = requestAnimationFrame(tick);
      }
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw, animate]);

  // Redraw on resize
  useEffect(() => {
    const onResize = () => {
      progressRef.current = 1;
      draw();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', maxWidth: '100%' }}
    />
  );
};

export default PretextCanvas;
