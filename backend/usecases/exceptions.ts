export class UnauthorizedException extends Error {
    constructor(message = "인증 정보가 올바르지 않아요.") {
        super(message);
    }
}
