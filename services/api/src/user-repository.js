export class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async upsertFromIdentity(identity) {
    const result = await this.db.query(
      `insert into app_users
        (provider_subject, email, email_verified, display_name, status)
       values ($1, $2, $3, $4, 'pending')
       on conflict (provider_subject) do update set
         email = excluded.email,
         email_verified = excluded.email_verified,
         display_name = excluded.display_name,
         updated_at = now()
       returning id, provider_subject, email, email_verified, display_name, status`,
      [
        identity.subject,
        identity.email,
        identity.emailVerified,
        identity.displayName
      ]
    );

    return result.rows[0];
  }

  async rolesForUser(userId) {
    const result = await this.db.query(
      `select r.name
         from user_roles ur
         join roles r on r.id = ur.role_id
        where ur.user_id = $1
        order by r.name`,
      [userId]
    );
    return result.rows.map((row) => row.name);
  }
}
