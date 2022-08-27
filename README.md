# FinAPI - Financeira
> Projeto do Chapter I da trilha de Node.js. Conteúdo do Ignite da [Rocketseat](https://www.rocketseat.com.br/).

---

## 🚀 Getting Started

```
# Clone o projeto
git clone https://github.com/ClaudionorOjr/finapi.git

# Acesse o diretório
cd finapi
```
O gerenciador de pacotes utilizado é o `yarn`. É necessário que esteja instalado em sua máquina.
```
# Instalação das dependências
yarn

# Iniciar o projeto
yarn dev
```

---

## Requisitos

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta do cleinte
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta
- [x] Deve ser possível retornar o balance

---

## Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Não deve ser possível excluir uma conta não existente
- [x] Não deve ser possível retornar o balance de uma conta não existent