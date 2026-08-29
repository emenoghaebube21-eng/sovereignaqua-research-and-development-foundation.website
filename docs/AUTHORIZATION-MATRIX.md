# SovereignAqua Authorization Matrix

## Roles

| Role | Public | Applicant | Member | Researcher | Reviewer | Admin | Trustee | Super Admin |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Public pages | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Own profile | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Submit application | - | ✓ | ✓ | - | - | ✓ | ✓ | ✓ |
| View own application | - | ✓ | ✓ | - | - | ✓ | ✓ | ✓ |
| Review assigned applications | - | - | - | - | ✓ | ✓ | ✓ | ✓ |
| Create asset enrolment | - | - | ✓ | - | - | ✓ | ✓ | ✓ |
| Review asset records | - | - | - | - | ✓ | ✓ | ✓ | ✓ |
| Access restricted documents | - | Own only | Own only | Assigned only | Assigned | Authorized | Authorized | Authorized |
| View audit log | - | - | - | - | - | ✓ | ✓ | ✓ |
| Manage users | - | - | - | - | - | ✓ | ✓ | ✓ |
| Assign privileged roles | - | - | - | - | - | - | ✓ | ✓ |
| System configuration | - | - | - | - | - | - | - | ✓ |

## Rules

1. Authorization is enforced server-side. UI visibility is not a security control.
2. A user's role is not accepted from form fields or URL parameters.
3. Object-level authorization is required for every application, asset and document identifier.
4. Reviewers can access only records assigned to them unless a higher role grants broader access.
5. Applicants and members can access only their own records.
6. Privileged operations are audited.
7. High-risk actions require recent authentication or step-up MFA.
