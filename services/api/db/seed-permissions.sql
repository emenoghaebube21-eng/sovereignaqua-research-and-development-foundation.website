insert into permissions (name, description) values
  ('application:create', 'Create an application'),
  ('application:read:own', 'Read own applications'),
  ('application:update:own', 'Update own applications'),
  ('application:read:assigned', 'Read assigned applications'),
  ('application:read:authorized', 'Read applications authorized by policy'),
  ('application:review', 'Review applications'),
  ('asset:create', 'Create an asset enrolment'),
  ('asset:read:own', 'Read own assets'),
  ('asset:update:own', 'Update own assets'),
  ('asset:read:assigned', 'Read assigned assets'),
  ('asset:read:authorized', 'Read assets authorized by policy'),
  ('asset:review', 'Review assets'),
  ('research:read', 'Read authorized research resources'),
  ('user:read', 'Read authorized user records'),
  ('audit:read', 'Read authorized audit events'),
  ('role:manage', 'Manage privileged roles')
 on conflict (name) do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.name = any (
  case r.name
    when 'applicant' then array['application:create','application:read:own','application:update:own']
    when 'member' then array['application:create','application:read:own','application:update:own','asset:create','asset:read:own','asset:update:own']
    when 'researcher' then array['research:read']
    when 'reviewer' then array['application:read:assigned','application:review','asset:read:assigned','asset:review']
    when 'administrator' then array['user:read','application:read:authorized','application:review','asset:read:authorized','asset:review','audit:read']
    when 'trustee' then array['user:read','application:read:authorized','application:review','asset:read:authorized','asset:review','audit:read','role:manage']
    else array[]::text[]
  end
)
on conflict do nothing;
