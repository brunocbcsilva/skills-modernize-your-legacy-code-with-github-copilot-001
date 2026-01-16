// Testes unitários dedicados para o sistema de contas de alunos
const { viewBalance, creditAccount, debitAccount, setAccountStatus, getTransactions, exitSystem } = require('./index');

describe('Plano de Testes – Sistema de Contas de Alunos (COBOL)', () => {
  let account;
  beforeEach(() => {
    account = {
      id: 'aluno1',
      status: 'active',
      balance: 100,
      transactions: []
    };
  });

  test('TC01 - Visualizar saldo inicial da conta', () => {
    expect(viewBalance(account)).toBe(100);
  });

  test('TC02 - Creditar valor na conta', () => {
    creditAccount(account, 50);
    expect(account.balance).toBe(150);
  });

  test('TC03 - Debitar valor da conta', () => {
    debitAccount(account, 30);
    expect(account.balance).toBe(70);
  });

  test('TC04 - Impedir débito maior que saldo', () => {
    const result = debitAccount(account, 200);
    expect(result).toBe(false);
    expect(account.balance).toBe(100);
  });

  test('TC05 - Impedir operações em conta inativa', () => {
    setAccountStatus(account, 'inactive');
    expect(() => creditAccount(account, 10)).toThrow('Conta inativa');
    expect(() => debitAccount(account, 10)).toThrow('Conta inativa');
  });

  test('TC06 - Registrar todas transações', () => {
    creditAccount(account, 20);
    debitAccount(account, 10);
    const txs = getTransactions(account);
    expect(txs.length).toBe(2);
    expect(txs[0].type).toBe('credit');
    expect(txs[1].type).toBe('debit');
  });

  test('TC07 - Encerrar sistema corretamente', () => {
    expect(exitSystem()).toBe('Sistema encerrado. Até logo!');
  });
});
