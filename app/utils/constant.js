module.exports = {
    MONGO_ID_PATTERN: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES: {
        USER: "USER",
        ADMIN: "ADMIN",
        WRITER: "WRITER",
        TEACHER: "TEACHER",
        SUPPLIER: "SUPPLIER",
    },
    ACCESS_TOKEN_SECRET_KEY: "wRGErXWr8ZlGWTKkBzR7g9begbYAJPA9",
    REFRESH_TOKEN_SECRET_KEY: "NA61Nv8d6ch1mWKFnu0wBcGVdsMibE6J",
}