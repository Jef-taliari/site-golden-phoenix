
interface NextGameCountdownProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}


export function NextGameCountdown({ timeLeft }: NextGameCountdownProps) {
  const items = [
    { label: 'DIAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-background border border-ring/30 rounded p-6 text-center"
        >
          <div className="font-heading text-5xl md:text-6xl text-primary mb-2">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-foreground/70 text-sm tracking-widest">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
