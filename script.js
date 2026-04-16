// ==========================================================================
// 1. GESTÃO DE DADOS (Renderização Dinâmica)
// ==========================================================================

// Dados das Cidades
const citiesData = [
  {
    name: "Londrina",
    description: "Conhecida como a Capital do Café, foi o principal polo de desenvolvimento do grão na década de 1950.",
    tag: "Capital Histórica"
  },
  {
    name: "Jacarezinho",
    description: "Porta de entrada da Rota, destaca-se hoje pelos Cafés Especiais com certificações internacionais.",
    tag: "Cafés Especiais"
  },
  {
    name: "Ribeirão Claro",
    description: "Reúne história cafeeira com o ecoturismo às margens da represa de Chavantes.",
    tag: "Ecoturismo"
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
