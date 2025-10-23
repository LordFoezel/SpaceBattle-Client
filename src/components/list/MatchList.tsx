import { Match } from "src/models/match";
import { MatchListItem } from "./MatchListItem";
import { TransparentCard } from "../layout/TransparentCard";

interface MatchListProps {
    matches: Match[];
}

const MatchList = function MatchList(props: MatchListProps) {
    const {
        matches,
    } = props;

    return (
        <TransparentCard gap="2" direction="col">
          {matches.map((match) => (
            <MatchListItem match={match} key={match.id} />
          ))}
        </TransparentCard>
    );
}

export { MatchList };
