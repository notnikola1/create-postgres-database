import { Client } from 'pg';

interface IConfigBase {
	useEnvVars: boolean
}

interface IOptionsConfig extends IConfigBase {
	useEnvVars: false,
	host: string,
	port: number | string,
	user: string,
	pass: string,
	defaultDb: string,
	dbToCheck: string,
	disableSSL: boolean
}

interface IOptionsEnvVars extends IConfigBase {
	useEnvVars: true,
	host: string,
	port: number | string,
	user: string,
	pass: string,
	defaultDb: string,
	dbToCheck: string,
	disableSSL: boolean
}

enum RESULT {
	EXISTS  = 'Database already exists',
	CREATED = 'Database created'
}

export async function checkDatabase( config: IOptionsConfig | IOptionsEnvVars ): Promise<string> {
	let returnValue  = '';
	const dbName     = config.useEnvVars ? process.env[config.dbToCheck].toString() : config.dbToCheck;
	const host       = config.useEnvVars ? process.env[config.host].toString() : config.host;
	const port       = config.useEnvVars ? Number( process.env[config.port] ) : config.port;
	const user       = config.useEnvVars ? process.env[config.user].toString() : config.user;
	const pass       = config.useEnvVars ? process.env[config.pass].toString() : config.pass;
	const defaultDb  = config.useEnvVars ? process.env[config.defaultDb] : config.defaultDb
	const disableSSL = config.disableSSL ? "" : "?sslmode=verify-full\"";
	
	const connectionString = "postgres://" + user + ":" + pass + "@" + host + ":" + port + "/" + defaultDb + disableSSL;
	
	const client = new Client( {
		connectionString: connectionString
	} );
	
	await client.connect();
	const res = await client.query( `SELECT 1 FROM pg_database WHERE datname='${ dbName }'` );
	
	if ( res.rowCount === 0 ) {
		console.log( `${ dbName } database not found, creating it.` );
		await client.query( `CREATE DATABASE "${ dbName }";` );
		console.log( `created database ${ dbName }` );
		returnValue = RESULT.CREATED
	}
	else {
		console.log( `${ dbName } database exists.` );
		returnValue = RESULT.EXISTS;
	}
	
	await client.end();
	return returnValue
}
