# Davi Rodrigues Fotografia — site

Layout de **Início** e **Sobre**, inspirado na estrutura do [tanyatimal.studio](https://tanyatimal.studio).
O portfólio ficou de fora a pedido.

## Como abrir

Dê duplo clique em `index.html`. Não precisa de servidor nem de build — é HTML, CSS e um arquivo JS.

## Estrutura

```
index.html            Home
sobre.html            Sobre (layout editorial, bem diferente da home)
assets/css/site.css   Todo o sistema visual
assets/js/site.js     Revelação ao rolar + carrossel do FAQ
assets/img/           Coloque as fotos aqui
```

## O sistema de cor

Existem **duas cores** no site inteiro:

| | |
|---|---|
| Branco | `#edede3` |
| Preto  | `#1e1e1e` |

Mais quatro cinzas derivados dessas duas.

A **única exceção é o hero**, que carrega o âmbar e o teal da fotografia da capela. Essas
cores estão isoladas nos tokens `--hero-amber`, `--hero-teal` e `--hero-dark`, e não são
usadas em nenhum outro lugar. A razão: o resto do site é moldura para fotografias que têm
cada uma o seu próprio tom — cromo colorido brigaria com elas.

Por isso, onde normalmente se usaria cor para dar ênfase, aqui o trabalho é feito por
tipografia: troca de fonte, itálico, corpo e filete.

## Tipografia

| Papel | Fonte | Onde |
|---|---|---|
| Geométrica | Caviar Dreams → Century Gothic | logo, nomes de serviço, caixa alta |
| Display | Bodoni MT itálico | títulos, citações, FAQ |
| Micro | Segoe UI 11px caixa alta | menu, legendas, rodapé |

**Antes de publicar:** a Caviar Dreams precisa ser licenciada e declarada via `@font-face`
no topo do `site.css`. Hoje a variável `--geo` já a lista em primeiro lugar, com Century
Gothic como alternativa de sistema — que é bem próxima, mas não idêntica. O mesmo vale para
a Bodoni MT, que existe no Windows mas não em celular; vale escolher uma Didone web
(Playfair Display e Prata são alternativas gratuitas).

## Trocar os placeholders por fotos

Os retângulos cinza são a classe `.ph`. Para pôr uma foto, basta colocar um `<img>` dentro:

```html
<div class="ph"><img src="assets/img/casal-01.jpg" alt="Descrição da foto"></div>
```

O CSS já cuida do recorte (`object-fit: cover`).

### O hero — dois pendências abertas

A foto já está instalada em `assets/img/hero.jpg` (1581 × 895). Duas coisas ainda incomodam:

**1. O nome está embutido na imagem.** Por isso o wordmark em HTML foi desativado (está
comentado no `index.html`). O problema aparece no celular: a foto é 16:9 e o hero ocupa a
tela toda, então `object-fit: cover` cortaria as laterais e decepararia "DAVI RODRIGUES".

A solução provisória no CSS: abaixo de uma proporção de 13/10, a imagem passa para
`object-fit: contain` — aparece inteira, e a sobra é preenchida pelo `--hero-dark`, que é
quase a mesma cor das bordas da foto, então a emenda não se nota.

**Solução definitiva:** exportar a foto **sem o texto**. Aí é só descomentar o bloco
`.hero-mark` no `index.html` e apagar a regra `@media (max-aspect-ratio: 13/10)` do CSS. O
nome volta a ser texto de verdade — nítido em qualquer tela, redimensionável, e legível pelo
Google, que hoje não enxerga nada dentro de um JPEG.

**2. A resolução é baixa para um hero de largura total.** 1581px de largura basta para um
notebook de 1366px, mas numa tela Full HD a imagem é ampliada 21%, e numa 4K, mais de 60% —
o que aparece como perda de nitidez logo na primeira dobra do site. O ideal é reexportar com
**2400px de largura**, qualidade 80. O arquivo atual tem só 139 KB, o que indica compressão
bem agressiva; há bastante margem para ganhar qualidade sem pesar.

### A faixa "Ver ensaios"

A `.band-cutout` simula o casal recortado passando na frente da palavra. Com a foto real,
troque por um PNG com o casal recortado — é a mesma técnica de máscara que a referência usa.

## O que ainda é rascunho

Todo o texto foi escrito por mim para dar peso real ao layout. **Nada ali é informação
verdadeira** e precisa ser substituído:

- cidades e meses da agenda
- o depoimento na home
- as respostas do FAQ
- e-mail, Instagram e WhatsApp (estão como `#`)

Evitei de propósito inventar números — anos de carreira, quantidade de fotos entregues,
prazos de entrega, valores. É onde um texto de mentira causa problema de verdade.

## Acessibilidade e responsivo

- Layout empilha abaixo de 900px; a colagem da página Sobre só monta no desktop
- `prefers-reduced-motion` desliga todas as animações
- Foco visível pelo teclado; o carrossel do FAQ aceita as setas ← →
- Tema claro e escuro pelos tokens (`prefers-color-scheme` e `data-theme`)
