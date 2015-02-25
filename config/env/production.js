module.exports = {
    app: {
        description: "Production environment is up..."
    },
    db_config: {
        host: "localhost",
        port: "3306",

        dbName: "ad_c48c8f5fcd7a17d",
        uName: "b938c0953d8659",
        pwd: "f7f32725",
        connectionLimit: 10
    },
    mail_config: {
        host: "smtp.gmail.com",
        port: "587",
        enabled: false,

        uName: "",
        pwd: "",
        service: "gmail",
        from: "admin@nisumplanner.com"
    },
    logger: {
        logAppender: "file",
        logFilename: "D:/app/logs/prod/NISUMPLANNER.log",
        logCategory: "NISUMPLANNER",
        logLevel: "DEBUG",
        maxLogSize: "75MB",
        backups: 10
    }
}
