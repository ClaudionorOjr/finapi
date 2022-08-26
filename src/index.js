const { json } = require('express')
const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(json())

const customers = []

// * Middleware
function verifyIfExistsAccountCPF(request, response, next){
  const { cpf } = request.headers

  // ? find() retorna os dados
  const customer = customers.find((customer) => customer.cpf === cpf)

  if(!customer) {
    return response.status(400).json({error: "Customer not found"})
  }

  // ? Repassando os dados de customer para os métodos que usam o middleware
  request.customer = customer

  return next()
}

function getBalance(statement) {
  // ? reduce() recebe 2 parâmetros. 
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === 'credit') {
      return acc + operation.amount
    } else {
      return acc - operation.amount
    }
  }, 0) // Valor incial do reduce()

  return balance
}

app.post('/account', (request, response) => {
  const { cpf, name } = request.body

  // ? some() retorna true ou false
  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)

  if(customerAlreadyExists) {
    return response.status(400).json({error: "Customer already exists!"})
  }

  const account = {
    name: name,
    cpf: cpf,
    id: uuidv4(),
    statement: []
  }

  customers.push(account)

  return response.status(201).send()
})

// ! Para utilizar o middleware, chama-o entre o caminho da rota e o request/response
app.get('/statement', verifyIfExistsAccountCPF,(request, response) => {
  // ? Acessando os dados de customer repassados pelo middleware verifyIfExistsAccountCPF
  const { customer } = request

  return response.json(customer.statement)
})

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body
  const { customer } = request

  const statementOperation = {
    description: description,
    amount: amount,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()

})

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body
  const { customer } = request

  const balance = getBalance(customer.statement)

  if(balance < amount) {
    return response.status(400).json({error: "Insufficient funds!"})
  }

  const statementOperation = {
    amount: amount,
    created_at: new Date(),
    type: 'debit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

app.get("/statement/date", verifyIfExistsAccountCPF,(request, response) => {
  const { customer } = request
  const { date } = request.query

  const dateFormat = new Date(date + ' 00:00')

  // ? filter() filtrar dados
  const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString())

  return response.json(statement)
})

app.put('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body
  const { customer } = request

  customer.name = name

  return response.status(201).send()
})

app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { customer}  = request

  return response.status(200).json(customer)
})

app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request

  // ? slices() recebe 2 parâmetros. O primeiro é o item que será removido, o segundo é incidência de vezes que irá remover, nesse caso, somente uma vez
  customers.splice(customer, 1)

  return response.status(202).json(customers)
})

app.get('/balance', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request

  const balance = getBalance(customer.statement)

  return response.json(balance)
})

app.listen(3333, () => {
  console.log('App running on http://localhost:3333')
})