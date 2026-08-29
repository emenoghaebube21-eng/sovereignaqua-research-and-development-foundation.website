const ROLE_PERMISSIONS = Object.freeze({
  applicant: ["application:create", "application:read:own", "application:update:own"],
  member: [
    "application:create",
    "application:read:own",
    "application:update:own",
    "asset:create",
    "asset:read:own",
    "asset:update:own"
  ],
  researcher: ["research:read"],
  reviewer: [
    "application:read:assigned",
    "application:review",
    "asset:read:assigned",
    "asset:review"
  ],
  administrator: [
    "user:read",
    "application:read:authorized",
    "application:review",
    "asset:read:authorized",
    "asset:review",
    "audit:read"
  ],
  trustee: [
    "user:read",
    "application:read:authorized",
    "application:review",
    "asset:read:authorized",
    "asset:review",
    "audit:read",
    "role:manage"
  ],
  super_admin: ["*"]
});

export function permissionsForRoles(roles = []) {
  const permissions = new Set();
  for (const role of roles) {
    for (const permission of ROLE_PERMISSIONS[role] || []) permissions.add(permission);
  }
  return permissions;
}

export function hasPermission(roles, permission) {
  const permissions = permissionsForRoles(roles);
  return permissions.has("*") || permissions.has(permission);
}

export function canAccessOwnRecord(userId, ownerUserId) {
  return Boolean(userId) && Boolean(ownerUserId) && userId === ownerUserId;
}

export function requirePermission(permission) {
  return (req, res, next) => {
    const roles = req.appUser?.roles || [];
    if (!hasPermission(roles, permission)) {
      return res.status(403).json({ error: "forbidden" });
    }
    next();
  };
}
