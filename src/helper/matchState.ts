import { Match, MatchState } from "../models/match";

export function checkMatchState(match: Match): string {
  return match.state === MatchState.GAME ? `/game/${match.id}` : `/match/${match.id}`;
}

