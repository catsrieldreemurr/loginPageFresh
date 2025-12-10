import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
const bcrypt = require("bcrypt");

async function HashPass(raw:string){
    return await bcrypt.hash(raw, 10).then(function(hash:string){
        return hash
    })
}

export async function POST(req:Request){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    });

    const data = await req.json();
    const {username, password} = data;

    const hashedPassword = await HashPass(password);

    try{
        const [results]: [ResultSetHeader, any] = await connection.execute("INSERT IGNORE INTO userInfo (username, passwordHash) VALUES(?,?)", [username, hashedPassword])
        await connection.end();

        if(results.affectedRows === 0){
            await connection.end();
            return new Response(JSON.stringify({
                success: false,
                message: "Username must be unique."
            }), {status: 400})
        }else{
            await connection.end();
            return new Response(JSON.stringify({
            success: true,
            username: username,
            message: "User created succcessfully"
        }), {status: 200})
        }
    } catch(err){
        console.error(err);
        await connection.end();
        return new Response(JSON.stringify({
            success: false,
            message: "Something went wrong. Try again later."
        }), {status: 500})
    }
}