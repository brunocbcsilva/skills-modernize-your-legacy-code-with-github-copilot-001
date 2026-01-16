# Plano de Testes – Sistema de Contas de Alunos

Este plano de testes cobre toda a lógica de negócio implementada no sistema COBOL atual. Ele servirá como base para validação junto aos stakeholders e para futura implementação de testes automatizados em Node.js.

| Test Case ID | Test Case Description                | Pre-conditions                        | Test Steps                                                                 | Expected Result                                 | Actual Result | Status (Pass/Fail) | Comments                  |
|--------------|--------------------------------------|---------------------------------------|----------------------------------------------------------------------------|-------------------------------------------------|---------------|--------------------|---------------------------|
| TC01         | Visualizar saldo inicial da conta    | Conta de aluno ativa e saldo definido | 1. Iniciar sistema  2. Selecionar opção "View Balance"                     | Saldo exibido corretamente                     |               |                    |                           |
| TC02         | Creditar valor na conta              | Conta de aluno ativa                  | 1. Iniciar sistema  2. Selecionar "Credit Account" 3. Informar valor      | Valor creditado, saldo atualizado              |               |                    |                           |
| TC03         | Debitar valor da conta               | Conta de aluno ativa, saldo suficiente| 1. Iniciar sistema  2. Selecionar "Debit Account" 3. Informar valor       | Valor debitado, saldo atualizado               |               |                    |                           |
| TC04         | Impedir débito maior que saldo       | Conta de aluno ativa, saldo insuficiente| 1. Iniciar sistema  2. Selecionar "Debit Account" 3. Informar valor maior que saldo | Operação recusada, saldo permanece igual        |               |                    |                           |
| TC05         | Impedir operações em conta inativa   | Conta de aluno inativa                | 1. Iniciar sistema  2. Tentar qualquer operação (crédito/débito)           | Operação recusada, mensagem de erro exibida     |               |                    |                           |
| TC06         | Registrar todas transações           | Conta de aluno ativa                  | 1. Realizar crédito ou débito na conta                                         | Transação registrada para auditoria             |               |                    |                           |
| TC07         | Encerrar sistema corretamente        | Sistema iniciado                      | 1. Selecionar opção "Exit"                                                  | Sistema encerra com mensagem de despedida       |               |                    |                           |

> Preencha os campos "Actual Result", "Status" e "Comments" durante a execução dos testes.
