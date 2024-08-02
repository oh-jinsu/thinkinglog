import { PromiseOr } from "@/frontend/lib/promise";

export type UseCase<Params, Result> = (params: Params) => PromiseOr<Result>;
