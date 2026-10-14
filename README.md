# Portal de Admissões de Novos Alunos • 1º e 2º Ciclo do Ensino Secundário (CL-FUTURO)

Aplicação Front-End completa, responsiva e de alta fidelidade desenvolvida especificamente para a **Gestão de Admissões e Inscrições no 1º e 2º Ciclo do Ensino Secundário** (Geral e Técnico-Profissional).

---

## 🏫 Contexto Educacional (1º e 2º Ciclo do Ensino Secundário)

A aplicação foi adaptada para contemplar a estrutura oficial do Ensino Secundário:

1. **1º Ciclo do Ensino Secundário Geral:**
   - **7ª Classe:** Ingresso inicial pós-conclusão da 6ª classe do Ensino Primário.
   - **8ª e 9ª Classe:** Transferência e continuidade escolar de outras instituições.
2. **2º Ciclo do Ensino Secundário Geral (Liceu / PUNIV - 10ª à 12ª Classe):**
   - **Ciências Físicas e Biológicas:** Preparação para as áreas de Medicina, Saúde e Ciências Naturais.
   - **Ciências Económicas e Jurídicas:** Preparação para Economia, Gestão, Direito e Ciências Sociais.
3. **2º Ciclo do Ensino Secundário Técnico (Instituto Politécnico - 10ª à 13ª Classe):**
   - **Técnico de Informática:** Sistemas de Informação, Programação, Redes e Robótica.
   - **Contabilidade e Gestão Empresarial:** Prática contábil, finanças e software de gestão.
   - **Enfermagem Geral & Saúde:** Formação técnica de saúde com internato supervisionado.
   - **Construção Civil & Desenho Projetista:** Topografia, desenho técnico e fiscalização de obras.
4. **Dados do Aluno e do Encarregado de Educação:**
   - Como os alunos do 1º e 2º ciclo são em geral menores de idade, o formulário inclui dados de identificação do **Aluno** (Cédula/Assento ou BI) e do **Encarregado de Educação** (Pai, Mãe ou Tutor Legal), com contatos diretos e termo de compromisso.

---

## 🎨 Design System & Identidade Visual (Deep Navy)

- **Paleta de Cores Noturna:**
  - **Primária Escura:** `#0B192C` (Fundo e cabeçalho no modo escuro)
  - **Secundária:** `#1E3E62` (Cards, containers e painéis modais)
  - **Ação / Accent:** `#008BFF` / `#0066FF` (Azul elétrico vibrante para botões principais, seleções ativas e badges)
  - **Fundo Claro:** `#F4F6F9` | **Card Light:** `#FFFFFF`
  - **Status Semânticos:**
    - 🟢 Admitido / Homologado: `#10B981` (Emerald)
    - 🟡 Em Análise / Pendente: `#F59E0B` (Amber)
    - 🔴 Não Admitido / Rejeitado: `#EF4444` (Rose)
    - 🔵 Convocado para Prova: `#008BFF` (Sky/Accent)
- **Modo Claro / Modo Escuro:** Alternador fixo no cabeçalho com persistência em `LocalStorage` e transições suaves.
- **Tipografia:** `Plus Jakarta Sans` e `Inter` para legibilidade institucional.

---

## 🚀 Como Executar a Aplicação

A aplicação é uma Single Page Application (SPA) em HTML5, Tailwind CSS (via CDN) e Vanilla JavaScript, podendo ser aberta de várias formas:

### 1. Execução Direta no Navegador
Basta abrir o arquivo `index.html` em qualquer navegador moderno:
```bash
xdg-open index.html   # No Linux
# ou duplo clique no arquivo index.html
```

### 2. Via Servidor HTTP Local (Python)
```bash
python3 -m http.server 3000
```
Acesse `http://localhost:3000` no seu navegador.

### 3. Via NPM
```bash
npm start
```

---

## 📱 Estrutura e Funcionalidades

### 👨‍🎓 Visão 1: Portal do Aluno & Encarregado de Educação
1. **🔍 Consulta Rápida por Código de Verificação:**
   - Campo de busca no topo do portal do candidato para digitar o número de protocolo (ex: `SEC-2025-0101`, `SEC-2025-0104`).
   - Botões de acesso rápido com códigos de teste para demonstrar alunos em diferentes estados (Admitido, Em Análise, Convocado para Prova, Não Admitido).
   - Localiza instantaneamente o processo e exibe o passo exato da esteira, boletim de notas, média e comprovativos.
2. **Esteira de Progresso Interativa (Stepper em 4 Etapas):**
   - **Etapa 1 - Aluno & Encarregado:** Dados do aluno (Nome, BI/Cédula/Assento de Nascimento, Data de Nasc, Gênero) + Dados do Encarregado de Educação (Nome, Grau de Parentesco, Telefone, E-mail e Residência).
   - **Etapa 2 - Ciclo, Opção Escolar & Notas do Histórico:**
     - Filtros por ciclo (1º Ciclo, 2º Ciclo Geral, 2º Ciclo Técnico), cursos e classes (7ª à 10ª).
     - **Cálculo Automático de Média:** Lançamento das notas do ciclo anterior (Língua Portuguesa, Matemática e Ciências da Natureza / Físico-Química de 0 a 20 valores).
     - **Veredito Autônomo do Sistema em Tempo Real:**
       - **Média >= 10.0 valores:** Aluno automaticamente qualificado como **Admitido**.
       - **Média < 10.0 valores:** Aluno classificado como **Não Admitido** (abaixo da nota de corte).
   - **Etapa 3 - Submissão de Documentos Escolares:** Zonas de *Drag and Drop* para BI/Cédula do Aluno, Declaração de Notas da classe anterior e Foto tipo passe, com botão de preenchimento rápido para demonstração.
   - **Etapa 4 - Resumo & Confirmação:** Revisão consolidada dos dados, exibição do boletim de notas e parecer do sistema, aceite do termo de responsabilidade pelo Encarregado e efeito comemorativo (*Confetti*).
3. **Dashboard do Candidato & Acompanhamento:**
   - Número de protocolo escolar emitido com botão de cópia instantânea.
   - Boletim escolar com notas detalhadas, média calculada e parecer de admissão do sistema.
   - Acompanhamento da linha do tempo escolar (Inscrição, Conferência de Pastas, Provas de Diagnóstico/Acesso, Publicação de Listas e Confirmação de Matrícula).
   - Modal da **Ficha Oficial de Inscrição Escolar** com código de barras, carimbo digital e formato otimizado para impressão (`window.print()`).
   - Modal da **Guia de Pagamento da Taxa Escolar (DUM)** com código de entidade, referência bancária copiável e instruções.

### 👨‍💼 Visão 2: Painel Administrativo (Secretaria Escolar & Pedagógica)
1. **Cards KPI Gerenciais:**
   - Total de Alunos Inscritos (1º e 2º Ciclo).
   - Pastas Pendentes de Conferência.
   - Alunos Admitidos / Vagas Confirmadas.
   - Taxa de Ocupação das Vagas nas turmas com barra de progresso visual.
2. **Tabela de Alunos com Filtros Dinâmicos:**
   - Pré-carregada com **alunos fictícios** em diferentes ciclos (7ª, 8ª, 10ª classe técnico e liceu).
   - Colunas detalhadas: Protocolo, Nome do Aluno & Encarregado, Ciclo / Curso / Classe, **Média Escolar**, **Decisão do Sistema** e Situação.
   - Filtros instantâneos por texto (Aluno, Encarregado, BI, Protocolo), Ciclo/Curso e Situação.
   - Botão para adicionar alunos de teste em tempo real e botão de restauração.
3. **Modal de Análise da Secretaria:**
   - Painel do Boletim de Notas do Aluno com média ponderada e veredito do sistema em destaque.
   - Botão **"Aplicar Decisão do Sistema"** para acatar instantaneamente a regra de admissão (>= 10 Admitido, < 10 Não Admitido).
   - Capacidade de **Intervenção Manual da Secretaria/Direcção Pedagógica**: homologar/rejeitar documentos com motivo, lançar nota complementar e alterar o veredito para qualquer situação com justificativa.

