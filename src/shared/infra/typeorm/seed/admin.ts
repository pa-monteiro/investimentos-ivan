import { v4 as uuidV4 } from 'uuid'
import { hash } from 'bcrypt'

import createConnection from '../index'

async function create() {
    const connection = await createConnection("localhost");
    
    const id = uuidV4();
    const password = await hash("admin",8);
    
    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        VALUES('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'xxxxx')`
        )

        await connection.close();
}

create().then(() => console.log('User admin created')).catch((error) => console.log(error))