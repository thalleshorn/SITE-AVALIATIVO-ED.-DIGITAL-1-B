// ==========================================================================
// 1. BANCO DE DADOS LOCAL
// ==========================================================================
const citiesData = [
  {
    name: "Londrina",
    tag: "Capital Histórica",
    description: "Conhecida como a 'Capital Mundial do Café' até os anos 70. O Museu Histórico de Londrina preserva fotos e equipamentos que contam como o café ergueu esta metrópole."
  },
  {
    name: "Norte Pioneiro",
    tag: "Cafés Especiais",
    description: "Região com Indicação Geográfica (IG). Focada em grãos 100% arábica com processos de pós-colheita sofisticados, resultando em cafés premiados mundialmente."
  },
  {
    name: "Ribeirão Claro",
    tag: "Turismo Rural",
    description: "Oferece experiências imersivas em fazendas centenárias, onde o visitante pode acompanhar desde o florescer do cafezal até a degustação final da bebida."
  }
];

const faqData = [
  {
    q: "O que foi o Ciclo do Ouro Verde?",
    a: "Foi o período de maior prosperidade econômica do Paraná (1940-1970), impulsionado pela exportação massiva de café, atraindo migrantes de todo o Brasil e do exterior."
  },
  {
    q: "O impacto da Geada Negra de 1975",
    a: "Um evento climático devastador que queimou todas as plantações do estado em uma noite. Isso causou a transição da agricultura para o plantio de soja e a busca por café de qualidade superior em vez de quantidade."
  }
];

// ==========================================================================
// 2. RENDERIZAÇÃO E COMPONENTES
// ==========================================================================

function initApp() {
  renderCities();
  renderAccordions();
  handleCarousel();
  handleA11y();
  initScrollReveal();
}

// Gera os cards de cidades dinamicamente
function renderCities() {
  const container = document.getElementById('cities-grid');
  container.innerHTML = citiesData.map(city => `
    <article class="card">
      <span style="color:var(--accent); font-weight:bold; font-size:0.8rem">${city.tag}</span>
      <h3 style="margin:10px 0">${city.name}</h3>
      <p>${city.description}</p>
    </article>
  `).join('');
}

// Gera o acordeão de história
function renderAccordions() {
  const container = document.getElementById('accordion-container');
  container.innerHTML = faqData.map((faq, i) => `
    <div class="accordion-item">
      <button class="accordion-header" aria-expanded="false" aria-controls="faq-${i}">
        ${faq.q} <span>+</span>
      </button>
      <div id="faq-${i}" class="accordion-content">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('active');
      const isOpen = item.classList.contains('active');
      btn.setAttribute('aria-expanded', isOpen);
      btn.querySelector('span').innerText = isOpen ? '-' : '+';
    });
  });
}

// ==========================================================================
// 3. LÓGICA DO CARROSSEL (Autoplay + Loop)
// ==========================================================================
function handleCarousel() {
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track.children);
  const nextBtn = document.getElementById('carousel-next');
  const prevBtn = document.getElementById('carousel-prev');
  const wrapper = document.querySelector('.carousel-wrapper');

  let currentIdx = 0;
  let timer;

  const move = (index) => {
    track.style.transform = `translateX(-${index * 100}%)`;
    currentIdx = index;
  };

  const next = () => move(currentIdx === slides.length - 1 ? 0 : currentIdx + 1);
  const prev = () => move(currentIdx === 0 ? slides.length - 1 : currentIdx - 1);

  nextBtn.addEventListener('click', () => { next(); startTimer(); });
  prevBtn.addEventListener('click', () => { prev(); startTimer(); });

  const startTimer = () => { clearInterval(timer); timer = setInterval(next, 4000); };
  const stopTimer = () => clearInterval(timer);

  wrapper.addEventListener('mouseenter', stopTimer);
  wrapper.addEventListener('mouseleave', startTimer);

  startTimer(); // Inicia autoplay
}

// ==========================================================================
// 4. ACESSIBILIDADE E REVEAL
// ==========================================================================
function handleA11y() {
  let size = 16;
  document.getElementById('btn-increase-font').onclick = () => { if(size<24) size+=2; document.documentElement.style.fontSize = size+'px'; };
  document.getElementById('btn-decrease-font').onclick = () => { if(size>12) size-=2; document.documentElement.style.fontSize = size+'px'; };
  document.getElementById('btn-contrast').onclick = () => document.body.classList.toggle('high-contrast');
}

function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Inicializa tudo após carregar o DOM
document.addEventListener('DOMContentLoaded', initApp);
