const express = require('express');
const { Desenvolvedor, Nivel } = require('../models');
const router = express.Router();
const { Op, fn, col, where } = require('sequelize');
const calcularIdade = require('../utils/calcularIdade');

//AQUI TINHA FICADO MUITO GRANDE O CALCULO DA IDADE ENTAO COLOQUEI EM UM UTILS
//ESSE CALCULO DE IDADE USEI NA PROVA DE HARBOUR EM UM CONTROLE DE INSS KKKKKKKKKKKKK
//   LOCAL dHoje := DATE()
//   LOCAL nIdade := YEAR( dHoje ) - YEAR( dNascimento )
//
//   IF MONTH( dHoje ) < MONTH( dNascimento ) .OR. ;
//      ( MONTH( dHoje ) == MONTH( dNascimento ) .AND. DAY( dHoje ) < DAY( dNascimento ) )
//      nIdade--
//   ENDIF

router.get('/', async (req, res) => {
  const { nome } = req.query;
  const whereClause = {};
  
  if (nome) {
    whereClause.nome = {
      [Op.like]: `%${nome.toLowerCase()}%`
    };
  }

  try {
    const devs = await Desenvolvedor.findAll({
      where: whereClause,
      include: [{ model: Nivel, as: 'nivel' }]
    });

    if (!devs.length) {
      return res.status(404).json({ error: 'Nenhum desenvolvedor encontrado' });
    }

    const resultado = devs.map(dev => ({
      id: dev.id,
      nome: dev.nome,
      sexo: dev.sexo,
      data_nascimento: dev.data_nascimento,
      idade: calcularIdade(dev.data_nascimento),
      hobby: dev.hobby,
      nivel: dev.nivel
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Erro ao buscar desenvolvedores:', error);
    res.status(500).json({ error: 'Erro ao buscar desenvolvedores.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const dev = await Desenvolvedor.findByPk(id, { include: [{ model: Nivel, as: 'nivel' }] });

  if (!dev) return res.status(404).json({ error: 'Desenvolvedor não encontrado' });

  res.json(dev);
});

//COLOQUEI AQUI PRA NAO USAR O MESMO NOME SE JA EXISTIR, NAO TINHA NO REQUISITO E O CORRETO SERIA POR CPF MAS JA QUE NAO TEM. 
router.post('/', async (req, res) => {
  const { nome, sexo, data_nascimento, hobby, nivel_id } = req.body;

  if (!nome || !sexo || !data_nascimento || !nivel_id) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
  }

  const nivel = await Nivel.findByPk(nivel_id);
  if (!nivel) {
    return res.status(400).json({ error: 'Nível informado não existe' });
  }

  const devExistente = await Desenvolvedor.findOne({
    where: where(fn('lower', col('nome')), nome.toLowerCase())
  });

  if (devExistente) {
    return res.status(400).json({ error: 'Já existe um desenvolvedor com esse nome.' });
  }

  try {
    const novo = await Desenvolvedor.create({ nome, sexo, data_nascimento, hobby, nivel_id });
    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar desenvolvedor.' });
  }
});

router.put('/:id', async (req, res) => {
  const { nome, sexo, data_nascimento, hobby, nivel_id } = req.body;
  const { id } = req.params; // Declaração única do id
  
  if (!nome || !sexo || !data_nascimento || !nivel_id) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
  }

  const dev = await Desenvolvedor.findByPk(id);
  if (!dev) return res.status(404).json({ error: 'Desenvolvedor não encontrado' });

  if (dev.nome.toLowerCase() !== nome.toLowerCase()) {
    const devExistente = await Desenvolvedor.findOne({
      where: {
        [Op.and]: [
          where(fn('lower', col('nome')), nome.toLowerCase()),
          { id: { [Op.ne]: id } }
        ]
      }
    });

    if (devExistente) {
      return res.status(400).json({ error: 'Já existe um desenvolvedor com esse nome.' });
    }
  }

  await dev.update({ nome, sexo, data_nascimento, hobby, nivel_id });
  res.json(dev);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Desenvolvedor.destroy({ where: { id } });
  res.status(204).send();
});

module.exports = router;