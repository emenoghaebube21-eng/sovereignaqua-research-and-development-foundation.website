import { auth } from "express-openid-connect";

export function createAuth(config) {
  return auth({
    authRequired: false,
    issuerBaseURL: config.issuerBaseUrl,
    baseURL: config.baseUrl,
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    secret: config.secret,
    authorizationParams: {
      response_type: "code",
      scope: "openid profile email",
      ...(config.audience ? { audience: config.audience } : {})
    },
    routes: {
      login: "/login",
      callback: "/auth/callback",
      logout: "/logout"
    },
    session: {
      rolling: true,
      rollingDuration: 60 * 60 * 1000,
      absoluteDuration: 8 * 60 * 60 * 1000
    },
    auth0Logout: true
  });
}
