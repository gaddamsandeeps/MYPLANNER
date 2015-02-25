module.exports = {
    app: {
        description: "Development environment is up..."
    },
    db_config: {
        host: "localhost",
        port: "3307",

        dbName: "nisumplanner",
        uName: "root",
        pwd: "root",
        connectionLimit: 15
    },
    mail_config: {
        host: "smtp.gmail.com",
        port: "587",
        enabled: false,

        uName: "",
        pwd: "",
        service: "gmail",
        from: "devmail@nisumplanner.com"
    },
    logger: {
        logAppender: "file",
        logFilename: "D:/Nisum-Planner/logs/NISUMPLANNER.log",
        logCategory: "NISUMPLANNER",
        logLevel: "DEBUG",
        maxLogSize: "75MB",
        backups: 10
    }
}
