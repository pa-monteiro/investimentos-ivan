import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async(): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    try{
        return createConnection(
            Object.assign(defaultOptions, {
                database: process.env.NODE_ENV === 'test'
                ? "investimentos_test" : defaultOptions.database
            })
        )
    }catch(error){
        return createConnection(
            Object.assign(defaultOptions, {
                database: process.env.NODE_ENV === 'test'
                ? "investimentos_test" : defaultOptions.database
            })
        )
    }
    
}