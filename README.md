# Davi Rodrigues Fotografia — site

Layout de **Início** e **Sobre**, inspirado na estrutura do [tanyatimal.studio](https://tanyatimal.studio).
O portfólio ficou de fora a pedido.

## Como abrir

Dê duplo clique em `index.html`. Não precisa de servidor nem de build — é HTML, CSS e um arquivo JS.

## Estrutura

```
index.html            Home
sobre.html            Sobre (layout editorial, bem diferente da home)
portfolio.html        Mosaico com filtros por categoria
contato.html          Vídeo + formulário que abre o WhatsApp
assets/css/site.css   Todo o sistema visual
assets/js/site.js     Revelação, FAQ, filtros do portfólio e formulário
assets/img/           Fotos
assets/video/cta.mp4  Vídeo da página de contato
```

## O formulário de contato não usa servidor

Ao enviar, o formulário **monta uma mensagem de WhatsApp já preenchida** e abre a conversa.
Nada é enviado para servidor nenhum, não há back-end para manter, não há serviço de terceiro
para pagar, e o lead cai direto onde o Davi já atende.

O campo mais importante é **a data do evento**, e é obrigatório junto com nome e cidade.
Quem preenche data está muito mais perto de fechar do que quem manda só "oi, quanto custa?" —
e o Davi já recebe a informação que precisa para responder se a data está livre.

O `novalidate` no formulário é proposital: a validação é feita em JavaScript para que o aviso
de campo vazio não apareça como balão nativo do navegador, que destoaria da página.

## O vídeo

O original (`Vídeo CTA.MP4`, 77,5 MB, 2160×3840 a 22 Mbps) é bom demais para web — sozinho
travaria a página em conexão de celular. Foi recomprimido para **1080×1920, 14 segundos,
2,4 Mbps: 4,26 MB**, ou 6% do tamanho original.

A compressão usou o transcodificador nativo do Windows (a API `MediaTranscoder` do WinRT),
já que não há ffmpeg nem HandBrake instalados. O script está em
`scratchpad/transcode.ps1` na pasta temporária da sessão. O original continua na raiz do
projeto e não deve ser publicado.

O áudio foi removido: o vídeo toca mudo de qualquer forma, já que navegador nenhum permite
autoplay com som — e sem a faixa de áudio o arquivo fica menor.

**Melhoria pendente:** gerar um `poster` (primeiro quadro em JPEG) para aparecer enquanto o
vídeo carrega. Hoje o espaço fica preto por um instante.

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

## O texto

Todo o conteúdo agora vem de informação real fornecida pelo Davi: formação, cidade, ano de
início, rotina do dia, números por tipo de evento, prazo, forma de pagamento, área de
atendimento e contatos. O depoimento é do casal Ana e Victor, recortado de uma mensagem
real, sem alteração de palavras.

**A ideia que estrutura a página Sobre** saiu dos próprios números. Ele não fotografa só
casamento — fotografa noivado, casamento civil, casamento religioso, chá revelação,
batizado, aniversário infantil e debutante. Postos em ordem cronológica, esses eventos são
exatamente as fases pelas quais uma família passa. Ou seja: o slogan *"não fotografo
eventos, faço parte da história de famílias"* não é frase de efeito — é a descrição literal
do portfólio. A seção "A história inteira" existe para mostrar isso, e a ordem da lista é o
argumento.

### O ensaio como método, não como brinde

O Davi inclui um ensaio antes de todo casamento e de toda festa de quinze anos. Ele
descrevia isso como "brinde". No site, é tratado como **a primeira etapa do trabalho** — e a
palavra "brinde" foi deliberadamente evitada.

Dois motivos. Primeiro, é a descrição correta: o ensaio existe para criar intimidade, e é
por isso que no dia do evento basta apontar a câmera para as pessoas rirem. É o que produz a
leveza que aparece nos depoimentos. Segundo, é posicionamento: brinde é o que se dá para
fechar venda e sinaliza que aquilo vale pouco. Quem está subindo de faixa de preço não dá
brinde — inclui etapa.

Por isso o ensaio abre a linha do tempo da seção "Como é o dia": o trabalho não começa no
dia do evento.

### Decisão sobre preço

O valor **não aparece em lugar nenhum do site, de propósito**. O Davi cobra hoje R$ 2.500
por um casamento completo, abaixo do mercado, e quer subir. Publicar o valor atual o
ancoraria nele: viraria a referência pública, circularia em print, e cada reajuste passaria
a precisar de justificativa contra o próprio site.

O papel do site, então, é **justificar o preço antes de ele ser dito**. É isso que as seções
"O combinado" e "Como é o dia" fazem: sem limite de fotos, trinta dias de edição manual sem
IA, duas fotógrafas, gravação simultânea em dois cartões, cartão reservado até a entrega,
cópia na nuvem, contrato de quatro páginas e apenas dois casamentos por mês. Nenhum desses
argumentos estava sendo usado antes.

Quando o preço estiver no patamar desejado, aí sim vale publicar — passa a filtrar leads em
vez de limitar.

### Ainda pendente de revisão

- **Repetição de clientes.** O site afirma que ele fotografa todas as fases de uma família,
  o que é verdade por categoria. Não afirma que já acompanhou *a mesma* família em várias
  fases — se isso já aconteceu, é um argumento bem mais forte e vale dizer com todas as
  letras.
- **Nome da segunda fotógrafa.** O texto diz "uma segunda fotógrafa" de forma genérica. O
  depoimento de Ana e Victor cita "a Mari". Se for parceria fixa, vale nomeá-la.
- **Quantidade de fotos entregues.** Não foi informada, então a pergunta saiu do FAQ.
- **Valores.** Não entraram em lugar nenhum, de propósito.
- A frase sobre o casamento civil ("costuma render as fotos mais honestas do casal") é
  opinião minha, não dele. Vale confirmar se assina embaixo.

## Acessibilidade e responsivo

- Layout empilha abaixo de 900px; a colagem da página Sobre só monta no desktop
- `prefers-reduced-motion` desliga todas as animações
- Foco visível pelo teclado; o carrossel do FAQ aceita as setas ← →
- Tema claro e escuro pelos tokens (`prefers-color-scheme` e `data-theme`)
