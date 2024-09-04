import { PromiseOr } from "@/parent/lib/promise";

export type UseCase<Params, Result> = (params: Params) => PromiseOr<Result>;
