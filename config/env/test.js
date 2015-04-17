module.exports = {
    app: {
        description: "Testing environment is up..."
    },
    db_config: {
        host: "localhost",
        port: "4488",

        dbName: "nisumplanner",
        uName: "",
        pwd: "",
        connectionLimit: 15
    },
    mail_config: {
        host: "smtp.gmail.com",
        port: "587",
        enabled: false,

        uName: "",
        pwd: "",
        service: "gmail",
        from: "testmail@nisumplanner.com"
    },
    logger: {
        logAppender: "file",
        logFilename: "D:/app/logs/test/NISUMPLANNER.log",
        logCategory: "NISUMPLANNER",
        logLevel: "DEBUG",
        maxLogSize: "75MB",
        backups: 10
    }
};
