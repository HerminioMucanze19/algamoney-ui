
export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Pessoa {
  id: number;
  nome: string;
  endereco = new Endereco();
  activo: boolean;
}

export class Usuario {
  email: string;
  senha: string;
}

export class Categoria {
  id: number;
  nome: string;
}

export class Lancamento {
  id: number;
  descricao: string;
  tipo = 'RECEITA';
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
