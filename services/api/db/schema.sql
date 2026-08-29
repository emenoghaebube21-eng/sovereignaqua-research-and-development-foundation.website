-- SovereignAqua application data model
-- PostgreSQL 15+
-- Provider credentials and tokens are intentionally NOT stored here.

create extension if not exists pgcrypto;

create type user_status as enum ('pending', 'active', 'suspended', 'disabled');
create type application_status as enum ('draft', 'submitted', 'under_review', 'needs_information', 'approved', 'rejected', 'withdrawn');
create type asset_status as enum ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'withdrawn');
create type document_status as enum ('pending_scan', 'available', 'rejected', 'quarantined', 'deleted');

create table app_users (
  id uuid primary key default gen_random_uuid(),
  provider_subject text not null unique,
  email text not null,
  email_verified boolean not null default false,
  display_name text,
  status user_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table permissions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table user_roles (
  user_id uuid not null references app_users(id) on delete cascade,
  role_id uuid not null references roles(id) on delete restrict,
  assigned_by uuid references app_users(id) on delete set null,
  assigned_at timestamptz not null default now(),
  primary key (user_id, role_id)
);

create table role_permissions (
  role_id uuid not null references roles(id) on delete cascade,
  permission_id uuid not null references permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references app_users(id) on delete restrict,
  status application_status not null default 'draft',
  application_type text not null,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index applications_owner_idx on applications(owner_user_id);
create index applications_status_idx on applications(status);

create table assets (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references app_users(id) on delete restrict,
  application_id uuid references applications(id) on delete restrict,
  status asset_status not null default 'draft',
  asset_type text not null,
  description text,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index assets_owner_idx on assets(owner_user_id);
create index assets_application_idx on assets(application_id);
create index assets_status_idx on assets(status);

create table documents (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references app_users(id) on delete restrict,
  application_id uuid references applications(id) on delete restrict,
  asset_id uuid references assets(id) on delete restrict,
  storage_key text not null unique,
  original_filename text not null,
  content_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  sha256 text,
  status document_status not null default 'pending_scan',
  uploaded_at timestamptz not null default now(),
  scanned_at timestamptz,
  deleted_at timestamptz,
  constraint document_parent_check check (application_id is not null or asset_id is not null)
);

create index documents_owner_idx on documents(owner_user_id);
create index documents_application_idx on documents(application_id);
create index documents_asset_idx on documents(asset_id);

create table audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references app_users(id) on delete set null,
  event_type text not null,
  resource_type text,
  resource_id uuid,
  request_id text,
  ip_hash text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index audit_events_actor_idx on audit_events(actor_user_id);
create index audit_events_resource_idx on audit_events(resource_type, resource_id);
create index audit_events_created_idx on audit_events(created_at desc);

-- Seed role names only. Privilege assignment must be performed by controlled migrations/admin tooling.
insert into roles (name, description) values
  ('applicant', 'Can create and manage own applications'),
  ('member', 'Can access authorized member functionality and own records'),
  ('researcher', 'Can access explicitly authorized research resources'),
  ('reviewer', 'Can review assigned applications/assets'),
  ('administrator', 'Can perform authorized operational administration'),
  ('trustee', 'Can perform authorized governance functions'),
  ('super_admin', 'Highest application administration role')
 on conflict (name) do nothing;
