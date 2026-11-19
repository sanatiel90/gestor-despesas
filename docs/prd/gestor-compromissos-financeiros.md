# PRD — Gestor de Assinaturas e Compromissos Financeiros Futuros

> Tipo: PRD inicial · Data: 2026-11-19  
> **Status:** Aguardando implementação  
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". Atualize para "Implementada" quando todas as specs estiverem concluídas. -->

---

## 1. Visão geral

O **Gestor de Assinaturas e Compromissos Financeiros** é uma aplicação web voltada para a previsibilidade financeira pessoal. Em vez de focar no registro retroativo e manual de pequenos gastos diários (como cafezinhos ou almoços), a plataforma foca exclusivamente no planejamento e na visibilidade de **compromissos financeiros fixos, assinaturas recorrentes e compras parceladas**.

A aplicação calcula e exibe uma **projeção detalhada dos próximos 12 meses**, cruzando a renda mensal líquida do usuário com seus contratos e dívidas programadas. Dessa forma, o usuário visualiza com antecedência a taxa real de comprometimento da sua renda, identifica meses com picos de cobrança (anuidades, seguros) e descobre exatamente em quais meses seus parcelamentos chegam ao fim, liberando orçamento para novos objetivos.

---

## 2. Problema que resolve

* **Fadiga de registro financeiro:** Aplicativos financeiros tradicionais exigem que o usuário anote toda e qualquer compra do dia a dia, gerando alto índice de abandono após 1 ou 2 semanas de uso.
* **Falta de visibilidade futura ("Efeito Bola de Neve"):** Pessoas acumulam assinaturas (streaming, nuvem, academias, softwares) e compras parceladas no cartão de crédito sem saber com clareza quanto da sua renda do mês que vem (ou daqui a 6 meses) já está comprometida antes mesmo de o salário cair na conta.
* **Surpresa com cobranças anuais e sazonais:** Assinaturas e taxas anuais (Amazon Prime anual, IPVA, seguros, anuidades de software) costumam pegar o usuário desprevenido na fatura do cartão, gerando aperto financeiro.
* **Descompasso entre data de cobrança e fatura do cartão:** Um serviço cobrado após o fechamento da fatura só é desembolsado no mês subsequente, gerando erros comuns de cálculo quando o usuário tenta planejar suas finanças por conta própria.

---

## 3. Público-alvo

* Profissionais e pessoas físicas que possuem múltiplos serviços de assinatura (streaming, clubes de benefícios, academias, ferramentas digitais) e utilizam compras parceladas no cartão de crédito.
* Indivíduos que recebem renda mensal previsível (salário CLT, pró-labore fixo ou renda média estável) e desejam saber antecipadamente sua margem financeira livre nos próximos 12 meses.
* Pessoas que buscam clareza e previsibilidade financeira sem a burocracia de gerenciar extratos bancários minuciosos ou planilhas manuais complexas.

---

## 4. Objetivo do recorte atual

Entregar o MVP funcional do produto do zero, contemplando:
1. Cadastro do usuário e configuração da renda mensal líquida.
2. Cadastro e gestão de cartões de crédito considerando o ciclo de faturas (dia de fechamento vs. dia de vencimento).
3. Catálogo ágil de serviços populares (presets) e cadastro manual flexível de assinaturas contínuas, parcelamentos e contas recorrentes essenciais (com estimativa média).
4. Motor de projeção financeira de 12 meses baseado em caixa real, destacando a evolução do comprometimento da renda e badges de sazonalidade.
5. Checklist de execução mensal para acompanhamento de pagamentos debitados vs. pendentes.
6. Painel in-app de insights inteligentes (aviso de fim de parcelamento, meses com folga orçamentária e alertas de picos sazonais).

---

## 5. Funcionalidades

### Essenciais:
* **Autenticação Individual e Perfil Financeiro:** Cadastro/login com e-mail/senha e definição da renda mensal líquida de referência.
* **Gestão de Cartões de Crédito:** Cadastro de cartões informando limite opcional, dia de fechamento e dia de vencimento da fatura.
* **Biblioteca de Presets/Templates Rápidos:** Lista pré-configurada de serviços populares (Netflix, Spotify, Amazon Prime, YouTube Premium, Disney+, Gympass, etc.) com ícones e categorias para cadastro com 1 clique.
* **Cadastro de Três Tipos de Compromissos:**
  1. *Assinaturas Fixas Contínuas:* Recorrência mensal ou anual sem data de término.
  2. *Compras Parceladas:* Valor da parcela, total de parcelas e parcela atual/restante.
  3. *Contas Recorrentes Flutuantes:* Despesas indispensáveis com oscilação (luz, água, condomínio) tratadas via estimativa média mensal informada pelo usuário.
* **Cálculo de Desembolso Real por Ciclo de Cartão:** Deslocamento automático da cobrança para a fatura do mês correspondente quando a data de cobrança ocorre após o fechamento do cartão.
* **Motor e Visualização de Projeção de 12 Meses:**
  - Gráfico visual da evolução de gastos ao longo dos próximos 12 meses.
  - Indicador percentual de comprometimento da renda para cada mês (ex: "Julho: 45% comprometido").
  - Identificação visual e detalhamento dos compromissos que compõem cada mês futuro.
  - Badges visuais destacando meses com renovações anuais ou trimestrais (picos sazonais).
* **Checklist Mensal de Execução:** Lista dos compromissos do mês corrente permitindo marcar o status como "Debitado/Pago" ou "Pendente", calculando o total já liquidado vs. a liquidar.
* **Central de Insights In-App:** Cards informativos contextuais no dashboard mostrando eventos como término de parcelas liberando renda no futuro e alertas de meses com alta taxa de comprometimento.

### Desejáveis:
* **Filtros e Agrupamentos:** Filtrar compromissos por categoria (Entretenimento, Moradia, Saúde, Trabalho) ou por cartão de crédito.
* **Exportação Simples:** Exportação da projeção de 12 meses em formato CSV ou visualização para impressão/PDF.
* **Simulador Rápido de Novos Gastos:** Área temporária onde o usuário testa "E se eu parcelar uma compra de R$ 3.000 em 10x agora?", visualizando o impacto futuro antes de efetivar a compra.

---

## 6. Fora do escopo

* Integração bancária automática via Open Finance ou leitura automática de faturas de banco.
* Upload e parsing de arquivos OFX, PDF de extratos bancários ou planilhas externas.
* Registro de despesas avulsas do dia a dia (alimentação avulsa, transporte pontual, cafezinhos, supermercado variável).
* Gestão de contas multi-usuário ou compartilhamento familiar em tempo real com permissões conjuntas.
* Envio de notificações externas automatizadas (e-mails transacionais periódicos, push notifications nativas, mensagens por WhatsApp).
* Gestão de investimentos, patrimônio líquido ou conciliação de saldo em contas bancárias correntes.

---

## 7. Regras de negócio

* **Regra 1 (Isolamento de Dados do Usuário):** Cada usuário autenticado tem acesso estritamente aos seus próprios dados (renda, cartões, compromissos e projeções). Nenhuma informação é compartilhada entre contas.
* **Regra 2 (Impacto de Fechamento de Cartão):** Se um compromisso está vinculado a um cartão de crédito e sua data de cobrança for superior ao dia de fechamento daquele cartão, o impacto financeiro (desembolso) será contabilizado no mês de vencimento da fatura subsequente.
* **Regra 3 (Cálculo em Caixa Real):** Compromissos anuais ou sazonais impactam integralmente o mês em que ocorre a cobrança/vencimento. Não há divisão contábil artificial do valor entre os 12 meses; o sistema destaca o mês do evento com alerta visual de sazonalidade.
* **Regra 4 (Término de Parcelamentos):** Uma compra parcelada de $N$ vezes só é projetada até a última parcela restante. Após a data da última parcela, o compromisso cessa automaticamente sua projeção nos meses seguintes.
* **Regra 5 (Independência do Checklist Mensal):** O status do checklist mensal ("Pago" ou "Pendente") serve exclusivamente para acompanhamento operacional do mês vigente. O fato de um item não ser marcado como pago não impede nem distorce a projeção contínua dos meses futuros.
* **Regra 6 (Status do Compromisso):** Compromissos podem estar "Ativo", "Pausado" ou "Cancelado". Itens pausados ou cancelados são imediatamente excluídos do cálculo de projeção futura a partir da data de suspensão.
* **Regra 7 (Percentual de Renda Comprometida):** A taxa de comprometimento mensal é calculada dividindo a soma de todos os compromissos com desembolso naquele mês pela renda mensal líquida cadastrada, expressa em porcentagem. Caso a renda seja zero ou não informada, o sistema exibe o valor monetário total sem a métrica percentual.

---

## 8. Fluxos principais

### Fluxo 1 — Onboarding e Primeiro Cadastro
1. O usuário acessa a aplicação, cria sua conta e confirma seu acesso.
2. Na primeira tela, o sistema solicita a inserção da renda mensal líquida estimada.
3. Em seguida, sugere o cadastro do primeiro cartão de crédito (informando nome, dia de fechamento e dia de vencimento) ou prosseguir sem cartão.
4. O usuário é apresentado à biblioteca de templates populares (Netflix, Spotify, etc.) e com poucos cliques seleciona os serviços que assina, informando valor e dia de vencimento.
5. O dashboard é carregado com a projeção imediata dos próximos 12 meses e o checklist do mês corrente.

### Fluxo 2 — Cadastro de Nova Compra Parcelada
1. O usuário clica em "Novo Compromisso" e seleciona a aba "Compra Parcelada".
2. Preenche o nome da compra (ex: "Notebook Dell"), o valor de cada parcela, o total de parcelas (ex: 10x), o número da parcela atual que vencerá a seguir (ex: parcela 3 de 10) e a data de vencimento/cobrança.
3. Seleciona a forma de pagamento (Cartão cadastrado ou Débito em Conta/Boleto).
4. O sistema valida os campos, registra a compra e recalcula a linha do tempo, exibindo exatamente o mês em que a última parcela será debitada.

### Fluxo 3 — Auditoria e Acompanhamento Mensal (Checklist)
1. No início ou durante o mês corrente, o usuário abre a tela do "Mês Atual".
2. Visualiza a lista de todos os compromissos previstos para o mês, ordenados por data de vencimento/fatura.
3. Ao verificar que uma assinatura debitou no cartão ou foi paga via débito, o usuário clica no checkbox "Pago/Debitado".
4. O sistema atualiza o card de resumo: total pago no mês até o momento vs. total restante a ser debitado até o fim do mês.

### Fluxo 4 — Análise da Projeção e Identificação de Picos
1. O usuário acessa a visualização de "Projeção 12 Meses".
2. Examina o gráfico de barras/linha dos próximos meses, identificando meses com alertas de renovação anual (badges coloridos) e meses de redução de despesas (quedas decorrentes de parcelas encerradas).
3. Ao clicar em um mês específico do gráfico, uma gaveta/modal detalha a lista exata de compromissos que geram aquele custo.

---

## 9. Critérios de aceite

* O usuário consegue criar uma conta individual e gerenciar com segurança seus dados protegidos por autenticação.
* O sistema deve calcular o mês de desembolso correto para compromissos no cartão de crédito, aplicando a regra de fechamento de fatura.
* O sistema deve projetar com precisão matemática os próximos 12 meses a partir do mês corrente para qualquer combinação de assinaturas mensais, anuais e parcelamentos.
* O sistema não deve incluir parcelamentos finalizados em meses posteriores ao término das suas parcelas.
* O sistema não deve exigir o preenchimento de campos complexos ou cadastros bancários para gerar o cálculo de projeção.
* Quando o usuário marcar um item como "Pago" no checklist mensal, o status deve ser persistido para aquele ciclo sem alterar o comportamento das projeções dos meses seguintes.
* Quando o usuário cadastrar sua renda líquida mensal, o sistema deve calcular e exibir a porcentagem de comprometimento da renda em cada um dos 12 meses projetados.

---

## 10. Stack

* **Frontend:** Next.js (App Router), React, TypeScript.
* **Estilização e Componentes:** Tailwind CSS, shadcn/ui.
* **Animações e Transições:** Framer Motion.
* **Visualização de Dados (Gráficos):** Recharts ou visualizador nativo compatível com shadcn/ui.
* **Backend, Banco de Dados & Autenticação:** Supabase (PostgreSQL, Supabase Auth com Row Level Security - RLS).
* **Validação de Formulários & Esquemas:** Zod com React Hook Form.

---

## 11. Justificativa da stack

* **Next.js + TypeScript + Tailwind:** Padrão moderno da indústria que viabiliza SSR, renderização ágil de interfaces ricas e tipagem estrita de ponta a ponta, reduzindo bugs lógicos no motor financeiro.
* **shadcn/ui + Framer Motion:** Proporciona componentes acessíveis, consistentes e esteticamente refinados, essenciais para dashboards financeiros claros, com micro-interações fluidas na navegação da linha do tempo.
* **Supabase (PostgreSQL + RLS):** Garante banco relacional robusto com isolamento de dados por usuário nativo direto nas políticas SQL (`auth.uid() = user_id`), com autenticação integrada sem a necessidade de manter serviços complexos de sessão.

---

## 12. Fases de construção

### Fase 1 — Fundação, Autenticação e Perfil de Renda
Objetivo: Estabelecer a infraestrutura de acesso seguro do usuário e configuração da renda líquida base.
Specs:
- Spec 01 — Autenticação de Usuário e Configuração de Renda Mensal

### Fase 2 — Meios de Pagamento e Gestão de Cartões
Objetivo: Permitir o cadastro de cartões de crédito com suas regras de faturas para ancorar as datas de desembolso real.
Specs:
- Spec 02 — Cadastro e Gestão de Cartões de Crédito com Ciclo de Faturas

### Fase 3 — Gestão de Compromissos Financeiros
Objetivo: Habilitar o cadastro ágil via presets e a gestão completa dos três tipos de compromissos suportados.
Specs:
- Spec 03 — Catálogo de Presets e Cadastro de Assinaturas Fixas
- Spec 04 — Cadastro de Compras Parceladas e Despesas com Estimativa Média
- Spec 05 — Gestão do Ciclo de Vida do Compromisso (Edição, Pausa e Cancelamento)

### Fase 4 — Motor de Projeção de 12 Meses
Objetivo: Implementar a inteligência de cálculo e a interface de visualização da projeção financeira anual com indicadores de comprometimento de renda.
Specs:
- Spec 06 — Motor de Cálculo e Linha do Tempo de Projeção de 12 Meses

### Fase 5 — Execução Mensal e Central de Insights
Objetivo: Oferecer a ferramenta de conferência mensal de pagamentos e a inteligência contextual de avisos e oportunidades orçamentárias.
Specs:
- Spec 07 — Checklist Mensal de Execução de Pagamentos
- Spec 08 — Central In-App de Insights e Alertas Financeiros

---

## 13. Specs funcionais detalhadas

### Spec 01 — Autenticação de Usuário e Configuração de Renda Mensal

- **Fase:** Fase 1 — Fundação, Autenticação e Perfil de Renda
- **Objetivo (o quê):** Permitir que o usuário realize cadastro/login seguro por e-mail/senha e defina sua renda líquida mensal de referência para orientar todos os cálculos do sistema.
- **Intenção (por quê):** Sem a identificação do usuário, os dados não podem ser salvos com privacidade; sem a renda cadastrada, o sistema não tem parâmetro para calcular o percentual de comprometimento financeiro futuro.
- **Contexto:** É o ponto de entrada da aplicação do zero.
- **Atores:** Usuário não autenticado e Usuário recém-autenticado.
- **Descrição do comportamento:** 
  1. A tela pública disponibiliza formulários de Login e Cadastro (e-mail e senha com confirmação).
  2. Após login com sucesso, o usuário é direcionado ao dashboard. Se for o primeiro acesso e a renda líquida não estiver preenchida, um modal ou banner convida o usuário a informar o valor da sua renda mensal.
  3. O usuário pode a qualquer momento acessar as configurações da conta para atualizar sua renda mensal ou alterar sua senha.
- **Entradas e saídas:**
  - *Entradas:* E-mail, senha, valor da renda mensal líquida (em moeda BRL).
  - *Saídas:* Sessão de autenticação ativa, visualização do valor da renda cadastrada no cabeçalho ou menu de configurações.
- **Dados/entidades envolvidos (conceitual):**
  - Usuário: identificador único, e-mail, data de cadastro.
  - Perfil Financeiro: identificador do usuário, valor da renda mensal líquida, data de atualização.
- **Estados e transições:**
  - Estado da Sessão: `Não Autenticado` -> `Autenticado`.
  - Estado do Perfil: `Renda Não Definida` -> `Renda Configurada`.
- **Regras de negócio:**
  - O e-mail deve ser único no sistema.
  - A renda mensal líquida deve ser um número positivo maior ou igual a zero.
  - O usuário só pode visualizar e modificar seu próprio perfil (Row Level Security rigoroso).
- **Validações:**
  - Formato de e-mail válido.
  - Senha com no mínimo 6 caracteres.
  - Renda numérica positiva.
- **Fluxo do usuário (passo a passo):**
  1. O usuário entra na aplicação e clica em "Criar conta".
  2. Informa e-mail e senha e confirma o envio.
  3. O sistema cria a conta e autentica automaticamente.
  4. O sistema exibe um diálogo de boas-vindas: "Para calcularmos a taxa de comprometimento dos seus gastos, qual é a sua renda mensal líquida aproximada?".
  5. O usuário digita o valor (ex: R$ 5.000,00) e confirma.
  6. O sistema salva o perfil e o direciona para a tela inicial.
- **Casos de borda e erros:**
  - E-mail já cadastrado: exibir mensagem amigável "Este e-mail já possui uma conta cadastrada".
  - Credenciais inválidas no login: exibir "E-mail ou senha incorretos".
  - O usuário fecha o diálogo de renda sem preencher: o sistema permite navegar, mas exibe um lembrete no dashboard informando que a taxa percentual de comprometimento requer a renda cadastrada.
- **Impacto no existente:** Nenhum (ponto de partida).
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que o usuário preenche credenciais válidas, Quando clica em registrar, Então sua conta é criada e a sessão fica ativa.
  - Dado que um usuário autenticado acessa o perfil e altera sua renda de R$ 4.000 para R$ 5.000, Quando salva a alteração, Então o novo valor é persistido e reflete no cálculo de comprometimento.
- **Definição de pronto:** Fluxo completo de cadastro, login, logout e persistência do valor da renda líquida funcional com testes e validações.
- **Dependências:** Nenhuma.
- **Fora do escopo desta spec:** Recuperação avançada de senha via links mágicos ou login social (Google/GitHub), que podem ser adicionados posteriormente.

---

### Spec 02 — Cadastro e Gestão de Cartões de Crédito com Ciclo de Faturas

- **Fase:** Fase 2 — Meios de Pagamento e Gestão de Cartões
- **Objetivo (o quê):** Permitir o cadastro, listagem, edição e exclusão de cartões de crédito informando nome/bandeira, dia de fechamento da fatura e dia de vencimento da fatura.
- **Intenção (por quê):** Viabilizar o motor de projeção precisa. Compras e assinaturas cobradas no cartão de crédito após a data de fechamento geram desembolso financeiro apenas no mês seguinte.
- **Contexto:** Depende da autenticação (Spec 01) e será referenciado no cadastro de compromissos (Specs 03 e 04).
- **Atores:** Usuário autenticado.
- **Descrição do comportamento:**
  1. O usuário acessa a seção "Meus Cartões" e visualiza os cartões já cadastrados (ou uma tela vazia convidativa).
  2. Ao clicar em "Novo Cartão", informa: Nome do cartão (ex: "Nubank Ultravioleta"), cor de identificação ou bandeira, dia de fechamento (1 a 31) e dia de vencimento (1 a 31).
  3. O cartão salvo passa a constar como opção de meio de pagamento ao cadastrar despesas.
  4. O usuário pode editar as datas de fechamento/vencimento ou excluir um cartão (com alerta caso existam despesas vinculadas).
- **Entradas e saídas:**
  - *Entradas:* Nome do cartão, cor/tema visual, dia de fechamento (inteiro 1..31), dia de vencimento (inteiro 1..31), limite total (opcional).
  - *Saídas:* Lista de cartões cadastrados exibindo os ciclos e atalhos de edição/exclusão.
- **Dados/entidades envolvidos (conceitual):**
  - Cartão de Crédito: id, usuário_id, nome, cor, dia_fechamento, dia_vencimento, limite_total (opcional), data_criacao.
- **Estados e transições:**
  - Ciclo de vida do registro: `Criado` -> `Editado` -> `Excluído`.
- **Regras de negócio:**
  - Os dias de fechamento e vencimento devem ser números entre 1 e 31.
  - Se o dia de vencimento for menor ou igual ao dia de fechamento, entende-se convencionalmente que a fatura vence no mês calendário subsequente ao fechamento (ex: fecha dia 25 de um mês e vence dia 5 do mês seguinte).
  - Não é permitido excluir um cartão sem antes transferir ou desvincular os compromissos ativos associados a ele.
- **Validações:**
  - Nome do cartão obrigatório (2 a 40 caracteres).
  - Dia de fechamento entre 1 e 31.
  - Dia de vencimento entre 1 e 31.
- **Fluxo do usuário (passo a passo):**
  1. O usuário clica na aba "Cartões" e depois em "Adicionar Cartão".
  2. Preenche "Nubank", seleciona a cor roxa, define fechamento dia 20 e vencimento dia 27.
  3. Clica em "Salvar Cartão".
  4. O cartão aparece na lista visual com o badge "Fecha dia 20 · Vence dia 27".
- **Casos de borda e erros:**
  - Meses com menos de 31 dias (fevereiro, abril, etc.): o sistema ajusta a data para o último dia do respectivo mês (ex: dia 31 em fevereiro é tratado como 28 ou 29).
  - Tentativa de exclusão com despesas ativas: modal bloqueia a exclusão e avisa: "Existem 4 compromissos vinculados a este cartão. Reatribua-os para outro meio antes de excluir".
- **Impacto no existente:** Cria a entidade base que alimentará os selects de pagamento nas telas de compromissos.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que o usuário cadastra um cartão com fechamento dia 15 e vencimento dia 22, Quando salva, Então o registro é criado no banco e listado na interface.
  - Dado que um cartão possui despesas atreladas, Quando o usuário tenta excluí-lo, Então o sistema bloqueia e emite aviso explicativo.
- **Definição de pronto:** CRUD completo de cartões funcional, integrado à conta do usuário autenticado via RLS, com validações de data.
- **Dependências:** Spec 01.
- **Fora do escopo desta spec:** Conexão direta com a API do banco ou consulta de limite em tempo real.

---

### Spec 03 — Catálogo de Presets e Cadastro de Assinaturas Fixas

- **Fase:** Fase 3 — Gestão de Compromissos Financeiros
- **Objetivo (o quê):** Disponibilizar uma biblioteca com templates prontos de assinaturas populares (Netflix, Spotify, etc.) e um formulário rápido para cadastrar compromissos recorrentes contínuos com periodicidade mensal ou anual.
- **Intenção (por quê):** Reduzir drasticamente o atrito de entrada de dados no onboarding inicial, permitindo que o usuário popule suas principais assinaturas em poucos segundos.
- **Contexto:** Utiliza os cartões cadastrados na Spec 02 como opção de pagamento.
- **Atores:** Usuário autenticado.
- **Descrição do comportamento:**
  1. Ao clicar em "Nova Assinatura", o sistema exibe uma grade com ícones de serviços populares (Netflix, Spotify, Amazon Prime, YouTube Premium, Disney+, Max, ChatGPT Plus, iCloud, Google One, Academia/Smart Fit).
  2. Se o usuário clicar em um preset (ex: Netflix), o formulário é pré-preenchido com nome, ícone e categoria ("Streaming"), solicitando apenas: Valor (R$), Periodicidade (Mensal ou Anual), Dia de cobrança e Meio de pagamento (Cartão cadastrado ou Débito/Pix).
  3. Há também a opção "Personalizado" para cadastrar qualquer serviço não listado no catálogo.
  4. Ao salvar, a assinatura é registrada como ativa e passa a compor a projeção futura.
- **Entradas e saídas:**
  - *Entradas:* Nome do serviço, categoria, ícone/logo (preset ou genérico), valor monetário, periodicidade (mensal | anual), dia do mês da cobrança (1..31), mês de cobrança (se anual), meio de pagamento selecionado (cartão ou outro).
  - *Saídas:* Registro criado e listado na visão de compromissos.
- **Dados/entidades envolvidos (conceitual):**
  - Compromisso Recorrente: id, usuário_id, tipo (`assinatura_fixa`), nome, categoria, icone, valor, periodicidade (`mensal` | `anual`), dia_cobranca, mes_cobranca_anual (opcional), cartao_id (opcional), status (`ativo`), data_inicio.
- **Estados e transições:**
  - Status inicial: `Ativo`.
- **Regras de negócio:**
  - Assinaturas fixas não têm data final pré-estabelecida; sua projeção se estende indefinidamente até que o usuário pause ou cancele.
  - Para periodicidade anual, o usuário deve informar obrigatoriamente em qual mês do ano a cobrança ocorre (ex: "Todo mês de Outubro").
  - O valor deve ser maior do que zero.
- **Validações:**
  - Nome obrigatório.
  - Valor maior que zero.
  - Dia da cobrança entre 1 e 31.
  - Se anual, mês entre 1 e 12 obrigatório.
- **Fluxo do usuário (passo a passo):**
  1. O usuário clica em "Adicionar Assinatura".
  2. O modal abre com o catálogo de ícones. O usuário clica no logo do Spotify.
  3. Os campos Nome ("Spotify") e Categoria ("Música/Streaming") já vêm preenchidos.
  4. O usuário digita o valor "34,90", seleciona "Mensal", dia de cobrança "10" e escolhe o cartão "Nubank".
  5. Clica em "Cadastrar Assinatura". O modal fecha e a assinatura aparece na lista com o logo do Spotify.
- **Casos de borda e erros:**
  - O usuário não encontra o serviço no catálogo: ele clica em "Outro / Personalizado", podendo digitar livremente o nome e escolher um ícone/cor genérica.
  - Assinatura anual com data de cobrança no próprio mês corrente que já passou: o sistema projeta a próxima ocorrência para o próximo ano.
- **Impacto no existente:** Alimenta a lista de compromissos ativos do usuário.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que o usuário escolhe um preset do catálogo, Quando o formulário abre, Então o nome e a categoria correspondente vêm preenchidos automaticamente.
  - Dado que o usuário cadastra uma assinatura anual em março, Quando salva, Então o sistema armazena a periodicidade anual e o mês de cobrança correto.
- **Definição de pronto:** Catálogo de presets interativo funcional, formulário validado com suporte a assinaturas mensais e anuais, persistência segura no banco de dados.
- **Dependências:** Spec 01 e Spec 02.
- **Fora do escopo desta spec:** Assinaturas semanais ou diárias (não usuais em finanças pessoais planejadas).

---

### Spec 04 — Cadastro de Compras Parceladas e Despesas com Estimativa Média

- **Fase:** Fase 3 — Gestão de Compromissos Financeiros
- **Objetivo (o quê):** Permitir o cadastro de compras parceladas (com número finito de parcelas) e contas recorrentes flutuantes (energia, água, condomínio) com estimativa de valor médio mensal.
- **Intenção (por quê):** Compras parceladas e contas básicas consom grande parte da renda mensal; sem elas, a projeção de 12 meses fica incompleta e sem fidelidade com a realidade.
- **Contexto:** Complementa a Spec 03 no módulo de compromissos e alimenta o motor da Spec 06.
- **Atores:** Usuário autenticado.
- **Descrição do comportamento:**
  1. Na tela de cadastro de compromisso, o usuário pode selecionar o tipo: "Compra Parcelada" ou "Conta de Valor Variável".
  2. *Para Compras Parceladas:* Informa Nome (ex: "iPhone 15"), Valor da parcela, Quantidade total de parcelas (ex: 12), Parcela atual que vai vencer (ex: 4), Dia de vencimento/cobrança e Cartão de crédito associado. O sistema calcula automaticamente que restam 9 parcelas a serem projetadas e em qual mês terminará.
  3. *Para Contas de Valor Variável:* Informa Nome (ex: "Conta de Luz"), Valor médio estimado (ex: R$ 220,00), Dia de vencimento e Meio de pagamento (Débito/Boleto).
- **Entradas e saídas:**
  - *Entradas:* Tipo de compromisso, nome, valor, parcelas_totais (se parcelado), parcela_atual (se parcelado), dia_cobranca, meio de pagamento.
  - *Saídas:* Registro criado e data estimada de término calculada para parcelados.
- **Dados/entidades envolvidos (conceitual):**
  - Compromisso: id, usuário_id, tipo (`parcelamento` | `conta_flutuante`), nome, valor_parcela_ou_estimativa, parcelas_totais (opcional), parcela_atual (opcional), dia_cobranca, cartao_id (opcional), status (`ativo`), data_inicio.
- **Estados e transições:**
  - Para parcelados: a cada mês transcorrido, a parcela avança até atingir o total, quando o status transita para `Concluído`.
- **Regras de negócio:**
  - No parcelamento, a `parcela_atual` não pode ser maior do que `parcelas_totais`.
  - As parcelas futuras são projetadas exatamente pelo número de meses restantes (`parcelas_totais - parcela_atual + 1`).
  - Contas variáveis são projetadas continuamente usando o valor médio estimado informado, até que o usuário edite o valor.
- **Validações:**
  - Valor numérico positivo.
  - Parcelas totais deve ser um inteiro entre 2 e 96.
  - Parcela atual deve ser um inteiro entre 1 e `parcelas_totais`.
- **Fluxo do usuário (passo a passo):**
  1. O usuário clica em "Adicionar Compromisso" e escolhe "Compra Parcelada".
  2. Digita: "Geladeira", valor da parcela: R$ 180,00, total de parcelas: 10, parcela atual: 3.
  3. Seleciona o cartão "Nubank" e dia de cobrança 15.
  4. O sistema exibe um texto de confirmação: "Restam 8 parcelas de R$ 180,00 (Total restante: R$ 1.440,00). Término previsto em [Mês/Ano]".
  5. O usuário confirma e salva.
- **Casos de borda e erros:**
  - Usuário digita parcela atual maior que total: validação imediata no formulário bloqueia o envio com mensagem "A parcela atual não pode ser superior ao total de parcelas".
  - Parcela 1 de 1: o sistema sugere que o usuário cadastre como despesa simples ou não parcelada, pois parcelamento requer no mínimo 2 parcelas.
- **Impacto no existente:** Expande a tipagem e os registros manipulados pela listagem de compromissos.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado uma compra de 10 parcelas na parcela 3, Quando o sistema calcula as parcelas restantes, Então projeta exatamente 8 meses de cobrança no futuro.
  - Dado uma conta flutuante cadastrada com média de R$ 250, Quando calculada a projeção, Então projeta R$ 250 em todos os 12 meses seguintes.
- **Definição de pronto:** Formulários de parcelamento e conta flutuante com cálculo automático de meses restantes e persistência íntegra.
- **Dependências:** Specs 01, 02 e 03.
- **Fora do escopo desta spec:** Histórico de faturas passadas de luz/água ou recálculo dinâmico por média móvel automatizada.

---

### Spec 05 — Gestão do Ciclo de Vida do Compromisso (Edição, Pausa e Cancelamento)

- **Fase:** Fase 3 — Gestão de Compromissos Financeiros
- **Objetivo (o quê):** Permitir que o usuário visualize a listagem completa dos seus compromissos, filtre por status/tipo, altere valores ou datas, pause temporariamente e cancele/exclua compromissos.
- **Intenção (por quê):** Usuários frequentemente renegociam valores de assinaturas, trocam de planos, cancelam serviços que não usam mais ou precisam pausar cobranças temporariamente sem perder o histórico do cadastro.
- **Contexto:** Opera sobre os registros criados nas Specs 03 e 04.
- **Atores:** Usuário autenticado.
- **Descrição do comportamento:**
  1. O usuário acessa a tela "Meus Compromissos".
  2. A tela exibe abas ou filtros: "Ativos", "Pausados" e "Cancelados/Concluídos", além de filtros por tipo (Assinaturas, Parcelamentos, Contas).
  3. Cada card/linha possui um menu de ações: "Editar", "Pausar" (ou "Reativar"), "Cancelar" e "Excluir".
  4. Ao colocar um compromisso como "Pausado" ou "Cancelado", ele deixa de ser computado na projeção futura a partir do mês da ação.
  5. A edição de valor ou dia atualiza as projeções futuras em tempo real.
- **Entradas e saídas:**
  - *Entradas:* Ação selecionada (editar campos, pausar, reativar, cancelar, excluir).
  - *Saídas:* Lista atualizada e recálculo das projeções.
- **Dados/entidades envolvidos (conceitual):**
  - Compromisso: campos da Spec 03 e 04 + status (`ativo`, `pausado`, `cancelado`), data_pausa, data_cancelamento.
- **Estados e transições:**
  - `Ativo` -> `Pausado` (o usuário clica em Pausar).
  - `Pausado` -> `Ativo` (o usuário clica em Reativar).
  - `Ativo` ou `Pausado` -> `Cancelado` (o usuário confirma cancelamento definitivo).
  - `Qualquer` -> Exclusão física (com confirmação).
- **Regras de negócio:**
  - Compromissos `Pausados` não somam nos cálculos de projeção futura nem entram no checklist mensal enquanto estiverem com esse status.
  - Ao reativar um compromisso pausado, ele volta a ser projetado a partir do mês corrente.
  - A exclusão remove o registro permanentemente do banco de dados após modal de confirmação.
- **Validações:**
  - Confirmação explícita para ações destrutivas (excluir ou cancelar).
- **Fluxo do usuário (passo a passo):**
  1. O usuário identifica que cancelou sua assinatura da academia.
  2. Localiza o card "Academia" na lista de compromissos ativos.
  3. Clica no menu de opções e seleciona "Cancelar Assinatura".
  4. O sistema questiona se deseja cancelar imediatamente. O usuário confirma.
  5. O status muda para "Cancelado" e a projeção dos próximos meses é imediatamente recalculada sem aquele valor.
- **Casos de borda e erros:**
  - Parcelamento com parcelas restantes sendo cancelado: o usuário pode ter antecipado ou renegociado. O sistema confirma que as parcelas futuras serão removidas da projeção.
- **Impacto no existente:** Mantém a integridade dos dados e fornece o estado correto para o motor de projeção.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um compromisso ativo que é alterado para pausado, Quando o usuário visualiza a projeção de 12 meses, Então o valor daquele compromisso não é somado nos meses futuros.
  - Dado um compromisso pausado que é reativado, Quando o usuário salva a alteração, Então ele volta a constar na projeção a partir do mês corrente.
- **Definição de pronto:** Tela de listagem com busca/filtros e ações de edição de ciclo de vida plenamente integradas e reativas.
- **Dependências:** Specs 03 e 04.
- **Fora do escopo desta spec:** Histórico de auditoria detalhado de cada edição de centavos realizada no passado.

---

### Spec 06 — Motor de Cálculo e Linha do Tempo de Projeção de 12 Meses

- **Fase:** Fase 4 — Motor de Projeção de 12 Meses
- **Objetivo (o quê):** Desenvolver o algoritmo de cálculo que gera a projeção mês a mês para os próximos 12 meses (considerando ciclos de cartão de crédito, anuidades em caixa real e término de parcelas) e renderizar a visualização em gráfico e tabela interativa.
- **Intenção (por quê):** É o núcleo de valor do produto: permitir que o usuário saiba com exatidão matemática seus compromissos futuros e a porcentagem da sua renda comprometida em cada um dos próximos 12 meses.
- **Contexto:** Consome os dados das Specs 01, 02, 03, 04 e 05.
- **Atores:** Usuário autenticado.
- **Descrição do comportamento:**
  1. O motor gera um array cronológico de 12 meses a partir do mês/ano atual (ex: Mês 1 a Mês 12).
  2. Para cada mês, itera sobre todos os compromissos ativos:
     - *Regra de Cartão de Crédito:* Se o compromisso está em cartão de crédito, compara o `dia_cobranca` com o `dia_fechamento`. Se `dia_cobranca > dia_fechamento`, o desembolso financeiro é alocado no mês em que vence a fatura subsequente. Caso contrário, cai na fatura do mês corrente.
     - *Regra de Assinatura Anual:* Soma o valor apenas no mês específico de renovação cadastrado.
     - *Regra de Parcelamentos:* Computa o valor da parcela somente enquanto a parcela do mês estiver dentro do limite de parcelas restantes.
     - *Regra de Despesas Flutuantes e Assinaturas Mensais:* Computa o valor em todos os 12 meses.
  3. Para cada mês, o motor calcula:
     - `total_despesas`: soma de todos os compromissos incidentes.
     - `percentual_comprometimento`: `(total_despesas / renda_mensal) * 100` (se renda > 0).
     - `tem_anuidade`: booleano indicando presença de renovação anual (para exibir badge de alerta sazonal).
     - `itens`: lista dos compromissos que compõem aquele total.
  4. A interface exibe um gráfico interativo (barras ou área) dos 12 meses com linha de referência de 50% e 100% da renda, além de cartões para cada mês permitindo abrir o detalhamento.
- **Entradas e saídas:**
  - *Entradas:* Renda mensal, lista de cartões de crédito com ciclos, lista de compromissos ativos.
  - *Saídas:* Objeto estruturado com a projeção de 12 meses contendo valores monetários, percentuais, badges de alerta e detalhamento dos itens.
- **Dados/entidades envolvidos (conceitual):**
  - Mês Projetado: mes_ano (ex: "2026-12"), total_comprometido, percentual_renda, tem_anuidade_badge, lista_de_compromissos_incidentes.
- **Estados e transições:**
  - O cálculo é determinístico e reativo: qualquer adição, exclusão ou edição de compromisso/renda/cartão reexecuta o motor instantaneamente.
- **Regras de negócio:**
  - O cálculo deve cobrir exatamente os 12 meses subsequentes, iniciando no mês atual.
  - O percentual não possui teto visual (se as contas somarem R$ 6.000 para uma renda de R$ 5.000, o sistema exibe "120% comprometido" com destaque em vermelho).
  - Parcelamentos não devem gerar resíduo financeiro após a última parcela.
- **Validações:**
  - Divisão por zero prevenida caso renda seja zero ou nula.
  - Tratamento correto de viradas de ano (dezembro para janeiro).
- **Fluxo do usuário (passo a passo):**
  1. O usuário clica na aba "Projeção 12 Meses".
  2. Visualiza o gráfico com 12 colunas correspondentes aos próximos 12 meses.
  3. Observa que em Outubro há uma barra mais alta com um badge de exclamação: "Renovação Anual".
  4. Clica sobre a barra de Outubro.
  5. Uma gaveta lateral abre exibindo a lista: "Amazon Prime Anual (R$ 200,00)", "Netflix (R$ 55,90)", etc.
  6. Observa também que a partir de Dezembro a barra cai 30%, pois a compra do "Celular" encerrou as parcelas em Novembro.
- **Casos de borda e erros:**
  - Usuário sem nenhum compromisso cadastrado: exibir estado vazio informativo ("Nenhum compromisso cadastrado. Adicione suas assinaturas para ver sua projeção futura").
  - Usuário sem renda cadastrada: exibir gráfico com valores em R$ e aviso amigável: "Defina sua renda para ver a taxa percentual de comprometimento".
- **Impacto no existente:** É a funcionalidade central que consome todos os dados cadastrais anteriores.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado uma compra de 3 parcelas restantes iniciando em Janeiro, Quando calculada a projeção de 12 meses, Então os meses de Janeiro, Fevereiro e Março contêm a parcela, e de Abril a Dezembro o valor é zero.
  - Dado uma anuidade com vencimento em Julho, Quando visualizada a projeção, Então apenas Julho contém o valor e apresenta o badge visual de renovação anual.
- **Definição de pronto:** Motor de cálculo unitariamente testado e validado com interface gráfica fluida e responsiva exibindo os 12 meses.
- **Dependências:** Specs 01, 02, 03, 04 e 05.
- **Fora do escopo desta spec:** Previsões com inflação acumulada ou reajustes hipotéticos automáticos de IGPM/IPCA.

---

### Spec 07 — Checklist Mensal de Execução de Pagamentos

- **Fase:** Fase 5 — Execução Mensal e Central de Insights
- **Objetivo (o quê):** Fornecer uma visão de checklist operacional para o mês corrente, onde o usuário acompanha os compromissos que vencem naquele mês e pode marcar individualmente cada um como "Debitado/Pago" ou "Pendente".
- **Intenção (por quê):** Transformar o app em um aliado prático do dia a dia do usuário, permitindo conferir no meio do mês quanto já saiu da sua conta e quanto ainda vai cair na fatura ou no débito até o final do ciclo.
- **Contexto:** Utiliza a lista de compromissos incidentes no mês corrente gerada pelo motor da Spec 06.
- **Atores:** Usuário autenticado.
- **Descrição do comportamento:**
  1. Na tela principal ou na aba "Mês Atual", o sistema exibe o resumo financeiro do mês corrente: Total do Mês, Total Já Pago e Total Restante a Pagar.
  2. Abaixo, exibe a lista dos compromissos daquele mês ordenados pelo dia de vencimento/cobrança.
  3. Cada item exibe um checkbox de status. Ao clicar, o item alterna entre "Pendente" e "Debitado/Pago".
  4. Os totais de "Já Pago" e "A Pagar" são recalculados imediatamente na tela.
  5. Itens marcados como pagos recebem estilo visual diferenciado (texto tachado suave ou badge verde "Pago").
- **Entradas e saídas:**
  - *Entradas:* Clique do usuário alternando o status de pagamento de um compromisso para o mês corrente.
  - *Saídas:* Total pago atualizado, total pendente atualizado e indicador visual de conferência.
- **Dados/entidades envolvidos (conceitual):**
  - ExecucaoMensal: id, usuario_id, compromisso_id, mes_ano (ex: "2026-11"), pago (booleano), data_pagamento.
- **Estados e transições:**
  - `Pendente` <-> `Debitado/Pago`.
- **Regras de negócio:**
  - O status de pagamento pertence estritamente ao mês corrente (o fato de o Spotify ter sido marcado como pago em Novembro não o marca como pago em Dezembro).
  - O checklist não bloqueia nem penaliza o usuário caso uma data passe sem o check; o item permanece marcado como "Pendente" até que o usuário interaja.
  - Compromissos pausados não aparecem no checklist mensal.
- **Validações:**
  - Somente o próprio usuário pode marcar ou desmarcar seus compromissos.
- **Fluxo do usuário (passo a passo):**
  1. O usuário entra no app no dia 12 do mês.
  2. Vê que tem R$ 1.800 de despesas previstas para o mês.
  3. Olha a fatura do cartão e vê que a Netflix (R$ 55,90) e o Condomínio (R$ 450,00) já foram debitados.
  4. Dá o check nos dois itens.
  5. O card no topo atualiza: "Já debitado: R$ 505,90 · Restante no mês: R$ 1.294,10".
- **Casos de borda e erros:**
  - Virada de mês: ao iniciar um novo mês calendário, o checklist apresenta o novo mês com todos os itens inicialmente como pendentes, preservando o histórico do mês anterior para consulta.
- **Impacto no existente:** Conecta a projeção teórica à conferência real do dia a dia do usuário.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um compromisso pendente no mês, Quando o usuário clica no checkbox, Então ele é registrado como pago e o total restante a pagar é decrementado.
  - Dado a virada para o próximo mês, Quando o usuário acessa o checklist, Então os compromissos do novo mês iniciam como pendentes.
- **Definição de pronto:** Checklist interativo com persistência mensal e totalizadores reativos de execução financeira.
- **Dependências:** Specs 01, 02, 03, 04 e 06.
- **Fora do escopo desta spec:** Upload de comprovante de pagamento em anexo ou conciliação bancária via extrato.

---

### Spec 08 — Central In-App de Insights e Alertas Financeiros

- **Fase:** Fase 5 — Execução Mensal e Central de Insights
- **Objetivo (o quê):** Gerar cards inteligentes e alertas contextuais dentro do dashboard principal, destacando fatos relevantes como término de parcelamentos liberando orçamento futuro, meses com pico de comprometimento de renda e renovações de anuidades nos próximos 30/60 dias.
- **Intenção (por quê):** Entregar a inteligência proativa que transforma o produto em um assistente financeiro de verdade, poupando o usuário de ter que inspecionar manualmente cada coluna do gráfico para tomar decisões.
- **Contexto:** Analisa a coleção de dados da projeção de 12 meses gerada na Spec 06.
- **Atores:** Usuário autenticado.
- **Descrição do comportamento:**
  1. Na parte superior ou lateral do Dashboard, uma seção "Insights & Alertas" exibe cards dinâmicos priorizados por relevância.
  2. Tipos de cards gerados pelo sistema:
     - *Insight de Liberação de Renda:* "Em Setembro/2026 encerra a última parcela do Notebook Dell. Sua renda livre aumentará em R$ 350,00/mês."
     - *Alerta de Pico Sazonal:* "Atenção: em Outubro/2026 você terá o vencimento da anuidade do Amazon Prime (R$ 200), elevando seu comprometimento para 65% da renda."
     - *Alerta de Sobrecarga de Renda:* Exibido se algum mês projetado ultrapassar 70% ou 100% da renda cadastrada.
     - *Mês Mais Tranquilo:* "Seu mês com menor comprometimento nos próximos 12 meses será Janeiro/2027 (apenas 28% da renda comprometida)."
  3. Os cards possuem botão de dispensar temporariamente ou atalho para visualizar o mês correspondente na projeção.
- **Entradas e saídas:**
  - *Entradas:* Array dos 12 meses projetados e histórico de parcelas.
  - *Saídas:* Lista de cards de insights contextuais ordenados por urgência e impacto financeiro.
- **Dados/entidades envolvidos (conceitual):**
  - InsightCard (derivado em memória / frontend): tipo (`alívio_parcela`, `alerta_anuidade`, `alerta_sobrecarga`, `destaque_economia`), título, descrição, mes_referencia, nivel_severidade (`info`, `alerta`, `sucesso`).
- **Estados e transições:**
  - Cards gerados dinamicamente com base nas regras de negócio da projeção.
- **Regras de negócio:**
  - O card de liberação de renda só é exibido se houver compra parcelada com término dentro da janela dos próximos 12 meses.
  - O alerta de renovação anual é destacado com antecedência máxima de 60 dias da data do evento.
  - O alerta de sobrecarga é disparado quando o percentual de comprometimento ultrapassa 70% da renda.
- **Validações:**
  - Não exibir insights vazios ou redundantes se o usuário tiver poucos dados.
- **Fluxo do usuário (passo a passo):**
  1. O usuário abre o dashboard.
  2. Visualiza um card verde destacado: "Boas notícias: em 3 meses suas parcelas da Geladeira chegam ao fim, liberando R$ 180/mês no seu orçamento."
  3. Clica em "Ver detalhes" e a visualização salta diretamente para o mês correspondente no gráfico de projeção.
- **Casos de borda e erros:**
  - Usuário não possui parcelamentos nem anuidades: exibe card informativo convidativo ("Dica: cadastre suas compras parceladas para descobrir quando seu orçamento será liberado").
- **Impacto no existente:** Enriquece a experiência do dashboard utilizando os dados já computados pelo motor.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado uma compra parcelada que encerra em 4 meses, Quando o usuário acessa o dashboard, Então um card destaca o mês do encerramento e o valor que será liberado na renda.
  - Dado um mês onde o comprometimento supera 70%, Quando o dashboard é carregado, Então um alerta de atenção visual é exibido informando o mês do pico.
- **Definição de pronto:** Gerador de insights dinâmico integrado ao dashboard com layout polido e cards responsivos.
- **Dependências:** Specs 01, 04 e 06.
- **Fora do escopo desta spec:** Notificações via push no celular ou disparo de mensagens de WhatsApp.

---

## 14. Ordem recomendada de implementação

1. **Spec 01 — Autenticação de Usuário e Configuração de Renda Mensal:** Cria a base de segurança, o isolamento dos dados via RLS e a métrica primordial (renda líquida) necessária para todos os cálculos percentuais.
2. **Spec 02 — Cadastro e Gestão de Cartões de Crédito com Ciclo de Faturas:** Fornece a estrutura de cartões e regras de fechamento/vencimento que determinam a precisão das datas de desembolso financeiro.
3. **Spec 03 — Catálogo de Presets e Cadastro de Assinaturas Fixas:** Permite o registro rápido das principais despesas recorrentes contínuas e cria a primeira massa de dados da aplicação.
4. **Spec 04 — Cadastro de Compras Parceladas e Despesas com Estimativa Média:** Conclui o modelo de dados de compromissos ao suportar parcelas com término programado e contas flutuantes com média declarada.
5. **Spec 05 — Gestão do Ciclo de Vida do Compromisso (Edição, Pausa e Cancelamento):** Fecha as operações de manutenção e estados dos dados para garantir que compromissos pausados ou excluídos não poluam as projeções.
6. **Spec 06 — Motor de Cálculo e Linha do Tempo de Projeção de 12 Meses:** Implementa o coração analítico do sistema, unindo renda, cartões e compromissos em uma interface gráfica de 12 meses com badges sazonais.
7. **Spec 07 — Checklist Mensal de Execução de Pagamentos:** Adiciona a camada de acompanhamento prático do mês corrente ("Pago" vs. "Pendente").
8. **Spec 08 — Central In-App de Insights e Alertas Financeiros:** Finaliza a entrega com inteligência analítica proativa no dashboard (cards de término de parcelamento e alertas de sobrecarga).

> **Nota:** Seguir rigorosamente esta ordem garante que cada spec seja construída sobre entidades e comportamentos já consolidados e testados, evitando retrabalho ou dependências quebradas.
