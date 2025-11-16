import { TransparentCard } from "../TransparentCard";
import { BaseText } from "../../base/text/BaseText";
import type { Player } from "../../../models/player";
import { BaseSeparator } from "../../../components/base/text/BaseSeparator";

interface PlayerTurnStripProps {
  players: Player[];
  currentIndex: number;
}

export function PlayerTurnStrip({ players, currentIndex }: PlayerTurnStripProps) {
  const currentPosition = players.findIndex((player) => player.sequence === currentIndex);
  const safeIndex = currentPosition >= 0 ? currentPosition : 0;
  const pickPlayer = (offset: number) => {
    if (players.length === 0) return null;
    const nextIndex = (safeIndex + offset + players.length) % players.length;
    return players[nextIndex] ?? null;
  };

  const slots = [
    {
      key: "previous",
      label: globalThis.t?.("game.previousPlayer"),
      player: pickPlayer(-1),
      fontSize: "xs",
      fontWeight: "light",
      color: "gray-300",
      alligment: "start"
    },
    {
      key: "current",
      label: globalThis.t?.("game.currentPlayer"),
      player: pickPlayer(0),
      fontSize: "xl",
      fontWeight: "normal",
      color: "gray-100",
      alligment: "center"
    },
    {
      key: "next",
      label: globalThis.t?.("game.nextPlayer"),
      player: pickPlayer(1),
      fontSize: "xs",
      fontWeight: "light",
      color: "gray-200",
      alligment: "end"
    },
  ];

  return (
    <TransparentCard
      direction="col"
      gap="2"
      padding="0"
    >
      <TransparentCard
        direction="row"
        gap="0"
        padding="0"
      >
        {slots.map(({ key, label, player, fontSize, fontWeight, color, alligment }) => (
          <TransparentCard
            key={key}
            direction="col"
            width="full"
            justify="end"
            className="player-turn-strip__slot"
          >
            <BaseText fontSize={fontSize} fontWeight={fontWeight} color={color} alligment={alligment}>
              {player?.name}
            </BaseText>
          </TransparentCard>
        ))}
      </TransparentCard>
        <BaseSeparator color="gray-300" />
    </TransparentCard>
  );
}
