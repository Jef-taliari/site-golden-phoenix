import { useEffect, useState } from 'react';

export interface CountdownTimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

/**
 * Hook customizado para gerenciar a lógica de contagem regressiva (countdown).
 * Atualiza o estado a cada segundo até atingir a data alvo especificada.
 *
 * @param targetDateString String de data no formato aceito pelo construtor Date (ex: "2026-06-15T19:00:00")
 */
export function useCountdown(targetDateString: string): CountdownTimeLeft {
  const [timeLeft, setTimeLeft] = useState<CountdownTimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const targetDate = new Date(targetDateString).getTime();

    const calculateTimeLeft = (): boolean => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return true;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        isCompleted: false,
      });
      return false;
    };

    // Executa imediatamente para evitar delay de 1s na primeira renderização
    const completed = calculateTimeLeft();
    if (completed) return;

    const interval = setInterval(() => {
      const completed = calculateTimeLeft();
      if (completed) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateString]);

  return timeLeft;
}
