import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";
import { fetchById as fetchMatchById } from "../../repositories/matches";
import { createOne as createPlayer } from "../../repositories/players";
import { ErrorHelper } from "../../helper/errorHelper";
import { useNavigate } from "react-router-dom";
import { AuthTokenHelper } from "../../helper/authToken.js";
import { fetchOne as fetchPlayer } from "../../repositories/players";
import { IconLogin } from "../icon/IconLogin";

interface JoinButtonProps {
  isDisabled?: boolean;
  matchId: number;
}

const JoinButton = function JoinButton({
  isDisabled,
  matchId,
}: JoinButtonProps) {

  const navigate = useNavigate();

  function onClick() {
    (async () => {
      try {
        const match = await fetchMatchById(matchId);
        if (!match) {
          globalThis.notify.error(globalThis.t("error.notFound", ["core.match"]));
          return;
        }

        const { id: userId, name: userName } = AuthTokenHelper.getUserIdentity();

        try {
          const player = await fetchPlayer({ where: { userId, matchId } });
          if (player) {
            window.localStorage.setItem("spacebattle.playerId", `${player.id}`);
            navigate(`/match/${match.id}`, { replace: true });
            return;
          }
        } catch (error) {
          ErrorHelper.handleError(error);
        }

        const maxPlayers = match.config?.player_count ?? 0;
        const currentPlayers = match.current_player_count ?? 0;
        if (maxPlayers > 0 && currentPlayers >= maxPlayers) {
          globalThis.notify.warning(globalThis.t("error.code.MATCH_FULL") ?? globalThis.t("core.full"));
          return;
        }


        const newPlayer = await createPlayer({
          name: userName,
          user_id: userId,
          match_id: match.id,
        });

        window.localStorage.setItem("spacebattle.playerId", `${newPlayer.id}`);
        navigate(`/match/${match.id}`, { replace: true });
      } catch (error) {
        ErrorHelper.handleError(error);
      }
    })();
  }

  return (
    <BaseButton name="join" onClick={onClick} isDisabled={isDisabled} size="sm" height="full">
      <ButtonText>
        <IconLogin />
      </ButtonText>
    </BaseButton>
  );
};

export { JoinButton };



