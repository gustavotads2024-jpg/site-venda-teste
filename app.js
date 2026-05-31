/* ═══════════════════════════════
   VRUMMM — APP.JS
═══════════════════════════════ */

// ── CURSOR ──
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
document.addEventListener('mousemove', e => {
  cursor.style.left    = e.clientX + 'px';
  cursor.style.top     = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .f-btn, .moto-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '60px';
    cursor.style.height = '60px';
    cursor.style.borderColor = '#ff2340';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '36px';
    cursor.style.height = '36px';
    cursor.style.borderColor = '#e8001c';
  });
});

// ── NAVBAR scroll ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 80 ? 'rgba(8,8,8,1)' : 'rgba(8,8,8,.9)';
});

// ── MOBILE MENU ──
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── PRODUTOS ──
const motos = [
  {
    id: 1, marca: 'HONDA', nome: 'CBR 600RR', cat: 'supersport',
    preco: 89900, badge: 'novo',
    img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80&auto=format&fit=crop',
    specs: ['599cc', '120cv', '2024']
  },
  {
    id: 2, marca: 'KAWASAKI', nome: 'Ninja ZX-10R', cat: 'supersport',
    preco: 139900, badge: 'destaque',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    specs: ['998cc', '210cv', '2024']
  },
  {
    id: 3, marca: 'YAMAHA', nome: 'YZF-R1', cat: 'supersport',
    preco: 149900, badge: null,
    img: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80&auto=format&fit=crop',
    specs: ['998cc', '200cv', '2023']
  },
  {
    id: 4, marca: 'DUCATI', nome: 'Panigale V4', cat: 'supersport',
    preco: 299900, badge: 'destaque',
    img: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80&auto=format&fit=crop',
    specs: ['1103cc', '214cv', '2024']
  },
  {
    id: 5, marca: 'BMW', nome: 'S 1000 RR', cat: 'supersport',
    preco: 189900, badge: 'novo',
    img: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=600&q=80&auto=format&fit=crop',
    specs: ['999cc', '210cv', '2024']
  },
  {
    id: 6, marca: 'SUZUKI', nome: 'GSX-R1000', cat: 'supersport',
    preco: 129900, badge: null,
    img: 'https://images.unsplash.com/photo-1517153295259-74eb0b416cee?w=600&q=80&auto=format&fit=crop',
    specs: ['999cc', '202cv', '2023']
  },
  {
    id: 7, marca: 'KAWASAKI', nome: 'Z900 SE', cat: 'naked',
    preco: 79900, badge: 'novo',
    img: 'https://images.unsplash.com/photo-1558980394-0a06c4631733?w=600&q=80&auto=format&fit=crop',
    specs: ['948cc', '125cv', '2024']
  },
  {
    id: 8, marca: 'HONDA', nome: 'CB 1000R', cat: 'naked',
    preco: 74900, badge: null,
    img: 'https://images.unsplash.com/photo-1590674899484-13da0e5ffa43?w=600&q=80&auto=format&fit=crop',
    specs: ['998cc', '145cv', '2023']
  },
  {
    id: 9, marca: 'BMW', nome: 'K 1600 GT', cat: 'touring',
    preco: 219900, badge: 'destaque',
    img: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=600&q=80&auto=format&fit=crop',
    specs: ['1649cc', '160cv', '2024']
  },
];

let carrinho = [];
let filtroAtivo = 'todos';

function formatPreco(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderMotos(lista) {
  const grid = document.getElementById('motoGrid');
  grid.innerHTML = '';
  lista.forEach((m, i) => {
    const div = document.createElement('div');
    div.className = 'moto-card';
    div.style.animationDelay = `${i * 0.08}s`;
    div.innerHTML = `
      <div class="moto-img-wrap">
        <img src="${m.img}" alt="${m.nome}" loading="lazy"/>
        ${m.badge ? `<span class="moto-badge ${m.badge}">${m.badge.toUpperCase()}</span>` : ''}
      </div>
      <div class="moto-info">
        <p class="moto-marca">${m.marca}</p>
        <h3 class="moto-nome">${m.nome}</h3>
        <div class="moto-specs">
          ${m.specs.map(s => `<span class="spec">${s}</span>`).join('')}
        </div>
        <div class="moto-footer">
          <div class="moto-preco">
            <small>a partir de</small>
            ${formatPreco(m.preco)}
          </div>
          <button class="btn-add-moto" onclick="addCarrinho(${m.id})">+ RESERVAR</button>
        </div>
      </div>
    `;
    grid.appendChild(div);
  });
}

// ── FILTROS ──
document.getElementById('filtros').addEventListener('click', e => {
  if (!e.target.classList.contains('f-btn')) return;
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  filtroAtivo = e.target.dataset.cat;
  const lista = filtroAtivo === 'todos' ? motos : motos.filter(m => m.cat === filtroAtivo);
  renderMotos(lista);
});

// ── CARRINHO ──
function addCarrinho(id) {
  const moto = motos.find(m => m.id === id);
  if (!carrinho.find(m => m.id === id)) {
    carrinho.push({ ...moto });
  }
  updateCarrinho();
  showToast(`${moto.marca} ${moto.nome} RESERVADA!`);
}

function removeCarrinho(id) {
  carrinho = carrinho.filter(m => m.id !== id);
  updateCarrinho();
}

function updateCarrinho() {
  document.getElementById('cartBadge').textContent = carrinho.length;
  const body = document.getElementById('cartBody');
  if (carrinho.length === 0) {
    body.innerHTML = '<p class="cart-empty">Nenhuma moto selecionada ainda.</p>';
  } else {
    body.innerHTML = carrinho.map(m => `
      <div class="cart-item">
        <img src="${m.img}" alt="${m.nome}"/>
        <div class="cart-item-info">
          <strong>${m.marca} ${m.nome}</strong>
          <span>${formatPreco(m.preco)}</span>
        </div>
        <button class="remove-btn" onclick="removeCarrinho(${m.id})">✕</button>
      </div>
    `).join('');
  }
  const total = carrinho.reduce((a, m) => a + m.preco, 0);
  document.getElementById('cartTotal').textContent = formatPreco(total);
}

// Cart open/close
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

function finalizar() {
  if (!carrinho.length) { showToast('SELECIONE UMA MOTO!'); return; }
  carrinho = [];
  updateCarrinho();
  closeCart();
  showToast('✅ PROPOSTA ENVIADA! ENTRAREMOS EM CONTATO.');
}

// ── FORM ──
function enviarForm(e) {
  e.preventDefault();
  showToast('✅ MENSAGEM ENVIADA!');
  e.target.reset();
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── INIT ──
renderMotos(motos);
