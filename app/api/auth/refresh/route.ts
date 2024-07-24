import { refreshAuthAPI } from "@/backend/api/auth/refresh";

export const dynamic = 'force-dynamic'

export const GET = refreshAuthAPI.createHandler();
