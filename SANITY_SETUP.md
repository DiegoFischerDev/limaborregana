# Sanity CMS – Lima Borregana

O blog do site usa o **Sanity** como CMS. O conteúdo é editado no Sanity Studio e exibido dinamicamente nas páginas do site (Notícias, artigo individual e secção de artigos na homepage).

## 1. Criar o projeto na Sanity

1. Acede a [sanity.io](https://www.sanity.io) e cria uma conta (ou inicia sessão).
2. Cria um novo projeto em [manage.sanity.io](https://www.sanity.io/manage):
   - **Project name:** por exemplo "Lima Borregana"
   - **Dataset:** `production` (recomendado)
3. Anota o **Project ID** (aparece nas definições do projeto). Vais precisar dele no site e no Studio.

## 2. Configurar o Sanity Studio (local)

O Studio está na pasta `sanity-studio/`.

```bash
cd limaborregana/sanity-studio
npm install
```

Cria um ficheiro `.env` na pasta `sanity-studio/` com:

```
SANITY_STUDIO_PROJECT_ID=o_teu_project_id
SANITY_STUDIO_DATASET=production
```

Substitui `o_teu_project_id` pelo Project ID do passo 1.

Em alternativa, podes editar `sanity-studio/sanity.config.js` e trocar `SEU_PROJECT_ID` pelo teu Project ID.

Para correr o Studio em modo desenvolvimento:

```bash
npm run dev
```

O Studio abre em **http://localhost:3333**. Aqui podes criar e editar **Artigos** (título, slug, imagem principal, resumo, data de publicação e corpo em texto rico).

## 3. Configurar o site (frontend)

No ficheiro **`assets/js/sanity.js`** (na raiz do site, não dentro de `sanity-studio/`), altera as constantes no início:

```javascript
const SANITY_PROJECT_ID = 'o_teu_project_id';  // o mesmo do Studio
const SANITY_DATASET = 'production';
```

Sem isto, o site não consegue buscar artigos e usa o **fallback estático** (os artigos em HTML que já existem).

## 4. Onde o conteúdo aparece

| Página / secção | Comportamento |
|----------------|----------------|
| **Notícias** (`noticias.html`) | Lista todos os artigos do Sanity (ordenados por data). Se não houver Sanity configurado ou não houver artigos, mostra os 6 artigos estáticos. |
| **Homepage** (`index.html`) | Mostra os **3 artigos mais recentes** do Sanity. Fallback: 3 artigos estáticos. |
| **Artigo** (`article.html?slug=xxx`) | Mostra o artigo cujo slug é `xxx`. O slug é definido no Studio (ex.: `golden-visa` → URL `article.html?slug=golden-visa`). |

## 5. Esquema do documento "Artigo"

Cada artigo no Studio tem:

- **Título** – obrigatório
- **Slug (URL)** – gerado a partir do título (ex.: "Golden Visa" → `golden-visa`). Usado em `article.html?slug=golden-visa`
- **Imagem principal** – usada nos cards e no topo da página do artigo
- **Resumo** – texto curto para cards e meta descrição
- **Data de publicação** – ordenação “mais recente primeiro”
- **Corpo do artigo** – texto rico (parágrafos, títulos, listas, negrito, itálico, imagens)

## 6. Publicar o Studio (opcional)

Para dar acesso ao Studio a outros editores sem correr o projeto localmente:

```bash
cd sanity-studio
npm run deploy
```

Segue as instruções para ligar ao projeto Sanity. O Studio fica disponível num URL do tipo `https://o-teu-projeto.sanity.studio`.

## 7. Artigos estáticos (artigo-*.html)

Os ficheiros `artigo-golden-visa.html`, `artigo-credito-jovem.html`, etc. continuam online. Podem ser mantidos para ligações antigas ou redirecionamentos. Os links gerados pelo Sanity apontam para `article.html?slug=...`. Se quiseres que um slug aponte para uma página estática, podes criar esse artigo no Sanity com o mesmo slug e conteúdo, ou manter redirecionamentos no servidor (ex.: `.htaccess`) de `article.html?slug=golden-visa` para `artigo-golden-visa.html`.

## Resumo rápido

1. Criar projeto em sanity.io e anotar o **Project ID**.
2. Em `sanity-studio/`: criar `.env` com `SANITY_STUDIO_PROJECT_ID` e fazer `npm install` + `npm run dev`.
3. Em `assets/js/sanity.js`: definir `SANITY_PROJECT_ID` e `SANITY_DATASET`.
4. No Studio (localhost:3333), criar artigos com título, slug, imagem, resumo e corpo.
5. No site, a lista em Notícias e os 3 artigos na homepage passam a vir do Sanity; cada artigo abre em `article.html?slug=o-teu-slug`.
