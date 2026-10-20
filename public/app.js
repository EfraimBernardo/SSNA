/**
 * ============================================================================
 * SISTEMA INTEGRADO DE GESTÃO DE MATRÍCULAS E ADMISSÕES (SIGMA / SSNA)
 * República de Angola • Ministério da Educação • Governo Provincial de Luanda
 * Complexo Escolar do Ensino Secundário Geral e Politécnico nº 1245
 * Módulo de Homologação, Avaliação Regulamentar e Emissão de Documentos
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
  activeFilterShift: 'all',
  activeFilterStatus: 'all',
  searchQuery: '',
  selectedCycle: '2º Ciclo Técnico',
  uploadedFiles: {
    bi: null,
    certificate: null,
    photo: null
  },
  modalReviewCandidateId: null,
  activePreviewDocKey: null
};

// Base de Dados Demonstrativa Inicial (1º e 2º Ciclo do Ensino Secundário)
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
    cycle: "2º Ciclo Técnico-Profissional",
    gradeApplied: "10ª Classe",
    course: "10ª Classe - Técnico de Informática (Sistemas & Redes)",
    shift: "Manhã",
    modality: "Exame de Admissão",
    campus: "Sede Central - Complexo Escolar nº 1245",
    grades: {
      portuguese: 17.0,
      math: 18.0,
      science: 17.5,
      average: 17.5
    },
    systemVerdict: "Admitido", // Média >= 10
    documents: {
      bi: { name: "BI_Mariana_Costa.pdf", size: "1.2 MB", status: "Homologado" },
      certificate: { name: "Certificado_9a_Classe_Notas.pdf", size: "2.4 MB", status: "Homologado" },
      photo: { name: "Foto_Mariana_Passe.jpg", size: "680 KB", status: "Homologado" }
    },
    documentsStatus: "Aprovados",
    rejectionReason: "",
    examGrade: 17.5,
    status: "Admitido",
    submissionDate: "2025-10-10 09:30",
    examRoom: "Sala 12 - Bloco A",
    examDate: "2025-10-25 08:30",
    notes: "Candidatura homologada pela Direcção Pedagógica com média curricular de 17.5 valores (Critério: Média ≥ 10.0 valores). Vaga confirmada."
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
    campus: "Sede Central - Complexo Escolar nº 1245",
    grades: {
      portuguese: 12.0,
      math: 11.0,
      science: 11.5,
      average: 11.5
    },
    systemVerdict: "Admitido",
    documents: {
      bi: { name: "Cedula_Carlos_Neto.pdf", size: "980 KB", status: "Em Conferência" },
      certificate: { name: "Declaracao_6a_Classe_Notas.pdf", size: "3.1 MB", status: "Em Conferência" },
      photo: { name: "Foto_Carlos_Passe.png", size: "620 KB", status: "Em Conferência" }
    },
    documentsStatus: "Pendentes",
    rejectionReason: "",
    examGrade: null,
    status: "Em Análise",
    submissionDate: "2025-10-12 14:15",
    examRoom: "Pendente de Convocatória",
    examDate: "A definir",
    notes: "Média de 11.5 valores atinge o critério regulamentar. Aguarda conferência física dos originais pela Secretaria Pedagógica."
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
    cycle: "2º Ciclo Geral (Liceu / PUNIV)",
    gradeApplied: "10ª Classe",
    course: "10ª Classe - Ciências Físicas e Biológicas (Saúde & Natureza)",
    shift: "Manhã",
    modality: "Exame de Admissão",
    campus: "Sede Central - Complexo Escolar nº 1245",
    grades: {
      portuguese: 16.0,
      math: 15.0,
      science: 17.0,
      average: 16.0
    },
    systemVerdict: "Admitido",
    documents: {
      bi: { name: "BI_Beatriz_Sousa.pdf", size: "1.4 MB", status: "Homologado" },
      certificate: { name: "Certificado_9a_Classe_Notas.pdf", size: "2.8 MB", status: "Homologado" },
      photo: { name: "Foto_Beatriz_Passe.jpg", size: "720 KB", status: "Homologado" }
    },
    documentsStatus: "Aprovados",
    rejectionReason: "",
    examGrade: null,
    status: "Convocado para Prova",
    submissionDate: "2025-10-13 11:40",
    examRoom: "Sala 08 - Bloco B",
    examDate: "2025-10-26 08:30",
    notes: "Média de 16.0 valores no 1º ciclo. Convocada para prova presencial de nivelamento em Biologia e Físico-Química."
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
    cycle: "2º Ciclo Técnico-Profissional",
    gradeApplied: "10ª Classe",
    course: "10ª Classe - Contabilidade e Gestão Empresarial",
    shift: "Tarde",
    modality: "Exame de Admissão",
    campus: "Polo Escolar de Viana",
    grades: {
      portuguese: 8.5,
      math: 7.5,
      science: 9.0,
      average: 8.3
    },
    systemVerdict: "Não Admitido",
    documents: {
      bi: { name: "BI_Antonio_Silva.pdf", size: "1.1 MB", status: "Homologado" },
      certificate: { name: "Certificado_9a_Classe.pdf", size: "1.9 MB", status: "Homologado" },
      photo: { name: "Foto_Antonio.jpg", size: "540 KB", status: "Homologado" }
    },
    documentsStatus: "Aprovados",
    rejectionReason: "Candidato não qualificado por média curricular de 8.3 valores, inferior ao mínimo regulamentar de 10.0 valores estabelecido pelo Ministério da Educação.",
    examGrade: 8.3,
    status: "Não Admitido",
    submissionDate: "2025-10-09 16:20",
    examRoom: "Sala 05 - Bloco A",
    examDate: "2025-10-24 14:00",
    notes: "Classificado como Não Apto pelo sistema regulamentar por média curricular inferior a 10.0 valores."
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
    campus: "Sede Central - Complexo Escolar nº 1245",
    grades: {
      portuguese: 13.5,
      math: 14.0,
      science: 13.0,
      average: 13.5
    },
    systemVerdict: "Admitido",
    documents: {
      bi: { name: "Assento_Nascimento_Esperanca.pdf", size: "1.5 MB", status: "Homologado" },
      certificate: { name: "Declaracao_7a_Classe_Ilegivel.pdf", size: "450 KB", status: "Rejeitado" },
      photo: { name: "Foto_Esperanca_Passe.jpg", size: "680 KB", status: "Homologado" }
    },
    documentsStatus: "Reprovados",
    rejectionReason: "A Declaração de Notas da 7ª classe da escola de origem encontra-se ilegível e sem o carimbo da Direcção Municipal de Educação. É necessário anexar documento autenticado.",
    examGrade: null,
    status: "Em Análise",
    submissionDate: "2025-10-14 08:10",
    examRoom: "Pendente de Documentação Válida",
    examDate: "A definir",
    notes: "Média de 13.5 valores cumpre o critério de admissão. Processo aguarda regularização da declaração escolar autenticada."
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
    cycle: "2º Ciclo Geral (Liceu / PUNIV)",
    gradeApplied: "10ª Classe",
    course: "10ª Classe - Ciências Económicas e Jurídicas (PUNIV)",
    shift: "Tarde",
    modality: "Mérito Escolar (Conclusão 9ª Classe)",
    campus: "Polo Escolar do Kilamba",
    grades: {
      portuguese: 17.0,
      math: 16.0,
      science: 17.5,
      average: 16.8
    },
    systemVerdict: "Admitido",
    documents: {
      bi: { name: "BI_Joao_Sacramento.pdf", size: "1.3 MB", status: "Homologado" },
      certificate: { name: "Certificado_9a_Classe_Notas.pdf", size: "2.9 MB", status: "Homologado" },
      photo: { name: "Foto_Joao_Passe.png", size: "790 KB", status: "Homologado" }
    },
    documentsStatus: "Aprovados",
    rejectionReason: "",
    examGrade: 16.8,
    status: "Admitido",
    submissionDate: "2025-10-11 10:05",
    examRoom: "Admissão por Mérito Escolar",
    examDate: "Dispensado de Exame",
    notes: "Homologação de admissão direta por mérito escolar: média de 16.8 valores na conclusão da 9ª classe do 1º Ciclo."
  }
];

// Gerenciador do Armazenamento Local (LocalStorage)
class StorageManager {
  static KEY_CANDIDATES = 'SIGMA_SEC_CANDIDATES_V4';
  static KEY_CURRENT_CANDIDATE = 'SIGMA_SEC_CURRENT_CANDIDATE_V4';
  static KEY_THEME = 'SIGMA_THEME_PREFERENCE';

  static getCandidates() {
    try {
      const data = localStorage.getItem(this.KEY_CANDIDATES);
      if (!data) {
        this.saveCandidates(INITIAL_MOCK_CANDIDATES);
        return INITIAL_MOCK_CANDIDATES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn("Aviso ao aceder ao LocalStorage", e);
      return INITIAL_MOCK_CANDIDATES;
    }
  }

  static saveCandidates(candidates) {
    try {
      localStorage.setItem(this.KEY_CANDIDATES, JSON.stringify(candidates));
    } catch (e) {
      console.warn("Aviso ao gravar no LocalStorage", e);
    }
  }

  static getCandidateById(id) {
    if (!id) return null;
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

// Sistema de Notificações Institucionais (Toast)
class Toast {
  static show(title, message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item flex items-start gap-3 p-3.5 rounded-xl border text-xs max-w-sm transition-all duration-200`;

    let iconHtml = '';
    let borderColor = '';
    let bgColor = '';
    let textColor = '';

    const isDark = document.documentElement.classList.contains('dark');

    if (type === 'success') {
      bgColor = isDark ? 'bg-[#132238]' : 'bg-white';
      borderColor = 'border-gov-emerald/50';
      textColor = 'text-gov-emerald';
      iconHtml = '<i class="fa-solid fa-circle-check text-base"></i>';
    } else if (type === 'error') {
      bgColor = isDark ? 'bg-[#132238]' : 'bg-white';
      borderColor = 'border-gov-rose/50';
      textColor = 'text-gov-rose';
      iconHtml = '<i class="fa-solid fa-circle-exclamation text-base"></i>';
    } else if (type === 'warning') {
      bgColor = isDark ? 'bg-[#132238]' : 'bg-white';
      borderColor = 'border-gov-amber/50';
      textColor = 'text-gov-amber';
      iconHtml = '<i class="fa-solid fa-triangle-exclamation text-base"></i>';
    } else {
      bgColor = isDark ? 'bg-[#132238]' : 'bg-white';
      borderColor = 'border-accent/50';
      textColor = 'text-accent';
      iconHtml = '<i class="fa-solid fa-circle-info text-base"></i>';
    }

    toast.classList.add(bgColor, borderColor);

    toast.innerHTML = `
      <div class="${textColor} shrink-0 mt-0.5">${iconHtml}</div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-slate-900 dark:text-white text-xs mb-0.5">${title}</h4>
        <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">${message}</p>
      </div>
      <button class="text-slate-400 hover:text-slate-600 dark:hover:text-white ml-2 text-xs" onclick="this.parentElement.remove()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.25s forwards';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }
}

// Inicialização Principal da Aplicação
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
// 1. GESTÃO DE TEMA (DARK / LIGHT)
// ----------------------------------------------------------------------------
function initTheme() {
  const savedTheme = StorageManager.getTheme();
  setTheme(savedTheme);

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      StorageManager.setTheme(nextTheme);
    });
  }
}

function setTheme(theme) {
  SSNA_STATE.theme = theme;
  const icon = document.getElementById('theme-toggle-icon');
  const label = document.getElementById('theme-toggle-text');

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    if (icon) icon.className = 'fa-solid fa-sun text-amber-400 text-sm';
    if (label) label.textContent = 'Modo Claro';
  } else {
    document.documentElement.classList.remove('dark');
    if (icon) icon.className = 'fa-solid fa-moon text-slate-700 text-sm';
    if (label) label.textContent = 'Modo Escuro';
  }
}

// ----------------------------------------------------------------------------
// 2. NAVEGAÇÃO ENTRE VISÕES (CANDIDATO VS SECRETARIA PEDAGÓGICA)
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
      
      navCandidateBtn.classList.add('bg-accent', 'text-white', 'shadow-sm');
      navCandidateBtn.classList.remove('text-slate-600', 'dark:text-slate-300');
      
      navAdminBtn.classList.remove('bg-accent', 'text-white', 'shadow-sm');
      navAdminBtn.classList.add('text-slate-600', 'dark:text-slate-300');

      if (SSNA_STATE.candidateSubView === 'dashboard' && SSNA_STATE.currentCandidateId) {
        renderCandidateDashboard(SSNA_STATE.currentCandidateId);
      }
    } else {
      viewAdmin.classList.remove('hidden');
      viewCandidate.classList.add('hidden');

      navAdminBtn.classList.add('bg-accent', 'text-white', 'shadow-sm');
      navAdminBtn.classList.remove('text-slate-600', 'dark:text-slate-300');
      
      navCandidateBtn.classList.remove('bg-accent', 'text-white', 'shadow-sm');
      navCandidateBtn.classList.add('text-slate-600', 'dark:text-slate-300');

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
// 3. CONSULTA / VERIFICAÇÃO DE CANDIDATURA POR CÓDIGO DE PROTOCOLO
// ----------------------------------------------------------------------------
function setupTrackingCodeVerification() {
  const inputTracking = document.getElementById('input-tracking-code');
  const btnVerify = document.getElementById('btn-verify-tracking-code');

  function executeVerification(codeToTest) {
    const code = (codeToTest || (inputTracking ? inputTracking.value : '')).trim().toUpperCase();

    if (!code) {
      Toast.show('Número Obrigatório', 'Por favor, introduza o número do protocolo escolar (ex: SEC-2025-0101).', 'warning');
      if (inputTracking) highlightField('input-tracking-code');
      return;
    }

    const candidate = StorageManager.getCandidateById(code);
    if (candidate) {
      SSNA_STATE.currentCandidateId = candidate.id;
      StorageManager.setCurrentCandidateId(candidate.id);
      
      showCandidateDashboard(candidate.id);

      Toast.show(
        'Processo Localizado',
        `Candidatura de ${candidate.fullName} (${candidate.id}) - Situação: ${candidate.status}`,
        'success',
        4000
      );
    } else {
      Toast.show(
        'Processo Não Encontrado',
        `Nenhuma candidatura foi localizada com o protocolo "${code}". Verifique a numeração oficial.`,
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

  const sampleBtns = document.querySelectorAll('.btn-sample-code');
  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sampleCode = btn.getAttribute('data-code');
      if (inputTracking) inputTracking.value = sampleCode;
      executeVerification(sampleCode);
    });
  });

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

  const btnCopyProtocol = document.getElementById('btn-copy-protocol');
  if (btnCopyProtocol) {
    btnCopyProtocol.addEventListener('click', () => {
      const code = document.getElementById('dash-candidate-code').textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
        Toast.show('Protocolo Copiado', `O número ${code} foi copiado para a área de transferência.`, 'success');
      }).catch(() => {
        Toast.show('Protocolo', code, 'info');
      });
    });
  }
}

// ----------------------------------------------------------------------------
// 4. CÁLCULO AUTOMÁTICO DA MÉDIA & AVALIAÇÃO REGULAMENTAR EM TEMPO REAL
// ----------------------------------------------------------------------------
function setupGradeCalculationListeners() {
  const inputPort = document.getElementById('input-grade-portuguese');
  const inputMath = document.getElementById('input-grade-math');
  const inputScience = document.getElementById('input-grade-science');

  [inputPort, inputMath, inputScience].forEach(input => {
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
      avgBadgeEl.className = 'px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-gov-navy border border-slate-200 dark:border-gov-border text-xs flex items-center gap-2';
    }
    if (avgTextEl) {
      avgTextEl.className = 'font-semibold text-slate-500 dark:text-slate-400';
      avgTextEl.textContent = 'Insira as 3 notas para apuramento da média regulamentar';
    }
    if (avgIconBox) {
      avgIconBox.className = 'w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center text-base shrink-0';
    }
    return null;
  }

  // Média ponderada oficial simples
  const average = ((valPort + valMath + valScience) / 3);
  const formattedAverage = average.toFixed(1);

  if (avgValueEl) avgValueEl.textContent = formattedAverage;

  // Critério Oficial: Média >= 10.0 valores é Admitido
  const isAdmitted = average >= 10.0;

  if (isAdmitted) {
    if (avgBadgeEl) {
      avgBadgeEl.className = 'px-3 py-1.5 rounded-lg bg-gov-emerald/15 text-gov-emerald border border-gov-emerald/30 text-xs flex items-center gap-2 font-bold';
    }
    if (avgTextEl) {
      avgTextEl.className = 'font-bold text-gov-emerald';
      avgTextEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Parecer Regulamentar: HOMOLOGADO (Média ${formattedAverage} &ge; 10.0 valores)`;
    }
    if (avgIconBox) {
      avgIconBox.className = 'w-10 h-10 rounded-lg bg-gov-emerald/20 text-gov-emerald flex items-center justify-center text-base shrink-0';
    }
  } else {
    if (avgBadgeEl) {
      avgBadgeEl.className = 'px-3 py-1.5 rounded-lg bg-gov-rose/15 text-gov-rose border border-gov-rose/30 text-xs flex items-center gap-2 font-bold';
    }
    if (avgTextEl) {
      avgTextEl.className = 'font-bold text-gov-rose';
      avgTextEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Parecer Regulamentar: NÃO APTO (Média ${formattedAverage} &lt; 10.0 valores)`;
    }
    if (avgIconBox) {
      avgIconBox.className = 'w-10 h-10 rounded-lg bg-gov-rose/20 text-gov-rose flex items-center justify-center text-base shrink-0';
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
// 5. ESTEIRA DE PROGRESSO (STEPPER EM 4 ETAPAS)
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
          Toast.show('Consultar Inscrição', 'Digite o número do protocolo para acompanhar o processo.', 'info');
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
      circle.className = 'stepper-circle w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs bg-gov-emerald text-white shadow-sm z-10 transition-all';
      circle.innerHTML = '<i class="fa-solid fa-check"></i>';
      if (label) label.className = 'stepper-label text-[11px] font-semibold mt-2 text-gov-emerald hidden sm:block';
    } else if (step === stepNumber) {
      circle.className = 'stepper-circle w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs bg-accent text-white shadow-sm z-10 transition-all ring-2 ring-accent/30';
      circle.innerHTML = `<span>${step}</span>`;
      if (label) label.className = 'stepper-label text-[11px] font-bold mt-2 text-accent hidden sm:block';
    } else {
      circle.className = 'stepper-circle w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs bg-slate-200 dark:bg-gov-surface text-slate-500 dark:text-slate-400 z-10 transition-all';
      circle.innerHTML = `<span>${step}</span>`;
      if (label) label.className = 'stepper-label text-[11px] font-medium mt-2 text-slate-500 dark:text-slate-400 hidden sm:block';
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
// 6. VALIDAÇÃO RIGOROSA DE CAMPOS POR ETAPA
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
      errorMsg = 'Por favor, indique o número oficial do Bilhete de Identidade ou Cédula/Assento.';
      highlightField('input-document-id');
    } else if (!birthDate) {
      isValid = false;
      errorMsg = 'Por favor, selecione a data de nascimento do aluno.';
      highlightField('input-birthdate');
    } else if (!guardianName || guardianName.split(' ').length < 2) {
      isValid = false;
      errorMsg = 'Por favor, indique o nome completo do Encarregado de Educação.';
      highlightField('input-guardian-name');
    } else if (!guardianPhone || guardianPhone.length < 9) {
      isValid = false;
      errorMsg = 'Por favor, informe um número de telefone válido do Encarregado de Educação.';
      highlightField('input-guardian-phone');
    } else if (!province || !city) {
      isValid = false;
      errorMsg = 'Por favor, indique a Província e Município de residência.';
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
      errorMsg = 'Por favor, selecione a classe ou curso pretendido.';
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
      errorMsg = 'Por favor, informe uma nota válida de Ciências (entre 0 e 20 valores).';
      highlightField('input-grade-science');
    }
  } else if (step === 3) {
    const hasBi = SSNA_STATE.uploadedFiles.bi;
    const hasCert = SSNA_STATE.uploadedFiles.certificate;
    const hasPhoto = SSNA_STATE.uploadedFiles.photo;

    if (!hasBi || !hasCert || !hasPhoto) {
      isValid = false;
      errorMsg = 'É obrigatório anexar os 3 ficheiros solicitados (BI/Cédula, Certificado de Notas e Foto Passe).';
    }
  }

  if (!isValid) {
    Toast.show('Dados Obrigatórios', errorMsg, 'warning');
  }

  return isValid;
}

function highlightField(fieldId) {
  const el = document.getElementById(fieldId);
  if (el) {
    el.classList.add('border-gov-rose', 'ring-2', 'ring-rose-500/20');
    el.focus();
    setTimeout(() => {
      el.classList.remove('border-gov-rose', 'ring-2', 'ring-rose-500/20');
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
        p.classList.remove('bg-accent', 'text-white', 'shadow-sm');
        p.classList.add('bg-slate-100', 'dark:bg-gov-surface', 'text-slate-700', 'dark:text-slate-300');
      });
      pill.classList.add('bg-accent', 'text-white', 'shadow-sm');
      pill.classList.remove('bg-slate-100', 'dark:bg-gov-surface', 'text-slate-700', 'dark:text-slate-300');

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
        c.classList.remove('border-2', 'border-accent', 'bg-accent/5', 'dark:bg-accent/10');
        c.classList.add('border', 'border-slate-200', 'dark:border-gov-border', 'bg-slate-50/50', 'dark:bg-gov-navy/50');
        const checkIcon = c.querySelector('.check-indicator');
        if (checkIcon) checkIcon.classList.add('hidden');
      });
      card.classList.remove('border', 'border-slate-200', 'dark:border-gov-border', 'bg-slate-50/50', 'dark:bg-gov-navy/50');
      card.classList.add('border-2', 'border-accent', 'bg-accent/5', 'dark:bg-accent/10');
      const checkIcon = card.querySelector('.check-indicator');
      if (checkIcon) checkIcon.classList.remove('hidden');
    });
  });

  // Preenchimento de Exemplo Oficial Demonstrativo
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

      // Notas demonstrativas com aprovação (Média 15.0 >= 10.0)
      document.getElementById('input-grade-portuguese').value = "15";
      document.getElementById('input-grade-math').value = "16";
      document.getElementById('input-grade-science').value = "14";
      calculateAverageAndVerdict();

      const techCard = document.querySelector('.course-option-card[data-course-id="info"]');
      if (techCard) {
        techCard.click();
      }

      loadMockUploadedFiles();
      Toast.show('Dados Preenchidos', 'Formulário preenchido com dados oficiais demonstrativos (Média 15.0 valores).', 'success');
    });
  }
}

// ----------------------------------------------------------------------------
// 8. GESTÃO E UPLOAD DE DOCUMENTOS ESCOLARES (PASSO 3)
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
      if (e.target.closest('.btn-remove-file') || e.target.closest('.btn-preview-doc-modal')) return;
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

    input.addEventListener('change', () => {
      if (input.files && input.files.length > 0) {
        handleFileUpload(key, input.files[0], zone, preview);
      }
    });
  });

  const btnMockDocs = document.getElementById('btn-load-mock-docs');
  if (btnMockDocs) {
    btnMockDocs.addEventListener('click', () => {
      loadMockUploadedFiles();
      Toast.show('Ficheiros Registados', 'Documentos escolares anexados em conformidade com o regulamento.', 'success');
    });
  }

  // Visualizadores de Documentos em Modal
  document.querySelectorAll('.btn-preview-doc-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const docKey = btn.getAttribute('data-doc-key');
      openDocPreview(docKey);
    });
  });
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
    type: file.type || 'application/pdf',
    previewUrl: previewUrl,
    status: 'Homologado'
  };

  renderFilePreview(key, zoneEl, previewEl);
  Toast.show('Ficheiro Recebido', `${fileName} (${fileSizeText}) anexado com sucesso.`, 'success', 2500);
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
  const viewBtn = previewEl.querySelector('.btn-preview-doc-modal');

  if (nameEl) nameEl.textContent = fileData.name;
  if (sizeEl) sizeEl.textContent = fileData.size;

  if (iconContainer) {
    if (fileData.previewUrl) {
      iconContainer.innerHTML = `<img src="${fileData.previewUrl}" class="w-10 h-10 object-cover rounded-lg border border-slate-300 dark:border-slate-600" alt="Prévia">`;
    } else {
      iconContainer.innerHTML = `<div class="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center text-lg"><i class="fa-solid fa-file-pdf"></i></div>`;
    }
  }

  if (viewBtn) {
    viewBtn.onclick = (e) => {
      e.stopPropagation();
      openDocPreview(key);
    };
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
  const mockBi = { name: "BI_Aluno_e_Encarregado.pdf", size: "1.4 MB", type: "application/pdf", previewUrl: null, status: "Homologado" };
  const mockCert = { name: "Certificado_Notas_Classe_Anterior.pdf", size: "2.8 MB", type: "application/pdf", previewUrl: null, status: "Homologado" };
  const mockPhoto = {
    name: "Foto_Aluno_Passe.jpg",
    size: "640 KB",
    type: "image/jpeg",
    previewUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
    status: "Homologado"
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
// 9. RESUMO E PARECER REGULAMENTAR (PASSO 4)
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

  const selectedCampus = document.getElementById('select-campus') ? document.getElementById('select-campus').value : "Sede Central";

  document.getElementById('summary-fullname').textContent = fullName;
  document.getElementById('summary-document-id').textContent = `${documentType}: ${documentId}`;
  document.getElementById('summary-birthdate').textContent = birthDate ? formatDateBR(birthDate) : "Não informado";
  document.getElementById('summary-guardian').textContent = `${guardianName} (${guardianKinship})`;
  document.getElementById('summary-phone').textContent = guardianPhone;
  document.getElementById('summary-location').textContent = `${city}, ${province}`;

  document.getElementById('summary-course').textContent = courseTitle;
  document.getElementById('summary-cycle').textContent = cycleCategory || "2º Ciclo do Ensino Secundário";
  document.getElementById('summary-shift').textContent = `Turno da ${shiftTitle}`;
  document.getElementById('summary-modality').textContent = modalityTitle;
  document.getElementById('summary-campus').textContent = selectedCampus;

  // Notas e Média no Resumo
  const valPort = parseFloat(document.getElementById('input-grade-portuguese')?.value) || 0;
  const valMath = parseFloat(document.getElementById('input-grade-math')?.value) || 0;
  const valScience = parseFloat(document.getElementById('input-grade-science')?.value) || 0;
  const calculatedAvg = ((valPort + valMath + valScience) / 3);
  const formattedAvg = calculatedAvg.toFixed(1);

  document.getElementById('summary-grade-portuguese').textContent = `${valPort.toFixed(1)}`;
  document.getElementById('summary-grade-math').textContent = `${valMath.toFixed(1)}`;
  document.getElementById('summary-grade-science').textContent = `${valScience.toFixed(1)}`;
  document.getElementById('summary-average-value').textContent = `${formattedAvg}`;

  const verdictBadge = document.getElementById('summary-system-verdict-badge');
  const verdictDesc = document.getElementById('summary-system-verdict-desc');

  if (calculatedAvg >= 10.0) {
    if (verdictBadge) {
      verdictBadge.className = 'px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 bg-gov-emerald/15 text-gov-emerald border border-gov-emerald/30 uppercase tracking-wider';
      verdictBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Homologado pelo Critério Oficial';
    }
    if (verdictDesc) {
      verdictDesc.innerHTML = `<span class="text-gov-emerald font-bold">Média curricular de ${formattedAvg} valores homologada.</span> O candidato preenche o critério regulamentar para admissão no ano lectivo 2025/2026.`;
    }
  } else {
    if (verdictBadge) {
      verdictBadge.className = 'px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 bg-gov-rose/15 text-gov-rose border border-gov-rose/30 uppercase tracking-wider';
      verdictBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Não Apto por Média de Corte';
    }
    if (verdictDesc) {
      verdictDesc.innerHTML = `<span class="text-gov-rose font-bold">Média curricular de ${formattedAvg} valores insuficiente.</span> A média mínima regulamentar para admissão é de 10.0 valores.`;
    }
  }

  const docList = document.getElementById('summary-docs-list');
  if (docList) {
    docList.innerHTML = `
      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-gov-surface/40 text-xs">
        <span class="flex items-center gap-2 text-slate-700 dark:text-slate-300"><i class="fa-solid fa-id-card text-accent"></i> BI / Cédula do Aluno</span>
        <span class="text-gov-emerald font-semibold flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> ${SSNA_STATE.uploadedFiles.bi ? SSNA_STATE.uploadedFiles.bi.name : 'Anexado'}</span>
      </div>
      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-gov-surface/40 text-xs">
        <span class="flex items-center gap-2 text-slate-700 dark:text-slate-300"><i class="fa-solid fa-file-invoice text-accent"></i> Certificado com Notas</span>
        <span class="text-gov-emerald font-semibold flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> ${SSNA_STATE.uploadedFiles.certificate ? SSNA_STATE.uploadedFiles.certificate.name : 'Anexado'}</span>
      </div>
      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-gov-surface/40 text-xs">
        <span class="flex items-center gap-2 text-slate-700 dark:text-slate-300"><i class="fa-solid fa-image text-accent"></i> Fotografia Tipo Passe</span>
        <span class="text-gov-emerald font-semibold flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> ${SSNA_STATE.uploadedFiles.photo ? SSNA_STATE.uploadedFiles.photo.name : 'Anexada'}</span>
      </div>
    `;
  }
}

// ----------------------------------------------------------------------------
// 10. FINALIZAÇÃO DA INSCRIÇÃO & SUBMISSÃO
// ----------------------------------------------------------------------------
function setupFormValidationAndSubmission() {
  const btnSubmit = document.getElementById('step-btn-submit');
  if (!btnSubmit) return;

  btnSubmit.addEventListener('click', () => {
    const termsAccept = document.getElementById('terms-accept');
    if (termsAccept && !termsAccept.checked) {
      Toast.show(
        'Termo Obrigatório',
        'O Encarregado de Educação deve declarar sob compromisso de honra a autenticidade das notas.',
        'warning'
      );
      termsAccept.focus();
      return;
    }

    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `
      <i class="fa-solid fa-circle-notch fa-spin"></i>
      <span>A registar no Livro de Matrículas...</span>
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
      const selectedCampus = document.getElementById('select-campus') ? document.getElementById('select-campus').value : "Sede Central";

      // Cálculo de Média e Parecer
      const valPort = parseFloat(document.getElementById('input-grade-portuguese')?.value) || 0;
      const valMath = parseFloat(document.getElementById('input-grade-math')?.value) || 0;
      const valScience = parseFloat(document.getElementById('input-grade-science')?.value) || 0;
      const calculatedAverage = parseFloat(((valPort + valMath + valScience) / 3).toFixed(1));

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
          bi: SSNA_STATE.uploadedFiles.bi || { name: "BI_Aluno_Oficial.pdf", size: "1.4 MB", status: isAdmitted ? "Homologado" : "Em Conferência" },
          certificate: SSNA_STATE.uploadedFiles.certificate || { name: "Certificado_Notas_Oficial.pdf", size: "2.1 MB", status: isAdmitted ? "Homologado" : "Em Conferência" },
          photo: SSNA_STATE.uploadedFiles.photo || { name: "Foto_Passe_Oficial.jpg", size: "650 KB", status: "Homologado" }
        },
        documentsStatus: isAdmitted ? "Aprovados" : "Pendentes",
        rejectionReason: isAdmitted ? "" : `Média curricular de ${calculatedAverage} valores inferior ao mínimo regulamentar de 10.0 valores.`,
        examGrade: calculatedAverage,
        status: automaticStatus,
        submissionDate: formattedDate,
        examRoom: isAdmitted ? "Dispensado / Vaga Assegurada" : "Critério Não Atingido",
        examDate: isAdmitted ? "Matrícula Direta" : "Encerrado",
        notes: isAdmitted
          ? `Parecer favorável da Secretaria Pedagógica: Média curricular de ${calculatedAverage} valores cumpre o critério oficial (≥ 10.0 valores).`
          : `Não admitido por não atingir a nota mínima regulamentar de 10.0 valores (Média apurada: ${calculatedAverage} valores).`
      };

      StorageManager.addCandidate(newCandidate);
      StorageManager.setCurrentCandidateId(newCandidateId);
      SSNA_STATE.currentCandidateId = newCandidateId;

      if (isAdmitted) {
        Toast.show(
          'Inscrição Homologada',
          `Protocolo nº ${newCandidateId}. Vaga confirmada por média curricular de ${calculatedAverage} valores.`,
          'success',
          6000
        );
      } else {
        Toast.show(
          'Inscrição Registada',
          `Protocolo nº ${newCandidateId}. Média apurada em ${calculatedAverage} valores (inferior a 10.0 valores).`,
          'error',
          6000
        );
      }

      btnSubmit.disabled = false;
      btnSubmit.innerHTML = `<i class="fa-solid fa-check"></i><span>Submeter e Concluir Inscrição</span>`;

      showCandidateDashboard(newCandidateId);
    }, 900);
  });
}

// ----------------------------------------------------------------------------
// 11. DASHBOARD DO CANDIDATO
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
  if (courseEl) courseEl.textContent = `${candidate.course} • Turno da ${candidate.shift}`;
  if (dateEl) dateEl.textContent = `Inscrição registada em: ${candidate.submissionDate}`;

  const statusBadge = document.getElementById('dash-status-badge');
  const statusTitle = document.getElementById('dash-status-title');
  const statusDesc = document.getElementById('dash-status-desc');

  const { badgeClass, title, desc, icon } = getStatusDisplayInfo(candidate.status, candidate.documentsStatus, candidate.rejectionReason, candidate.grades?.average || candidate.examGrade);

  if (statusBadge) {
    statusBadge.className = `px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider ${badgeClass}`;
    statusBadge.innerHTML = `<i id="dash-status-icon" class="${icon}"></i> ${candidate.status}`;
  }
  if (statusTitle) statusTitle.textContent = title;
  if (statusDesc) statusDesc.textContent = desc;

  // Notas e Média
  const pGrade = candidate.grades?.portuguese !== undefined ? candidate.grades.portuguese.toFixed(1) : '--';
  const mGrade = candidate.grades?.math !== undefined ? candidate.grades.math.toFixed(1) : '--';
  const sGrade = candidate.grades?.science !== undefined ? candidate.grades.science.toFixed(1) : '--';
  const avgGrade = (candidate.grades?.average ?? candidate.examGrade) !== undefined && (candidate.grades?.average ?? candidate.examGrade) !== null
    ? Number(candidate.grades?.average ?? candidate.examGrade).toFixed(1)
    : '--';

  document.getElementById('dash-grade-portuguese').textContent = pGrade;
  document.getElementById('dash-grade-math').textContent = mGrade;
  document.getElementById('dash-grade-science').textContent = sGrade;
  document.getElementById('dash-student-average').textContent = avgGrade;

  // Badge do Veredito no Dashboard
  const dashSystemVerdictBadge = document.getElementById('dash-system-verdict-badge');
  const dashSystemDecision = document.getElementById('dash-system-decision');
  const dashExplanation = document.getElementById('dash-verdict-explanation');

  const isAvgPass = typeof avgGrade === 'string' ? parseFloat(avgGrade) >= 10.0 : avgGrade >= 10.0;

  if (dashSystemVerdictBadge && dashSystemDecision) {
    if (candidate.status === 'Admitido' || isAvgPass) {
      dashSystemVerdictBadge.className = 'px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto bg-gov-emerald/15 text-gov-emerald border border-gov-emerald/30 uppercase tracking-wider';
      dashSystemDecision.textContent = 'Parecer: Admitido (Média ≥ 10.0)';
      if (dashExplanation) {
        dashExplanation.innerHTML = `<strong>Apuramento Oficial:</strong> Com média de <strong>${avgGrade} valores</strong>, o aluno cumpriu o critério regulamentar do Ministério da Educação. Vaga confirmada.`;
      }
    } else {
      dashSystemVerdictBadge.className = 'px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto bg-gov-rose/15 text-gov-rose border border-gov-rose/30 uppercase tracking-wider';
      dashSystemDecision.textContent = 'Parecer: Não Apto (Média < 10.0)';
      if (dashExplanation) {
        dashExplanation.innerHTML = `<strong>Apuramento Oficial:</strong> A média calculada de <strong>${avgGrade} valores</strong> é inferior ao mínimo regulamentar de 10.0 valores para o presente ano lectivo.`;
      }
    }
  }

  document.getElementById('dash-detail-modality').textContent = candidate.modality;
  document.getElementById('dash-detail-campus').textContent = candidate.cycle || '2º Ciclo do Ensino Secundário';
  document.getElementById('dash-detail-docs-status').textContent = candidate.documentsStatus;
  
  const gradeEl = document.getElementById('dash-detail-grade');
  if (gradeEl) {
    if (avgGrade !== '--') {
      gradeEl.textContent = `${avgGrade} / 20.0 valores`;
      gradeEl.className = Number(avgGrade) >= 10 ? 'font-bold text-gov-emerald' : 'font-bold text-gov-rose';
    } else {
      gradeEl.textContent = 'Não lançada';
      gradeEl.className = 'font-semibold text-slate-400';
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

  const btnChecklist = document.getElementById('btn-dash-checklist');
  if (btnChecklist) {
    btnChecklist.onclick = () => {
      const modal = document.getElementById('modal-checklist');
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    };
  }
}

function getStatusDisplayInfo(status, docsStatus, rejectionReason) {
  if (status === 'Admitido') {
    return {
      badgeClass: 'bg-gov-emerald/15 text-gov-emerald border border-gov-emerald/30',
      title: 'Candidatura Homologada • Vaga Confirmada',
      desc: 'O processo foi validado favoravelmente pela Secretaria Pedagógica. Compareça no balcão da escola munido da pasta com os documentos físicos para confirmação definitiva da matrícula.',
      icon: 'fa-solid fa-circle-check'
    };
  } else if (status === 'Não Admitido') {
    return {
      badgeClass: 'bg-gov-rose/15 text-gov-rose border border-gov-rose/30',
      title: 'Candidatura Não Admitida (Média de Corte)',
      desc: rejectionReason || 'A média curricular apurada não atingiu o limite mínimo de 10.0 valores estabelecido no regulamento de admissões.',
      icon: 'fa-solid fa-circle-xmark'
    };
  } else if (status === 'Convocado para Prova') {
    return {
      badgeClass: 'bg-accent/15 text-accent border border-accent/30',
      title: 'Convocatória para Prova Diagnóstica / Seleção',
      desc: 'O processo documental foi validado. O aluno deve comparecer no dia e sala indicados munido de documento de identidade original e este comprovativo.',
      icon: 'fa-solid fa-calendar-check'
    };
  } else {
    if (docsStatus === 'Reprovados') {
      return {
        badgeClass: 'bg-gov-amber/15 text-gov-amber border border-gov-amber/30',
        title: 'Documentação Pendente de Regularização',
        desc: rejectionReason ? `Notificação da Secretaria: ${rejectionReason}` : 'Um ou mais documentos anexados não estão em conformidade com as diretrizes do Ministério da Educação.',
        icon: 'fa-solid fa-triangle-exclamation'
      };
    }
    return {
      badgeClass: 'bg-gov-amber/15 text-gov-amber border border-gov-amber/30',
      title: 'Processo Escolar em Conferência Documental',
      desc: 'Os documentos escolares e os dados declarados pelo encarregado foram recebidos e encontram-se em conferência pela Secretaria Pedagógica.',
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
    setTimelineItemState(tStep2, 'done', 'Documentação Homologada');
  } else if (candidate.documentsStatus === 'Reprovados') {
    setTimelineItemState(tStep2, 'error', 'Pendente de Regularização');
  } else {
    setTimelineItemState(tStep2, 'current', 'Em conferência pela Secretaria');
  }

  const avg = candidate.grades?.average ?? candidate.examGrade;

  if (candidate.status === 'Admitido') {
    setTimelineItemState(tStep3, 'done', `Média Aprovada: ${avg} valores`);
    setTimelineItemState(tStep4, 'done', 'Pauta Publicada: Admitido');
    setTimelineItemState(tStep5, 'current', 'Período de Matrícula Presencial Aberto');
  } else if (candidate.status === 'Não Admitido') {
    setTimelineItemState(tStep3, 'error', `Média Insuficiente: ${avg} valores`);
    setTimelineItemState(tStep4, 'error', 'Pauta Publicada: Não Admitido');
    setTimelineItemState(tStep5, 'future', 'Processo Encerrado');
  } else if (candidate.status === 'Convocado para Prova') {
    setTimelineItemState(tStep3, 'current', `Exame: ${candidate.examDate} (${candidate.examRoom})`);
    setTimelineItemState(tStep4, 'future', 'Divulgação de Pautas: 28 de Outubro');
    setTimelineItemState(tStep5, 'future', 'Matrículas de 01 a 10 de Novembro');
  } else {
    setTimelineItemState(tStep3, 'future', 'Aguardando conferência documental');
    setTimelineItemState(tStep4, 'future', 'Divulgação de Pautas: 28 de Outubro');
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
      icon.className = 'timeline-icon w-7 h-7 rounded-full bg-gov-emerald text-white flex items-center justify-center text-xs font-bold shadow-sm z-10 shrink-0';
      icon.innerHTML = '<i class="fa-solid fa-check"></i>';
    }
  } else if (state === 'current') {
    if (icon) {
      icon.className = 'timeline-icon w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold shadow-sm z-10 shrink-0 ring-2 ring-accent/30';
      icon.innerHTML = '<i class="fa-solid fa-hourglass-half"></i>';
    }
  } else if (state === 'error') {
    if (icon) {
      icon.className = 'timeline-icon w-7 h-7 rounded-full bg-gov-rose text-white flex items-center justify-center text-xs font-bold shadow-sm z-10 shrink-0';
      icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
  } else {
    if (icon) {
      icon.className = 'timeline-icon w-7 h-7 rounded-full bg-slate-200 dark:bg-gov-surface text-slate-400 flex items-center justify-center text-xs font-bold z-10 shrink-0';
      icon.innerHTML = '<i class="fa-regular fa-circle"></i>';
    }
  }
}

// ----------------------------------------------------------------------------
// 12. PAINEL ADMINISTRATIVO DA SECRETARIA PEDAGÓGICA COM FILTROS & EXPORTAÇÃO
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

  const filterShift = document.getElementById('admin-filter-shift');
  if (filterShift) {
    filterShift.addEventListener('change', (e) => {
      SSNA_STATE.activeFilterShift = e.target.value;
      renderAdminTable();
    });
  }

  // Abas Rápidas de Status na Secretaria
  const statusTabs = document.querySelectorAll('.admin-tab-btn');
  statusTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const statusFilter = tab.getAttribute('data-status-filter');
      SSNA_STATE.activeFilterStatus = statusFilter;

      statusTabs.forEach(t => {
        t.classList.remove('active', 'border-accent', 'text-accent');
        t.classList.add('border-transparent', 'text-slate-500');
      });
      tab.classList.add('active', 'border-accent', 'text-accent');
      tab.classList.remove('border-transparent', 'text-slate-500');

      renderAdminTable();
    });
  });

  // Botão Exportar Pauta Oficial em CSV
  const btnExportCSV = document.getElementById('btn-admin-export-csv');
  if (btnExportCSV) {
    btnExportCSV.addEventListener('click', exportPautaToCSV);
  }

  // Botão Imprimir Pauta Oficial em PDF / Papel
  const btnPrintPauta = document.getElementById('btn-admin-print-pauta');
  if (btnPrintPauta) {
    btnPrintPauta.addEventListener('click', openPautaPrintModal);
  }

  const btnResetData = document.getElementById('btn-admin-reset-data');
  if (btnResetData) {
    btnResetData.addEventListener('click', () => {
      if (confirm('Deseja restabelecer a base de dados oficial demonstrativa?')) {
        StorageManager.resetToDefault();
        refreshAdminData();
        Toast.show('Dados Restaurados', 'Base de dados de candidaturas restabelecida.', 'info');
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
        { cycle: "2º Ciclo Geral (Liceu / PUNIV)", course: "10ª Classe - Ciências Físicas e Biológicas" },
        { cycle: "2º Ciclo Técnico-Profissional", course: "10ª Classe - Técnico de Informática (Sistemas & Redes)" },
        { cycle: "2º Ciclo Técnico-Profissional", course: "10ª Classe - Contabilidade e Gestão Empresarial" }
      ];
      
      const randomName = testNames[Math.floor(Math.random() * testNames.length)];
      const randomOpt = testOptions[Math.floor(Math.random() * testOptions.length)];

      const p = parseFloat((9 + Math.random() * 9).toFixed(1));
      const m = parseFloat((8 + Math.random() * 10).toFixed(1));
      const s = parseFloat((9 + Math.random() * 9).toFixed(1));
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
        gender: "Masculino",
        address: { province: "Luanda", city: "Talatona", street: "Rua Direita do Patriota" },
        cycle: randomOpt.cycle,
        gradeApplied: randomOpt.course.split(' - ')[0],
        course: randomOpt.course,
        shift: Math.random() > 0.5 ? "Manhã" : "Tarde",
        modality: "Exame de Admissão",
        campus: "Sede Central - Complexo Escolar nº 1245",
        grades: {
          portuguese: p,
          math: m,
          science: s,
          average: avg
        },
        systemVerdict: isAutoAdmitted ? "Admitido" : "Não Admitido",
        documents: {
          bi: { name: "BI_Aluno_Original.pdf", size: "1.2 MB", status: isAutoAdmitted ? "Homologado" : "Em Conferência" },
          certificate: { name: "Certificado_Classe_Anterior.pdf", size: "2.5 MB", status: isAutoAdmitted ? "Homologado" : "Em Conferência" },
          photo: { name: "Foto_3x4.jpg", size: "700 KB", status: "Homologado" }
        },
        documentsStatus: isAutoAdmitted ? "Aprovados" : "Pendentes",
        rejectionReason: isAutoAdmitted ? "" : `Média curricular de ${avg} valores insuficiente.`,
        examGrade: avg,
        status: isAutoAdmitted ? "Admitido" : "Não Admitido",
        submissionDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        examRoom: isAutoAdmitted ? "Vaga Confirmada" : "Não Apto",
        examDate: isAutoAdmitted ? "Matrícula Direta" : "Encerrado",
        notes: isAutoAdmitted
          ? `Parecer favorável: Média curricular de ${avg} valores (≥ 10.0 valores).`
          : `Não admitido: Média de ${avg} valores (< 10.0 valores).`
      };

      StorageManager.addCandidate(candidate);
      refreshAdminData();
      Toast.show('Aluno Registado', `${randomName} (${candidate.id}) - Média ${avg} (${candidate.status})`, 'success');
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
  const convidados = candidates.filter(c => c.status === 'Convocado para Prova').length;
  const rejeitados = candidates.filter(c => c.status === 'Não Admitido').length;

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

  // Contadores nas abas de status
  const cAll = document.getElementById('tab-count-all');
  const cAdm = document.getElementById('tab-count-admitido');
  const cPen = document.getElementById('tab-count-pendentes');
  const cCon = document.getElementById('tab-count-convocado');
  const cRej = document.getElementById('tab-count-rejeitado');

  if (cAll) cAll.textContent = total;
  if (cAdm) cAdm.textContent = approved;
  if (cPen) cPen.textContent = pendingDocs;
  if (cCon) cCon.textContent = convidados;
  if (cRej) cRej.textContent = rejeitados;
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

    const matchesShift = SSNA_STATE.activeFilterShift === 'all' ||
      c.shift === SSNA_STATE.activeFilterShift;

    const matchesStatus = SSNA_STATE.activeFilterStatus === 'all' ||
      (SSNA_STATE.activeFilterStatus === 'Pendentes' && (c.status === 'Em Análise' || c.documentsStatus === 'Pendentes')) ||
      c.status === SSNA_STATE.activeFilterStatus;

    return matchesQuery && matchesCourse && matchesShift && matchesStatus;
  });

  if (countEl) {
    countEl.textContent = `Exibindo ${filtered.length} de ${candidates.length} alunos inscritos`;
  }

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-10 text-slate-500 dark:text-slate-400">
          <i class="fa-solid fa-folder-open text-3xl mb-2 text-slate-300 dark:text-slate-600 block"></i>
          <p class="font-bold text-sm text-slate-800 dark:text-slate-200">Nenhum processo localizado</p>
          <p class="text-xs mt-0.5">Ajuste os filtros ou o termo de pesquisa da Secretaria.</p>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(c => {
    let statusBadgeClass = 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    let statusIcon = 'fa-regular fa-circle';

    if (c.status === 'Admitido') {
      statusBadgeClass = 'bg-gov-emerald/15 text-gov-emerald border border-gov-emerald/30';
      statusIcon = 'fa-solid fa-circle-check';
    } else if (c.status === 'Não Admitido') {
      statusBadgeClass = 'bg-gov-rose/15 text-gov-rose border border-gov-rose/30';
      statusIcon = 'fa-solid fa-circle-xmark';
    } else if (c.status === 'Convocado para Prova') {
      statusBadgeClass = 'bg-accent/15 text-accent border border-accent/30';
      statusIcon = 'fa-solid fa-calendar-check';
    } else {
      statusBadgeClass = 'bg-gov-amber/15 text-gov-amber border border-gov-amber/30';
      statusIcon = 'fa-solid fa-clock';
    }

    const avg = c.grades?.average ?? c.examGrade ?? null;
    const isAdmittedByAvg = avg !== null && avg >= 10.0;

    const averageDisplay = avg !== null
      ? `<span class="font-bold text-xs font-mono ${isAdmittedByAvg ? 'text-gov-emerald' : 'text-gov-rose'}">${Number(avg).toFixed(1)} / 20</span>`
      : '<span class="text-slate-400 text-xs italic">Pendente</span>';

    const systemVerdictDisplay = isAdmittedByAvg
      ? `<span class="inline-flex items-center gap-1 text-[11px] font-bold text-gov-emerald bg-gov-emerald/10 px-2 py-0.5 rounded border border-gov-emerald/20"><i class="fa-solid fa-circle-check"></i> Admitido</span>`
      : `<span class="inline-flex items-center gap-1 text-[11px] font-bold text-gov-rose bg-gov-rose/10 px-2 py-0.5 rounded border border-gov-rose/20"><i class="fa-solid fa-circle-xmark"></i> Não Apto</span>`;

    const initials = c.fullName.split(' ').map(n => n[0]).slice(0, 2).join('');

    return `
      <tr class="border-b border-slate-100 dark:border-gov-border/40 hover:bg-slate-50/80 dark:hover:bg-gov-surface/40 transition-colors">
        <td class="py-3 px-4 font-mono font-bold text-xs text-accent">
          ${c.id}
        </td>
        <td class="py-3 px-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center font-bold text-xs shrink-0">
              ${initials}
            </div>
            <div>
              <div class="font-bold text-xs text-slate-900 dark:text-white">${c.fullName}</div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400">
                ${c.guardianName || 'Encarregado'} • ${c.phone}
              </div>
            </div>
          </div>
        </td>
        <td class="py-3 px-4">
          <div class="font-semibold text-xs text-slate-800 dark:text-slate-200">${c.course}</div>
          <div class="text-[10px] text-slate-400">${c.cycle} • Turno ${c.shift}</div>
        </td>
        <td class="py-3 px-4">
          ${averageDisplay}
        </td>
        <td class="py-3 px-4">
          ${systemVerdictDisplay}
        </td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold ${statusBadgeClass}">
            <i class="${statusIcon}"></i>
            ${c.status}
          </span>
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button 
              onclick="openReviewModal('${c.id}')"
              class="px-2.5 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
              title="Analisar Processo"
            >
              <i class="fa-solid fa-pen-to-square"></i>
              <span>Analisar</span>
            </button>
            <button 
              onclick="openComprovativoModal('${c.id}')"
              class="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-gov-border bg-white dark:bg-gov-surface hover:bg-slate-100 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all"
              title="Ficha Oficial de Inscrição"
            >
              <i class="fa-solid fa-print"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ----------------------------------------------------------------------------
// 13. EXPORTAÇÃO DA PAUTA EM CSV/EXCEL & IMPRESSÃO MINISTERIAL
// ----------------------------------------------------------------------------
function exportPautaToCSV() {
  const candidates = StorageManager.getCandidates();
  if (!candidates || candidates.length === 0) {
    Toast.show('Pauta Vazia', 'Não existem candidaturas para exportar.', 'warning');
    return;
  }

  const headers = [
    "Nº Protocolo",
    "Nome Completo do Aluno",
    "Documento de Identificação",
    "Encarregado de Educação",
    "Contacto Telefónico",
    "Opção Curricular / Classe",
    "Turno",
    "Língua Portuguesa",
    "Matemática",
    "Ciências da Natureza",
    "Média Final",
    "Parecer Regulamentar",
    "Situação Administrativa"
  ];

  const rows = candidates.map(c => {
    const avg = c.grades?.average ?? c.examGrade ?? '';
    const verdict = Number(avg) >= 10.0 ? "Admitido" : "Não Admitido";

    return [
      `"${c.id}"`,
      `"${c.fullName.replace(/"/g, '""')}"`,
      `"${c.documentId}"`,
      `"${(c.guardianName || '').replace(/"/g, '""')}"`,
      `"${c.phone || ''}"`,
      `"${c.course.replace(/"/g, '""')}"`,
      `"${c.shift || 'Manhã'}"`,
      `"${c.grades?.portuguese ?? ''}"`,
      `"${c.grades?.math ?? ''}"`,
      `"${c.grades?.science ?? ''}"`,
      `"${avg}"`,
      `"${verdict}"`,
      `"${c.status}"`
    ].join(';');
  });

  // UTF-8 BOM (\uFEFF) para compatibilidade nativa com Excel
  const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Pauta_Admissoes_Secundario_2025_2026_${new Date().toISOString().substring(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  Toast.show('Pauta Exportada', 'Ficheiro CSV gerado com sucesso para arquivo e Excel.', 'success');
}

function openPautaPrintModal() {
  const candidates = StorageManager.getCandidates();
  const modal = document.getElementById('modal-pauta-print');
  const tableBody = document.getElementById('pauta-print-table-body');
  const dateEl = document.getElementById('pauta-print-date');

  if (!modal || !tableBody) return;

  const now = new Date();
  if (dateEl) {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    dateEl.textContent = `${now.getDate()} de ${meses[now.getMonth()]} de ${now.getFullYear()}`;
  }

  tableBody.innerHTML = candidates.map(c => {
    const p = c.grades?.portuguese !== undefined ? Number(c.grades.portuguese).toFixed(1) : '--';
    const m = c.grades?.math !== undefined ? Number(c.grades.math).toFixed(1) : '--';
    const s = c.grades?.science !== undefined ? Number(c.grades.science).toFixed(1) : '--';
    const avg = (c.grades?.average ?? c.examGrade) !== undefined && (c.grades?.average ?? c.examGrade) !== null
      ? Number(c.grades?.average ?? c.examGrade).toFixed(1)
      : '--';

    const isAdmitted = Number(avg) >= 10.0;

    return `
      <tr>
        <td class="p-1.5 border-r border-slate-300 font-mono font-bold">${c.id}</td>
        <td class="p-1.5 border-r border-slate-300 font-semibold">${c.fullName}</td>
        <td class="p-1.5 border-r border-slate-300">${c.course} (${c.shift})</td>
        <td class="p-1.5 border-r border-slate-300 text-center font-mono">${p}</td>
        <td class="p-1.5 border-r border-slate-300 text-center font-mono">${m}</td>
        <td class="p-1.5 border-r border-slate-300 text-center font-mono">${s}</td>
        <td class="p-1.5 border-r border-slate-300 text-center font-mono font-bold ${isAdmitted ? 'text-gov-emerald' : 'text-gov-rose'}">${avg}</td>
        <td class="p-1.5 text-center font-bold ${isAdmitted ? 'text-gov-emerald' : 'text-gov-rose'}">
          ${isAdmitted ? 'ADMITIDO' : 'NÃO ADMITIDO'}
        </td>
      </tr>
    `;
  }).join('');

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// ----------------------------------------------------------------------------
// 14. MODAL DE ANÁLISE DETALHADA DO CANDIDATO (SECRETARIA PEDAGÓGICA)
// ----------------------------------------------------------------------------
function openReviewModal(candidateId) {
  const candidate = StorageManager.getCandidateById(candidateId);
  if (!candidate) return;

  SSNA_STATE.modalReviewCandidateId = candidateId;
  const modal = document.getElementById('modal-review-candidate');
  if (!modal) return;

  document.getElementById('modal-rev-id').textContent = candidate.id;
  document.getElementById('modal-rev-fullname').textContent = candidate.fullName;
  document.getElementById('modal-rev-course').textContent = `${candidate.course} • Turno da ${candidate.shift}`;
  document.getElementById('modal-rev-email').textContent = candidate.guardianEmail || candidate.email;
  document.getElementById('modal-rev-phone').textContent = `${candidate.guardianName} (${candidate.phone})`;
  document.getElementById('modal-rev-bi').textContent = `${candidate.documentType}: ${candidate.documentId}`;
  document.getElementById('modal-rev-birth').textContent = formatDateBR(candidate.birthDate);
  document.getElementById('modal-rev-modality').textContent = candidate.modality;
  document.getElementById('modal-rev-campus').textContent = candidate.cycle || '2º Ciclo do Ensino Secundário';
  document.getElementById('modal-rev-address').textContent = `${candidate.address.street}, ${candidate.address.city} - ${candidate.address.province}`;

  // Notas e Média
  const pGrade = candidate.grades?.portuguese !== undefined ? Number(candidate.grades.portuguese).toFixed(1) : '--';
  const mGrade = candidate.grades?.math !== undefined ? Number(candidate.grades.math).toFixed(1) : '--';
  const sGrade = candidate.grades?.science !== undefined ? Number(candidate.grades.science).toFixed(1) : '--';
  const avgGrade = (candidate.grades?.average ?? candidate.examGrade) !== undefined && (candidate.grades?.average ?? candidate.examGrade) !== null
    ? Number(candidate.grades?.average ?? candidate.examGrade).toFixed(1)
    : '--';

  document.getElementById('modal-rev-grade-portuguese').textContent = pGrade !== '--' ? `${pGrade} / 20` : '--';
  document.getElementById('modal-rev-grade-math').textContent = mGrade !== '--' ? `${mGrade} / 20` : '--';
  document.getElementById('modal-rev-grade-science').textContent = sGrade !== '--' ? `${sGrade} / 20` : '--';
  document.getElementById('modal-rev-average-value').textContent = avgGrade !== '--' ? `${avgGrade} / 20` : '--';

  const isAvgPass = Number(avgGrade) >= 10.0;
  const modalVerdictBadge = document.getElementById('modal-rev-system-verdict-badge');
  const modalVerdictTitle = document.getElementById('modal-rev-system-verdict-title');
  const modalVerdictText = document.getElementById('modal-rev-system-verdict-text');

  if (modalVerdictBadge && modalVerdictTitle && modalVerdictText) {
    if (isAvgPass) {
      modalVerdictBadge.className = 'px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 bg-gov-emerald/15 text-gov-emerald border border-gov-emerald/30';
      modalVerdictTitle.textContent = 'Homologado pelo Sistema';
      modalVerdictText.className = 'text-gov-emerald font-bold';
      modalVerdictText.textContent = `Admitido (Média ${avgGrade} ≥ 10.0)`;
    } else {
      modalVerdictBadge.className = 'px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 bg-gov-rose/15 text-gov-rose border border-gov-rose/30';
      modalVerdictTitle.textContent = 'Não Apto pelo Sistema';
      modalVerdictText.className = 'text-gov-rose font-bold';
      modalVerdictText.textContent = `Não Admitido (Média ${avgGrade} < 10.0)`;
    }
  }

  // Ficheiros anexados
  document.getElementById('modal-rev-doc-bi-name').textContent = candidate.documents?.bi?.name || 'Documento_Identidade.pdf';
  document.getElementById('modal-rev-doc-bi-size').textContent = candidate.documents?.bi?.size || '1.2 MB';
  
  document.getElementById('modal-rev-doc-cert-name').textContent = candidate.documents?.certificate?.name || 'Certificado_Notas.pdf';
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
      docsStatusBadge.className = 'px-2.5 py-1 rounded text-xs font-bold bg-gov-emerald/15 text-gov-emerald border border-gov-emerald/30';
      docsStatusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Ficheiros Homologados';
    } else if (currentDocsStatus === 'Reprovados') {
      docsStatusBadge.className = 'px-2.5 py-1 rounded text-xs font-bold bg-gov-rose/15 text-gov-rose border border-gov-rose/30';
      docsStatusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Documentação Rejeitada';
    } else {
      docsStatusBadge.className = 'px-2.5 py-1 rounded text-xs font-bold bg-gov-amber/15 text-gov-amber border border-gov-amber/30';
      docsStatusBadge.innerHTML = '<i class="fa-solid fa-clock"></i> Em Conferência';
    }
  }

  const statusOptions = ['Admitido', 'Convocado para Prova', 'Em Análise', 'Não Admitido'];
  statusOptions.forEach(opt => {
    const btn = document.querySelector(`[data-status-choice="${opt}"]`);
    if (btn) {
      if (opt === currentStatus) {
        btn.classList.add('ring-2', 'ring-offset-2', 'ring-accent');
      } else {
        btn.classList.remove('ring-2', 'ring-offset-2', 'ring-accent');
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
// 15. VISUALIZADOR OFICIAL DE DOCUMENTOS ESCOLARES (MODAL)
// ----------------------------------------------------------------------------
function openDocPreview(docKey) {
  const modal = document.getElementById('modal-doc-preview');
  const canvas = document.getElementById('doc-preview-canvas');
  const titleEl = document.getElementById('doc-preview-modal-title');
  const subtitleEl = document.getElementById('doc-preview-modal-subtitle');
  const metaName = document.getElementById('doc-preview-meta-name');
  const metaSize = document.getElementById('doc-preview-meta-size');
  const metaType = document.getElementById('doc-preview-meta-type');
  const metaStatus = document.getElementById('doc-preview-meta-status');

  if (!modal || !canvas) return;

  let candidate = null;
  let docData = null;

  if (SSNA_STATE.modalReviewCandidateId) {
    candidate = StorageManager.getCandidateById(SSNA_STATE.modalReviewCandidateId);
    docData = candidate?.documents?.[docKey];
  } else {
    docData = SSNA_STATE.uploadedFiles[docKey];
    candidate = {
      fullName: document.getElementById('input-fullname')?.value || "Afonso Gabriel dos Santos",
      id: SSNA_STATE.currentCandidateId || "SEC-2025-0101",
      documentId: document.getElementById('input-document-id')?.value || "009418293LA046"
    };
  }

  const candidateName = candidate?.fullName || "Afonso Gabriel dos Santos";
  const candidateId = candidate?.id || "SEC-2025-XXXX";
  const docName = docData?.name || (docKey === 'bi' ? 'BI_Documento.pdf' : docKey === 'certificate' ? 'Certificado_Notas.pdf' : 'Foto_Passe.jpg');
  const docSize = docData?.size || '1.4 MB';

  if (titleEl) {
    titleEl.textContent = docKey === 'bi' ? 'Bilhete de Identidade / Cédula Oficial' : docKey === 'certificate' ? 'Certificado de Notas do Ciclo Anterior' : 'Fotografia Tipo Passe (3x4)';
  }
  if (subtitleEl) {
    subtitleEl.textContent = `Processo nº ${candidateId} • Candidato: ${candidateName}`;
  }

  if (metaName) metaName.textContent = docName;
  if (metaSize) metaSize.textContent = docSize;
  if (metaType) metaType.textContent = docKey === 'photo' ? 'JPEG' : 'PDF';
  if (metaStatus) {
    metaStatus.textContent = docData?.status || 'Conferido';
  }

  // Renderização visual autêntica do documento
  if (docKey === 'photo') {
    const photoUrl = docData?.previewUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=250&auto=format&fit=crop&q=80";
    canvas.innerHTML = `
      <div class="p-4 bg-white rounded-xl border border-slate-300 shadow-md text-slate-900 inline-block">
        <div class="w-40 h-52 overflow-hidden rounded border-2 border-slate-400 bg-slate-100 flex items-center justify-center">
          <img src="${photoUrl}" class="w-full h-full object-cover" alt="Fotografia do Aluno">
        </div>
        <div class="mt-2 text-center">
          <span class="text-[10px] font-bold tracking-wider uppercase block text-slate-700">Fotografia Tipo Passe 3x4</span>
          <span class="text-[9px] text-slate-500 font-mono">${candidateId}</span>
        </div>
      </div>
    `;
  } else if (docKey === 'bi') {
    canvas.innerHTML = `
      <div class="w-full max-w-md p-5 bg-gradient-to-r from-slate-100 to-white text-slate-900 rounded-xl border-2 border-slate-400 shadow-md space-y-3 text-left">
        <div class="flex items-center justify-between border-b pb-2 border-slate-300">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-widest text-slate-900 block">República de Angola</span>
            <span class="text-[9px] text-slate-600 block">Bilhete de Identidade de Cidadão Nacional</span>
          </div>
          <div class="w-7 h-7 rounded bg-accent/20 flex items-center justify-center text-accent text-xs">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3 text-xs items-center">
          <div class="w-20 h-24 rounded border border-slate-400 bg-slate-200 overflow-hidden flex items-center justify-center">
            <i class="fa-solid fa-user text-3xl text-slate-400"></i>
          </div>
          <div class="col-span-2 space-y-1">
            <div><span class="text-[10px] text-slate-500 block">Nome:</span><strong class="text-xs uppercase">${candidateName}</strong></div>
            <div><span class="text-[10px] text-slate-500 block">Número do BI:</span><span class="font-mono font-bold">${candidate?.documentId || '009418293LA046'}</span></div>
            <div><span class="text-[10px] text-slate-500 block">Nacionalidade:</span><span class="text-xs">Angolana</span></div>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-300 flex items-center justify-between text-[10px]">
          <span class="official-digital-stamp text-[9px]">Autenticado pela Secretaria</span>
          <span class="font-mono text-slate-500">${candidateId}</span>
        </div>
      </div>
    `;
  } else {
    // Certificado Escolar com Notas
    const p = candidate?.grades?.portuguese ?? 15.0;
    const m = candidate?.grades?.math ?? 16.0;
    const s = candidate?.grades?.science ?? 14.0;
    const avg = candidate?.grades?.average ?? 15.0;

    canvas.innerHTML = `
      <div class="w-full max-w-lg p-6 bg-white text-slate-900 rounded-xl border border-slate-400 shadow-md space-y-3 text-left">
        <div class="text-center border-b pb-2 border-slate-300 space-y-0.5">
          <span class="text-[10px] font-extrabold uppercase tracking-widest text-slate-900 block">República de Angola • Ministério da Educação</span>
          <span class="text-[9px] text-slate-600 block">Certificado Oficial de Habilitações com Notas Discriminadas</span>
        </div>
        <div class="text-xs leading-relaxed space-y-1">
          <p>Certifica-se que <strong>${candidateName}</strong> concluiu com aproveitamento o ciclo escolar anterior na instituição de origem com o seguinte boletim:</p>
          <table class="w-full text-xs border border-slate-300 my-2">
            <thead class="bg-slate-100 font-bold">
              <tr>
                <th class="p-1 border-r border-slate-300">Disciplina</th>
                <th class="p-1 text-center">Classificação</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t border-slate-200"><td class="p-1 border-r border-slate-200">Língua Portuguesa</td><td class="p-1 text-center font-mono font-bold">${p} val.</td></tr>
              <tr class="border-t border-slate-200"><td class="p-1 border-r border-slate-200">Matemática</td><td class="p-1 text-center font-mono font-bold">${m} val.</td></tr>
              <tr class="border-t border-slate-200"><td class="p-1 border-r border-slate-200">Ciências da Natureza / Física</td><td class="p-1 text-center font-mono font-bold">${s} val.</td></tr>
              <tr class="border-t-2 border-slate-400 bg-slate-50 font-bold"><td class="p-1 border-r border-slate-300">MÉDIA GLOBAL APURADA</td><td class="p-1 text-center font-mono text-accent text-sm">${avg} val.</td></tr>
            </tbody>
          </table>
        </div>
        <div class="pt-2 border-t border-slate-300 flex items-center justify-between text-[10px]">
          <span class="official-digital-stamp">Carimbo Oficial Homologado</span>
          <span class="text-slate-500">Direcção Municipal da Educação</span>
        </div>
      </div>
    `;
  }

  const btnDownload = document.getElementById('btn-download-doc');
  if (btnDownload) {
    btnDownload.onclick = () => {
      Toast.show('Ficheiro Descarregado', `O ficheiro "${docName}" foi descarregado para auditoria.`, 'success');
    };
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// ----------------------------------------------------------------------------
// 16. COMPROVATIVO OFICIAL DE INSCRIÇÃO & GUIA DUM / RUPE
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
  document.getElementById('comp-shift').textContent = `Turno da ${candidate.shift}`;
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
// 17. CONFIGURAÇÃO DE EVENTOS DE MODAIS
// ----------------------------------------------------------------------------
function setupModals() {
  const btnCloseReview = document.getElementById('btn-close-review-modal');
  if (btnCloseReview) btnCloseReview.addEventListener('click', closeReviewModal);

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
      Toast.show('Parecer Aplicado', `Situação do aluno atualizada para "${autoStatus}" com base na média (${avg} valores).`, 'success');
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
      Toast.show('Ficheiros Homologados', 'Processo documental aprovado pela Secretaria.', 'success');
    });
  }

  const btnRejectDocs = document.getElementById('btn-rev-reject-docs');
  if (btnRejectDocs) {
    btnRejectDocs.addEventListener('click', () => {
      const id = SSNA_STATE.modalReviewCandidateId;
      if (!id) return;

      const reason = document.getElementById('modal-rev-rejection-reason').value.trim();
      if (!reason) {
        Toast.show('Justificação Obrigatória', 'Descreva o motivo da rejeição documental para orientação do encarregado.', 'warning');
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
      Toast.show('Documentos Rejeitados', 'Despacho de não homologação registado.', 'error');
    });
  }

  const btnSaveGrade = document.getElementById('btn-rev-save-grade');
  if (btnSaveGrade) {
    btnSaveGrade.addEventListener('click', () => {
      const id = SSNA_STATE.modalReviewCandidateId;
      if (!id) return;

      const gradeVal = parseFloat(document.getElementById('modal-rev-grade-input').value);
      if (isNaN(gradeVal) || gradeVal < 0 || gradeVal > 20) {
        Toast.show('Nota Inválida', 'A nota da prova diagnóstica deve situar-se entre 0.0 e 20.0 valores.', 'warning');
        return;
      }

      const autoStatus = gradeVal >= 10 ? 'Admitido' : 'Não Admitido';

      StorageManager.updateCandidate(id, {
        examGrade: gradeVal,
        status: autoStatus
      });

      updateModalStatusButtons(autoStatus, 'Aprovados');
      refreshAdminData();
      Toast.show('Nota Lançada', `Nota ${gradeVal}/20.0 gravada no livro de exames. Situação alterada para ${autoStatus}.`, 'success');
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
      Toast.show('Deliberação Registada', `Situação alterada manualmente para "${chosenStatus}".`, 'info');
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
      Toast.show('Despacho Gravado', 'Anotações da Direcção Pedagógica arquivadas com sucesso.', 'success');
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

  const btnCloseDocPreview = document.getElementById('btn-close-doc-preview');
  if (btnCloseDocPreview) {
    btnCloseDocPreview.addEventListener('click', () => {
      const modal = document.getElementById('modal-doc-preview');
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
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
        Toast.show('Referência Copiada', `Referência ${refText} copiada para a área de transferência.`, 'success');
      }).catch(() => {
        Toast.show('Referência RUPE', refText, 'info');
      });
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeReviewModal();
      closeComprovativoModal();
      closeGuiaPagamentoModal();
      const modalDoc = document.getElementById('modal-doc-preview');
      if (modalDoc) modalDoc.classList.add('hidden');
      const modalChecklist = document.getElementById('modal-checklist');
      if (modalChecklist) modalChecklist.classList.add('hidden');
      const modalPauta = document.getElementById('modal-pauta-print');
      if (modalPauta) modalPauta.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeReviewModal();
      closeComprovativoModal();
      closeGuiaPagamentoModal();
      const modalDoc = document.getElementById('modal-doc-preview');
      if (modalDoc) modalDoc.classList.add('hidden');
      const modalChecklist = document.getElementById('modal-checklist');
      if (modalChecklist) modalChecklist.classList.add('hidden');
      const modalPauta = document.getElementById('modal-pauta-print');
      if (modalPauta) modalPauta.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}

// ----------------------------------------------------------------------------
// 18. UTILITÁRIOS
// ----------------------------------------------------------------------------
function formatDateBR(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
}
