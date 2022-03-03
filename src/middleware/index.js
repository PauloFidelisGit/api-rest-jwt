import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const checkToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const decode = jwt.verify(token, process.env.JWKEY);
        console.log('checkToken: ' + JSON.stringify(decode, null, 4))
        req.tokendecode = decode;
        next();
    } catch (error) {
        res.status(401).json({ status: 'error', message: 'Acesso negado.' });
    }
};

export { checkToken };