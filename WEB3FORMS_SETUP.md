# Configuração do formulário de contacto (Web3Forms)

O formulário envia os dados diretamente para o teu email através do **Web3Forms** (gratuito, sem backend).

## Passos

1. **Obter o Access Key**
   - Acede a [web3forms.com](https://web3forms.com).
   - Introduz o teu email: `info@limaborregana.com`.
   - Clica em **"Create Access Key"** (não é obrigatório criar conta).
   - Copia o **Access Key** que aparece (ex.: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).

2. **Colocar o Access Key no projeto**
   - Abre `assets/js/main.js`.
   - No início do ficheiro, substitui `REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY` pelo teu Access Key:
   ```javascript
   const WEB3FORMS_ACCESS_KEY = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';  // o teu Access Key
   ```

3. **Testar**
   - Abre o site, preenche o formulário de contacto e envia.
   - Deves receber o email em `info@limaborregana.com`.

## Alterar o email de destino (apontamento do form)

O formulário envia para o email associado ao **Access Key** que está em `assets/js/main.js`. Para passar a receber em outro email (ex.: `info@limaborregana.com`), faz o seguinte **fora do código**:

1. **Aceder ao Web3Forms**
   - Abre [web3forms.com](https://web3forms.com) no browser.

2. **Criar um novo Access Key para o novo email**
   - No campo de email, introduz o email onde queres receber os contactos (ex.: `info@limaborregana.com`).
   - Clica em **"Create Access Key"**.

3. **Confirmar o email**
   - O Web3Forms envia um email de verificação para esse endereço.
   - Abre a caixa de entrada de `info@limaborregana.com`, abre o email do Web3Forms e clica no link de verificação.

4. **Copiar o novo Access Key**
   - Depois de verificado, volta a [web3forms.com](https://web3forms.com) e introduz de novo o mesmo email.
   - Clica em **"Create Access Key"** (ou em **"Get your Access Key"**) e copia o **Access Key** que aparecer (formato: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

5. **Atualizar o código (uma única vez)**
   - Abre o ficheiro `assets/js/main.js`.
   - Encontra a linha:  
     `const WEB3FORMS_ACCESS_KEY = '...';`
   - Substitui o valor entre aspas pelo **novo** Access Key que copiaste.
   - Guarda o ficheiro e faz upload do `main.js` atualizado para o servidor (ou publica de novo o site).

A partir daí, as submissões do formulário passam a ser enviadas para o email associado a esse novo Access Key (ex.: `info@limaborregana.com`). O apontamento do form é sempre o email que usaste no Web3Forms ao criar esse Access Key.

## Limite gratuito

- Plano gratuito: **250 submissões por mês**.
- Não é obrigatório criar conta: basta o email para gerar o Access Key.
