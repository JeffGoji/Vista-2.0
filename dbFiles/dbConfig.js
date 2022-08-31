const config = {
    user: 'sa',
    password: 'MANAGER',
    server: '10.239.100.228',
    database: 'PNG061722PAD19',
    options: {
        trustServerCertificate: true,
        trustConnection: true,
        enableArithAbort: true,
        encrypt: false,
        // instanceName: 'PNG042022PAD19',
    },
    port: 1433
}

module.exports = config;