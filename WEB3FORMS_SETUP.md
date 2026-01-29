# Configuração do formulário de contacto (Web3Forms)

O formulário envia os dados diretamente para o teu email através do **Web3Forms** (gratuito, sem backend).

## Passos

1. **Obter o Access Key**
   - Acede a [web3forms.com](https://web3forms.com).
   - Introduz o teu email: `diegofischer.dev@gmail.com`.
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
   - Deves receber o email em `diegofischer.dev@gmail.com`.

## Limite gratuito

- Plano gratuito: **250 submissões por mês**.
- Não é obrigatório criar conta: basta o email para gerar o Access Key.
