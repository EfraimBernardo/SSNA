/**
 * ============================================================================
 * SISTEMA DE SELEÇÃO DE NOVOS ALUNOS (SSNA) - 1º E 2º CICLO DO ENSINO SECUNDÁRIO
 * Complexo Escolar & Liceu Politécnico do Futuro (CL-FUTURO)
 * Módulo com Avaliação Automática de Admissão & Verificação de Candidatura
 * ============================================================================
 */

// Estado Global da Aplicação
const SSNA_STATE = {
  theme: 'dark', // 'light' ou 'dark'
  currentView: 'candidate', // 'candidate' ou 'admin'
  candidateSubView: 'form', // 'form' ou 'dashboard'
  currentStep: 1,
  totalSteps: 4,
  currentCandidateId: null,
  activeFilterCycle: 'all',
  activeFilterCourse: 'all',
  activeFilterStatus: 'all',
  searchQuery: '',
  selectedCycle: '2º Ciclo Técnico',
  uploadedFiles: {
    bi: null,
    certificate: null,
    photo: null
  },
  modalReviewCandidateId: null
};

// Dados Iniciais Fictícios (1º e 2º Ciclo do Ensino Secundário com Notas e Média)
const INITIAL_MOCK_CANDIDATES = [
  {
    id: "SEC-2025-0101",
    fullName: "Mariana de Oliveira Costa",
    guardianName: "António Manuel Costa (Pai)",
    guardianPhone: "+244 923 456 789",
    guardianEmail: "antonio.costa@email.com",
    email: "mariana.costa@aluno.ao",
    phone: "+244 923 456 789",
    documentId: "008392102LA041",
    documentType: "Bilhete de Identidade",
    birthDate: "2010-05-14",
    gender: "Feminino",
    address: {
      province: "Luanda",
      city: "Talatona",
      street: "Bairro Morro Bento, Rua da Samba, Casa 14"
    },
    cycle: "2º Ciclo Técnico",
    gradeApplied: "10ª Classe",
    course: "10ª Classe - Técnico de Informática (Sistemas & Redes)",
    shift: "Manhã",
    modality: "Exame de Admissão",
    campus: "Sede Principal - Liceu & Politécnico",
    grades: {
      portuguese: 17.0,
      math: 18.0,
      science: 17.5,
      average: 17.5
    },
    systemVerdict: "Admitido", // Média >= 10
    documents: {
      bi: { name: "BI_Mariana_e_Encarregado.pdf", size: "1.2 MB", status: "Aprovado" },
      certificate: { name: "Certificado_Conclusao_9a_Classe.pdf", size: "2.4 MB", status: "Aprovado" },
      photo: { name: "Foto_Mariana_Passe.jpg", size: "850 KB", status: "Aprovado" }
    },
    documentsStatus: "Aprovados",
    rejectionReason: "",
    examGrade: 17.5,
    status: "Admitido",
    submissionDate: "2025-10-10 09:30",
    examRoom: "Sala 12 - Bloco A",
    examDate: "2025-10-25 08:30",
    notes: "Admissão confirmada automaticamente pelo sistema com média escolar de 17.5 valores (Média >= 10 valores)."
  },
  {
    id: "SEC-2025-0102",
    fullName: "Carlos Eduardo Manuel Neto",
    guardianName: "Teresa Manuel Neto (Mãe)",
    guardianPhone: "+244 931 123 456",
    guardianEmail: "teresa.neto@gmail.com",
    email: "carlos.manuel@gmail.com",
    phone: "+244 931 123 456",
    documentId: "009412891LA048",
    documentType: "Bilhete de Identidade",
    birthDate: "2012-11-22",
    gender: "Masculino",
    address: {
      province: "Luanda",
      city: "Kilamba Kiaxi",
      street: "Bairro Golfe 2, Rua 18, Casa 22"
    },
    cycle: "1º Ciclo do Ensino Secundário",
    gradeApplied: "7ª Classe",
    course: "7ª Classe - 1º Ciclo do Ensino Secundário Geral",
    shift: "Tarde",
    modality: "Mérito Escolar (Conclusão 6ª Classe)",
    campus: "Sede Principal - Complexo Escolar",
    grades: {
      portuguese: 12.0,
      math: 11.0,
      science: 11.5,
      average: 11.5
    },
    systemVerdict: "Admitido", // Média >= 10
    documents: {
      bi: { name: "Cedula_Pessoal_Carlos.pdf", size: "980 KB", status: "Em Análise" },
      certificate: { name: "Declaracao_6a_Classe_Com_Notas.pdf", size: "3.1 MB", status: "Em Análise" },
      photo: { name: "Foto_Tipo_Passe.png", size: "620 KB", status: "Em Análise" }
    },
    documentsStatus: "Pendentes",
    rejectionReason: "",
    examGrade: null,
    status: "Em Análise",
    submissionDate: "2025-10-12 14:15",
    examRoom: "Pendente de Convocatória",
    examDate: "A definir",
    notes: "Média de 11.5 valores atinge o critério de admissão do sistema. Aguardando homologação final da pasta física pela Secretaria."
  },
  {
    id: "SEC-2025-0103",
    fullName: "Beatriz Fernandes de Sousa",
    guardianName: "Dr. Alberto de Sousa (Pai)",
    guardianPhone: "+244 945 789 012",
    guardianEmail: "alberto.sousa@saude.ao",
    email: "beatriz.sousa@hotmail.com",
    phone: "+244 945 789 012",
    documentId: "009182341LA045",
    documentType: "Bilhete de Identidade",
    birthDate: "2009-02-18",
    gender: "Feminino",
    address: {
      province: "Luanda",
      city: "Maianga",
      street: "Bairro Alvalade, Rua Comandante Gika, 34"
    },
    cycle: "2º Ciclo Geral (Liceu)",
    gradeApplied: "10ª Classe",
    course: "10ª Classe - Ciências Físicas e Biológicas (Saúde & Natureza)",
    shift: "Manhã",
    modality: "Exame de Admissão",
    campus: "Sede Principal - Liceu",
    grades: {
      portuguese: 16.0,
      math: 15.0,
      science: 17.0,
      average: 16.0
    },
    systemVerdict: "Admitido", // Média >= 10
    documents: {
      bi: { name: "BI_Beatriz_e_Encarregado.pdf", size: "1.4 MB", status: "Aprovado" },
      certificate: { name: "Certificado_9a_Classe_Original.pdf", size: "2.8 MB", status: "Aprovado" },
      photo: { name: "Fotografia_3x4.jpg", size: "720 KB", status: "Aprovado" }
    },
    documentsStatus: "Aprovados",
    rejectionReason: "",
    examGrade: null,
    status: "Convocado para Prova",
    submissionDate: "2025-10-13 11:40",
    examRoom: "Sala 08 - Bloco B",
    examDate: "2025-10-26 08:30",
    notes: "Média de 16.0 valores no 1º ciclo. Convocada para prova diagnóstica de nivelamento em Biologia e Química."
  },
  {
    id: "SEC-2025-0104",
    fullName: "António Domingos Silva",
    guardianName: "Margarida Silva (Mãe)",
    guardianPhone: "+244 928 901 234",
    guardianEmail: "margarida.silva@outlook.com",
    email: "antonio.silva@outlook.com",
    phone: "+244 928 901 234",
    documentId: "006819231BE021",
    documentType: "Bilhete de Identidade",
    birthDate: "2009-08-30",
    gender: "Masculino",
    address: {
      province: "Luanda",
      city: "Viana",
      street: "Viana Sede, Bairro Estalagem, Rua 4"
    },
    cycle: "2º Ciclo Técnico",
    gradeApplied: "10ª Classe",
    course: "10ª Classe - Contabilidade e Gestão Empresarial",
    shift: "Tarde",
    modality: "Exame de Admissão",
    campus: "Sede Principal - Instituto Politécnico",
    grades: {
      portuguese: 8.5,
      math: 7.5,
      science: 9.0,
      average: 8.3
    },
    systemVerdict: "Não Admitido", // Média < 10
    documents: {
      bi: { name: "BI_Antonio_Domingos.pdf", size: "1.1 MB", status: "Aprovado" },
      certificate: { name: "Certificado_9a_Classe.pdf", size: "1.9 MB", status: "Aprovado" },
      photo: { name: "Foto_Recente.jpg", size: "540 KB", status: "Aprovado" }
    },
    documentsStatus: "Aprovados",
    rejectionReason: "Candidato não admitido pelo sistema devido à média escolar calculada em 8.3 valores (mínimo regulamentar de 10 valores).",
    examGrade: 8.3,
    status: "Não Admitido",
    submissionDate: "2025-10-09 16:20",
    examRoom: "Sala 05 - Bloco A",
    examDate: "2025-10-24 14:00",
    notes: "O sistema avaliou automaticamente como Não Admitido por média escolar inferior a 10 valores."
  },
  {
    id: "SEC-2025-0105",
    fullName: "Esperança Vanda Cassule",
    guardianName: "Mateus Cassule (Tio / Encarregado)",
    guardianPhone: "+244 912 345 678",
    guardianEmail: "mateus.cassule@gmail.com",
    email: "esperanca.cassule@gmail.com",
    phone: "+244 912 345 678",
    documentId: "008712654LA042",
    documentType: "Assento de Nascimento",
    birthDate: "2011-12-05",
    gender: "Feminino",
    address: {
      province: "Luanda",
      city: "Cazenga",
      street: "Hoji-ya-Henda, Rua 12 de Julho, 89"
    },
    cycle: "1º Ciclo do Ensino Secundário",
    gradeApplied: "8ª Classe",
    course: "8ª ou 9ª Classe - Transferência / 1º Ciclo Geral",
    shift: "Manhã",
    modality: "Transferência Escolar",
    campus: "Sede Principal - Complexo Escolar",
    grades: {
      portuguese: 13.5,
      math: 14.0,
      science: 13.0,
      average: 13.5
    },
    systemVerdict: "Admitido", // Média >= 10
    documents: {
      bi: { name: "Assento_Nascimento_Esperanca.pdf", size: "1.5 MB", status: "Aprovado" },
      certificate: { name: "Declaracao_7a_Classe_Ilegivel.pdf", size: "450 KB", status: "Reprovado" },
      photo: { name: "Foto_Tipo_Passe.jpg", size: "680 KB", status: "Aprovado" }
    },
    documentsStatus: "Reprovados",
    rejectionReason: "A Declaração de Notas da 7ª classe da escola de origem está ilegível e sem o carimbo da Direcção Municipal de Educação. Favor reenviar cópia autenticada.",
    examGrade: null,
    status: "Em Análise",
    submissionDate: "2025-10-14 08:10",
    examRoom: "Pendente de Documentação Válida",
    examDate: "A definir",
    notes: "Média de 13.5 valores atinge o critério pedagógico de admissão. Requer apenas a regularização da declaração autenticada."
  },
  {
    id: "SEC-2025-0106",
    fullName: "João Paulo Sacramento",
    guardianName: "Eng. Paulo Sacramento (Pai)",
    guardianPhone: "+244 939 876 543",
    guardianEmail: "paulo.sacramento@gmail.com",
    email: "joao.sacramento@gmail.com",
    phone: "+244 939 876 543",
    documentId: "005912384HU019",
    documentType: "Bilhete de Identidade",
    birthDate: "2009-04-19",
    gender: "Masculino",
    address: {
      province: "Luanda",
      city: "Belas",
      street: "Centralidade do Kilamba, Bloco Q, Apto 402"
    },
    cycle: "2º Ciclo Geral (Liceu)",
    gradeApplied: "10ª Classe",
    course: "10ª Classe - Ciências Económicas e Jurídicas (PUNIV)",
    shift: "Tarde",
    modality: "Mérito Escolar (Conclusão 9ª Classe)",
    campus: "Sede Principal - Liceu",
    grades: {
      portuguese: 17.0,
      math: 16.0,
      science: 17.5,
      average: 16.8
    },
    systemVerdict: "Admitido", // Média >= 10
    documents: {
      bi: { name: "BI_Joao_Sacramento.pdf", size: "1.3 MB", status: "Aprovado" },
      certificate: { name: "Certificado_9a_Classe_Distincao.pdf", size: "2.9 MB", status: "Aprovado" },
      photo: { name: "Foto_Joao.png", size: "790 KB", status: "Aprovado" }
    },
    documentsStatus: "Aprovados",
    rejectionReason: "",
    examGrade: 16.8,
    status: "Admitido",
    submissionDate: "2025-10-11 10:05",
    examRoom: "Admissão por Mérito Escolar",
    examDate: "Dispensado de Exame",
    notes: "Admissão automática confirmada pelo sistema: média escolar de 16.8 valores na conclusão do 1º Ciclo (9ª Classe)."
  }
];

// Gerenciador do LocalStorage
class StorageManager {
  static KEY_CANDIDATES = 'SSNA_SEC_CANDIDATES_V3';
  static KEY_CURRENT_CANDIDATE = 'SSNA_SEC_CURRENT_CANDIDATE_V3';
  static KEY_THEME = 'SSNA_THEME_PREFERENCE';

  static getCandidates() {
    try {
      const data = localStorage.getItem(this.KEY_CANDIDATES);
      if (!data) {
        this.saveCandidates(INITIAL_MOCK_CANDIDATES);
        return INITIAL_MOCK_CANDIDATES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn("Erro ao acessar LocalStorage", e);
      return INITIAL_MOCK_CANDIDATES;
    }
  }

  static saveCandidates(candidates) {
    try {
      localStorage.setItem(this.KEY_CANDIDATES, JSON.stringify(candidates));
    } catch (e) {
      console.warn("Erro ao salvar no LocalStorage", e);
    }
  }

  static getCandidateById(id) {
    const list = this.getCandidates();
    return list.find(c => c.id.toUpperCase() === id.trim().toUpperCase()) || null;
  }

  static addCandidate(newCandidate) {
    const list = this.getCandidates();
    list.unshift(newCandidate);
    this.saveCandidates(list);
    return list;
  }

  static updateCandidate(id, updatedFields) {
    const list = this.getCandidates();
    const index = list.findIndex(c => c.id.toUpperCase() === id.trim().toUpperCase());
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedFields };
      this.saveCandidates(list);
      return list[index];
    }
    return null;
  }

  static resetToDefault() {
    this.saveCandidates(INITIAL_MOCK_CANDIDATES);
    return INITIAL_MOCK_CANDIDATES;
  }

  static getCurrentCandidateId() {
    return localStorage.getItem(this.KEY_CURRENT_CANDIDATE) || null;
  }

  static setCurrentCandidateId(id) {
    if (id) {
      localStorage.setItem(this.KEY_CURRENT_CANDIDATE, id);
    } else {
      localStorage.removeItem(this.KEY_CURRENT_CANDIDATE);
    }
  }

  static getTheme() {
    return localStorage.getItem(this.KEY_THEME) || 'dark';
  }

  static setTheme(theme) {
    localStorage.setItem(this.KEY_THEME, theme);
  }
}

// Sistema de Notificações Toast
class Toast {
  static show(title, message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item flex items-start gap-3 p-4 rounded-xl border text-sm max-w-sm transition-all transform duration-300`;

    let iconHtml = '';
    let borderColor = '';
    let bgColor = '';
    let textColor = '';

    if (type === 'success') {
      bgColor = document.documentElement.classList.contains('dark') ? 'bg-[#1E3E62]' : 'bg-white';
      borderColor = 'border-emerald-500/50';
      textColor = 'text-emerald-500';
      iconHtml = '<i class="fa-solid fa-circle-check text-xl"></i>';
    } else if (type === 'error') {
      bgColor = document.documentElement.classList.contains('dark') ? 'bg-[#1E3E62]' : 'bg-white';
      borderColor = 'border-rose-500/50';
      textColor = 'text-rose-500';
      iconHtml = '<i class="fa-solid fa-circle-exclamation text-xl"></i>';
    } else if (type === 'warning') {
      bgColor = document.documentElement.classList.contains('dark') ? 'bg-[#1E3E62]' : 'bg-white';
      borderColor = 'border-amber-500/50';
      textColor = 'text-amber-500';
      iconHtml = '<i class="fa-solid fa-triangle-exclamation text-xl"></i>';
    } else {
      bgColor = document.documentElement.classList.contains('dark') ? 'bg-[#1E3E62]' : 'bg-white';
      borderColor = 'border-sky-500/50';
      textColor = 'text-[#008BFF]';
      iconHtml = '<i class="fa-solid fa-circle-info text-xl"></i>';
    }

    toast.classList.add(bgColor, borderColor);

    toast.innerHTML = `
      <div class="${textColor} shrink-0 mt-0.5">${iconHtml}</div>
      <div class="flex-1">
        <h4 class="font-bold text-gray-900 dark:text-white text-sm mb-0.5">${title}</h4>
        <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">${message}</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600 dark:hover:text-white ml-2 text-xs" onclick="this.parentElement.remove()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// Inicialização da Aplicação
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupNavigation();
  setupCandidateStepper();
  setupDocumentUploaders();
  setupCycleAndCourseSelection();
  setupGradeCalculationListeners();
  setupTrackingCodeVerification();
  setupFormValidationAndSubmission();
  setupAdminPanel();
  setupModals();

  const lastCandidateId = StorageManager.getCurrentCandidateId();
  if (lastCandidateId && StorageManager.getCandidateById(lastCandidateId)) {
    SSNA_STATE.currentCandidateId = lastCandidateId;
  }
});

// ----------------------------------------------------------------------------
// 1. GERENCIAMENTO DE TEMA (DARK / LIGHT)
// ----------------------------------------------------------------------------
function initTheme() {
  const savedTheme = StorageManager.getTheme();
  setTheme(savedTheme);

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      setTheme(newTheme);
      StorageManager.setTheme(newTheme);
      Toast.show(
        'Tema Alterado',
        `Modo ${newTheme === 'dark' ? 'Azul Noturno' : 'Claro'} ativado.`,
        'info',
        2000
      );
    });
  }
}

function setTheme(theme) {
  SSNA_STATE.theme = theme;
  const icon = document.getElementById('theme-toggle-icon');
  const label = document.getElementById('theme-toggle-text');

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    if (icon) icon.className = 'fa-solid fa-sun text-amber-400';
    if (label) label.textContent = 'Modo Claro';
  } else {
    document.documentElement.classList.remove('dark');
    if (icon) icon.className = 'fa-solid fa-moon text-slate-700';
    if (label) label.textContent = 'Modo Noturno';
  }
}

// ----------------------------------------------------------------------------
// 2. NAVEGAÇÃO ENTRE VISÕES (CANDIDATO VS ADMIN)
// ----------------------------------------------------------------------------
function setupNavigation() {
  const navCandidateBtn = document.getElementById('nav-btn-candidate');
  const navAdminBtn = document.getElementById('nav-btn-admin');
  const viewCandidate = document.getElementById('view-candidate');
  const viewAdmin = document.getElementById('view-admin');

  function updateView(targetView) {
    SSNA_STATE.currentView = targetView;

    if (targetView === 'candidate') {
      viewCandidate.classList.remove('hidden');
      viewAdmin.classList.add('hidden');
      
      navCandidateBtn.classList.add('bg-[#008BFF]', 'text-white', 'shadow-md');
      navCandidateBtn.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:text-white');
      
      navAdminBtn.classList.remove('bg-[#008BFF]', 'text-white', 'shadow-md');
      navAdminBtn.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:text-white');

      if (SSNA_STATE.candidateSubView === 'dashboard' && SSNA_STATE.currentCandidateId) {
        renderCandidateDashboard(SSNA_STATE.currentCandidateId);
      }
    } else {
      viewAdmin.classList.remove('hidden');
      viewCandidate.classList.add('hidden');

      navAdminBtn.classList.add('bg-[#008BFF]', 'text-white', 'shadow-md');
      navAdminBtn.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:text-white');
      
      navCandidateBtn.classList.remove('bg-[#008BFF]', 'text-white', 'shadow-md');
      navCandidateBtn.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:text-white');

      refreshAdminData();
    }
  }

  if (navCandidateBtn) {
    navCandidateBtn.addEventListener('click', () => updateView('candidate'));
  }
  if (navAdminBtn) {
    navAdminBtn.addEventListener('click', () => updateView('admin'));
  }

  const btnGoToAdmin = document.getElementById('btn-shortcut-admin');
  if (btnGoToAdmin) {
    btnGoToAdmin.addEventListener('click', () => updateView('admin'));
  }
}

// ----------------------------------------------------------------------------
// 3. CONSULTA / VERIFICAÇÃO DE CANDIDATURA POR CÓDIGO
// ----------------------------------------------------------------------------
function setupTrackingCodeVerification() {
  const inputTracking = document.getElementById('input-tracking-code');
  const btnVerify = document.getElementById('btn-verify-tracking-code');

  function executeVerification(codeToTest) {
    const code = (codeToTest || (inputTracking ? inputTracking.value : '')).trim().toUpperCase();

    if (!code) {
      Toast.show('Código Obrigatório', 'Por favor, digite o código de verificação da candidatura (ex: SEC-2025-0101).', 'warning');
      if (inputTracking) highlightField('input-tracking-code');
      return;
    }

    const candidate = StorageManager.getCandidateById(code);
    if (candidate) {
      SSNA_STATE.currentCandidateId = candidate.id;
      StorageManager.setCurrentCandidateId(candidate.id);
      
      // Abrir o Dashboard com o passo exato da candidatura
      showCandidateDashboard(candidate.id);

      Toast.show(
        'Candidatura Localizada!',
        `Processo de ${candidate.fullName} (${candidate.id}) - Situação: ${candidate.status}`,
        'success',
        4000
      );
    } else {
      Toast.show(
        'Candidatura Não Encontrada',
        `Nenhuma inscrição foi localizada com o código "${code}". Verifique o número digitado ou faça uma nova inscrição.`,
        'error',
        5000
      );
      if (inputTracking) highlightField('input-tracking-code');
    }
  }

  if (btnVerify) {
    btnVerify.addEventListener('click', () => executeVerification());
  }

  if (inputTracking) {
    inputTracking.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeVerification();
      }
    });
  }

  // Cliques nos botões de códigos demonstrativos
  const sampleBtns = document.querySelectorAll('.btn-sample-code');
  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sampleCode = btn.getAttribute('data-code');
      if (inputTracking) inputTracking.value = sampleCode;
      executeVerification(sampleCode);
    });
  });

  // Botão para voltar à consulta no Dashboard
  const btnSearchAgain = document.getElementById('btn-dash-search-again');
  if (btnSearchAgain) {
    btnSearchAgain.addEventListener('click', () => {
      showCandidateForm();
      const searchBox = document.getElementById('input-tracking-code');
      if (searchBox) {
        searchBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        searchBox.focus();
        searchBox.select();
      }
    });
  }

  // Botão de copiar código de verificação no Dashboard
  const btnCopyProtocol = document.getElementById('btn-copy-protocol');
  if (btnCopyProtocol) {
    btnCopyProtocol.addEventListener('click', () => {
      const code = document.getElementById('dash-candidate-code').textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
        Toast.show('Código Copiado!', `Protocolo ${code} copiado para a área de transferência.`, 'success');
      }).catch(() => {
        Toast.show('Código de Verificação', code, 'info');
      });
    });
  }
}

// ----------------------------------------------------------------------------
// 4. CÁLCULO AUTOMÁTICO DA MÉDIA & ANÁLISE DE ADMISSÃO EM TEMPO REAL
// ----------------------------------------------------------------------------
function setupGradeCalculationListeners() {
  const inputPort = document.getElementById('input-grade-portuguese');
  const inputMath = document.getElementById('input-grade-math');
  const inputScience = document.getElementById('input-grade-science');

  const gradeInputs = [inputPort, inputMath, inputScience];

  gradeInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', calculateAverageAndVerdict);
    }
  });
}

function calculateAverageAndVerdict() {
  const inputPort = document.getElementById('input-grade-portuguese');
  const inputMath = document.getElementById('input-grade-math');
  const inputScience = document.getElementById('input-grade-science');

  const valPort = parseFloat(inputPort?.value);
  const valMath = parseFloat(inputMath?.value);
  const valScience = parseFloat(inputScience?.value);

  const avgValueEl = document.getElementById('calc-average-value');
  const avgBadgeEl = document.getElementById('calc-average-decision-badge');
  const avgTextEl = document.getElementById('calc-average-decision-text');
  const avgIconBox = document.getElementById('calc-average-icon-container');

  if (isNaN(valPort) || isNaN(valMath) || isNaN(valScience)) {
    if (avgValueEl) avgValueEl.textContent = '--';
    if (avgBadgeEl) {
      avgBadgeEl.className = 'px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-navy-dark border border-gray-200 dark:border-navy-border text-xs flex items-center gap-2';
    }
    if (avgTextEl) {
      avgTextEl.className = 'font-semibold text-gray-500 dark:text-gray-400';
      avgTextEl.textContent = 'Preencha as 3 notas para o sistema avaliar a admissão';
    }
    if (avgIconBox) {
      avgIconBox.className = 'w-12 h-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-xl shrink-0';
    }
    return null;
  }

  // Média ponderada simples das 3 disciplinas base
  const average = ((valPort + valMath + valScience) / 3);
  const formattedAverage = average.toFixed(1);

  if (avgValueEl) avgValueEl.textContent = formattedAverage;

  // REGRA DO SISTEMA: se média >= 10 -> Admitido; se média < 10 -> Não Admitido
  const isAdmitted = average >= 10.0;

  if (isAdmitted) {
    if (avgBadgeEl) {
      avgBadgeEl.className = 'px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 text-xs flex items-center gap-2 animate-pulse';
    }
    if (avgTextEl) {
      avgTextEl.className = 'font-extrabold text-emerald-500';
      avgTextEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Análise do Sistema: ADMITIDO (Média ${formattedAverage} >= 10)`;
    }
    if (avgIconBox) {
      avgIconBox.className = 'w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xl shrink-0';
    }
  } else {
    if (avgBadgeEl) {
      avgBadgeEl.className = 'px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-500 border border-rose-500/40 text-xs flex items-center gap-2';
    }
    if (avgTextEl) {
      avgTextEl.className = 'font-extrabold text-rose-500';
      avgTextEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Análise do Sistema: NÃO ADMITIDO (Média ${formattedAverage} < 10)`;
    }
    if (avgIconBox) {
      avgIconBox.className = 'w-12 h-12 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center text-xl shrink-0';
    }
  }

  return {
    portuguese: valPort,
    math: valMath,
    science: valScience,
    average: parseFloat(formattedAverage),
    isAdmitted: isAdmitted
  };
}

// ----------------------------------------------------------------------------
// 5. ESTEIRA DE PROGRESSO (STEPPER) DO CANDIDATO
// ----------------------------------------------------------------------------
function setupCandidateStepper() {
  const btnNext = document.getElementById('step-btn-next');
  const btnPrev = document.getElementById('step-btn-prev');

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (validateCurrentStep(SSNA_STATE.currentStep)) {
        if (SSNA_STATE.currentStep < SSNA_STATE.totalSteps) {
          goToStep(SSNA_STATE.currentStep + 1);
        }
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (SSNA_STATE.currentStep > 1) {
        goToStep(SSNA_STATE.currentStep - 1);
      }
    });
  }

  const stepNodes = document.querySelectorAll('.stepper-node');
  stepNodes.forEach((node, index) => {
    node.addEventListener('click', () => {
      const targetStep = index + 1;
      if (targetStep < SSNA_STATE.currentStep) {
        goToStep(targetStep);
      }
    });
  });

  const btnViewMyApplication = document.getElementById('btn-view-my-application');
  if (btnViewMyApplication) {
    btnViewMyApplication.addEventListener('click', () => {
      const currentId = SSNA_STATE.currentCandidateId || StorageManager.getCurrentCandidateId();
      if (currentId) {
        showCandidateDashboard(currentId);
      } else {
        const inputTrack = document.getElementById('input-tracking-code');
        if (inputTrack) {
          inputTrack.focus();
          Toast.show('Consultar Inscrição', 'Digite o seu código de verificação para acompanhar a candidatura.', 'info');
        }
      }
    });
  }

  const btnNewApplication = document.getElementById('btn-new-application');
  if (btnNewApplication) {
    btnNewApplication.addEventListener('click', () => {
      resetCandidateForm();
      showCandidateForm();
    });
  }
}

function goToStep(stepNumber) {
  SSNA_STATE.currentStep = stepNumber;

  for (let i = 1; i <= SSNA_STATE.totalSteps; i++) {
    const stepEl = document.getElementById(`step-content-${i}`);
    if (stepEl) {
      if (i === stepNumber) {
        stepEl.classList.remove('hidden');
        stepEl.classList.add('animate-fade-in');
      } else {
        stepEl.classList.add('hidden');
        stepEl.classList.remove('animate-fade-in');
      }
    }
  }

  const stepNodes = document.querySelectorAll('.stepper-node');
  stepNodes.forEach((node, index) => {
    const step = index + 1;
    const circle = node.querySelector('.stepper-circle');
    const label = node.querySelector('.stepper-label');

    if (step < stepNumber) {
      circle.className = 'stepper-circle w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-emerald-500 text-white shadow-md z-10 transition-all';
      circle.innerHTML = '<i class="fa-solid fa-check"></i>';
      if (label) label.className = 'stepper-label text-xs font-semibold mt-2 text-emerald-500 dark:text-emerald-400 hidden sm:block';
    } else if (step === stepNumber) {
      circle.className = 'stepper-circle w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-[#008BFF] text-white ring-4 ring-[#008BFF]/30 shadow-lg pulse-badge z-10 transition-all';
      circle.innerHTML = `<span>${step}</span>`;
      if (label) label.className = 'stepper-label text-xs font-bold mt-2 text-[#008BFF] dark:text-[#008BFF] hidden sm:block';
    } else {
      circle.className = 'stepper-circle w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-gray-200 dark:bg-[#1E3E62] text-gray-500 dark:text-gray-400 z-10 transition-all';
      circle.innerHTML = `<span>${step}</span>`;
      if (label) label.className = 'stepper-label text-xs font-medium mt-2 text-gray-500 dark:text-gray-400 hidden sm:block';
    }
  });

  const progressLine = document.getElementById('stepper-progress-line');
  if (progressLine) {
    const progressPercent = ((stepNumber - 1) / (SSNA_STATE.totalSteps - 1)) * 100;
    progressLine.style.width = `${progressPercent}%`;
  }

  const btnPrev = document.getElementById('step-btn-prev');
  const btnNext = document.getElementById('step-btn-next');
  const btnSubmit = document.getElementById('step-btn-submit');

  if (btnPrev) {
    if (stepNumber === 1) {
      btnPrev.classList.add('invisible');
    } else {
      btnPrev.classList.remove('invisible');
    }
  }

  if (stepNumber === SSNA_STATE.totalSteps) {
    if (btnNext) btnNext.classList.add('hidden');
    if (btnSubmit) btnSubmit.classList.remove('hidden');
    populateStep4Summary();
  } else {
    if (btnNext) btnNext.classList.remove('hidden');
    if (btnSubmit) btnSubmit.classList.add('hidden');
  }

  const formTop = document.getElementById('candidate-form-container');
  if (formTop) {
    formTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ----------------------------------------------------------------------------
// 6. VALIDAÇÃO DE CAMPOS POR PASSO (INCLUINDO AS 3 NOTAS)
// ----------------------------------------------------------------------------
function validateCurrentStep(step) {
  let isValid = true;
  let errorMsg = '';

  if (step === 1) {
    const fullName = document.getElementById('input-fullname').value.trim();
    const documentId = document.getElementById('input-document-id').value.trim();
    const birthDate = document.getElementById('input-birthdate').value;
    const guardianName = document.getElementById('input-guardian-name').value.trim();
    const guardianPhone = document.getElementById('input-guardian-phone').value.trim();
    const province = document.getElementById('input-province').value;
    const city = document.getElementById('input-city').value.trim();

    if (!fullName || fullName.split(' ').length < 2) {
      isValid = false;
      errorMsg = 'Por favor, informe o nome completo do aluno.';
      highlightField('input-fullname');
    } else if (!documentId || documentId.length < 5) {
      isValid = false;
      errorMsg = 'Por favor, informe o número do BI ou Cédula Pessoal/Assento.';
      highlightField('input-document-id');
    } else if (!birthDate) {
      isValid = false;
      errorMsg = 'Por favor, selecione a data de nascimento do aluno.';
      highlightField('input-birthdate');
    } else if (!guardianName || guardianName.split(' ').length < 2) {
      isValid = false;
      errorMsg = 'Por favor, informe o nome do Encarregado de Educação.';
      highlightField('input-guardian-name');
    } else if (!guardianPhone || guardianPhone.length < 8) {
      isValid = false;
      errorMsg = 'Por favor, informe o telefone de contato do Encarregado.';
      highlightField('input-guardian-phone');
    } else if (!province || !city) {
      isValid = false;
      errorMsg = 'Por favor, informe a Província e Município de residência.';
      highlightField('input-city');
    }
  } else if (step === 2) {
    const selectedCourseInput = document.querySelector('input[name="selected-course"]:checked');
    const selectedShift = document.querySelector('input[name="selected-shift"]:checked');
    const selectedModality = document.querySelector('input[name="selected-modality"]:checked');

    const valPort = parseFloat(document.getElementById('input-grade-portuguese')?.value);
    const valMath = parseFloat(document.getElementById('input-grade-math')?.value);
    const valScience = parseFloat(document.getElementById('input-grade-science')?.value);

    if (!selectedCourseInput) {
      isValid = false;
      errorMsg = 'Por favor, selecione a opção de curso ou classe pretendida.';
    } else if (!selectedShift) {
      isValid = false;
      errorMsg = 'Por favor, selecione o turno escolar pretendido.';
    } else if (!selectedModality) {
      isValid = false;
      errorMsg = 'Por favor, selecione a modalidade de candidatura.';
    } else if (isNaN(valPort) || valPort < 0 || valPort > 20) {
      isValid = false;
      errorMsg = 'Por favor, informe uma nota válida de Língua Portuguesa (entre 0 e 20 valores).';
      highlightField('input-grade-portuguese');
    } else if (isNaN(valMath) || valMath < 0 || valMath > 20) {
      isValid = false;
      errorMsg = 'Por favor, informe uma nota válida de Matemática (entre 0 e 20 valores).';
      highlightField('input-grade-math');
    } else if (isNaN(valScience) || valScience < 0 || valScience > 20) {
      isValid = false;
      errorMsg = 'Por favor, informe uma nota válida de Ciências/História (entre 0 e 20 valores).';
      highlightField('input-grade-science');
    }
  } else if (step === 3) {
    const hasBi = SSNA_STATE.uploadedFiles.bi;
    const hasCert = SSNA_STATE.uploadedFiles.certificate;
    const hasPhoto = SSNA_STATE.uploadedFiles.photo;

    if (!hasBi || !hasCert || !hasPhoto) {
      isValid = false;
      errorMsg = 'É obrigatório anexar os 3 documentos escolares (BI/Cédula, Declaração de Notas e Foto).';
    }
  }

  if (!isValid) {
    Toast.show('Atenção aos Campos', errorMsg, 'warning');
  }

  return isValid;
}

function highlightField(fieldId) {
  const el = document.getElementById(fieldId);
  if (el) {
    el.classList.add('border-rose-500', 'ring-2', 'ring-rose-500/20');
    el.focus();
    setTimeout(() => {
      el.classList.remove('border-rose-500', 'ring-2', 'ring-rose-500/20');
    }, 3000);
  }
}

// ----------------------------------------------------------------------------
// 7. SELEÇÃO DE CICLO & CURSOS (PASSO 2)
// ----------------------------------------------------------------------------
function setupCycleAndCourseSelection() {
  const cyclePills = document.querySelectorAll('.cycle-pill-btn');
  const courseCards = document.querySelectorAll('.course-option-card');

  cyclePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetCycle = pill.getAttribute('data-cycle');
      SSNA_STATE.selectedCycle = targetCycle;

      cyclePills.forEach(p => {
        p.classList.remove('bg-[#008BFF]', 'text-white', 'shadow-md');
        p.classList.add('bg-gray-100', 'dark:bg-[#1E3E62]', 'text-gray-700', 'dark:text-gray-300');
      });
      pill.classList.add('bg-[#008BFF]', 'text-white', 'shadow-md');
      pill.classList.remove('bg-gray-100', 'dark:bg-[#1E3E62]', 'text-gray-700', 'dark:text-gray-300');

      let firstVisibleCard = null;
      courseCards.forEach(card => {
        const cardCycle = card.getAttribute('data-cycle-category');
        if (targetCycle === 'all' || cardCycle === targetCycle) {
          card.classList.remove('hidden');
          if (!firstVisibleCard) firstVisibleCard = card;
        } else {
          card.classList.add('hidden');
        }
      });

      if (firstVisibleCard) {
        firstVisibleCard.click();
      }
    });
  });

  courseCards.forEach(card => {
    card.addEventListener('click', () => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }
      courseCards.forEach(c => {
        c.classList.remove('border-[#008BFF]', 'bg-[#008BFF]/5', 'dark:bg-[#008BFF]/10', 'ring-2', 'ring-[#008BFF]');
        const checkIcon = c.querySelector('.check-indicator');
        if (checkIcon) checkIcon.classList.add('hidden');
      });
      card.classList.add('border-[#008BFF]', 'bg-[#008BFF]/5', 'dark:bg-[#008BFF]/10', 'ring-2', 'ring-[#008BFF]');
      const checkIcon = card.querySelector('.check-indicator');
      if (checkIcon) checkIcon.classList.remove('hidden');
    });
  });

  const btnDemoFill = document.getElementById('btn-demo-fill');
  if (btnDemoFill) {
    btnDemoFill.addEventListener('click', () => {
      document.getElementById('input-fullname').value = "Afonso Gabriel dos Santos";
      document.getElementById('input-document-type').value = "Bilhete de Identidade";
      document.getElementById('input-document-id').value = "009418293LA046";
      document.getElementById('input-birthdate').value = "2010-08-16";
      document.getElementById('input-gender').value = "Masculino";
      document.getElementById('input-guardian-name').value = "Gabriel dos Santos";
      document.getElementById('input-guardian-kinship').value = "Pai";
      document.getElementById('input-guardian-phone').value = "+244 924 887 654";
      document.getElementById('input-guardian-email').value = "gabriel.santos@email.com";
      document.getElementById('input-email').value = "afonso.santos@aluno.ao";
      document.getElementById('input-province').value = "Luanda";
      document.getElementById('input-city').value = "Talatona";
      document.getElementById('input-street').value = "Bairro Benfica, Rua dos Navegantes, Casa 32";

      // Notas demonstrativas com aprovação (Média 15.0 >= 10)
      document.getElementById('input-grade-portuguese').value = "15";
      document.getElementById('input-grade-math').value = "16";
      document.getElementById('input-grade-science').value = "14";
      calculateAverageAndVerdict();

      const techCard = document.querySelector('.course-option-card[data-course-id="info"]');
      if (techCard) {
        techCard.click();
      }

      loadMockUploadedFiles();
      Toast.show('Dados Demonstrativos', 'Aluno e notas preenchidas (Média 15.0 -> Admitido)!', 'success');
    });
  }
}

// ----------------------------------------------------------------------------
// 8. UPLOAD SIMULADO DE DOCUMENTOS (PASSO 3)
// ----------------------------------------------------------------------------
function setupDocumentUploaders() {
  const uploadZones = [
    { key: 'bi', zoneId: 'drop-zone-bi', inputId: 'file-input-bi', previewId: 'preview-bi' },
    { key: 'certificate', zoneId: 'drop-zone-certificate', inputId: 'file-input-certificate', previewId: 'preview-certificate' },
    { key: 'photo', zoneId: 'drop-zone-photo', inputId: 'file-input-photo', previewId: 'preview-photo' }
  ];

  uploadZones.forEach(({ key, zoneId, inputId, previewId }) => {
    const zone = document.getElementById(zoneId);
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    if (!zone || !input) return;

    zone.addEventListener('click', (e) => {
      if (e.target.closest('.btn-remove-file')) return;
      input.click();
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.remove('dragover');
      });
    });

    zone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFileUpload(key, files[0], zone, preview);
      }
    });

    input.addEventListener('change', (e) => {
      if (input.files && input.files.length > 0) {
        handleFileUpload(key, input.files[0], zone, preview);
      }
    });
  });

  const btnMockDocs = document.getElementById('btn-load-mock-docs');
  if (btnMockDocs) {
    btnMockDocs.addEventListener('click', () => {
      loadMockUploadedFiles();
      Toast.show('Documentos Carregados', 'Documentos escolares anexados com sucesso!', 'success');
    });
  }
}

function handleFileUpload(key, file, zoneEl, previewEl) {
  const fileName = file.name;
  const fileSizeKB = (file.size / 1024).toFixed(1);
  const fileSizeText = fileSizeKB > 1024 ? `${(fileSizeKB / 1024).toFixed(2)} MB` : `${fileSizeKB} KB`;

  let previewUrl = null;
  if (file.type.startsWith('image/')) {
    previewUrl = URL.createObjectURL(file);
  }

  SSNA_STATE.uploadedFiles[key] = {
    name: fileName,
    size: fileSizeText,
    type: file.type,
    previewUrl: previewUrl,
    status: 'Aprovado'
  };

  renderFilePreview(key, zoneEl, previewEl);
  Toast.show('Arquivo Recebido', `${fileName} (${fileSizeText}) carregado!`, 'success', 2500);
}

function renderFilePreview(key, zoneEl, previewEl) {
  const fileData = SSNA_STATE.uploadedFiles[key];
  if (!fileData) {
    zoneEl.classList.remove('hidden');
    previewEl.classList.add('hidden');
    return;
  }

  zoneEl.classList.add('hidden');
  previewEl.classList.remove('hidden');

  const nameEl = previewEl.querySelector('.file-preview-name');
  const sizeEl = previewEl.querySelector('.file-preview-size');
  const iconContainer = previewEl.querySelector('.file-preview-icon');
  const removeBtn = previewEl.querySelector('.btn-remove-file');

  if (nameEl) nameEl.textContent = fileData.name;
  if (sizeEl) sizeEl.textContent = fileData.size;

  if (iconContainer) {
    if (fileData.previewUrl) {
      iconContainer.innerHTML = `<img src="${fileData.previewUrl}" class="w-12 h-12 object-cover rounded-lg border border-gray-300 dark:border-gray-600" alt="Preview">`;
    } else {
      iconContainer.innerHTML = `<div class="w-12 h-12 rounded-lg bg-sky-500/10 text-[#008BFF] flex items-center justify-center text-2xl"><i class="fa-solid fa-file-pdf"></i></div>`;
    }
  }

  if (removeBtn) {
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      SSNA_STATE.uploadedFiles[key] = null;
      zoneEl.classList.remove('hidden');
      previewEl.classList.add('hidden');
      const input = zoneEl.parentElement.querySelector('input[type="file"]');
      if (input) input.value = '';
    };
  }
}

function loadMockUploadedFiles() {
  const mockBi = { name: "BI_Aluno_e_Encarregado.pdf", size: "1.4 MB", type: "application/pdf", previewUrl: null, status: "Aprovado" };
  const mockCert = { name: "Certificado_Notas_Classe_Anterior.pdf", size: "2.8 MB", type: "application/pdf", previewUrl: null, status: "Aprovado" };
  const mockPhoto = {
    name: "Foto_Aluno_Passe.jpg",
    size: "640 KB",
    type: "image/jpeg",
    previewUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
    status: "Aprovado"
  };

  SSNA_STATE.uploadedFiles.bi = mockBi;
  SSNA_STATE.uploadedFiles.certificate = mockCert;
  SSNA_STATE.uploadedFiles.photo = mockPhoto;

  const pairs = [
    { key: 'bi', zoneId: 'drop-zone-bi', previewId: 'preview-bi' },
    { key: 'certificate', zoneId: 'drop-zone-certificate', previewId: 'preview-certificate' },
    { key: 'photo', zoneId: 'drop-zone-photo', previewId: 'preview-photo' }
  ];

  pairs.forEach(p => {
    const zone = document.getElementById(p.zoneId);
    const prev = document.getElementById(p.previewId);
    if (zone && prev) {
      renderFilePreview(p.key, zone, prev);
    }
  });
}

// ----------------------------------------------------------------------------
// 9. RESUMO E CONFIRMAÇÃO (PASSO 4)
// ----------------------------------------------------------------------------
function populateStep4Summary() {
  const fullName = document.getElementById('input-fullname').value.trim() || "Não informado";
  const documentType = document.getElementById('input-document-type') ? document.getElementById('input-document-type').value : "BI";
  const documentId = document.getElementById('input-document-id').value.trim() || "Não informado";
  const birthDate = document.getElementById('input-birthdate').value || "Não informado";
  const guardianName = document.getElementById('input-guardian-name').value.trim() || "Não informado";
  const guardianKinship = document.getElementById('input-guardian-kinship') ? document.getElementById('input-guardian-kinship').value : "Pai/Mãe";
  const guardianPhone = document.getElementById('input-guardian-phone').value.trim() || "Não informado";
  const province = document.getElementById('input-province').value || "Luanda";
  const city = document.getElementById('input-city').value || "Cidade";

  const selectedCourseRadio = document.querySelector('input[name="selected-course"]:checked');
  const courseTitle = selectedCourseRadio ? selectedCourseRadio.value : "10ª Classe - Técnico de Informática";
  const cycleCategory = selectedCourseRadio ? selectedCourseRadio.getAttribute('data-cycle-label') : "2º Ciclo do Ensino Secundário";

  const selectedShiftRadio = document.querySelector('input[name="selected-shift"]:checked');
  const shiftTitle = selectedShiftRadio ? selectedShiftRadio.value : "Manhã";

  const selectedModalityRadio = document.querySelector('input[name="selected-modality"]:checked');
  const modalityTitle = selectedModalityRadio ? selectedModalityRadio.value : "Exame de Admissão";

  const selectedCampus = document.getElementById('select-campus') ? document.getElementById('select-campus').value : "Sede Principal";

  document.getElementById('summary-fullname').textContent = fullName;
  document.getElementById('summary-document-id').textContent = `${documentType}: ${documentId}`;
  document.getElementById('summary-birthdate').textContent = birthDate ? formatDateBR(birthDate) : "Não informado";
  document.getElementById('summary-guardian').textContent = `${guardianName} (${guardianKinship})`;
  document.getElementById('summary-phone').textContent = guardianPhone;
  document.getElementById('summary-location').textContent = `${city}, ${province}`;

  document.getElementById('summary-course').textContent = courseTitle;
  document.getElementById('summary-cycle').textContent = cycleCategory || "2º Ciclo do Ensino Secundário";
  document.getElementById('summary-shift').textContent = shiftTitle;
  document.getElementById('summary-modality').textContent = modalityTitle;
  document.getElementById('summary-campus').textContent = selectedCampus;

  // Notas e Decisão do Sistema no Resumo
  const valPort = parseFloat(document.getElementById('input-grade-portuguese')?.value) || 0;
  const valMath = parseFloat(document.getElementById('input-grade-math')?.value) || 0;
  const valScience = parseFloat(document.getElementById('input-grade-science')?.value) || 0;
  const calculatedAvg = ((valPort + valMath + valScience) / 3);
  const formattedAvg = calculatedAvg.toFixed(1);

  document.getElementById('summary-grade-portuguese').textContent = `${valPort} / 20`;
  document.getElementById('summary-grade-math').textContent = `${valMath} / 20`;
  document.getElementById('summary-grade-science').textContent = `${valScience} / 20`;
  document.getElementById('summary-average-value').textContent = `${formattedAvg} / 20`;

  const verdictBadge = document.getElementById('summary-system-verdict-badge');
  const verdictDesc = document.getElementById('summary-system-verdict-desc');

  if (calculatedAvg >= 10.0) {
    if (verdictBadge) {
      verdictBadge.className = 'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 bg-emerald-500/20 text-emerald-500 border border-emerald-500/40';
      verdictBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> ADMITIDO AUTOMATICAMENTE';
    }
    if (verdictDesc) {
      verdictDesc.innerHTML = `<span class="text-emerald-500 font-bold">Média de ${formattedAvg} valores aprovada!</span> O aluno tem vaga garantida pelo sistema (critério: média >= 10 valores).`;
    }
  } else {
    if (verdictBadge) {
      verdictBadge.className = 'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 bg-rose-500/20 text-rose-500 border border-rose-500/40';
      verdictBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> NÃO ADMITIDO';
    }
    if (verdictDesc) {
      verdictDesc.innerHTML = `<span class="text-rose-500 font-bold">Média de ${formattedAvg} valores insuficiente.</span> A média mínima regulamentar para admissão é de 10 valores.`;
    }
  }

  const photoPreviewImg = document.getElementById('summary-photo-preview');
  if (photoPreviewImg) {
    if (SSNA_STATE.uploadedFiles.photo && SSNA_STATE.uploadedFiles.photo.previewUrl) {
      photoPreviewImg.src = SSNA_STATE.uploadedFiles.photo.previewUrl;
    } else {
      photoPreviewImg.src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80";
    }
  }

  const docList = document.getElementById('summary-docs-list');
  if (docList) {
    docList.innerHTML = `
      <div class="flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-[#1E3E62]/70 text-xs">
        <span class="flex items-center gap-2"><i class="fa-solid fa-id-card text-[#008BFF]"></i> BI / Cédula do Aluno</span>
        <span class="text-emerald-500 font-semibold flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> ${SSNA_STATE.uploadedFiles.bi ? SSNA_STATE.uploadedFiles.bi.name : 'Anexado'}</span>
      </div>
      <div class="flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-[#1E3E62]/70 text-xs">
        <span class="flex items-center gap-2"><i class="fa-solid fa-file-invoice text-[#008BFF]"></i> Declaração de Notas</span>
        <span class="text-emerald-500 font-semibold flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> ${SSNA_STATE.uploadedFiles.certificate ? SSNA_STATE.uploadedFiles.certificate.name : 'Anexado'}</span>
      </div>
      <div class="flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-[#1E3E62]/70 text-xs">
        <span class="flex items-center gap-2"><i class="fa-solid fa-camera text-[#008BFF]"></i> Foto Passe do Aluno</span>
        <span class="text-emerald-500 font-semibold flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> ${SSNA_STATE.uploadedFiles.photo ? SSNA_STATE.uploadedFiles.photo.name : 'Anexada'}</span>
      </div>
    `;
  }
}

// ----------------------------------------------------------------------------
// 10. FINALIZAÇÃO DA INSCRIÇÃO & ANÁLISE AUTOMÁTICA DO SISTEMA
// ----------------------------------------------------------------------------
function setupFormValidationAndSubmission() {
  const btnSubmit = document.getElementById('step-btn-submit');
  if (!btnSubmit) return;

  btnSubmit.addEventListener('click', () => {
    const termsAccept = document.getElementById('terms-accept');
    if (termsAccept && !termsAccept.checked) {
      Toast.show(
        'Termo de Responsabilidade',
        'O Encarregado de Educação deve declarar que as informações e notas são autênticas.',
        'warning'
      );
      termsAccept.focus();
      return;
    }

    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `
      <i class="fa-solid fa-robot fa-spin"></i>
      <span>Sistema Analisando Admissão...</span>
    `;

    setTimeout(() => {
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const newCandidateId = `SEC-2025-${randomSeq}`;

      const fullName = document.getElementById('input-fullname').value.trim();
      const documentType = document.getElementById('input-document-type') ? document.getElementById('input-document-type').value : "BI";
      const documentId = document.getElementById('input-document-id').value.trim();
      const birthDate = document.getElementById('input-birthdate').value;
      const gender = document.getElementById('input-gender').value;
      const guardianName = document.getElementById('input-guardian-name').value.trim();
      const guardianKinship = document.getElementById('input-guardian-kinship') ? document.getElementById('input-guardian-kinship').value : "Pai/Mãe";
      const guardianPhone = document.getElementById('input-guardian-phone').value.trim();
      const guardianEmail = document.getElementById('input-guardian-email') ? document.getElementById('input-guardian-email').value.trim() : "";
      const email = document.getElementById('input-email') ? document.getElementById('input-email').value.trim() : guardianEmail;
      const province = document.getElementById('input-province').value;
      const city = document.getElementById('input-city').value;
      const street = document.getElementById('input-street').value;

      const selectedCourseRadio = document.querySelector('input[name="selected-course"]:checked');
      const selectedCourse = selectedCourseRadio.value;
      const cycleCategory = selectedCourseRadio.getAttribute('data-cycle-label') || "2º Ciclo do Ensino Secundário";
      const selectedShift = document.querySelector('input[name="selected-shift"]:checked').value;
      const selectedModality = document.querySelector('input[name="selected-modality"]:checked').value;
      const selectedCampus = document.getElementById('select-campus') ? document.getElementById('select-campus').value : "Sede Principal";

      // CÁLCULO DA MÉDIA E ANÁLISE AUTOMÁTICA
      const valPort = parseFloat(document.getElementById('input-grade-portuguese')?.value) || 0;
      const valMath = parseFloat(document.getElementById('input-grade-math')?.value) || 0;
      const valScience = parseFloat(document.getElementById('input-grade-science')?.value) || 0;
      const calculatedAverage = parseFloat(((valPort + valMath + valScience) / 3).toFixed(1));

      // REGRA DE ADMISSÃO AUTOMÁTICA
      const isAdmitted = calculatedAverage >= 10.0;
      const automaticStatus = isAdmitted ? "Admitido" : "Não Admitido";

      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newCandidate = {
        id: newCandidateId,
        fullName: fullName,
        documentType: documentType,
        documentId: documentId,
        birthDate: birthDate,
        gender: gender,
        guardianName: `${guardianName} (${guardianKinship})`,
        guardianPhone: guardianPhone,
        guardianEmail: guardianEmail,
        email: email,
        phone: guardianPhone,
        address: { province: province, city: city, street: street },
        cycle: cycleCategory,
        gradeApplied: selectedCourse.split(' - ')[0],
        course: selectedCourse,
        shift: selectedShift,
        modality: selectedModality,
        campus: selectedCampus,
        grades: {
          portuguese: valPort,
          math: valMath,
          science: valScience,
          average: calculatedAverage
        },
        systemVerdict: automaticStatus,
        documents: {
          bi: SSNA_STATE.uploadedFiles.bi || { name: "BI_Aluno_Anexado.pdf", size: "1.4 MB", status: isAdmitted ? "Aprovado" : "Em Análise" },
          certificate: SSNA_STATE.uploadedFiles.certificate || { name: "Certificado_Escolar.pdf", size: "2.1 MB", status: isAdmitted ? "Aprovado" : "Em Análise" },
          photo: SSNA_STATE.uploadedFiles.photo || { name: "Foto_Aluno_Passe.jpg", size: "650 KB", status: "Aprovado" }
        },
        documentsStatus: isAdmitted ? "Aprovados" : "Pendentes",
        rejectionReason: isAdmitted ? "" : `Média escolar de ${calculatedAverage} valores inferior ao mínimo regulamentar de 10 valores.`,
        examGrade: calculatedAverage,
        status: automaticStatus,
        submissionDate: formattedDate,
        examRoom: isAdmitted ? "Dispensado / Vaga Assegurada" : "Critério Não Atingido",
        examDate: isAdmitted ? "Matrícula Direta" : "Encerrado",
        notes: isAdmitted
          ? `O SISTEMA ANALISOU E ADMITIU O ALUNO: Média escolar de ${calculatedAverage} valores (>= 10 valores).`
          : `O SISTEMA ANALISOU E NÃO ADMITIU O ALUNO: Média escolar de ${calculatedAverage} valores (< 10 valores).`
      };

      StorageManager.addCandidate(newCandidate);
      StorageManager.setCurrentCandidateId(newCandidateId);
      SSNA_STATE.currentCandidateId = newCandidateId;

      if (isAdmitted) {
        fireCelebrationConfetti();
        Toast.show(
          'Aluno Admitido com Sucesso! 🎓',
          `Protocolo nº ${newCandidateId}. Média de ${calculatedAverage} valores aprovada automaticamente pelo sistema!`,
          'success',
          7000
        );
      } else {
        Toast.show(
          'Inscrição Finalizada',
          `Protocolo nº ${newCandidateId}. Média calculada em ${calculatedAverage} valores (inferior a 10 valores).`,
          'error',
          7000
        );
      }

      btnSubmit.disabled = false;
      btnSubmit.innerHTML = `<span>Finalizar Inscrição</span><i class="fa-solid fa-arrow-right"></i>`;

      showCandidateDashboard(newCandidateId);
    }, 1200);
  });
}

function fireCelebrationConfetti() {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
    }, 300);
  }
}

// ----------------------------------------------------------------------------
// 11. DASHBOARD DO CANDIDATO & RENDERIZAÇÃO DE NOTAS E VEREDITO
// ----------------------------------------------------------------------------
function showCandidateDashboard(candidateId) {
  SSNA_STATE.candidateSubView = 'dashboard';
  SSNA_STATE.currentCandidateId = candidateId;

  const formSection = document.getElementById('candidate-form-wrapper');
  const dashboardSection = document.getElementById('candidate-dashboard-wrapper');

  if (formSection) formSection.classList.add('hidden');
  if (dashboardSection) {
    dashboardSection.classList.remove('hidden');
    dashboardSection.classList.add('animate-fade-in');
  }

  renderCandidateDashboard(candidateId);

  if (dashboardSection) {
    dashboardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function showCandidateForm() {
  SSNA_STATE.candidateSubView = 'form';
  const formSection = document.getElementById('candidate-form-wrapper');
  const dashboardSection = document.getElementById('candidate-dashboard-wrapper');

  if (dashboardSection) dashboardSection.classList.add('hidden');
  if (formSection) {
    formSection.classList.remove('hidden');
    formSection.classList.add('animate-fade-in');
  }
  goToStep(1);
}

function resetCandidateForm() {
  const form = document.getElementById('admission-form');
  if (form) form.reset();
  SSNA_STATE.uploadedFiles = { bi: null, certificate: null, photo: null };

  ['bi', 'certificate', 'photo'].forEach(key => {
    const zone = document.getElementById(`drop-zone-${key}`);
    const prev = document.getElementById(`preview-${key}`);
    if (zone) zone.classList.remove('hidden');
    if (prev) prev.classList.add('hidden');
  });

  const termsCheck = document.getElementById('terms-accept');
  if (termsCheck) termsCheck.checked = false;

  calculateAverageAndVerdict();
}

function renderCandidateDashboard(candidateId) {
  const candidate = StorageManager.getCandidateById(candidateId);
  if (!candidate) return;

  const nameEl = document.getElementById('dash-candidate-name');
  const codeEl = document.getElementById('dash-candidate-code');
  const courseEl = document.getElementById('dash-candidate-course');
  const dateEl = document.getElementById('dash-candidate-date');

  if (nameEl) nameEl.textContent = candidate.fullName;
  if (codeEl) codeEl.textContent = candidate.id;
  if (courseEl) courseEl.textContent = `${candidate.course} • Turno ${candidate.shift}`;
  if (dateEl) dateEl.textContent = `Inscrição registrada em: ${candidate.submissionDate}`;

  const statusBadge = document.getElementById('dash-status-badge');
  const statusTitle = document.getElementById('dash-status-title');
  const statusDesc = document.getElementById('dash-status-desc');

  const { badgeClass, title, desc, icon } = getStatusDisplayInfo(candidate.status, candidate.documentsStatus, candidate.rejectionReason, candidate.grades?.average || candidate.examGrade);

  if (statusBadge) {
    statusBadge.className = `px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${badgeClass}`;
    statusBadge.innerHTML = `<i id="dash-status-icon" class="${icon}"></i> ${candidate.status}`;
  }
  if (statusTitle) statusTitle.textContent = title;
  if (statusDesc) statusDesc.textContent = desc;

  // Renderizar Notas e Média do Aluno
  const pGrade = candidate.grades?.portuguese ?? '--';
  const mGrade = candidate.grades?.math ?? '--';
  const sGrade = candidate.grades?.science ?? '--';
  const avgGrade = candidate.grades?.average ?? candidate.examGrade ?? '--';

  document.getElementById('dash-grade-portuguese').textContent = pGrade;
  document.getElementById('dash-grade-math').textContent = mGrade;
  document.getElementById('dash-grade-science').textContent = sGrade;
  document.getElementById('dash-student-average').textContent = avgGrade;

  // Badge do Veredito do Sistema no Dashboard
  const dashSystemVerdictBadge = document.getElementById('dash-system-verdict-badge');
  const dashSystemDecision = document.getElementById('dash-system-decision');
  const dashExplanation = document.getElementById('dash-verdict-explanation');

  const isAvgPass = typeof avgGrade === 'number' ? avgGrade >= 10.0 : parseFloat(avgGrade) >= 10.0;

  if (dashSystemVerdictBadge && dashSystemDecision) {
    if (candidate.status === 'Admitido' || isAvgPass) {
      dashSystemVerdictBadge.className = 'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto bg-emerald-500/20 text-emerald-500 border border-emerald-500/30';
      dashSystemDecision.textContent = 'Sistema: ADMITIDO (Média >= 10)';
      if (dashExplanation) {
        dashExplanation.innerHTML = `<strong>Aprovado pelo Sistema:</strong> Com média de <strong>${avgGrade} valores</strong>, o aluno cumpriu o critério regulamentar (mínimo de 10 valores). Vaga confirmada.`;
      }
    } else {
      dashSystemVerdictBadge.className = 'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto bg-rose-500/20 text-rose-500 border border-rose-500/30';
      dashSystemDecision.textContent = 'Sistema: NÃO ADMITIDO (Média < 10)';
      if (dashExplanation) {
        dashExplanation.innerHTML = `<strong>Não Aprovado pelo Sistema:</strong> A média calculada de <strong>${avgGrade} valores</strong> é inferior ao mínimo obrigatório de 10 valores para o presente ano letivo.`;
      }
    }
  }

  document.getElementById('dash-detail-modality').textContent = candidate.modality;
  document.getElementById('dash-detail-campus').textContent = candidate.cycle || '2º Ciclo do Ensino Secundário';
  document.getElementById('dash-detail-docs-status').textContent = candidate.documentsStatus;
  
  const gradeEl = document.getElementById('dash-detail-grade');
  if (gradeEl) {
    if (avgGrade !== '--') {
      gradeEl.textContent = `${avgGrade} / 20 valores`;
      gradeEl.className = avgGrade >= 10 ? 'font-bold text-emerald-500' : 'font-bold text-rose-500';
    } else {
      gradeEl.textContent = 'Não lançada';
      gradeEl.className = 'font-semibold text-gray-400';
    }
  }

  updateCandidateTimeline(candidate);

  const btnComprovativo = document.getElementById('btn-dash-comprovativo');
  if (btnComprovativo) {
    btnComprovativo.onclick = () => openComprovativoModal(candidate.id);
  }

  const btnGuia = document.getElementById('btn-dash-guia');
  if (btnGuia) {
    btnGuia.onclick = () => openGuiaPagamentoModal(candidate.id);
  }
}

function getStatusDisplayInfo(status, docsStatus, rejectionReason, grade) {
  if (status === 'Admitido') {
    return {
      badgeClass: 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30',
      title: 'Parabéns! O Aluno foi ADMITIDO(A)! 🎉',
      desc: 'A candidatura foi homologada automaticamente pelo sistema com média escolar aprovada. Compareça à Secretaria Escolar munido do processo físico para a confirmação definitiva da matrícula.',
      icon: 'fa-solid fa-circle-check'
    };
  } else if (status === 'Não Admitido') {
    return {
      badgeClass: 'bg-rose-500/20 text-rose-500 border border-rose-500/30',
      title: 'Candidatura Não Admitida',
      desc: rejectionReason || 'A média escolar de conclusão não atingiu o mínimo de 10 valores exigido para a vaga pretendida no presente ano letivo.',
      icon: 'fa-solid fa-circle-xmark'
    };
  } else if (status === 'Convocado para Prova') {
    return {
      badgeClass: 'bg-sky-500/20 text-[#008BFF] border border-sky-500/30',
      title: 'Convocado(a) para Prova de Diagnóstico / Seleção!',
      desc: 'O processo escolar foi validado. O aluno deve comparecer munido de esferográfica azul, documento de identidade e este comprovativo de inscrição.',
      icon: 'fa-solid fa-calendar-check'
    };
  } else {
    if (docsStatus === 'Reprovados') {
      return {
        badgeClass: 'bg-amber-500/20 text-amber-500 border border-amber-500/30',
        title: 'Documentos Escolares Rejeitados ⚠️',
        desc: rejectionReason ? `Atenção Encarregado: ${rejectionReason}` : 'Um ou mais documentos escolares anexados não estão em conformidade com as diretrizes do Ministério da Educação.',
        icon: 'fa-solid fa-triangle-exclamation'
      };
    }
    return {
      badgeClass: 'bg-amber-500/20 text-amber-500 border border-amber-500/30',
      title: 'Processo Escolar em Análise Documental ⏳',
      desc: 'A documentação escolar do aluno e os dados do Encarregado de Educação foram recebidos e estão sob conferência da Secretaria Pedagógica.',
      icon: 'fa-solid fa-clock'
    };
  }
}

function updateCandidateTimeline(candidate) {
  const tStep1 = document.getElementById('timeline-step-1');
  const tStep2 = document.getElementById('timeline-step-2');
  const tStep3 = document.getElementById('timeline-step-3');
  const tStep4 = document.getElementById('timeline-step-4');
  const tStep5 = document.getElementById('timeline-step-5');

  setTimelineItemState(tStep1, 'done', 'Concluído em ' + candidate.submissionDate.split(' ')[0]);

  if (candidate.documentsStatus === 'Aprovados') {
    setTimelineItemState(tStep2, 'done', 'Processo Escolar Homologado');
  } else if (candidate.documentsStatus === 'Reprovados') {
    setTimelineItemState(tStep2, 'error', 'Documentação Pendente de Correção');
  } else {
    setTimelineItemState(tStep2, 'current', 'Em conferência pela Secretaria');
  }

  const avg = candidate.grades?.average ?? candidate.examGrade;

  if (candidate.status === 'Admitido') {
    setTimelineItemState(tStep3, 'done', `Média Aprovada: ${avg} valores`);
    setTimelineItemState(tStep4, 'done', 'Resultado Publicado: Admitido');
    setTimelineItemState(tStep5, 'current', 'Período de Matrícula Aberto na Secretaria');
  } else if (candidate.status === 'Não Admitido') {
    setTimelineItemState(tStep3, 'error', `Média Insuficiente: ${avg} valores`);
    setTimelineItemState(tStep4, 'error', 'Resultado Publicado: Não Admitido');
    setTimelineItemState(tStep5, 'future', 'Processo Encerrado');
  } else if (candidate.status === 'Convocado para Prova') {
    setTimelineItemState(tStep3, 'current', `Agendado: ${candidate.examDate} (${candidate.examRoom})`);
    setTimelineItemState(tStep4, 'future', 'Publicação das Listas: 28 de Outubro');
    setTimelineItemState(tStep5, 'future', 'Matrículas de 01 a 10 de Novembro');
  } else {
    setTimelineItemState(tStep3, 'future', 'Aguardando conferência documental');
    setTimelineItemState(tStep4, 'future', 'Publicação das Listas: 28 de Outubro');
    setTimelineItemState(tStep5, 'future', 'Matrículas de 01 a 10 de Novembro');
  }
}

function setTimelineItemState(element, state, subtitle) {
  if (!element) return;
  const icon = element.querySelector('.timeline-icon');
  const desc = element.querySelector('.timeline-desc');

  if (desc) desc.textContent = subtitle;

  if (state === 'done') {
    if (icon) {
      icon.className = 'timeline-icon w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md';
      icon.innerHTML = '<i class="fa-solid fa-check"></i>';
    }
  } else if (state === 'current') {
    if (icon) {
      icon.className = 'timeline-icon w-8 h-8 rounded-full bg-[#008BFF] text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-[#008BFF]/30 pulse-badge';
      icon.innerHTML = '<i class="fa-solid fa-hourglass-half"></i>';
    }
  } else if (state === 'error') {
    if (icon) {
      icon.className = 'timeline-icon w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold shadow-md';
      icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
  } else {
    if (icon) {
      icon.className = 'timeline-icon w-8 h-8 rounded-full bg-gray-200 dark:bg-[#1E3E62] text-gray-400 flex items-center justify-center text-xs font-bold';
      icon.innerHTML = '<i class="fa-regular fa-circle"></i>';
    }
  }
}

// ----------------------------------------------------------------------------
// 12. PAINEL ADMINISTRATIVO COM TABELA E AÇÕES
// ----------------------------------------------------------------------------
function setupAdminPanel() {
  const searchInput = document.getElementById('admin-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      SSNA_STATE.searchQuery = e.target.value.toLowerCase().trim();
      renderAdminTable();
    });
  }

  const filterCourse = document.getElementById('admin-filter-course');
  if (filterCourse) {
    filterCourse.addEventListener('change', (e) => {
      SSNA_STATE.activeFilterCourse = e.target.value;
      renderAdminTable();
    });
  }

  const filterStatus = document.getElementById('admin-filter-status');
  if (filterStatus) {
    filterStatus.addEventListener('change', (e) => {
      SSNA_STATE.activeFilterStatus = e.target.value;
      renderAdminTable();
    });
  }

  const btnResetData = document.getElementById('btn-admin-reset-data');
  if (btnResetData) {
    btnResetData.addEventListener('click', () => {
      if (confirm('Deseja restaurar os dados de demonstração originais do 1º e 2º Ciclo?')) {
        StorageManager.resetToDefault();
        refreshAdminData();
        Toast.show('Dados Restaurados', 'Base de dados escolar restabelecida.', 'info');
      }
    });
  }

  const btnQuickAdd = document.getElementById('btn-admin-quick-add');
  if (btnQuickAdd) {
    btnQuickAdd.addEventListener('click', () => {
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const testNames = ["Afonso Van-Dúnem", "Kieza de Carvalho", "Yara Neves Baptista", "Mateus Sebastião Paulo", "Nádia Cruz Mendonça"];
      const testOptions = [
        { cycle: "1º Ciclo do Ensino Secundário", course: "7ª Classe - 1º Ciclo Geral" },
        { cycle: "2º Ciclo Geral (Liceu)", course: "10ª Classe - Ciências Físicas e Biológicas" },
        { cycle: "2º Ciclo Técnico", course: "10ª Classe - Técnico de Informática (Sistemas & Redes)" },
        { cycle: "2º Ciclo Técnico", course: "10ª Classe - Contabilidade e Gestão Empresarial" }
      ];
      
      const randomName = testNames[Math.floor(Math.random() * testNames.length)];
      const randomOpt = testOptions[Math.floor(Math.random() * testOptions.length)];

      // Gera notas aleatórias (alguns aprovados >= 10, outros < 10)
      const p = parseFloat((8 + Math.random() * 10).toFixed(1));
      const m = parseFloat((7 + Math.random() * 11).toFixed(1));
      const s = parseFloat((8 + Math.random() * 10).toFixed(1));
      const avg = parseFloat(((p + m + s) / 3).toFixed(1));
      const isAutoAdmitted = avg >= 10.0;

      const candidate = {
        id: `SEC-2025-${randomSeq}`,
        fullName: randomName,
        guardianName: `António ${randomName.split(' ')[1]} (Pai/Encarregado)`,
        guardianPhone: "+244 923 " + Math.floor(100000 + Math.random() * 900000),
        guardianEmail: `${randomName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
        email: `${randomName.toLowerCase().replace(/\s+/g, '.')}@aluno.ao`,
        phone: "+244 923 " + Math.floor(100000 + Math.random() * 900000),
        documentType: "Bilhete de Identidade",
        documentId: "00" + Math.floor(10000000 + Math.random() * 90000000) + "LA044",
        birthDate: "2010-06-20",
        gender: "Outro",
        address: { province: "Luanda", city: "Talatona", street: "Rua Direita do Patriota" },
        cycle: randomOpt.cycle,
        gradeApplied: randomOpt.course.split(' - ')[0],
        course: randomOpt.course,
        shift: "Manhã",
        modality: "Exame de Admissão",
        campus: "Sede Principal",
        grades: {
          portuguese: p,
          math: m,
          science: s,
          average: avg
        },
        systemVerdict: isAutoAdmitted ? "Admitido" : "Não Admitido",
        documents: {
          bi: { name: "BI_Aluno_Original.pdf", size: "1.2 MB", status: isAutoAdmitted ? "Aprovado" : "Em Análise" },
          certificate: { name: "Certificado_Classe_Anterior.pdf", size: "2.5 MB", status: isAutoAdmitted ? "Aprovado" : "Em Análise" },
          photo: { name: "Foto_3x4.jpg", size: "700 KB", status: "Aprovado" }
        },
        documentsStatus: isAutoAdmitted ? "Aprovados" : "Pendentes",
        rejectionReason: isAutoAdmitted ? "" : `Média de ${avg} valores insuficiente.`,
        examGrade: avg,
        status: isAutoAdmitted ? "Admitido" : "Não Admitido",
        submissionDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        examRoom: isAutoAdmitted ? "Vaga Confirmada" : "Não Apto",
        examDate: isAutoAdmitted ? "Matrícula Direta" : "Encerrado",
        notes: isAutoAdmitted
          ? `Admissão Automática do Sistema: Média de ${avg} valores (>= 10 valores).`
          : `Não Admitido pelo Sistema: Média de ${avg} valores (< 10 valores).`
      };

      StorageManager.addCandidate(candidate);
      refreshAdminData();
      Toast.show('Aluno Adicionado', `${randomName} (${candidate.id}) - Média ${avg} (${candidate.status})`, 'success');
    });
  }
}

function refreshAdminData() {
  renderAdminKPIs();
  renderAdminTable();
}

function renderAdminKPIs() {
  const candidates = StorageManager.getCandidates();
  const total = candidates.length;
  const pendingDocs = candidates.filter(c => c.documentsStatus === 'Pendentes' || c.status === 'Em Análise').length;
  const approved = candidates.filter(c => c.status === 'Admitido').length;

  const totalSlots = 240;
  const occupationRate = ((approved / totalSlots) * 100).toFixed(1);

  const kpiTotalEl = document.getElementById('kpi-total-candidates');
  const kpiPendingEl = document.getElementById('kpi-pending-docs');
  const kpiApprovedEl = document.getElementById('kpi-approved-candidates');
  const kpiSlotsEl = document.getElementById('kpi-occupied-slots');
  const kpiSlotsBar = document.getElementById('kpi-slots-bar');
  const kpiSlotsPercentEl = document.getElementById('kpi-slots-percent');

  if (kpiTotalEl) kpiTotalEl.textContent = total;
  if (kpiPendingEl) kpiPendingEl.textContent = pendingDocs;
  if (kpiApprovedEl) kpiApprovedEl.textContent = approved;
  if (kpiSlotsEl) kpiSlotsEl.textContent = `${approved} / ${totalSlots} vagas`;
  if (kpiSlotsPercentEl) kpiSlotsPercentEl.textContent = `${occupationRate}%`;
  if (kpiSlotsBar) kpiSlotsBar.style.width = `${Math.min(occupationRate, 100)}%`;

  const adminBadge = document.getElementById('admin-pending-badge');
  if (adminBadge) {
    if (pendingDocs > 0) {
      adminBadge.textContent = pendingDocs;
      adminBadge.classList.remove('hidden');
    } else {
      adminBadge.classList.add('hidden');
    }
  }
}

function renderAdminTable() {
  const candidates = StorageManager.getCandidates();
  const tableBody = document.getElementById('admin-candidates-table-body');
  const countEl = document.getElementById('admin-table-count');

  if (!tableBody) return;

  const filtered = candidates.filter(c => {
    const matchesQuery = !SSNA_STATE.searchQuery ||
      c.fullName.toLowerCase().includes(SSNA_STATE.searchQuery) ||
      c.id.toLowerCase().includes(SSNA_STATE.searchQuery) ||
      c.documentId.toLowerCase().includes(SSNA_STATE.searchQuery) ||
      (c.guardianName && c.guardianName.toLowerCase().includes(SSNA_STATE.searchQuery));

    const matchesCourse = SSNA_STATE.activeFilterCourse === 'all' || 
      (c.cycle && c.cycle.includes(SSNA_STATE.activeFilterCourse)) ||
      c.course.includes(SSNA_STATE.activeFilterCourse);

    const matchesStatus = SSNA_STATE.activeFilterStatus === 'all' ||
      (SSNA_STATE.activeFilterStatus === 'Pendentes' && (c.status === 'Em Análise' || c.documentsStatus === 'Pendentes')) ||
      c.status === SSNA_STATE.activeFilterStatus;

    return matchesQuery && matchesCourse && matchesStatus;
  });

  if (countEl) {
    countEl.textContent = `Exibindo ${filtered.length} de ${candidates.length} alunos inscritos`;
  }

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-12 text-gray-500 dark:text-gray-400">
          <i class="fa-solid fa-school text-4xl mb-3 text-gray-300 dark:text-gray-600 block"></i>
          <p class="font-semibold text-base">Nenhum aluno encontrado</p>
          <p class="text-xs mt-1">Ajuste os filtros ou os termos de busca para localizar o candidato.</p>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(c => {
    let statusBadgeClass = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    let statusIcon = 'fa-regular fa-circle';

    if (c.status === 'Admitido') {
      statusBadgeClass = 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30';
      statusIcon = 'fa-solid fa-circle-check';
    } else if (c.status === 'Não Admitido') {
      statusBadgeClass = 'bg-rose-500/15 text-rose-500 border border-rose-500/30';
      statusIcon = 'fa-solid fa-circle-xmark';
    } else if (c.status === 'Convocado para Prova') {
      statusBadgeClass = 'bg-sky-500/15 text-[#008BFF] border border-sky-500/30';
      statusIcon = 'fa-solid fa-calendar-check';
    } else {
      statusBadgeClass = 'bg-amber-500/15 text-amber-500 border border-amber-500/30';
      statusIcon = 'fa-solid fa-hourglass-half';
    }

    const avg = c.grades?.average ?? c.examGrade ?? null;
    const isAdmittedByAvg = avg !== null && avg >= 10.0;

    // Coluna Média
    const averageDisplay = avg !== null
      ? `<span class="font-extrabold text-xs font-mono ${isAdmittedByAvg ? 'text-emerald-500' : 'text-rose-500'}">${avg} / 20</span>`
      : '<span class="text-gray-400 text-xs italic">Não calculada</span>';

    // Coluna Decisão do Sistema
    const systemVerdictDisplay = isAdmittedByAvg
      ? `<span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20"><i class="fa-solid fa-robot"></i> Admitido</span>`
      : `<span class="inline-flex items-center gap-1 text-[11px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20"><i class="fa-solid fa-robot"></i> Não Admitido</span>`;

    const initials = c.fullName.split(' ').map(n => n[0]).slice(0, 2).join('');

    return `
      <tr class="border-b border-gray-100 dark:border-[#2E5784]/40 hover:bg-gray-50/80 dark:hover:bg-[#1E3E62]/40 transition-colors">
        <td class="py-3.5 px-4 font-mono font-bold text-xs text-[#008BFF]">
          ${c.id}
        </td>
        <td class="py-3.5 px-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-[#008BFF]/15 text-[#008BFF] flex items-center justify-center font-bold text-xs shrink-0">
              ${initials}
            </div>
            <div>
              <div class="font-semibold text-sm text-gray-900 dark:text-white">${c.fullName}</div>
              <div class="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <i class="fa-solid fa-user-shield text-[10px]"></i> ${c.guardianName || 'Encarregado'} • ${c.phone}
              </div>
            </div>
          </div>
        </td>
        <td class="py-3.5 px-4">
          <div class="font-medium text-xs text-gray-800 dark:text-gray-200">${c.course}</div>
          <div class="text-[11px] text-gray-500 dark:text-gray-400">${c.cycle} • Turno ${c.shift}</div>
        </td>
        <td class="py-3.5 px-4">
          ${averageDisplay}
        </td>
        <td class="py-3.5 px-4">
          ${systemVerdictDisplay}
        </td>
        <td class="py-3.5 px-4">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}">
            <i class="${statusIcon}"></i>
            ${c.status}
          </span>
        </td>
        <td class="py-3.5 px-4 text-right">
          <button 
            onclick="openReviewModal('${c.id}')"
            class="px-3 py-1.5 rounded-lg bg-[#008BFF] hover:bg-[#0066FF] text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition-all ml-auto"
            title="Analisar Processo Escolar"
          >
            <i class="fa-solid fa-pen-to-square"></i>
            <span>Analisar</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// ----------------------------------------------------------------------------
// 13. MODAL DE ANÁLISE DO CANDIDATO (SECRETARIA PEDAGÓGICA)
// ----------------------------------------------------------------------------
function openReviewModal(candidateId) {
  const candidate = StorageManager.getCandidateById(candidateId);
  if (!candidate) return;

  SSNA_STATE.modalReviewCandidateId = candidateId;
  const modal = document.getElementById('modal-review-candidate');
  if (!modal) return;

  document.getElementById('modal-rev-id').textContent = candidate.id;
  document.getElementById('modal-rev-fullname').textContent = candidate.fullName;
  document.getElementById('modal-rev-course').textContent = `${candidate.course} • ${candidate.shift}`;
  document.getElementById('modal-rev-email').textContent = candidate.guardianEmail || candidate.email;
  document.getElementById('modal-rev-phone').textContent = `${candidate.guardianName} (${candidate.phone})`;
  document.getElementById('modal-rev-bi').textContent = `${candidate.documentType}: ${candidate.documentId}`;
  document.getElementById('modal-rev-birth').textContent = formatDateBR(candidate.birthDate);
  document.getElementById('modal-rev-modality').textContent = candidate.modality;
  document.getElementById('modal-rev-campus').textContent = candidate.cycle || '2º Ciclo do Ensino Secundário';
  document.getElementById('modal-rev-address').textContent = `${candidate.address.street}, ${candidate.address.city} - ${candidate.address.province}`;

  // Notas e Média do Aluno no Modal da ADM
  const pGrade = candidate.grades?.portuguese ?? '--';
  const mGrade = candidate.grades?.math ?? '--';
  const sGrade = candidate.grades?.science ?? '--';
  const avgGrade = candidate.grades?.average ?? candidate.examGrade ?? '--';

  document.getElementById('modal-rev-grade-portuguese').textContent = pGrade !== '--' ? `${pGrade} / 20` : '--';
  document.getElementById('modal-rev-grade-math').textContent = mGrade !== '--' ? `${mGrade} / 20` : '--';
  document.getElementById('modal-rev-grade-science').textContent = sGrade !== '--' ? `${sGrade} / 20` : '--';
  document.getElementById('modal-rev-average-value').textContent = avgGrade !== '--' ? `${avgGrade} / 20` : '--';

  const isAvgPass = typeof avgGrade === 'number' ? avgGrade >= 10.0 : parseFloat(avgGrade) >= 10.0;
  const modalVerdictBadge = document.getElementById('modal-rev-system-verdict-badge');
  const modalVerdictTitle = document.getElementById('modal-rev-system-verdict-title');
  const modalVerdictText = document.getElementById('modal-rev-system-verdict-text');

  if (modalVerdictBadge && modalVerdictTitle && modalVerdictText) {
    if (isAvgPass) {
      modalVerdictBadge.className = 'px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 bg-emerald-500/20 text-emerald-500 border border-emerald-500/30';
      modalVerdictTitle.textContent = 'Admitido pelo Sistema';
      modalVerdictText.className = 'text-emerald-500 font-bold';
      modalVerdictText.textContent = `Admitido (Média ${avgGrade} >= 10)`;
    } else {
      modalVerdictBadge.className = 'px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 bg-rose-500/20 text-rose-500 border border-rose-500/30';
      modalVerdictTitle.textContent = 'Não Admitido pelo Sistema';
      modalVerdictText.className = 'text-rose-500 font-bold';
      modalVerdictText.textContent = `Não Admitido (Média ${avgGrade} < 10)`;
    }
  }

  // Documentos
  document.getElementById('modal-rev-doc-bi-name').textContent = candidate.documents?.bi?.name || 'Documento_Identidade.pdf';
  document.getElementById('modal-rev-doc-bi-size').textContent = candidate.documents?.bi?.size || '1.2 MB';
  
  document.getElementById('modal-rev-doc-cert-name').textContent = candidate.documents?.certificate?.name || 'Declaracao_Notas_Anterior.pdf';
  document.getElementById('modal-rev-doc-cert-size').textContent = candidate.documents?.certificate?.size || '2.4 MB';

  document.getElementById('modal-rev-doc-photo-name').textContent = candidate.documents?.photo?.name || 'Foto_Aluno_Passe.jpg';
  document.getElementById('modal-rev-doc-photo-size').textContent = candidate.documents?.photo?.size || '680 KB';

  const gradeInput = document.getElementById('modal-rev-grade-input');
  if (gradeInput) {
    gradeInput.value = candidate.examGrade !== null && candidate.examGrade !== undefined ? candidate.examGrade : (avgGrade !== '--' ? avgGrade : '');
  }

  const reasonInput = document.getElementById('modal-rev-rejection-reason');
  if (reasonInput) {
    reasonInput.value = candidate.rejectionReason || '';
  }

  const notesInput = document.getElementById('modal-rev-notes');
  if (notesInput) {
    notesInput.value = candidate.notes || '';
  }

  updateModalStatusButtons(candidate.status, candidate.documentsStatus);

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function updateModalStatusButtons(currentStatus, currentDocsStatus) {
  const docsStatusBadge = document.getElementById('modal-rev-docs-status-badge');
  if (docsStatusBadge) {
    if (currentDocsStatus === 'Aprovados') {
      docsStatusBadge.className = 'px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30';
      docsStatusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Processo Homologado';
    } else if (currentDocsStatus === 'Reprovados') {
      docsStatusBadge.className = 'px-2.5 py-1 rounded-md text-xs font-bold bg-rose-500/20 text-rose-500 border border-rose-500/30';
      docsStatusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Documentação Rejeitada';
    } else {
      docsStatusBadge.className = 'px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30';
      docsStatusBadge.innerHTML = '<i class="fa-solid fa-clock"></i> Em Conferência';
    }
  }

  const statusOptions = ['Admitido', 'Convocado para Prova', 'Em Análise', 'Não Admitido'];
  statusOptions.forEach(opt => {
    const btn = document.querySelector(`[data-status-choice="${opt}"]`);
    if (btn) {
      if (opt === currentStatus) {
        btn.classList.add('ring-2', 'ring-offset-2', 'ring-[#008BFF]');
      } else {
        btn.classList.remove('ring-2', 'ring-offset-2', 'ring-[#008BFF]');
      }
    }
  });
}

function closeReviewModal() {
  const modal = document.getElementById('modal-review-candidate');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// ----------------------------------------------------------------------------
// 14. COMPROVATIVO DE INSCRIÇÃO & GUIA DE PAGAMENTO
// ----------------------------------------------------------------------------
function openComprovativoModal(candidateId) {
  const candidate = StorageManager.getCandidateById(candidateId);
  if (!candidate) return;

  const modal = document.getElementById('modal-comprovativo');
  if (!modal) return;

  document.getElementById('comp-id').textContent = candidate.id;
  document.getElementById('comp-date').textContent = candidate.submissionDate;
  document.getElementById('comp-name').textContent = candidate.fullName;
  document.getElementById('comp-bi').textContent = `${candidate.documentType || 'BI'}: ${candidate.documentId}`;
  document.getElementById('comp-email').textContent = candidate.guardianEmail || candidate.email;
  document.getElementById('comp-phone').textContent = `${candidate.guardianName || 'Encarregado'} (${candidate.phone})`;
  document.getElementById('comp-course').textContent = candidate.course;
  document.getElementById('comp-shift').textContent = candidate.shift;
  document.getElementById('comp-modality').textContent = candidate.modality;
  document.getElementById('comp-campus').textContent = candidate.cycle || '2º Ciclo do Ensino Secundário';
  document.getElementById('comp-exam-date').textContent = candidate.examDate || '26 de Outubro de 2025 às 08:30';
  document.getElementById('comp-exam-room').textContent = candidate.examRoom || 'Sala 12 - Bloco A';

  const barcodeNumber = document.getElementById('comp-barcode-number');
  if (barcodeNumber) {
    barcodeNumber.textContent = `*${candidate.id.replace(/-/g, '')}*`;
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeComprovativoModal() {
  const modal = document.getElementById('modal-comprovativo');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function openGuiaPagamentoModal(candidateId) {
  const candidate = StorageManager.getCandidateById(candidateId);
  if (!candidate) return;

  const modal = document.getElementById('modal-guia');
  if (!modal) return;

  document.getElementById('guia-candidate-name').textContent = candidate.fullName;
  document.getElementById('guia-candidate-id').textContent = candidate.id;
  document.getElementById('guia-course').textContent = candidate.course;
  
  const rawIdNum = candidate.id.replace(/\D/g, '') || '20250912';
  const formattedRef = `928 ${rawIdNum.substring(0, 3)} ${rawIdNum.substring(3, 6) || '451'}`;
  document.getElementById('guia-reference').textContent = formattedRef;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeGuiaPagamentoModal() {
  const modal = document.getElementById('modal-guia');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// ----------------------------------------------------------------------------
// 15. CONFIGURAÇÃO DE EVENTOS DE MODAIS
// ----------------------------------------------------------------------------
function setupModals() {
  const btnCloseReview = document.getElementById('btn-close-review-modal');
  if (btnCloseReview) btnCloseReview.addEventListener('click', closeReviewModal);

  // Botão "Aplicar Decisão do Sistema" dentro do modal da ADM
  const btnApplySystem = document.getElementById('btn-modal-apply-system-verdict');
  if (btnApplySystem) {
    btnApplySystem.addEventListener('click', () => {
      const id = SSNA_STATE.modalReviewCandidateId;
      if (!id) return;
      const candidate = StorageManager.getCandidateById(id);
      if (!candidate) return;

      const avg = candidate.grades?.average ?? candidate.examGrade ?? 0;
      const autoStatus = avg >= 10.0 ? "Admitido" : "Não Admitido";

      StorageManager.updateCandidate(id, {
        status: autoStatus,
        documentsStatus: autoStatus === "Admitido" ? "Aprovados" : candidate.documentsStatus
      });

      updateModalStatusButtons(autoStatus, StorageManager.getCandidateById(id).documentsStatus);
      refreshAdminData();
      Toast.show('Decisão do Sistema Aplicada', `Status do aluno definido como "${autoStatus}" com base na média (${avg}).`, 'success');
    });
  }

  const btnApproveDocs = document.getElementById('btn-rev-approve-docs');
  if (btnApproveDocs) {
    btnApproveDocs.addEventListener('click', () => {
      const id = SSNA_STATE.modalReviewCandidateId;
      if (!id) return;

      const reasonField = document.getElementById('modal-rev-rejection-reason');
      if (reasonField) reasonField.value = '';

      StorageManager.updateCandidate(id, {
        documentsStatus: 'Aprovados',
        rejectionReason: '',
        status: 'Convocado para Prova'
      });

      updateModalStatusButtons('Convocado para Prova', 'Aprovados');
      refreshAdminData();
      Toast.show('Documentos Aprovados', 'Processo homologado pela Secretaria.', 'success');
    });
  }

  const btnRejectDocs = document.getElementById('btn-rev-reject-docs');
  if (btnRejectDocs) {
    btnRejectDocs.addEventListener('click', () => {
      const id = SSNA_STATE.modalReviewCandidateId;
      if (!id) return;

      const reason = document.getElementById('modal-rev-rejection-reason').value.trim();
      if (!reason) {
        Toast.show('Motivo Necessário', 'Descreva o motivo da rejeição documental para orientação do Encarregado.', 'warning');
        document.getElementById('modal-rev-rejection-reason').focus();
        return;
      }

      StorageManager.updateCandidate(id, {
        documentsStatus: 'Reprovados',
        rejectionReason: reason,
        status: 'Em Análise'
      });

      updateModalStatusButtons('Em Análise', 'Reprovados');
      refreshAdminData();
      Toast.show('Documentos Rejeitados', 'Motivo registrado e notificado ao Encarregado.', 'error');
    });
  }

  const btnSaveGrade = document.getElementById('btn-rev-save-grade');
  if (btnSaveGrade) {
    btnSaveGrade.addEventListener('click', () => {
      const id = SSNA_STATE.modalReviewCandidateId;
      if (!id) return;

      const gradeVal = parseFloat(document.getElementById('modal-rev-grade-input').value);
      if (isNaN(gradeVal) || gradeVal < 0 || gradeVal > 20) {
        Toast.show('Nota Inválida', 'A nota da prova diagnóstica deve ser entre 0 e 20 valores.', 'warning');
        return;
      }

      const autoStatus = gradeVal >= 10 ? 'Admitido' : 'Não Admitido';

      StorageManager.updateCandidate(id, {
        examGrade: gradeVal,
        status: autoStatus
      });

      updateModalStatusButtons(autoStatus, 'Aprovados');
      refreshAdminData();
      Toast.show('Nota Lançada', `Nota ${gradeVal}/20 gravada. Status alterado para ${autoStatus}.`, 'success');
    });
  }

  const statusDecisionBtns = document.querySelectorAll('[data-status-choice]');
  statusDecisionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = SSNA_STATE.modalReviewCandidateId;
      if (!id) return;

      const chosenStatus = btn.getAttribute('data-status-choice');
      const currentNotes = document.getElementById('modal-rev-notes').value;

      StorageManager.updateCandidate(id, {
        status: chosenStatus,
        notes: currentNotes
      });

      updateModalStatusButtons(chosenStatus, StorageManager.getCandidateById(id).documentsStatus);
      refreshAdminData();
      Toast.show('Status Atualizado', `Candidatura definida manualmente como "${chosenStatus}".`, 'info');
    });
  });

  const btnSaveNotes = document.getElementById('btn-rev-save-notes');
  if (btnSaveNotes) {
    btnSaveNotes.addEventListener('click', () => {
      const id = SSNA_STATE.modalReviewCandidateId;
      if (!id) return;

      const notes = document.getElementById('modal-rev-notes').value;
      StorageManager.updateCandidate(id, { notes: notes });
      refreshAdminData();
      Toast.show('Parecer Salvo', 'Anotações da Direcção Pedagógica gravadas com sucesso.', 'success');
      closeReviewModal();
    });
  }

  const btnViewAsCandidate = document.getElementById('btn-rev-view-as-candidate');
  if (btnViewAsCandidate) {
    btnViewAsCandidate.addEventListener('click', () => {
      const id = SSNA_STATE.modalReviewCandidateId;
      if (!id) return;

      closeReviewModal();
      document.getElementById('nav-btn-candidate').click();
      showCandidateDashboard(id);
    });
  }

  const btnCloseComp = document.getElementById('btn-close-comp-modal');
  if (btnCloseComp) btnCloseComp.addEventListener('click', closeComprovativoModal);

  const btnPrintComp = document.getElementById('btn-print-comprovativo');
  if (btnPrintComp) {
    btnPrintComp.addEventListener('click', () => {
      window.print();
    });
  }

  const btnCloseGuia = document.getElementById('btn-close-guia-modal');
  if (btnCloseGuia) btnCloseGuia.addEventListener('click', closeGuiaPagamentoModal);

  const btnCopyRef = document.getElementById('btn-copy-guia-ref');
  if (btnCopyRef) {
    btnCopyRef.addEventListener('click', () => {
      const refText = document.getElementById('guia-reference').textContent.trim();
      navigator.clipboard.writeText(refText.replace(/\s+/g, '')).then(() => {
        Toast.show('Copiado!', `Referência ${refText} copiada para a área de transferência.`, 'success');
      }).catch(() => {
        Toast.show('Referência', refText, 'info');
      });
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeReviewModal();
      closeComprovativoModal();
      closeGuiaPagamentoModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeReviewModal();
      closeComprovativoModal();
      closeGuiaPagamentoModal();
    }
  });
}

// ----------------------------------------------------------------------------
// 16. UTILITÁRIOS
// ----------------------------------------------------------------------------
function formatDateBR(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
}
