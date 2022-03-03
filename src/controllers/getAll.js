import { db } from "../../db.config";

const getAll = async (req, res) => {
    const [result] = await db.query(`SELECT * FROM tb_name`)
        .catch((e) => res.status(500).json({ status: 'error', message: 'Erro interno.' }));
    res.status(200).send({ status: 'sucess', message: 'As informações foram obtidas com sucesso.', data: result });
};

export { getAll };