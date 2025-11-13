import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";
import { fetchById as fetchMatchById } from "../../repositories/matches";
import { createOne as createPlayer } from "../../repositories/players";
import { ErrorHelper } from "../../helper/errorHelper";
import { useNavigate } from "react-router-dom";
import { AuthTokenHelper } from "../../helper/authToken.js";
import { fetchOne as fetchPlayer } from "../../repositories/players";
import { IconLogin } from "../icon/IconLogin";
import { fetchOne as fetchOneFleet, createOne as createOneFleet } from "../../repositories/fleet";
import {
  fetchAll as fetchConfig,
} from "../../repositories/config_fleet_ship";
import { ShipDirection } from "../../models/fleet";

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
            const shipConfigs = await fetchConfig({ config_fleet_id: match.config.fleet_config_id });
            shipConfigs.forEach(async (shipConfig) => {
              let count = 1;
              while (count <= shipConfig.count) {
                const ident = `${player.id}-${match.id}-${shipConfig.ship_id}-${count}`;
                const existingFleet = await fetchOneFleet({ ident });
                if (!existingFleet) {
                  createOneFleet({ ident, player_id: player.id, match_id: match.id, ship_id: shipConfig.ship_id, position_x: null, position_y: null, direction: ShipDirection.HORIZONTAL })
                }
                count++;
              }
            });
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
        const shipConfigs = await fetchConfig({ config_fleet_id: match.config.fleet_config_id });
        for (const shipConfig of shipConfigs) {
          console.log(shipConfig.count, 'count', shipConfig.ship_id, 'ship');
          if (shipConfig.count === 0) continue;
          let count = 1;
          while (count <= shipConfig.count) {
            const ident = `${newPlayer.id}_${match.id}_${shipConfig.ship_id}_${count}`;
            const existingFleet = await fetchOneFleet({ where: { ident } });
            console.log(existingFleet, { where: { ident } } );
            
            if (!existingFleet) {
              await createOneFleet({ ident, player_id: newPlayer.id, match_id: match.id, ship_id: shipConfig.ship_id, position_x: null, position_y: null, direction: ShipDirection.HORIZONTAL })
            }
            count++;
          }
        };
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



