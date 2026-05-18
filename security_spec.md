# Security Specification for LaMinuteCinéma

## Data Invariants
1. Articles can be read by anyone.
2. Articles can only be created, updated, or deleted by an admin.
3. An admin is a user whose UID exists in the `admins` collection.
4. The first admin is defined by email: `christmiyanogo561@gmail.com`.

## The Dirty Dozen Payloads
1. Create article as unauthenticated user -> DENY
2. Create article as authenticated non-admin -> DENY
3. Delete article as authenticated non-admin -> DENY
4. Update article field 'trending' as non-admin -> DENY
5. Create admin entry as non-admin -> DENY
6. Update existing article with invalid data type (e.g. title: 123) -> DENY
7. Create article with missing required field (e.g. no content) -> DENY
8. Bypass admin check by spoofing email (if email-based rules used without verification) -> DENY
9. Massive string injection in title field (>1MB) -> DENY
10. Malicious ID with special characters if not sanitized -> DENY
11. Update 'date' field to a past/future time if server time expected -> DENY (though we use date strings here, we should validate)
12. Read private admin info as non-admin -> DENY

## Rules Drafting
I will implement rules that:
- Allow `read` on `articles` for all.
- Allow `write` on `articles` only `if isAdmin()`.
- `isAdmin()` checks if `request.auth.uid` is in `/admins`.
- `admins` collection is only readable/writable by existing admins.
