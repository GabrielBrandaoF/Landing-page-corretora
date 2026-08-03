/* =======================================================================
   Fátima Brandão — lógica do site (listagem + página de detalhes)
   ======================================================================= */

function formatarPreco(imovel) {
  const valor = imovel.preco.toLocaleString('pt-BR');
  return imovel.operacao === 'Aluguel' ? `R$ ${valor}/mês` : `R$ ${valor}`;
}

function iconesSpecs(imovel) {
  return `
    <span class="spec"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10.5 12 4l9 6.5"/><path d="M5 9.5V20h14V9.5"/></svg>${imovel.quartos} qts</span>
    <span class="spec"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z"/><path d="M6 12V7a3 3 0 0 1 5.2-2"/><path d="M4 19v1M18 19v1"/></svg>${imovel.banheiros} ban.</span>
    <span class="spec"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="9" width="18" height="10" rx="1.5"/><path d="M7 9V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"/></svg>${imovel.area} m²</span>
  `;
}

/* -------- Card de listagem (usado na home e nos "outros imóveis") ------- */
function cardImovelHTML(imovel) {
  return `
    <a class="property-card" href="imovel.html?id=${imovel.id}">
      <div class="property-card-image">
        <img src="${imovel.capa}" alt="${imovel.titulo}" loading="lazy">
        <span class="property-tag property-tag-op">${imovel.operacao}</span>
        <span class="property-tag property-tag-tipo">${imovel.tipo}</span>
        ${imovel.destaque ? '<span class="property-tag property-tag-destaque">Destaque</span>' : ''}
      </div>
      <div class="property-card-body">
        <div class="property-card-top">
          <h3>${imovel.titulo}</h3>
          <p class="property-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
            ${imovel.bairro}, ${imovel.cidade}
          </p>
        </div>
        <div class="property-specs">${iconesSpecs(imovel)}</div>
        <span class="price-label">A partir de</span>
        <strong class="property-price">${formatarPreco(imovel)}</strong>
      </div>
    </a>
  `;
}

/* -------- Renderiza a grade de imóveis (index.html) -------- */
function renderGrid(containerId, lista) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const dados = lista || IMOVEIS;
  if (dados.length === 0) {
    el.innerHTML = '<p class="empty-state">Nenhum imóvel cadastrado no momento.</p>';
    return;
  }
  el.innerHTML = dados.map(cardImovelHTML).join('');
  revelarGradeCards(containerId);
}

/* -------- Filtro simples por tipo (Casa / Apartamento / Todos) -------- */
function initFiltroImoveis() {
  const botoes = document.querySelectorAll('.filtro-tipo button');
  if (!botoes.length) return;
  botoes.forEach(btn => {
    btn.addEventListener('click', () => {
      botoes.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tipo = btn.dataset.tipo;
      const filtrados = tipo === 'todos' ? IMOVEIS : IMOVEIS.filter(i => i.tipo.toLowerCase() === tipo);
      renderGrid('imoveis-grid', filtrados);
    });
  });
}

/* -------- Página de detalhes (imovel.html) -------- */
function renderDetalheImovel() {
  const container = document.getElementById('imovel-detalhe');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const imovel = IMOVEIS.find(i => i.id === id);

  if (!imovel) {
    container.innerHTML = `
      <div class="detalhe-vazio">
        <h1>Imóvel não encontrado</h1>
        <p>O imóvel que você procura pode ter sido vendido, alugado ou removido.</p>
        <a href="index.html#imoveis" class="btn btn-primary" style="margin-top:24px;">Ver todos os imóveis</a>
      </div>
    `;
    document.title = 'Imóvel não encontrado | Fátima Brandão';
    return;
  }

  document.title = `${imovel.titulo} | Fátima Brandão`;

  const galeriaThumbs = imovel.imagens.map((src, i) => `
    <button class="thumb ${i === 0 ? 'active' : ''}" data-src="${src}" data-index="${i}" type="button" aria-label="Ver foto ${i + 1}">
      <img src="${src}" alt="Foto ${i + 1} de ${imovel.titulo}">
    </button>
  `).join('');

  const descricaoHTML = imovel.descricao
    .split('\n\n')
    .map(p => `<p>${p}</p>`)
    .join('');

  container.innerHTML = `
    <a href="index.html#imoveis" class="voltar-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
      Voltar para imóveis
    </a>

    <div class="detalhe-grid">
      <div class="detalhe-galeria">
        <div class="galeria-principal">
          <img id="foto-principal" src="${imovel.imagens[0]}" alt="${imovel.titulo}">
          <span class="property-tag property-tag-op" style="position:absolute;top:18px;left:18px;">${imovel.operacao}</span>
          ${imovel.imagens.length > 1 ? `
            <button class="galeria-nav galeria-prev" type="button" aria-label="Foto anterior">‹</button>
            <button class="galeria-nav galeria-next" type="button" aria-label="Próxima foto">›</button>
          ` : ''}
        </div>
        ${imovel.imagens.length > 1 ? `<div class="galeria-thumbs">${galeriaThumbs}</div>` : ''}
      </div>

      <div class="detalhe-info">
        <span class="eyebrow">${imovel.tipo} · ${imovel.bairro}</span>
        <h1 class="detalhe-titulo">${imovel.titulo}</h1>
        <p class="property-location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
          ${imovel.bairro}, ${imovel.cidade}
        </p>

        <span class="price-label">A partir de</span>
        <strong class="detalhe-preco">${formatarPreco(imovel)}</strong>

        <div class="detalhe-specs">
          <div class="detalhe-spec"><strong>${imovel.quartos}</strong><span>Quartos</span></div>
          <div class="detalhe-spec"><strong>${imovel.banheiros}</strong><span>Banheiros</span></div>
          <div class="detalhe-spec"><strong>${imovel.vagas}</strong><span>Vagas</span></div>
          <div class="detalhe-spec"><strong>${imovel.area} m²</strong><span>Área</span></div>
        </div>

        <div class="cta-row" style="margin-top:32px;">
          <a href="https://wa.me/5598988044876?text=Ol%C3%A1!%20Tenho%20interesse%20no%20im%C3%B3vel%3A%20${encodeURIComponent(imovel.titulo)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <span class="icon-dot">
              <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </span>
            Falar com a Fátima
          </a>
          <a href="#contato" class="btn btn-ghost">Agendar visita</a>
        </div>

        <div class="detalhe-descricao">
          <h2>Sobre o imóvel</h2>
          ${descricaoHTML}
        </div>
      </div>
    </div>

    <div class="outros-imoveis">
      <h2>Outros imóveis que podem te interessar</h2>
      <div class="properties-grid" id="outros-grid"></div>
    </div>
  `;

  const fotoPrincipal = document.getElementById('foto-principal');
  const thumbs = container.querySelectorAll('.thumb');
  const prevBtn = container.querySelector('.galeria-prev');
  const nextBtn = container.querySelector('.galeria-next');
  const imagens = Array.from(thumbs).map(btn => btn.dataset.src);
  let indiceAtual = 0;

  function atualizarGaleria(index) {
    indiceAtual = index;
    const src = imagens[index];
    if (!src) return;
    fotoPrincipal.classList.remove('img-loaded');
    fotoPrincipal.src = src;
    marcarImagemCarregada(fotoPrincipal);
    thumbs.forEach((thumb, i) => thumb.classList.toggle('active', i === index));
  }

  thumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      atualizarGaleria(Number(btn.dataset.index));
    });
  });

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      const novoIndice = (indiceAtual - 1 + imagens.length) % imagens.length;
      atualizarGaleria(novoIndice);
    });

    nextBtn.addEventListener('click', () => {
      const novoIndice = (indiceAtual + 1) % imagens.length;
      atualizarGaleria(novoIndice);
    });
  }

  document.addEventListener('keydown', event => {
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'SELECT') return;
    if (event.key === 'ArrowLeft') {
      const novoIndice = (indiceAtual - 1 + imagens.length) % imagens.length;
      atualizarGaleria(novoIndice);
    }
    if (event.key === 'ArrowRight') {
      const novoIndice = (indiceAtual + 1) % imagens.length;
      atualizarGaleria(novoIndice);
    }
  });

  const outros = IMOVEIS.filter(i => i.id !== imovel.id).slice(0, 3);
  renderGrid('outros-grid', outros);
}

/* -------- Barra de pesquisa (Comprar/Alugar, Tipo, Localização, Faixa) -------- */
function normalizarTexto(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function initBuscaImoveis() {
  const abas = document.querySelectorAll('.search-tabs button');
  const campoTipo = document.getElementById('tipo');
  const campoLocal = document.getElementById('local');
  const campoFaixa = document.getElementById('faixa');
  const botaoBuscar = document.querySelector('.search-submit');

  if (!botaoBuscar) return; // barra de busca só existe na home

  abas.forEach(aba => {
    aba.addEventListener('click', () => {
      abas.forEach(a => a.classList.remove('active'));
      aba.classList.add('active');
    });
  });

  function buscarImoveis() {
    const abaAtiva = document.querySelector('.search-tabs button.active');
    const operacao = abaAtiva ? abaAtiva.dataset.op : '';
    const tipo = campoTipo.value;
    const local = normalizarTexto(campoLocal.value);
    const [precoMin, precoMax] = campoFaixa.value
      ? campoFaixa.value.split('-').map(Number)
      : [null, null];

    const resultado = IMOVEIS.filter(imovel => {
      if (operacao && imovel.operacao !== operacao) return false;
      if (tipo && imovel.tipo !== tipo) return false;
      if (local) {
        const alvo = normalizarTexto(`${imovel.bairro} ${imovel.cidade}`);
        if (!alvo.includes(local)) return false;
      }
      if (precoMin !== null && (imovel.preco < precoMin || imovel.preco > precoMax)) return false;
      return true;
    });

    renderGrid('imoveis-grid', resultado);

    // mantém os botões "Todos / Casas / Apartamentos" sincronizados com o resultado da busca
    const botoesFiltro = document.querySelectorAll('.filtro-tipo button');
    if (botoesFiltro.length) {
      const tipoAlvo = tipo ? tipo.toLowerCase() : 'todos';
      botoesFiltro.forEach(b => b.classList.remove('active'));
      const botaoCorrespondente = document.querySelector(`.filtro-tipo button[data-tipo="${tipoAlvo}"]`);
      (botaoCorrespondente || botoesFiltro[0]).classList.add('active');
    }

    const secaoImoveis = document.getElementById('imoveis');
    if (secaoImoveis) secaoImoveis.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  botaoBuscar.addEventListener('click', buscarImoveis);
  campoLocal.addEventListener('keydown', e => {
    if (e.key === 'Enter') buscarImoveis();
  });
}

function initGaleriaClientes() {
  const botoes = document.querySelectorAll('.client-photo-btn');
  const modal = document.getElementById('client-photo-modal');
  const image = document.getElementById('photo-modal-image');
  const closeBtn = modal?.querySelector('.photo-modal-close');
  const prevBtn = modal?.querySelector('.photo-modal-prev');
  const nextBtn = modal?.querySelector('.photo-modal-next');

  if (!botoes.length || !modal || !image || !closeBtn || !prevBtn || !nextBtn) return;

  const sources = Array.from(botoes).map(btn => ({
    src: btn.dataset.src,
    alt: btn.dataset.alt || 'Foto do cliente'
  }));

  let indexAtual = 0;

  function abrirGaleria(i) {
    indexAtual = i;
    const item = sources[indexAtual];
    if (!item) return;
    image.src = item.src;
    image.alt = item.alt;
    modal.hidden = false;
    document.body.classList.add('modal-open');
  }

  function fecharGaleria() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }

  function mudarFoto(delta) {
    const proximo = (indexAtual + delta + sources.length) % sources.length;
    abrirGaleria(proximo);
  }

  botoes.forEach((btn, index) => {
    btn.addEventListener('click', () => abrirGaleria(index));
  });

  closeBtn.addEventListener('click', fecharGaleria);
  prevBtn.addEventListener('click', () => mudarFoto(-1));
  nextBtn.addEventListener('click', () => mudarFoto(1));

  modal.addEventListener('click', event => {
    if (event.target.dataset.close === 'true') fecharGaleria();
  });

  document.addEventListener('keydown', event => {
    if (modal.hidden) return;
    if (event.key === 'Escape') fecharGaleria();
    if (event.key === 'ArrowLeft') mudarFoto(-1);
    if (event.key === 'ArrowRight') mudarFoto(1);
  });
}

/* =======================================================================
   ANIMAÇÕES — reveal ao rolar, fade de imagens, navbar e contadores
   Tudo respeita prefers-reduced-motion e usa apenas transform/opacity.
   ======================================================================= */
const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------- Fade suave ao carregar imagens (evita "pulo" de imagem quebrada) -------- */
function marcarImagemCarregada(img) {
  if (!img) return;
  if (PREFERS_REDUCED_MOTION) {
    img.classList.add('img-loaded');
    return;
  }
  if (img.complete && img.naturalWidth > 0) {
    img.classList.add('img-loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('img-loaded'), { once: true });
    img.addEventListener('error', () => img.classList.add('img-loaded'), { once: true });
  }
}

function initImageFade(root = document) {
  const seletor = '.property-card-image img, .galeria-principal img, .sobre-media img';
  root.querySelectorAll(seletor).forEach(marcarImagemCarregada);
}

/* -------- Reveal ao rolar (Intersection Observer) -------- */
let revealObserver = null;
function getRevealObserver() {
  if (revealObserver || PREFERS_REDUCED_MOTION) return revealObserver;
  revealObserver = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        revealObserver.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  return revealObserver;
}

function registrarReveal(elemento, { tipo = '', atrasoMs = 0 } = {}) {
  if (!elemento) return;
  if (PREFERS_REDUCED_MOTION) return;
  elemento.classList.add('reveal');
  if (tipo) elemento.classList.add(`reveal-${tipo}`);
  if (atrasoMs) elemento.style.setProperty('--reveal-delay', `${atrasoMs}ms`);
  getRevealObserver()?.observe(elemento);
}

/* aplica reveal com stagger a uma grade de cards recém-renderizada */
function revelarGradeCards(containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  Array.from(grid.children).forEach((card, i) => {
    registrarReveal(card, { atrasoMs: Math.min(i, 7) * 70 });
  });
  initImageFade(grid);
}

/* reveal genérico para seções estáticas do site (não recriadas por JS) */
function initScrollRevealEstatico() {
  if (PREFERS_REDUCED_MOTION) return;

  const grupos = [
    { seletor: '.properties-head', tipo: '' },
    { seletor: '.search-shell', tipo: 'scale' },
    { seletor: '.sobre-media', tipo: 'left' },
    { seletor: '.sobre-content > *', tipo: '' },
    { seletor: '.detalhe-galeria', tipo: 'left' },
    { seletor: '.detalhe-info > *', tipo: '' },
    { seletor: '.outros-imoveis h2', tipo: '' },
    { seletor: '.footer-inner > *', tipo: '' }
  ];

  grupos.forEach(({ seletor, tipo }) => {
    document.querySelectorAll(seletor).forEach((el, i) => {
      registrarReveal(el, { tipo, atrasoMs: (i % 4) * 80 });
    });
  });
}

/* -------- Parallax discreto na imagem do Hero -------- */
function initHeroParallax() {
  if (PREFERS_REDUCED_MOTION) return;
  const imagem = document.querySelector('.hero-media .media-frame img');
  const hero = document.querySelector('.hero');
  if (!imagem || !hero) return;

  let ticking = false;
  function atualizar() {
    const rect = hero.getBoundingClientRect();
    // só aplica enquanto o hero está visível, evitando trabalho desnecessário
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const deslocamento = Math.max(-24, Math.min(24, window.scrollY * 0.06));
      imagem.style.transform = `translate3d(0, ${deslocamento}px, 0) scale(1.04)`;
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(atualizar);
      ticking = true;
    }
  }, { passive: true });
  atualizar();
}

/* -------- Navbar: encolhe e ganha blur ao rolar -------- */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let ticking = false;
  function atualizar() {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(atualizar);
      ticking = true;
    }
  }, { passive: true });
  atualizar();
}

/* -------- Contagem animada das estatísticas do Hero -------- */
function initContadoresStats() {
  const stats = document.querySelectorAll('.stats-row .stat strong');
  if (!stats.length) return;

  if (PREFERS_REDUCED_MOTION) return;

  function animarContagem(elemento) {
    const textoOriginal = elemento.textContent.trim();
    const match = textoOriginal.match(/^([\d.,]+)(.*)$/);
    if (!match) return;

    const numeroFinal = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
    const sufixo = match[2];
    if (Number.isNaN(numeroFinal)) return;

    const duracao = 1200;
    const inicio = performance.now();

    function passo(agora) {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const facilitado = 1 - Math.pow(1 - progresso, 3); // ease-out cubic
      const valorAtual = Math.round(numeroFinal * facilitado);
      elemento.textContent = `${valorAtual}${sufixo}`;
      if (progresso < 1) {
        requestAnimationFrame(passo);
      } else {
        elemento.textContent = textoOriginal;
      }
    }
    requestAnimationFrame(passo);
  }

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        animarContagem(entrada.target);
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.6 });

  stats.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  renderGrid('imoveis-grid');
  initFiltroImoveis();
  initBuscaImoveis();
  renderDetalheImovel();
  initGaleriaClientes();

  initImageFade();
  initScrollRevealEstatico();
  initNavScroll();
  initContadoresStats();
  initHeroParallax();
});
