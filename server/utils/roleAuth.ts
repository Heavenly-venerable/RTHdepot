import { H3Event } from "h3"

const roleHierarchy = ["user", "staff", "admin", "superadmin"];

export async function requireRole(event: H3Event, requiredRole: string) {
  const { user } = await requireUserSession(event); // Akan lempar 401 kalau belum login

  const userRole = user?.role || "user";

  const hasAccess = roleHierarchy.indexOf(userRole) >= roleHierarchy.indexOf(requiredRole);

  if (!hasAccess) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden: You do not have access to this resource.",
    });
  }

  return user;
}
