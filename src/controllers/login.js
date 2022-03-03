import { db } from '../db.config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res, next) => {
    if (!req.body.email && !req.body.password) { return res.status(400).json({ status: 'error', message: 'Preencha todos os campos.' }) };

    const [result] = await db.query(`SELECT * FROM tb_users WHERE email=?`, [req.body.email]).catch((e) => res.status(500).json({ message: 'Erro interno.' }));
    const { userId, email, password, username } = result[0];

    if (req.body.email === email) {
        bcrypt.compare(req.body.password, password, (errBcrypt, resultBcrypt) => {
            if (errBcrypt) {
                res.status(401).json({ status: 'error', message: `Usuário ou senha inválidos.` });
            } else if (resultBcrypt) {
                const token = jwt.sign(
                    {
                        userId: userId,
                        email: email
                    },
                    process.env.JWKEY,
                    {
                        expiresIn: '4h'
                    });
                res.status(200).json({ status: 'sucess', message: 'Login efetuado com sucesso.', userInfo: { userId, email, username }, token })
            }
        })

    }
};

export default login;