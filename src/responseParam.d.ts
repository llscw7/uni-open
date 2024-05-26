interface TokenData {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    session_key: string;
    session_secret: string;
}

interface MessageParam {
    role: string;
    content: string;
}