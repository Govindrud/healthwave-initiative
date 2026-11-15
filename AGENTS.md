# Architecture Rules

- Counselor access must be authorized through the protected `user_roles` table and `has_role`; keep payment identifiers and payout account mappings service-role-only because counselor-facing tables must expose only safe payout status and amounts.