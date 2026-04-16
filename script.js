// ==========================================================================
// 1. GESTÃO DE DADOS (Conteúdo aprofundado)
// ==========================================================================

// Dados das Cidades/Regiões da Rota do Café
const citiesData = [
  {
    name: "Londrina",
    description: "Antiga 'Capital Mundial do Café', foi o epicentro da expansão nas décadas de 50 e 60. Hoje, abriga o Museu Histórico que preserva toda a memória e a grandiosa infraestrutura da época de ouro.",
    tag: "A Capital Histórica"
  },
  {
    name: "Norte Pioneiro (Jacarezinho e Região)",
    description: "Após as crises climáticas, a região se reinventou. Hoje possui Indicação Geográfica (INPI) e produz Cafés Especiais 100% Arábica, famosos por sua doçura natural e notas frutadas.",
    tag: "Polo de Cafés Especiais"
  },
  {
    name: "Rolândia e Ribeirão Claro",
    description: "Misturam a rica herança da imigração com o ecoturismo. Oferecem aos visitantes passeios por antigas fazendas, trilhas ecológicas e degustações guiadas de cafés premiados.",
    tag: "Turismo de Experiência"
  }
];

// Dados do Acordeão (Fatos Históricos do Ouro Verde)
const faqData = [
  {
    question: "Como o 'Ouro Verde' transformou a geografia do Paraná?",
    answer: "Entre 1940 e 1970, o cultivo de café provocou uma explosão demográfica. A necessidade de escoar os grãos acelerou a construção de ferrovias e fundou dezenas de municípios que surgiram literalmente em meio aos cafezais, como Maringá e Londrina."
  },
  {
    question: "O que foi a trágica 'Geada Negra' de 1975?",
    answer: "Na madrugada de 18 de julho de 1975, uma onda de frio histórico congelou a seiva das plantas, queimando e dizimando praticamente 100% das lavouras comerciais do estado numa única noite. Esse evento mudou a história do Paraná, forçando a introdução de novas culturas, como a soja."
  },
  {
    question: "O Paraná ainda produz muito café atualmente?",
    answer: "O volume de produção diminuiu, mas a qualidade disparou! Produtores locais adotaram alta tecnologia e práticas de sustentabilidade, migrando da produção em massa para o mercado de excelência."
  }
];

// Dados do Acordeão (Curiosidades)
const faqData = [
  {
    question: "Por que 'Ouro Verde'?",
    answer: "O café recebeu este apelido devido à riqueza extrema que a planta verde e seus grãos trouxeram para a economia da região."
  },
  {
    question: "O que foi a 'Geada Negra' de 1975?",
    answer: "Um fenômeno climático severo que dizimou quase todas as plantações de café do Paraná em uma única noite, mudando a história da agricultura no estado."
  }
];

// Função para renderizar Cards de Cidades
function renderCities() {
  const container = document.getElementById('cities-grid');
  let htmlContent = '';

  citiesData.forEach(city => {
    htmlContent += `
      <article class="card">
        <h3>${city.name}</h3>
        <p><strong>${city.tag}</strong></p>
        <p>${city.description}</p>
      </article>
    `;
  });

  container.innerHTML = htmlContent;
}

// Função para renderizar Acordeões
function renderAccordions() {
  const container = document.getElementById('accordion-container');
  let htmlContent = '';

  faqData.forEach((faq, index) => {
    // Usando aria-expanded e aria-controls para acessibilidade
    htmlContent += `
      <div class="accordion-item">
        <button class="accordion-header" aria-expanded="false" aria-controls="content-${index}">
          ${faq.question}
          <span aria-hidden="true">+</span>
        </button>
        <div id="content-${index}" class="accordion-content">
          <p>${faq.answer}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = htmlContent;
  initAccordionLogic();
}

// ==========================================================================
// 2. LÓGICA DE COMPONENTES
// ==========================================================================

// Lógica do Acordeão
function initAccordionLogic() {
  const headers = document.querySelectorAll('.accordion-header');
  
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Fecha todos os outros abertos (Opcional, mas comum em acordeões)
      document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      // Abre o atual se não estava aberto
      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Lógica do Carrossel Simples
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.getElementById('carousel-next');
  const prevButton = document.getElementById('carousel-prev');
  
  let currentSlideIndex = 0;

  function updateCarousel() {
    const amountToMove = slides[currentSlideIndex].style.left || `${currentSlideIndex * -100}%`;
    track.style.transform = `translateX(${amountToMove})`;
  }

  nextButton.addEventListener('click', () => {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
      updateCarousel();
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      updateCarousel();
    }
  });
}

// ==========================================================================
// 3. ACESSIBILIDADE & ANIMAÇÕES
// ==========================================================================

// Controle de Tamanho de Fonte
let baseFontSize = 16;
const rootHtml = document.documentElement;

document.getElementById('btn-increase-font').addEventListener('click', () => {
  if (baseFontSize < 24) {
    baseFontSize += 2;
    rootHtml.style.fontSize = `${baseFontSize}px`;
  }
});

document.getElementById('btn-decrease-font').addEventListener('click', () => {
  if (baseFontSize > 12) {
    baseFontSize -= 2;
    rootHtml.style.fontSize = `${baseFontSize}px`;
  }
});

// Controle de Alto Contraste
document.getElementById('btn-contrast').addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
});

// Scroll Reveal usando Intersection Observer
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Descomente a linha abaixo se quiser que a animação aconteça apenas uma vez
        // observer.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.1 // Ativa quando 10% do elemento estiver visível
  });

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
}

// ==========================================================================
// 4. INICIALIZAÇÃO
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderCities();
  renderAccordions();
  initCarousel();
  initScrollReveal();
});
