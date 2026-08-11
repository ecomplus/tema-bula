import { fileURLToPath } from 'node:url';
// Phosphor: e o unico conjunto com cobertura real de saude (pill, prescription,
// first-aid, thermometer) sem virar pictograma solto. Repete a escolha da
// Lapidar de proposito — conjunto de icone e ferramenta, nao identidade; o que
// separa as duas variantes e paleta, tipografia e estrutura de card.
import { icons as iPh } from '@iconify-json/ph';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
process.env.STOREFRONT_BASE_DIR = __dirname;

// eslint-disable-next-line import/first
import { genTailwindConfig } from '@cloudcommerce/storefront/config/storefront.tailwind.mjs';

/*
 * Tema da variante "Bula" (farmácia e saúde — MIP, dermocosmético, higiene e
 * cuidado contínuo).
 *
 * As cores de marca (primary/secondary) NÃO vêm daqui: são lidas de
 * `content/settings.json` pelo próprio `genTailwindConfig`, para continuarem
 * editáveis pelo CMS. Aqui fica só o que o CMS não expõe.
 *
 * ── A REGRA DE COR DESTE TEMA ────────────────────────────────────────────
 * Vermelho é TARJA, nunca marca. Numa farmácia a faixa colorida da caixa é
 * informação legal — vermelha é venda sob prescrição, preta é controlada — e
 * quem usa vermelho de marca ensina o cliente a ignorar a única cor da tela
 * que ele precisava ler. Por isso a paleta inteira é fria e o vermelho só
 * aparece em `.ui-tarja`.
 *
 * Turquesa + azul-petróleo profundo, e não o verde-cruz clássico do nicho: o
 * conjunto já tem cinco variantes em verde (despensa, morada, ninho, prumo,
 * cadência) e uma sexta viraria repetição.
 *
 * COMO ISSO NÃO VIRA A CADÊNCIA: as duas ficam na faixa turquesa/petróleo, e
 * o risco é real — foi o que aconteceu entre Bitola e Circuito. O que separa
 * não é o matiz, é o resto do sistema. Na Cadência o secundário é volt e o
 * hero grita; aqui o secundário é quase preto e o hero é o mais calmo do
 * conjunto. Lá o título é `Anton` em caixa alta; aqui não existe display
 * nenhuma e o corpo é o maior de todas as variantes (ver `style.css`).
 *
 * TODO: validar — a paleta é proposta, não veio de levantamento de temas
 * campeões do nicho.
 */
const themeOptions = {
  generalIconSets: [iPh],
  /*
   * O pacote apelida `i-close` para `x-mark`, que é o nome do heroicons. No
   * Phosphor o ícone se chama `x`, e como o conjunto do tema registra o atalho
   * ANTES do heroicons, `i-close` saía como `i-ph-x-mark` — utilitário que não
   * casa some em silêncio no UnoCSS, e o botão de fechar do menu e do carrinho
   * ficava invisível. O build avisa (`unmatched utility`), mas não falha: só
   * aparece se alguém ler o log inteiro.
   *
   * Vale para qualquer variante que troque `generalIconSets`. Conferir sempre
   * no CSS construído, com `grep 'i-close{' dist/client/_astro/*.css`.
   */
  iconAliases: { close: 'x' },
  /*
   * Cinza de viés azul frio. Precisa ser mais escuro no meio da rampa que o
   * padrão do conjunto: texto de apoio em `base-500` sobre branco é onde a
   * legibilidade costuma cair primeiro, e este é o tema em que ela não pode.
   */
  baseColor: {
    50: '#f6f9fa',
    100: '#eaf0f2',
    200: '#d6e0e4',
    300: '#b3c3c9',
    400: '#8298a1',
    500: '#5f757e',
    600: '#4a5f68',
    700: '#3a4c54',
    800: '#2b3941',
    900: '#1a252b',
    950: '#0d1518',
  },
};

const tailwindConfig = genTailwindConfig(themeOptions);

tailwindConfig.theme.extend.borderRadius = {
  ...tailwindConfig.theme.extend.borderRadius,
  DEFAULT: '0.375rem',
};

export default {
  ...tailwindConfig,
  themeOptions,
};
