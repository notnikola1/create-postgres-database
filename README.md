A very simple package that checks if a PostgresQL database exists.

If it exists - nothing happens

If it does not - it creates it and closes the connection.


```
Example:
[...]
import { checkDatabase } from "create-postgres-database";

await checkDatabase( {
		useEnvVars: false,
		host:       CONST.DB_HOST_PSQL, // localhost
		port:       CONST.DB_PORT_PSQL, //port
		user:       CONST.DB_USER_PSQL, //username
		pass:       CONST.DB_PASS_PSQL, //password
		defaultDb:  CONST.DB_DEFAULT_PSQL, //default created database, its usually "postgres"
		dbToCheck:  CONST.DB_NAME_PSQL, //db that you want to check
		disableSSL: true //can be disabled for local development
	});

```


Config options

````
Simple config object with no env vars

config = { 
    useEnvVars: false,
    host: string,
    port: number | string,
    user: string,
    pass: string,
    defaultDb: string,
    dbToCheck: string,
    disableSSL: boolean
}
`````

```
Put in the name of the env variable in here

process.env[config.host] = the host that you want to connect to

config = {
    useEnvVars: true,
    host: string, 
    port: number | string,
    user: string,
    pass: string,
    defaultDb: string,
    dbToCheck: string,
    disableSSL: boolean
}
```
