import { UserRepository } from "./user-repository.js";

export function createIdentityMiddleware(db) {
  const users = new UserRepository(db);

  return async function identityMiddleware(req, res, next) {
    if (!req.oidc?.isAuthenticated()) return next();

    try {
      const claims = req.oidc.user || {};
      if (!claims.sub || !claims.email || claims.email_verified !== true) {
        return res.status(403).json({ error: "verified_email_required" });
      }

      const appUser = await users.upsertFromIdentity({
        subject: claims.sub,
        email: claims.email,
        emailVerified: true,
        displayName: claims.name || null
      });

      const roles = await users.rolesForUser(appUser.id);
      req.appUser = { ...appUser, roles };
      return next();
    } catch (error) {
      return next(error);
    }
  };
}
