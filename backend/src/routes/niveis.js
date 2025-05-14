const express = require('express');
const { Nivel, Desenvolvedor } = require('../models');
const { fn, col, where, Op } = require('sequelize');
const router = express.Router();

router.get('/', async (req, res) => {
  const { nome } = req.query;

  const where = {};
  if (nome) {
    where.nivel = { [Op.like]: `%${nome}%` };
  }

  const niveis = await Nivel.findAll({ where });

  if (!niveis.length) return res.status(404).json({ error: 'Nenhum nível encontrado' });

  res.json(niveis);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const nivel = await Nivel.findByPk(id);
  if (!nivel) return res.status(404).json({ error: 'Nível não encontrado' });

  res.json(nivel);
});

//SE COLOCASSE  unique: true NO MODEL ERA PRA NAO DEIXAR GRAVAR NOME QUE JA EXISTE MAS NAO DEU
//DEIXAR COMENTADO SE DER TEMPO VER O QUE PODE SER E FAZER UM NOVO PESQUISANDO ANTES

//router.post('/', async (req, res) => {
//  try {
//    const novoNivel = await Nivel.create({ nivel: req.body.nivel });
//    res.status(201).json(novoNivel);
//  } catch (error) {
//    if (error instanceof Sequelize.UniqueConstraintError) {
//      res.status(400).json({ error: 'Já existe um nível com esse nome.' });
//    } else {
//      res.status(500).json({ error: 'Erro ao criar nível.' });
//    }
//  }
//});

router.post('/', async (req, res) => {
  const { nivel } = req.body;

  if (!nivel) {
    return res.status(400).json({ error: 'Campo nível obrigatório' });
  }

  const nivelExistente = await Nivel.findOne({
    where: where(fn('lower', col('nivel')), nivel.toLowerCase())
  });

  if (nivelExistente) {
    return res.status(400).json({ error: 'Já existe um nível com esse nome.' });
  }

  try {
    const novoNivel = await Nivel.create({ nivel });
    res.status(201).json(novoNivel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar nível.' });
  }
});

router.put('/:id', async (req, res) => {
  const { nivel } = req.body;
  const { id } = req.params;

  if (!nivel) {
    return res.status(400).json({ error: 'Campo nível obrigatório' });
  }

  const n = await Nivel.findByPk(id);
  if (!n) {
    return res.status(404).json({ error: 'Nível não encontrado' });
  }

  const nivelExistente = await Nivel.findOne({
    where: {
      id: { [Op.ne]: id },
      [Op.and]: [
        Nivel.sequelize.where(
          Nivel.sequelize.fn('lower', Nivel.sequelize.col('nivel')),
          nivel.toLowerCase()
        )
      ]
    }
  });

  if (nivelExistente) {
    return res.status(400).json({ error: 'Já existe um nível com esse nome.' });
  }

  try {
    await n.update({ nivel });
    res.json(n);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar nível.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const devs = await Desenvolvedor.count({ where: { nivel_id: id } });
  if (devs > 0) return res.status(400).json({ error: 'Não é possível remover nível com desenvolvedores associados' });
  await Nivel.destroy({ where: { id } });
  res.status(204).send();
});

module.exports = router;
