import { BaseButton } from "../../base/button/BaseButton";
import { BaseText } from "../../base/text/BaseText";
import { TransparentCard } from "../TransparentCard";

interface PlayerSelectionIndicatorProps {
  playerName?: string;
  onPrevious: () => void;
  onNext: () => void;
  isDisabled?: boolean;
}

export function PlayerSelectionIndicator({
  playerName,
  onPrevious,
  onNext,
  isDisabled = false,
}: PlayerSelectionIndicatorProps) {

  return (
    <TransparentCard
      direction="row"
      gap="3"
      justify="center"
      items="center"
      width="full"
      padding="2"
    >
      <BaseButton
        name="player-nav-previous"
        onClick={onPrevious}
        isDisabled={isDisabled}
        size="sm"
        width="auto"
      >
        {"<"}
      </BaseButton>
      <BaseText fontSize="xl" fontWeight="bold" color="gray-100" width="auto">
        {playerName}
      </BaseText>
      <BaseButton
        name="player-nav-next"
        onClick={onNext}
        isDisabled={isDisabled}
        size="sm"
        width="auto"
      >
        {">"}
      </BaseButton>
    </TransparentCard>
  );
}
