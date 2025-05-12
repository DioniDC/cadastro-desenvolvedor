function calcularIdade(dataNascimento) {

  const [anoNasc, mesNasc, diaNasc] = dataNascimento.split('-').map(Number);
  
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth() + 1; //esse negocio deu trabalho pq retorna 0-11 AAAAAAAAAAAAAAAA
  const diaAtual = hoje.getDate();

  let idade = anoAtual - anoNasc;

  if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
    idade--;
  }

  return idade;
}

module.exports = calcularIdade;