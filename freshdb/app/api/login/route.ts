import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
const bcrypt = require("bcrypt");

export async function POST(req:Request){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    });

    const data = await req.json();
    const {username, password} = data;
    let rows; 

    try{
        [rows] = await connection.execute<RowDataPacket[]>('SELECT username,passwordHash FROM userInfo WHERE username= ?', [username]);
    } catch(err){
        await connection.end();
        return new Response(JSON.stringify({
            success: false,
            message: 'Something went wrong'
        }), {status: 500})
    }

    if (rows.length === 0){
        await connection.end();
        return new Response(JSON.stringify({
            success: false,
            message: 'Invalid Username or Password'
        }), {status: 400})
    }

    const user = rows[0]

    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match){
        await connection.end();
        return new Response(JSON.stringify({
            success: false,
            message: 'Invalid Username or Password'
        }), {status: 401})
    } else{
        await connection.end();
        return new Response(JSON.stringify({
            success: true, 
            message: 'Login Successful'
        }), {status: 200})
    }

}