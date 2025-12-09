import { error } from 'console';
import mysql from 'mysql2/promise'

export async function POST(req:Request){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    });

    const data = await req.json();
    const {username, passwordRaw} = data;

    try{
        const [results, fields] = await connection.query('DESCRIBE userInfo');
        return new Response(JSON.stringify(results), {status: 200})
    } catch(err){
        console.error(err);
        return new Response(JSON.stringify("something went wrong"), {status: 500})
    }
}