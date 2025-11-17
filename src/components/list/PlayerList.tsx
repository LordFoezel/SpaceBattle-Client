import { Player } from "src/models/player";
import { TransparentCard } from "../layout/TransparentCard";
import { PlayerListItem } from "./PlayerListItem";
import { Match } from "src/models/match";

interface ListProps {
  players: Player[];
  match: Match;
  onDeleted?: (id: number) => void;
  onChangeState: () => void;
}

const PlayerList = function PlayerList(props: ListProps) {
  const {
    players,
    match,
    onDeleted,
    onChangeState,
  } = props;

  return (
    <TransparentCard gap="2" direction="col">
      {players.map((player) => (
        <PlayerListItem player={player} key={player.id} onDeleted={onDeleted} onChangeState={onChangeState} match={match} />
      ))}
    </TransparentCard>
  );
}

export { PlayerList };
