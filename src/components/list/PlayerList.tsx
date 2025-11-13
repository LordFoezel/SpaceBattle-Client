import { Player } from "src/models/player";
import { TransparentCard } from "../layout/TransparentCard";
import { PlayerListItem } from "./PlayerListItem";

interface ListProps {
  players: Player[];
  matchId: number;
  onDeleted?: (id: number) => void;
  onChangeState: () => void;
}

const PlayerList = function PlayerList(props: ListProps) {
  const {
    players,
    matchId,
    onDeleted,
    onChangeState,
  } = props;

  return (
    <TransparentCard gap="2" direction="col">
      {players.map((player) => (
        <PlayerListItem player={player} key={player.id} onDeleted={onDeleted} onChangeState={onChangeState} matchId={matchId} />
      ))}
    </TransparentCard>
  );
}

export { PlayerList };
