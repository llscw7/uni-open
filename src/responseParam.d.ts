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
    end?: boolean;
}

interface DetailDataItem {
    userId: string;
    title: string;
    desc: string;
    in: string;
    out: string;
    time: number;
    year: number;
    month: number;
    day: number;
    date: string;
    weekdayCN: string;
}

interface DetailData {
    date: string;
    year: number;
    month: number;
    day: number;
    time: number;
    weekdayCN: string;
    children: DetailDataItem[];
}
