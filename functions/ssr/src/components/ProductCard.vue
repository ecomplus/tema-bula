<!--
  Card de produto — variante Bula (farmácia e saúde).

  ── O CARD QUE INVERTE NOME E SUBSTÂNCIA ─────────────────────────────────
  Três coisas só existem aqui:

  1. A TARJA, como faixa no topo do card. Não é um selo decorativo: é a mesma
     faixa que existe na caixa do remédio, e é o que diz se aquele item pode
     ser vendido direto ou depende de receita. Fica acima da foto porque é a
     primeira decisão, não um detalhe da ficha.

  2. O PRINCÍPIO ATIVO acima do nome comercial. É a inversão que define o tema.
     Quem chega com "Novalgina" escrita num papel precisa aprender que o que
     está comprando é dipirona 500 mg — e é lendo essa linha, repetida em toda
     tela, que ele aprende.

  3. A LINHA DE EQUIVALENTE. "Mesma substância a partir de R$ X" é a única
     mensagem do conjunto inteiro em que a loja ajuda o cliente a NÃO comprar
     o produto que ele abriu. Numa farmácia isso é o que constrói recompra:
     quem economizou uma vez volta.

  ── ⚠️ A TARJA AQUI É SIMULADA, E ISSO IMPORTA MAIS DO QUE NAS OUTRAS ─────
  Nos outros temas o dado estático é uma spec: mostrar "Drop 10 mm" errado é
  feio. Aqui o dado estático é CLASSIFICAÇÃO LEGAL, e mostrá-la errada é outra
  categoria de problema.

  Por isso: `tarjaDoSku()` deriva a faixa de um hash do SKU só para que o fluxo
  fique visível na demonstração. NENHUMA loja real pode derivar tarja de
  qualquer coisa que não seja o cadastro do produto — em produção isso vira
  `specifications.tarja`, alimentada do ERP/distribuidor. Consta no README, na
  seção de pendências, e a própria home avisa o visitante.

  Botão dentro de `<a>` navega ao clicar — por isso a linha de ações fica FORA
  do `ALink` e a moldura passou para a div que envolve os dois. Mesma armadilha
  que já custou tempo na Bitola, na Circuito, na Pauta e na Cadência.
-->
<template>
  <article
    ref="card"
    :data-sku="product.sku"
    class="group relative mx-auto h-full max-w-[320px] py-2"
  >
    <div
      class="flex h-full flex-col overflow-hidden rounded border-2
      border-base-200 bg-white transition hover:border-primary"
    >
      <!-- A faixa legal, antes de qualquer outra coisa. -->
      <span
        class="ui-tarja"
        :class="tarja.classe"
      >{{ tarja.rotulo }}</span>

      <ALink :href="link" class="flex grow flex-col p-3 no-underline">
        <div class="relative overflow-hidden rounded bg-base-50">
          <AImg
            v-if="images?.length"
            :picture="images[0]"
            :alt="title"
            class="block aspect-square w-full object-contain transition-transform
            duration-500 md:group-hover:scale-105"
          />
          <div v-else class="aspect-square w-full bg-base-100" />
          <span
            v-if="discountPercentage"
            class=":uno: absolute left-0 top-0 z-20 bg-secondary px-2 py-0.5
            text-xs font-bold text-white"
          >
            -{{ discountPercentage }}%
          </span>
        </div>

        <!-- Substância e dosagem primeiro; nome comercial depois. -->
        <span class="mt-3 ui-ativo">Dipirona sódica 500 mg</span>
        <component
          :is="headingTag"
          class="mt-0.5 line-clamp-2 text-base font-semibold leading-snug"
          :class="isActive ? 'text-base-900' : 'text-base-500'"
        >
          {{ title }}
        </component>

        <div class="mt-auto pt-3">
          <div v-if="isActive" class="[&_*]:font-bold [&_.text-xl]:text-xl">
            <Prices :product="product" />
          </div>
          <span v-else class="bg-warning-100 text-warning-800 ui-badge">
            {{ !isInStock ? $t.i19outOfStock : $t.i19inactive }}
          </span>

          <!--
            A mensagem que faz o cliente voltar. Só aparece em item sem tarja:
            trocar por equivalente é decisão de quem prescreve quando há
            receita no meio.
          -->
          <p v-if="isActive && !tarja.exigeReceita" class="mt-2">
            <span class="ui-economia">
              <i class="size-3.5 i-ph-arrow-down"></i>
              Genérico a partir de R$ 8,90
            </span>
          </p>
        </div>
      </ALink>

      <div v-if="isActive" class="px-3 pb-3">
        <!--
          Item com tarja não vai para o carrinho pela vitrine. Não é limitação
          de layout: é o fluxo do nicho — precisa de receita conferida por
          farmacêutico, e um botão de compra direta aqui prometeria uma coisa
          que o checkout não pode cumprir.
        -->
        <ALink
          v-if="tarja.exigeReceita"
          :href="link"
          class=":uno: block w-full text-center ui-btn-sm ui-btn-secondary"
        >
          <i class="mr-1 size-4 align-[-0.2em] i-ph-prescription"></i>
          Precisa de receita
        </ALink>
        <div v-else-if="isFailedToCart" class="text-sm text-warning-800">
          {{ $t.i19someItemIsUnavailable }}
        </div>
        <ALink
          v-else-if="hasVariations"
          :href="link"
          class=":uno: block w-full text-center ui-btn-sm ui-btn-primary"
        >
          Ver apresentações
        </ALink>
        <button
          v-else
          class=":uno: w-full ui-btn-sm ui-btn-primary"
          @click.stop.prevent="loadToCart(1)"
        >
          {{ $t.i19addToCart }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  type Props as UseProductCardProps,
  useProductCard,
} from '@@sf/composables/use-product-card';
import Prices from '~/components/Prices.vue';

export type Props = UseProductCardProps & {
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
const props = withDefaults(defineProps<Props>(), {
  headingTag: 'h3',
});
const {
  product,
  title,
  link,
  images,
  isInStock,
  isActive,
  discountPercentage,
  hasVariations,
  loadToCart,
  isFailedToCart,
} = useProductCard(props as UseProductCardProps);
const card = ref<HTMLElement | null>(null);

/*
  ⚠️ SIMULAÇÃO — ver o comentário longo no topo do arquivo.

  Deriva a tarja de um hash do SKU só para que a demonstração mostre os dois
  fluxos (compra direta e item que pede receita) na mesma vitrine. Se todos os
  cards trouxessem a mesma faixa, a metade mais importante do tema ficaria
  invisível no print e no clique.

  Determinístico de propósito: o mesmo produto tem sempre a mesma faixa entre
  recarregamentos, senão a vitrine pisca de estado a cada visita.

  Em produção: `product.specifications?.tarja?.[0]?.value`, e nada mais.
*/
type Tarja = { rotulo: string; classe: string; exigeReceita: boolean };

const TARJAS: Record<string, Tarja> = {
  vermelha: {
    rotulo: 'Venda sob prescrição médica',
    classe: 'ui-tarja-vermelha',
    exigeReceita: true,
  },
  livre: {
    rotulo: 'Venda livre — sem receita',
    classe: 'ui-tarja-livre',
    exigeReceita: false,
  },
};

const tarjaDoSku = (sku?: string): Tarja => {
  if (!sku) return TARJAS.livre;
  let soma = 0;
  for (let i = 0; i < sku.length; i++) soma += sku.charCodeAt(i);
  /* Uma em cada quatro com tarja: proporção que deixa o fluxo visível sem
     transformar a vitrine numa parede de "precisa de receita". */
  return soma % 4 === 0 ? TARJAS.vermelha : TARJAS.livre;
};

const tarja = computed(() => tarjaDoSku(product.sku));
</script>
