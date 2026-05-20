import { Calendar, MapPin, Clock } from 'lucide-react';
import { useNextGame } from '@/features/next-game/hooks/useNextGame';

export function NextGameDetails() {
  const data = useNextGame();

  if (!data) return null;

  const { game, homeTeam, awayTeam } = data;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).toUpperCase();
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="flex items-center gap-3 text-foreground">
        <Calendar className="text-primary" size={24} />
        <div>
          <p className="text-sm text-foreground/70">Data</p>
          <p className="font-heading text-xl">{formatDate(game.date)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-foreground">
        <Clock className="text-primary" size={24} />
        <div>
          <p className="text-sm text-foreground/70">Horário</p>
          <p className="font-heading text-xl">19:00</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-foreground">
        <MapPin className="text-primary" size={24} />
        <div>
          <p className="text-sm text-foreground/70">Local</p>
          <p className="font-heading text-xl">{game.venue.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}
