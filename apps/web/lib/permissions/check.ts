// apps/web/lib/permissions/check.ts
export type Role = 'super_admin' | 'trainer' | 'student';

export function canAccess(userRole: Role, requiredRole: Role): boolean {
  const roleHierarchy: Record<Role, number> = {
    super_admin: 3,
    trainer: 2,
    student: 1
  };
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
