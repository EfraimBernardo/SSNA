# SIGMA • Sistema Integrado de Gestão de Matrículas e Admissões (SSNA)
### República de Angola • Ministério da Educação • Governo Provincial de Luanda
**Complexo Escolar nº 1245 do Ensino Secundário Geral e Politécnico**

Aplicação Front-End oficial, de padrão institucional e governamental, desenvolvida para a **Gestão de Admissões, Candidaturas e Homologação de Matrículas no 1º e 2º Ciclo do Ensino Secundário** (Ensino Geral e Técnico-Profissional).

---

## 🏛️ Contexto Educacional & Estrutura Oficial

A aplicação segue integralmente o currículo e as normas de admissão do Ensino Secundário em Angola:

1. **1º Ciclo do Ensino Secundário Geral:**
   - **7ª Classe:** Ingresso regular após a conclusão da 6ª classe do Ensino Primário.
   - **8ª e 9ª Classe:** Transferência institucional e continuidade escolar de outros estabelecimentos.
2. **2º Ciclo do Ensino Secundário Geral (Liceu / PUNIV - 10ª à 12ª Classe):**
   - **Ciências Físicas e Biológicas:** Preparação pré-universitária para Medicina, Ciências da Saúde e Agronomia.
   - **Ciências Económicas e Jurídicas:** Preparação pré-universitária para Economia, Gestão, Direito e Ciências Sociais.
3. **2º Ciclo do Ensino Secundário Técnico (Instituto Politécnico - 10ª à 13ª Classe):**
   - **Técnico de Informática:** Sistemas de informação, desenvolvimento de software, redes de computadores e infraestruturas.
   - **Contabilidade e Gestão Empresarial:** Prática contabilística, fiscalidade angolana e software de gestão.
   - **Enfermagem Geral & Saúde:** Cuidados clínicos de saúde e internato hospitalar supervisionado.
   - **Construção Civil & Desenho Projetista:** Topografia, desenho técnico em AutoCAD, medições e fiscalização de obras.
4. **Identificação do Aluno e Responsabilidade do Encarregado:**
   - Dados completos de identificação do **Aluno** (Bilhete de Identidade, Cédula Pessoal ou Assento de Nascimento).
   - Dados oficiais do **Encarregado de Educação** (Pai, Mãe ou Tutor Legal), incluindo termos de responsabilidade sob compromisso de honra.

---

## 🎨 Design System Institucional (Padrão Governamental)

- **Identidade Sóbria e Prestigiada:**
  - **Fundo Noturno / Gov Navy:** `#0B1528`
  - **Superfície / Cards Noturnos:** `#132238` / `#182C47`
  - **Bordas Estruturadas:** `#223E63`
  - **Azul Oficial / Accent:** `#1D4ED8` (Royal Blue Oficial) / `#1E40AF`
  - **Fundo Claro / Light:** `#F8FAFC` (Slate 50) | **Card Light:** `#FFFFFF`
  - **Status Semânticos Regulamentares:**
    - Homologado / Admitido: `#059669` (Esmeralda Institucional)
    - Em Conferência Documental: `#D97706` (Âmbar Institucional)
    - Convocado para Exame: `#1D4ED8` (Azul Oficial)
    - Não Apto / Rejeitado: `#DC2626` (Carmesim Institucional)
- **Modo Claro / Modo Escuro:** Persistência em `LocalStorage` com transições instantâneas e alto contraste.
- **Tipografia:** `Plus Jakarta Sans`, `Inter` e `JetBrains Mono` para protocolos e dados oficiais.

---

## 🚀 Como Executar a Aplicação

A aplicação é uma Single Page Application (SPA) completa em HTML5, Tailwind CSS e Vanilla JavaScript:

### 1. Execução Direta no Navegador
Basta abrir o ficheiro `index.html` em qualquer navegador moderno:
```bash
xdg-open index.html   # No Linux
# ou duplo clique no ficheiro index.html
```

### 2. Via Servidor HTTP Local (Python)
```bash
python3 -m http.server 3000
```
Aceda a `http://localhost:3000` no seu navegador.

### 3. Via NPM
```bash
npm start
```

---

## 📋 Módulos e Funcionalidades

### 👨‍🎓 Módulo 1: Portal do Aluno & Encarregado de Educação
1. **Consulta Rápida por Protocolo de Candidatura:**
   - Campo de localização rápida do processo por código (ex: `SEC-2025-0101`, `SEC-2025-0104`).
   - Códigos de teste rápido com estados reais (Admitido, Em Conferência, Convocado, Não Apto).
2. **Esteira de Candidatura em 4 Etapas:**
   - **Etapa 1 - Aluno & Encarregado:** Dados do aluno e dados do Encarregado de Educação com validação completa.
   - **Etapa 2 - Opção Curricular & Notas do Histórico:**
     - Filtros por nível (1º Ciclo, 2º Ciclo Geral, 2º Ciclo Técnico), 8 cursos e classes.
     - **Cálculo da Média Ponderada:** Disciplinas de Língua Portuguesa, Matemática e Ciências (0.0 a 20.0 valores).
     - **Parecer Regulamentar em Tempo Real:** Média ≥ 10.0 valores qualifica para admissão; Média < 10.0 valores classifica como Não Apto.
   - **Etapa 3 - Ficheiros Escolares:**
     - Uploads para BI/Cédula, Certificado de Notas e Foto Tipo Passe.
     - **Visualizador Oficial de Documentos:** Botão "Visualizar Ficheiro" com modal dedicado para inspeção visual do documento.
   - **Etapa 4 - Resumo & Declaração de Compromisso:**
     - Resumo cadastral, boletim escolar homologado e termo de responsabilidade do encarregado de educação.
3. **Dashboard do Candidato:**
   - Protocolo institucional com botão de cópia instantânea.
   - Boletim de notas com cálculo da média e despacho oficial.
   - Linha do tempo de tramitação do processo em 5 fases.
   - **Ficha Oficial de Inscrição Escolar** com código de barras institucional e chancela digital pronta para impressão (`window.print()`).
   - **Guia DUM / RUPE** com entidade bancária, referência para Multicaixa Express e valor regulamentar (3.500,00 Kz).
   - **Guia de Requisitos para Matrícula Presencial** com checklist completa dos documentos físicos exigidos no balcão da secretaria.

### 🏛️ Módulo 2: Secretaria Escolar & Direcção Pedagógica
1. **Painel Gerencial & Indicadores (KPIs):**
   - Total de candidaturas registadas, pastas em conferência, vagas homologadas e percentual de ocupação das turmas.
2. **Gestão de Processos com Abas de Estado Rápidas:**
   - Abas dinâmicas: *Todos*, *Homologados*, *Em Conferência*, *Convocados* e *Não Aptos*.
   - Filtros adicionais por turno escolar (Manhã / Tarde) e curso.
   - Pesquisa em tempo real por nome do aluno, encarregado, BI ou protocolo.
3. **Exportação & Publicação Oficial:**
   - **Exportar Pauta Oficial (CSV / Excel):** Gera ficheiro CSV com codificação UTF-8 BOM, pronto para abertura no Excel com todas as colunas de notas, médias e deliberações.
   - **Imprimir Pauta Geral (A4 / PDF):** Documento oficial formatado com cabeçalho da República de Angola, tabela geral e assinaturas do Chefe de Secretaria e Directora Geral para afixação na vitrine da escola.
4. **Modal de Despacho da Secretaria:**
   - Painel do aluno com notas e botão *"Aplicar Parecer Regulamentar"*.
   - **Visualizador de Ficheiros:** Acesso aos documentos anexados pelo encarregado.
   - Homologação e rejeição com registo de motivo de não conformidade.
   - Lançamento de notas de exames diagnósticos e parecer interno da Direcção Pedagógica.
