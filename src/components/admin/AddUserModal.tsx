import { useState } from "react";

import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { NameLabel } from "../label/NameLabel";
import { EmailLabel } from "../label/EmailLabel";
import { PasswordLabel } from "../label/PasswordLabel";
import { RoleLabel } from "../label/RoleLabel";
import { VerifiedLabel } from "../label/VerifiedLabel";
import { BlockedLabel } from "../label/BlockedLabel";
import { IconPlus } from "../icon/IconPlus";
import { ErrorHelper } from "../../helper/errorHelper.js";
import { createOne as createUser, updateOne as updateUser } from "../../repositories/user";
import { UserRole } from "../../models/user";

interface AddUserModalProps {
  onCreated?: () => void;
}

const AddUserModal = function AddUserModal({ onCreated }: AddUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.PLAYER);
  const [verified, setVerified] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setRole(UserRole.PLAYER);
    setVerified(false);
    setBlocked(false);
    setIsSubmitting(false);
  }

  function parseCheckboxValue(event: any) {
    const target = event?.target ?? {};
    if (typeof target.checked === "boolean") {
      return target.checked;
    }
    if (typeof target.value === "string") {
      const v = target.value.toLowerCase();
      return v === "true" || v === "1" || v === "on";
    }
    return !!target.value;
  }

  async function handleConfirm() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !password || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const created = await createUser({
        name: trimmedName,
        email: trimmedEmail,
        password_hash: password,
      });

      const updates: Record<string, any> = {};
      if (created.role !== role) updates.role = role;
      if (Boolean(created.verified) !== verified) updates.verified = verified;
      if (Boolean(created.blocked) !== blocked) updates.blocked = blocked;

      if (Object.keys(updates).length > 0) {
        await updateUser(created.id, updates);
      }

      onCreated?.();
      resetForm();
    } catch (error) {
      ErrorHelper.handleError(error);
      setIsSubmitting(false);
    }
  }

  const addLabel = globalThis.t?.("core.add") ?? "Add";
  const title = globalThis.t?.("users.add") ?? "Add user";
  const confirmLabel = globalThis.t?.("core.create") ?? "Create";
  const disabledSave = isSubmitting || !name.trim() || !email.trim() || !password;

  return (
    <BaseModal
      title={title}
      placement="top"
      buttonText={addLabel}
      confirmText={confirmLabel}
      onConfirm={handleConfirm}
      onClose={resetForm}
      disabledSave={disabledSave}
      triggerChildren={<IconPlus />}
      triggerProps={{
        name: "add",
        size: "sm",
        colorScheme: "blue",
        width: "10",
        "aria-label": addLabel,
      }}
    >
      <TransparentCard direction="col" gap="3">
        <NameLabel value={name} onChange={(event) => setName(event.target.value)} />
        <EmailLabel value={email} onChange={(event) => setEmail(event.target.value)} />
        <PasswordLabel value={password} onChange={(event) => setPassword(event.target.value)} />
        <RoleLabel value={role} onChange={(event) => setRole(event.target.value as UserRole)} />
        <VerifiedLabel
          value={verified}
          onChange={(event) => setVerified(parseCheckboxValue(event))}
        />
        <BlockedLabel
          value={blocked}
          onChange={(event) => setBlocked(parseCheckboxValue(event))}
        />
      </TransparentCard>
    </BaseModal>
  );
};

export { AddUserModal };
