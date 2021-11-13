import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async(host = "ec2-44-198-236-169.compute-1.amazonaws.com"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    try{
        return createConnection(
            Object.assign(defaultOptions, {
                host,
                database: process.env.NODE_ENV === 'test'
                ? "investimentos_test" : defaultOptions.database
            })
        )
    }catch(error){
        return createConnection(
            Object.assign(defaultOptions, {
                host,
                database: process.env.NODE_ENV === 'test'
                ? "investimentos_test" : defaultOptions.database
            })
        )
    }
    
}