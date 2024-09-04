import { refreshAuthAPI } from "@/parent/backend/api/auth/refresh";

export const dynamic = "force-dynamic";

export const GET = refreshAuthAPI.createHandler();
