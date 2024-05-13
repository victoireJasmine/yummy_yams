import * as Cookies from "js-cookie";

export class SessionCookie {
    private static TOKEN: string = "TOKEN_YUMMY_USER";

    static destroy():void{
        Cookies.default.remove(SessionCookie.TOKEN);
    }

    static set(token: string): void {
        SessionCookie.destroy();
        Cookies.default.set(SessionCookie.TOKEN, token, { expires: 14});
    }

    static get(): string | null {
        const sessionCookie = Cookies.default.get(SessionCookie.TOKEN);
        if (!sessionCookie) {
            return null;
        } 

        return sessionCookie;
    }
}