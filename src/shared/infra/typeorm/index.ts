import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async(host = "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    try{
        return createConnection(
            Object.assign(defaultOptions, {
                host,
                database: process.env.NODE_ENV === 'test'
                ? "rentx_test" : defaultOptions.database
            })
        )
    }catch(error){
        return createConnection(
            Object.assign(defaultOptions, {
                host,
                database: process.env.NODE_ENV === 'test'
                ? "rentx_test" : defaultOptions.database
            })
        )
    }
    
}