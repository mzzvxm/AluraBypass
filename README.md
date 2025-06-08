# 🧱 AluraBypass

**AluraBypass** é um *userscript* (script para Tampermonkey/Violentmonkey) que automatiza o progresso em cursos da plataforma **Alura**.

---

## 🚀 Funcionalidades

* Marca automaticamente os vídeos/aulas como concluídos.
* Avança para a próxima lição sem intervenção manual.
* Compatível com ambiente desktop e mobile (modo desktop ativado).

---

## 🛠️ Instalação

1. Instale um gerenciador de userscripts:

   * **Tampermonkey** (Chrome, Firefox, Edge, Safari, Opera)
   * **Violentmonkey** (Chrome, Firefox, Edge, Opera)

2. Adicione o script:

   * Abra o painel do gerenciador.
   * Clique em **Criar novo script**.
   * Apague qualquer código existente.
   * Copie e cole o conteúdo de `script.js`.
   * Salve.



## ✅ Uso

* Acesse um curso da **Alura**.
* O script detecta automaticamente se está numa lição.
* Pressione play/execute (ou use bookmarklet) para iniciar.
* O progresso será realizado automaticamente.
* Ele marcará a aula e avançará para a próxima.

## ⚠️ Aviso Legal

Este script é fornecido **somente para fins educativos**. Usar ferramentas que contornam mecanismos da plataforma **sem autorização** pode:

* Violentar os **termos de uso** da Alura.
* Gerar **penalidades** na conta.
* Ser considerado **prática antiética**.

Use com **responsabilidade** e **motivação para aprendizado**.



## 📌 Script (Exemplo de bookmarklet)

```javascript
javascript:fetch("https://raw.githubusercontent.com/mzzvxm/AluraBypass/main/script.js").then(res=>res.text()).then(eval);
```



## 💡 Dicas

* No **mobile**, ative o **modo desktop** no navegador.
* Está com algum problema? Abra uma **issue** 📌 ou pull request.

## 📝 Licença

Este projeto está sob a **\[MIT License]**


**Exemplo de uso no browser:**

1. Instale o userscript.
2. Vá para uma aula da Alura.
3. Aproveite o progresso automático!
