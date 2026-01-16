// index.js - Sistema de Gestão de Contas (Node.js)
// Conversão dos arquivos COBOL: main.cob, operations.cob, data.cob
// Preserva lógica de negócio, integridade de dados e opções do menu

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'account-data.json');


// Funções testáveis para uso nos testes unitários
function viewBalance(account) {
  return account.balance;
}

function creditAccount(account, value) {
  if (account.status !== 'active') throw new Error('Conta inativa');
  if (typeof value !== 'number' || value <= 0) throw new Error('Valor inválido');
  account.balance += value;
  account.transactions = account.transactions || [];
  account.transactions.push({ type: 'credit', value });
  return account.balance;
}

function debitAccount(account, value) {
  if (account.status !== 'active') throw new Error('Conta inativa');
  if (typeof value !== 'number' || value <= 0) throw new Error('Valor inválido');
  if (account.balance < value) return false;
  account.balance -= value;
  account.transactions = account.transactions || [];
  account.transactions.push({ type: 'debit', value });
  return true;
}

function setAccountStatus(account, status) {
  account.status = status;
}

function getTransactions(account) {
  return account.transactions || [];
}

function exitSystem() {
  return 'Sistema encerrado. Até logo!';
}

// Exporta funções para testes
module.exports = {
  viewBalance,
  creditAccount,
  debitAccount,
  setAccountStatus,
  getTransactions,
  exitSystem
};

// Função de menu interativo corrigida
function menu(account) {
  console.log('--------------------------------');
  console.log('Sistema de Gestão de Contas');
  console.log('1. Ver saldo');
  console.log('2. Creditar conta');
  console.log('3. Debitar conta');
  console.log('4. Sair');
  console.log('--------------------------------');
  rl.question('Escolha uma opção (1-4): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        try {
          const saldo = viewBalance(account);
          console.log(`Saldo atual: R$ ${saldo}`);
        } catch (e) {
          console.log('Erro ao consultar saldo:', e.message);
        }
        menu(account);
        break;
      case '2':
        rl.question('Informe o valor para crédito: ', (valor) => {
          try {
            const novoSaldo = creditAccount(account, Number(valor));
            console.log(`Crédito realizado. Novo saldo: R$ ${novoSaldo}`);
          } catch (e) {
            console.log('Erro ao creditar:', e.message);
          }
          menu(account);
        });
        break;
      case '3':
        rl.question('Informe o valor para débito: ', (valor) => {
          try {
            const result = debitAccount(account, Number(valor));
            if (result === false) {
              console.log('Saldo insuficiente para débito.');
            } else {
              console.log(`Débito realizado. Novo saldo: R$ ${account.balance}`);
            }
          } catch (e) {
            console.log('Erro ao debitar:', e.message);
          }
          menu(account);
        });
        break;
      case '4':
        console.log('Saindo do programa. Até logo!');
        rl.close();
        break;
      default:
        console.log('Opção inválida, selecione 1-4.');
        menu(account);
    }
  });
}

// ...código interativo original permanece para uso CLI...

// Executa o menu interativo apenas se rodar como script principal
if (require.main === module) {
  // Inicializa readline para CLI
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  global.rl = rl;
  // Simula uma conta ativa padrão para CLI
  const account = {
    id: 'aluno1',
    status: 'active',
    balance: 100,
    transactions: []
  };
  menu(account);
}
