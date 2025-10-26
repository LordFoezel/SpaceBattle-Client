import { Player } from "src/models/player";
import { TransparentCard } from "../layout/TransparentCard";
import { PlayerListItem } from "./PlayerListItem";

interface ListProps {
  players: Player[];
  onDeleted?: () => void;
}

const PlayerList = function PlayerList(props: ListProps) {
  const {
    players,
    onDeleted,
  } = props;

  return (
    <TransparentCard gap="2" direction="col">
      {players.map((player) => (
        <PlayerListItem player={player} key={player.id} onDeleted={onDeleted} />
      ))}
    </TransparentCard>
  );
}

export { PlayerList };
