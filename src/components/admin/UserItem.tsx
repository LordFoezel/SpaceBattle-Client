import { BaseText } from "../base/text/BaseText";
import { BaseButtonDelete } from "../base/button/BaseButtonDelete";
import type { User } from "../../models/user";
import { BaseCard } from "../base/layout/BaseCard";
import { TransparentCard } from "../layout/TransparentCard";
import { BaseEditModal } from "../base/modal/BaseEditModal";
import { RoleLabel } from "../label/RoleLabel";
import { VerifiedLabel } from "../label/VerifiedLabel";
import { BlockedLabel } from "../label/BlockedLabel";

interface ItemProps {
  user: User;
  handleDelete: (id: number) => void;
  handleUpdate: (update: { id: number;[key: string]: any }) => void;
}

const UserItem = function UserItem({
  user,
  handleDelete,
  handleUpdate,
}: ItemProps) {

  function onChangeRole(e: any) {
    user.role = e.target.value;
    handleUpdate({ id: user.id, role: e.target.value })
  }
  function onChangeVerified(e: any) {
    user.role = e.target.value;
    handleUpdate({ id: user.id, verified: e.target.value })
  }
  function onChangeBlocked(e: any) {
    user.role = e.target.value;
    handleUpdate({ id: user.id, blocked: e.target.value })
  }

  return (
    <BaseCard
      key={user.id}
      variant="medium"
      padding="2"
      direction="row"
      items="start"
      justify="between"
      gap="3"
    >
      <TransparentCard className="flex flex-col gap-2" direction="col">
        <BaseText fontWeight="semibold">{user.name}</BaseText>
        <BaseEditModal
          title={`${globalThis.t("core.edit")}`}
          PageTitle={user.email}
          showSave={false}
        >
          <TransparentCard direction="col" gap="3">
            <RoleLabel value={user.role} onChange={onChangeRole} />
            <VerifiedLabel value={user.verified} onChange={onChangeVerified} />
            <BlockedLabel value={user.blocked} onChange={onChangeBlocked} />
          </TransparentCard>
        </BaseEditModal>
        <BaseButtonDelete
          width="10"
          id={user.id}
          onClick={handleDelete}
        />
      </TransparentCard>
    </BaseCard>
  );
};

export { UserItem };
