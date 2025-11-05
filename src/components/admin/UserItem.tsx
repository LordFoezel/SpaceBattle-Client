import { BaseText } from "../base/text/BaseText";
import { BaseButtonDelete } from "../base/button/BaseButtonDelete";
import type { User } from "../../models/user";
import { BaseCard } from "../base/layout/BaseCard";
import { TransparentCard } from "../layout/TransparentCard";

interface ItemProps {
  user: User;
  handleDelete: (id: number) => void;
}

const UserItem = function UserItem({
  user,
  handleDelete,
}: ItemProps) {
  return (
    <BaseCard
      key={user.id}
      variant="medium"
      padding="2"
      direction="row"
    >
      <TransparentCard className="flex flex-col gap-2" direction="col">
        <BaseText fontWeight="semibold">{user.name}</BaseText>
        <BaseText fontSize="sm" color="gray-400">
          {user.email}
        </BaseText>
        <BaseText fontSize="xs" color="gray-500">
          {`${user.name}: ${user.role}`} :  {user.verified}
        </BaseText>
      </TransparentCard>
       <BaseButtonDelete
          width="10"
          id={user.id}
          onClick={handleDelete}
        />
    </BaseCard>
  );
};

export { UserItem };
