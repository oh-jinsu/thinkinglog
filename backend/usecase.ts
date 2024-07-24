import { PromiseOr } from "@/lib/promise";

export type UseCase<Params, Result> = (params: Params) => PromiseOr<Result>;
