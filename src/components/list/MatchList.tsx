import { Match } from "src/models/match";
import { MatchListItem } from "./MatchListItem";
import { TransparentCard } from "../layout/TransparentCard";

interface MatchListProps {
  matches: Match[];
  onDeleted?: () => void;
}

const MatchList = function MatchList(props: MatchListProps) {
  const {
    matches,
    onDeleted,
  } = props;

  return (
    <TransparentCard gap="2" direction="col">
      {matches.map((match) => (
        <MatchListItem match={match} key={match.id} onDeleted={onDeleted} />
      ))}
    </TransparentCard>
  );
}

export { MatchList };
