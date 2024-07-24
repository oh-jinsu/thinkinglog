import { NextResponse } from "next/server";

export class ExceptionResponse extends NextResponse {
    constructor(status: number, message: string) {
        super(JSON.stringify({ message }), {
            status,
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });
    }
}

export class BadRequestResponse extends ExceptionResponse {
    constructor(message = "요청이 유효하지 않아요.") {
        super(400, message);
    }
}

export class UnauthorizedResponse extends ExceptionResponse {
    constructor(message = "인증이 필요해요.") {
        super(401, message);
    }
}

export class ForbiddenResponse extends ExceptionResponse {
    constructor(message = "이용할 수 없어요.") {
        super(403, message);
    }
}

export class NotFoundResponse extends ExceptionResponse {
    constructor(message = "찾을 수 없어요.") {
        super(404, message);
    }
}

export class ConflictResponse extends ExceptionResponse {
    constructor(message = "충돌이 일어났어요.") {
        super(409, message);
    }
}

export class InternalServerErrorResponse extends ExceptionResponse {
    constructor(message = "서버에 문제가 생겼어요.") {
        super(500, message);
    }
}
