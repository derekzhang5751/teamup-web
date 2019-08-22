interface Team {
    id: number;
    author: number;
    category: number;
    time_begin: string;
    time_end: string;
    need_review: boolean;
    dp_self: number;
    dp_other: number;
    create_time: string;
    status: number;
    people: string;
    title: string;
    location: string;
    desc: string;
}

interface User {
    id: number;
    username: string;
    level: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    sex: number;
    birthday: string;
    reg_time: string;
    desc: string;
    photo_url: string;
    source: string;
}

interface TeamBrief {
    id: number;
    author: string;
    user_id: number;
    time_begin: string;
    time_end: string;
    status: number;
    title: string;
    photo: string;
    request: number;
}

interface Photo {
    id: number;
    team_id: number;
    store_type: number;
    status: number;
    pic_url: string;
}

interface JoinRequest {
    id: number;
    user_id: number;
    first_name: string;
    team_id: number;
    status: number;
    remark: string;
}
