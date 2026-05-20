import { useNextGame } from '@/features/next-game/hooks/useNextGame';
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';
 

export function NextGameMatchup() {
  const data = useNextGame();

  if (!data) return null;

  const { game, homeTeam, awayTeam } = data;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
      {/* Home Team */}
      <div className="text-center flex-1">
        <div className="mb-4 flex justify-center">
          <ImageWithFallback src={homeTeam.logo} width={140} alt={`${homeTeam.name} logo`} />
        </div>
        <h3 className="font-heading text-4xl md:text-3xl text-primary tracking-wider">
          {homeTeam.name.toUpperCase()}
        </h3>
        <p className="text-foreground/70">{homeTeam.city.toUpperCase()}</p>
      </div>

      {/* VS */}
      <div className="font-heading text-5xl md:text-7xl text-foreground">VS</div>

      {/* Away Team */}
      <div className="text-center flex-1">
        <div className="mb-4 flex justify-center">
          <ImageWithFallback src={awayTeam.logo} width={140} alt={`${awayTeam.name} logo`} />
        </div>
        <h3 className="font-heading text-4xl md:text-3xl text-foreground tracking-wider">
          {awayTeam.name.toUpperCase()}
        </h3>
        <p className="text-foreground/70">{awayTeam.city.toUpperCase()}</p>
      </div>
    </div>
  );
}
