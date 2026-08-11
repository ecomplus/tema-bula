# Bula — loja demo do nicho de farmácia e saúde

Cópia do starter [`ecomplus/store`](https://github.com/ecomplus/store)
tematizada para **farmácia** — medicamento isento de prescrição, cuidado
contínuo, higiene e dermocosmético, atendendo consumidor final.

> **Este nicho ainda não existe no site institucional.** Não há marca em
> `src/config/brands.ts` nem página em `/segmentos/`. O posicionamento foi
> **proposto**, não portado. Nome, logo e domínio são placeholders.

> **⚠️ Esta é uma demonstração de tema, não uma farmácia.** Vender medicamento
> pela internet no Brasil depende de autorização sanitária, farmacêutico
> responsável técnico e das regras da Anvisa para comércio eletrônico — nada
> disso é resolvido por tema de loja. O que está aqui é a **interface**: a
> tarja visível, o item que não vai ao carrinho sem receita, o lugar do envio
> no fluxo. A parte regulatória é da operação. As duas extra-pages
> (`/p/generico` e `/p/receita`) abrem dizendo isso. **Manter.**

## A tese do tema: o eixo é EQUIVALÊNCIA

Em nenhum outro nicho do conjunto o cliente chega procurando um produto e a
resposta certa é **outro produto**. Ele digita o nome comercial que viu na
receita, e a mesma substância na mesma dosagem existe com outros três rótulos
e metade do preço.

É a única variante em que a vitrine ajuda o cliente a **não comprar o que ele
pediu** — e é isso que constrói recompra numa farmácia: quem economizou uma
vez volta.

### Como isso a separa das outras variantes técnicas

O conjunto já tem quatro temas que lidam com especificação, e o risco de virar
o quinto igual é real — foi o que aconteceu entre Bitola e Circuito. O corte:

| | Pergunta do cliente | Especificação serve como |
|---|---|---|
| **Bitola** (construção) | que peça **serve**? | filtro |
| **Cardan** (autopeças) | serve no **meu carro**? | compatibilidade |
| **Circuito** (eletro) | qual é mais **barato**? | ficha, com o preço de herói |
| **Cadência** (esporte) | qual é **melhor pra mim**? | comparação |
| **Bula** (farmácia) | é o **mesmo**, mais barato? | **equivalência** |

A Cadência compara produtos **diferentes** para escolher um; o que interessa
lá é a linha que muda. A Bula compara produtos que são o **mesmo** para
escolher o mais barato, e a única linha que muda é o preço. Comparador mostra
diferença; equivalente mostra identidade — por isso a tabela **repete** as
colunas de substância e dosagem em vez de escondê-las. A repetição é o
argumento.

## O que é diferente aqui

| Peça | O que muda |
|---|---|
| `sections/EquivalenteSection.astro` | Referência, genérico e similar na mesma tabela, com a economia calculada no build. |
| `components/ProductCard.vue` | **Tarja como faixa no topo do card**, antes da foto. |
| `components/ProductCard.vue` | **Princípio ativo e dosagem acima do nome comercial** — a inversão que define o tema. |
| `components/ProductCard.vue` | Item com tarja **não vai ao carrinho pela vitrine**: leva para a ficha. |
| `sections/BannersGridSection.astro` | Rótulo em faixa sólida embaixo da foto, não sobre ela. |
| `assets/style.css` | `.ui-tarja`, `.ui-ativo`, `.ui-economia` — os átomos do tema. |
| `assets/style.css` | **`font-size` de raiz em 17px** e botão sem caixa alta. |
| `tailwind.config.js` | Turquesa + azul-petróleo, raio 0.375rem, `iconAliases` corrigido. |

### Vermelho é tarja, nunca marca

A faixa colorida da caixa de remédio é informação legal: vermelha é venda sob
prescrição, preta é controlada. Um tema de farmácia que usa vermelho de marca
ensina o cliente a ignorar a única cor da tela que ele precisava ler.

Por isso a paleta inteira é fria — turquesa e azul-petróleo — e vermelho só
existe em `.ui-tarja`. **Se aparecer vermelho fora dela, é engano.** Vale
inclusive para o logo: a faixa do wordmark é turquesa, não vermelha.

A escolha também é por eliminação: o conjunto já tem cinco variantes em verde
(despensa, morada, ninho, prumo, cadência) e o verde-cruz clássico do nicho
seria a sexta.

**Como isso não vira a Cadência:** as duas ficam na faixa turquesa/petróleo, e
o risco é real. O que separa não é o matiz, é o resto do sistema — lá o
secundário é volt e o hero grita, aqui o secundário é quase preto e o hero é o
mais calmo do conjunto; lá o título é `Anton` em caixa alta, aqui não há
display nenhuma e o corpo é o maior de todas as variantes.

### Por que o corpo é o maior do conjunto

Farmácia tem a base de clientes mais velha do e-commerce brasileiro, e o dado
que decide a compra é justamente o de corpo pequeno: **"500 mg" e "5 mg"
diferem por um caractere.**

Daí o `font-size` de raiz em **17px**. Como a escala do Tailwind é em `rem`,
texto, espaçamento e área de toque crescem juntos — em vez de virar texto
grande espremido em botão pequeno. Botão também perdeu a caixa alta, que
apaga a silhueta da palavra.

`Atkinson Hyperlegible` carrega os dados críticos (`.ui-ativo`, `.ui-tarja`,
títulos): foi desenhada pelo Braille Institute para desambiguar caractere
parecido, que é exatamente o problema de ler dosagem. Ela **não** é a fonte de
corpo — em parágrafo longo as particularidades dela cansam. Corpo é
`Source Sans 3`.

### Por que o rótulo do banner não fica sobre a foto

As outras variantes põem o texto por cima da imagem, com gradiente. O
contraste disso depende do que a foto tem naquele ponto, e é o primeiro lugar
em que a legibilidade cai quando alguém troca a imagem pelo CMS. Neste tema
essa conta não fecha, então o rótulo desce para uma faixa sólida.

## ⚠️ O que é estático e precisa de catálogo para funcionar

| O quê | Onde | Como ligar |
|---|---|---|
| **Tarja do card** | `ProductCard.vue` | `specifications.tarja` no produto |
| Princípio ativo e dosagem | `ProductCard.vue` | `specifications.principio_ativo`, `.dosagem` |
| "Genérico a partir de R$ 8,90" | `ProductCard.vue` | Menor preço do grupo de equivalentes |
| Grupos de equivalentes | `EquivalenteSection.astro` | Agrupar por princípio ativo + dosagem, ordenar por preço |

### A tarja simulada merece um parágrafo próprio

Nas outras variantes o dado estático é uma spec: mostrar "Drop 10 mm" errado é
feio. Aqui o dado estático é **classificação legal**, e mostrá-la errada é
outra categoria de problema.

`tarjaDoSku()` deriva a faixa de um hash do SKU — uma em cada quatro sai com
tarja — **só** para que a demonstração mostre os dois fluxos na mesma vitrine.
Se todos os cards trouxessem a mesma faixa, a metade mais importante do tema
ficaria invisível no print e no clique.

**Nenhuma loja real pode derivar tarja de qualquer coisa que não seja o
cadastro do produto.** Em produção isso é
`product.specifications?.tarja?.[0]?.value`, e nada mais.

### A seção de equivalentes só trata de item sem tarja

De propósito, e está escrito na nota de rodapé dela. Sugerir troca de marca é
decisão do cliente quando o item é de venda livre; havendo receita, a troca é
de quem prescreve. **Manter.**

## Rodar

```bash
npm i
npm run dev                                   # http://localhost:3000
BUILD_OUTPUT=static npx cloudcommerce build --codebase ssr
```

## Armadilhas herdadas do conjunto

- **Trocar `generalIconSets` quebra `i-close` em silêncio.** O pacote apelida
  `i-close` para `x-mark`, que é nome do heroicons; no Phosphor o ícone é `x`.
  O conjunto do tema registra o atalho antes do heroicons, então saía
  `i-ph-x-mark` — utilitário que não casa **some em silêncio** no UnoCSS e o
  botão de fechar ficava invisível. Resolvido com `iconAliases: { close: 'x' }`.
  Conferir sempre no CSS construído:
  `grep 'i-close{' functions/ssr/dist/client/_astro/*.css`.
- Ícone que não casa some em silêncio. Na dúvida, forma prefixada:
  `i-ph-<nome>`.
- `/s/<termo>` **não funciona no build estático** — só `/s/` é pré-renderizado.
  Usar sempre `/s?q=<termo>`.
- **Botão dentro de `<a>` navega ao clicar** — a linha de compra fica fora do
  `ALink`, e a moldura do card passou para a div que envolve os dois.
- **Atributo `hidden` perde para utilitário de display.** `.ui-spec` aplica
  `inline-flex` e vence `[hidden] { display: none }` no desempate por ordem —
  por isso os painéis do `EquivalenteSection` são `<div>` sem classe `ui-*`.
- `cloudcommerce build` **regenera o `firebase.json`** — buildar primeiro,
  escrever a config depois.
- **Trocar o PNG de um logo e rebuildar não troca a imagem servida** — o Astro
  reaproveita a entrada de cache. Rodar
  `demo-catalog/scripts/limpar-cache-imagens.sh bula` antes do build.
- `customCode.css` do CMS **não funciona** em nenhuma loja Cloud Commerce
  (`Base.astro` do pacote usa `<style>{customCode.css}</style>` e o Astro não
  interpola expressão dentro de `<style>`). Por isso todo CSS vive em
  `src/assets/style.css` e as fontes são carregadas pelo `htmlHead` de
  `content/layout.json`.
