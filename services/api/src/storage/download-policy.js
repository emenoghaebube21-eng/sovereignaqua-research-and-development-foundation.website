export function validateDownloadContext({ document, user, hasPermission }) {
  if (!document || !user) throw new Error("unauthorized");
  if (document.status !== "available") throw new Error("document_unavailable");

  const owner = document.owner_user_id === user.id;
  const privileged = hasPermission(user.roles, "document:read:authorized");

  if (!owner && !privileged) throw new Error("forbidden");
  return true;
}
