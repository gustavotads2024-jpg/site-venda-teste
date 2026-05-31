// ── PRODUTOS ──
const produtos = [
  { id:1, nome:"Jaqueta Oversized", cat:"roupas", emoji:"🧥", preco:349.90, desc:"Corte amplo, tecido premium. Para dias frios com muito estilo." },
  { id:2, nome:"Tênis Urban", cat:"calcados", emoji:"👟", preco:289.90, desc:"Conforto e design minimalista para o dia a dia." },
  { id:3, nome:"Óculos Retrô", cat:"acessorios", emoji:"🕶️", preco:189.90, desc:"Armação acetato com lente UV400. Atemporais." },
  { id:4, nome:"Moletom Básico", cat:"roupas", emoji:"👕", preco:219.90, desc:"100% algodão pima. Caimento perfeito." },
  { id:5, nome:"Bolsa Transversal", cat:"acessorios", emoji:"👜", preco:259.90, desc:"Couro vegano com acabamento dourado." },
  { id:6, nome:"Bota Couro", cat:"calcados", emoji:"👢", preco:419.90, desc:"Couro legítimo, solado antiderrapante. Dura anos." },
  { id:7, nome:"Camiseta Estampada", cat:"roupas", emoji:"👔", preco:129.90, desc:"Arte exclusiva, algodão penteado 30/1." },
  { id:8, nome:"Relógio Clássico", cat:"acessorios", emoji:"⌚", preco:599.90, desc:"Movimento japonês, pulseira de aço inox." },
];

let carrinho = [];
let filtroAtivo = "todos";

// ── RENDER PRODUTOS ──
function renderProdutos(lista) {
  const grid = document.getElementById("gridProdutos");
  grid.innerHTML = "";
  lista.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "produto-card";
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="produto-img">${p.emoji}</div>
      <div class="produto-info">
        <p class="produto-cat">${p.cat}</p>
        <h3 class="produto-nome">${p.nome}</h3>
        <p class="produto-desc">${p.desc}</p>
        <div class="produto-footer">
          <span class="produto-preco">R$ ${p.preco.toFixed(2).replace(".", ",")}</span>
          <button class="btn-add" onclick="adicionarAoCarrinho(${p.id})" title="Adicionar ao carrinho">+</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── FILTROS ──
document.querySelectorAll(".filtro").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filtro").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filtroAtivo = btn.dataset.cat;
    const lista = filtroAtivo === "todos" ? produtos : produtos.filter(p => p.cat === filtroAtivo);
    renderProdutos(lista);
  });
});

// ── CARRINHO ──
function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  const existente = carrinho.find(item => item.id === id);
  if (existente) {
    existente.qtd++;
  } else {
    carrinho.push({ ...produto, qtd: 1 });
  }
  atualizarCarrinho();
  showToast(`${produto.emoji} ${produto.nome} adicionado!`);
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const count = carrinho.reduce((a, item) => a + item.qtd, 0);
  document.getElementById("cartCount").textContent = count;

  const container = document.getElementById("cartItems");
  if (carrinho.length === 0) {
    container.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
  } else {
    container.innerHTML = carrinho.map(item => `
      <div class="cart-item">
        <span class="cart-item-emoji">${item.emoji}</span>
        <div class="cart-item-info">
          <strong>${item.nome}</strong>
          <span>R$ ${(item.preco * item.qtd).toFixed(2).replace(".", ",")} ${item.qtd > 1 ? `(${item.qtd}x)` : ""}</span>
        </div>
        <button class="cart-item-remove" onclick="removerDoCarrinho(${item.id})">✕</button>
      </div>
    `).join("");
  }

  const total = carrinho.reduce((a, item) => a + item.preco * item.qtd, 0);
  document.getElementById("cartTotal").textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
  document.getElementById("cartOverlay").classList.toggle("open");
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    showToast("Seu carrinho está vazio!");
    return;
  }
  carrinho = [];
  atualizarCarrinho();
  toggleCart();
  showToast("✅ Pedido realizado com sucesso!");
}

// ── TOAST ──
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// ── INIT ──
renderProdutos(produtos);
