// ==UserScript==
// @name         Alura Bypass
// @version      2.1
// @description  Automatiza tarefas nos cursos da Alura
// @match        *://cursos.alura.com.br/course/*
// @grant        none
// @author       mzzvxm
// ==/UserScript==

;(() => {
  class AluraAutomatorEnhanced {
    constructor() {
      this.splashScreen = null
      this.hiddenMessage = "bWFkZSBieSBtenp2eG0=" // "made by mzzvxm" em base64
      this.sessionKey = "alura_automator_splash_shown"
      this.init()
    }

    async init() {
      // Verifica se a splash screen já foi mostrada nesta sessão
      const splashShown = sessionStorage.getItem(this.sessionKey)

      if (!splashShown) {
        await this.showSplashScreen()
        await this.wait(2000)
        await this.hideSplashScreen()
        // Marca que a splash screen foi mostrada nesta sessão
        sessionStorage.setItem(this.sessionKey, "true")
      } else {
        // Se já foi mostrada, apenas mostra uma notificação discreta
        this.showQuietNotification()
      }

      this.runAutomation()
    }

    async showSplashScreen() {
      this.splashScreen = document.createElement("div")
      this.splashScreen.className = "alura-automator-splash"

      this.splashScreen.innerHTML = `
        <div class="splash-container">
          <div class="logo-section">
            <div class="logo-icon">
              <svg width="100" height="100" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="50" stroke="url(#gradientBlue)" stroke-width="4" fill="none" opacity="0.3"/>
                <rect x="35" y="35" width="50" height="50" rx="8" fill="url(#gradientBlue)" opacity="0.7"/>
                <path d="M45 55 L55 65 L75 45" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="60" cy="30" r="8" fill="#00d4ff"/>
                <circle cx="30" cy="60" r="6" fill="#0099cc"/>
                <circle cx="90" cy="60" r="6" fill="#0099cc"/>
                <circle cx="60" cy="90" r="8" fill="#00d4ff"/>
                <defs>
                  <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#0099cc;stop-opacity:1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="logo-text">
              <span class="alura-text">ALURA</span>
              <span class="automator-text">BYPASS</span>
            </div>
            <div class="subtitle-text">Automação de Tarefas</div>
          </div>

          <div class="loading-section">
            <div class="loading-bar">
              <div class="loading-progress"></div>
            </div>
            <div class="loading-text">Inicializando automação...</div>
          </div>

          <div class="features-section">
            <div class="feature-item">
              <div class="feature-icon">⚡</div>
              <div class="feature-text">Automação Rápida</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🎯</div>
              <div class="feature-text">Conclusão Total</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🚀</div>
              <div class="feature-text">Progresso Automático</div>
            </div>
          </div>

          <div class="creator-section">
            <div class="creator-label">Desenvolvido por</div>
            <div class="creator-name">@mzzvxm</div>
            <div class="version-badge">v2.1</div>
          </div>

          <div class="particles-container">
            ${Array.from({ length: 12 }, (_, i) => `<div class="particle particle-${i}"></div>`).join("")}
          </div>
        </div>
      `

      this.injectSplashStyles()
      document.body.appendChild(this.splashScreen)

      setTimeout(() => {
        this.splashScreen.classList.add("visible")
        this.animateLoading()
      }, 100)
    }

    injectSplashStyles() {
      const style = document.createElement("style")
      style.textContent = `
        .alura-automator-splash {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #001122 0%, #003366 30%, #0066cc 70%, #0099ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow: hidden;
        }

        .alura-automator-splash.visible {
          opacity: 1;
        }

        .splash-container {
          text-align: center;
          position: relative;
          z-index: 2;
          max-width: 500px;
          padding: 40px;
          animation: slideInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideInUp {
          from {
            transform: translateY(60px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .logo-section {
          margin-bottom: 50px;
        }

        .logo-icon {
          margin-bottom: 25px;
          animation: logoRotate 6s ease-in-out infinite;
        }

        @keyframes logoRotate {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(0px) rotate(0deg); }
          75% { transform: translateY(-5px) rotate(-5deg); }
        }

        .logo-text {
          margin-bottom: 15px;
        }

        .alura-text {
          font-size: 48px;
          font-weight: 900;
          color: #ffffff;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          letter-spacing: 4px;
        }

        .automator-text {
          font-size: 48px;
          font-weight: 900;
          color: #00d4ff;
          text-shadow: 0 0 30px rgba(0, 212, 255, 0.8);
          letter-spacing: 4px;
          margin-left: 15px;
        }

        .subtitle-text {
          font-size: 16px;
          color: #66ccff;
          font-weight: 400;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .loading-section {
          margin: 45px 0;
        }

        .loading-bar {
          width: 350px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          margin: 0 auto 20px;
          overflow: hidden;
          position: relative;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(90deg, #00d4ff, #0099cc, #66ccff);
          border-radius: 3px;
          width: 0%;
          transition: width 0.4s ease;
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
          position: relative;
        }

        .loading-progress::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .loading-text {
          font-size: 18px;
          color: #e0f4ff;
          font-weight: 300;
        }

        .features-section {
          display: flex;
          justify-content: center;
          gap: 35px;
          margin: 40px 0;
          flex-wrap: wrap;
        }

        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards;
        }

        .feature-item:nth-child(1) { animation-delay: 0.3s; }
        .feature-item:nth-child(2) { animation-delay: 0.5s; }
        .feature-item:nth-child(3) { animation-delay: 0.7s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-icon {
          font-size: 28px;
          margin-bottom: 5px;
        }

        .feature-text {
          font-size: 14px;
          color: #b3e0ff;
          font-weight: 500;
        }

        .creator-section {
          margin-top: 50px;
        }

        .creator-label {
          font-size: 13px;
          color: #7fb3d9;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .creator-name {
          font-size: 20px;
          color: #00d4ff;
          font-weight: 700;
          text-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
          margin-bottom: 12px;
        }

        .version-badge {
          display: inline-block;
          padding: 6px 12px;
          background: rgba(0, 212, 255, 0.2);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 20px;
          font-size: 12px;
          color: #00d4ff;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00d4ff;
          border-radius: 50%;
          opacity: 0.8;
          animation: particleFloat 10s linear infinite;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }

        ${Array.from(
          { length: 12 },
          (_, i) => `
          .particle-${i} {
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
            animation-duration: ${8 + Math.random() * 4}s;
          }
        `,
        ).join("")}
      `
      document.head.appendChild(style)
    }

    async animateLoading() {
      const progressBar = this.splashScreen.querySelector(".loading-progress")
      const loadingText = this.splashScreen.querySelector(".loading-text")

      const steps = [
        { progress: 20, text: "Detectando curso..." },
        { progress: 40, text: "Analisando tarefas..." },
        { progress: 60, text: "Configurando automação..." },
        { progress: 80, text: "Preparando execução..." },
        { progress: 100, text: "Sistema pronto!" },
      ]

      for (const step of steps) {
        progressBar.style.width = `${step.progress}%`
        loadingText.textContent = step.text
        await this.wait(400)
      }
    }

    async hideSplashScreen() {
      await this.wait(800)
      this.splashScreen.style.opacity = "0"
      setTimeout(() => {
        this.splashScreen?.remove()
        this.showSuccessNotification()
      }, 1000)
    }

    showSuccessNotification() {
      const notification = document.createElement("div")
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00d4ff, #0099cc);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-family: 'Segoe UI', sans-serif;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
        z-index: 99999;
        animation: slideInRight 0.5s ease;
      `
      notification.innerHTML = "⚡ Alura Bypass ativado!"

      const style = document.createElement("style")
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `
      document.head.appendChild(style)

      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 4000)
    }

    showQuietNotification() {
      const notification = document.createElement("div")
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 212, 255, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-family: 'Segoe UI', sans-serif;
        font-weight: 500;
        font-size: 12px;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        z-index: 99999;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
      `
      notification.innerHTML = "⚡ Bypass ativo"

      const style = document.createElement("style")
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `
      document.head.appendChild(style)

      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 2000)
    }

    runAutomation() {
      // Insere a mensagem codificada na descrição do exercício
      const formattedTextEl = document.querySelector(".formattedText")
      if (formattedTextEl) {
        formattedTextEl.innerHTML = atob(this.hiddenMessage)
      }

      // Executa somente se botão de avançar existir (ou seja, estamos em uma tarefa)
      const nextButton = document.querySelector(".bootcamp-next-button")
      if (!nextButton) return

      // Abre transcrição (se houver)
      document.getElementById("transcription")?.click()

      // Marca todas as alternativas corretas (checkbox)
      document
        .querySelectorAll(".alternativeList li[data-correct='true'] input[type='checkbox']")
        .forEach((checkbox) => {
          if (!checkbox.checked) {
            checkbox.click()
            this.showActionFeedback("✅ Alternativa marcada")
          }
        })

      // --- CORREÇÃO ---
      // Para questões de rádio, seleciona a primeira opção, pois a correta não é informada no HTML inicial.
      const firstRadioButton = document.querySelector(".alternativeList-item input[type='radio']")
      if (firstRadioButton && !firstRadioButton.checked) {
        firstRadioButton.click()
        this.showActionFeedback("🎯 Resposta selecionada (1ª opção)")
      }
      // --- FIM DA CORREÇÃO ---

      // Envia tarefa (caso haja botão de envio)
      const submitButton = document.querySelector(".task-actions-button")
      if (submitButton) {
        submitButton.click()
        this.showActionFeedback("📤 Tarefa enviada")
      }

      // Marca alternativas corretas também em formulários (redundância)
      document
        .querySelectorAll("form[data-gtm-form-interact-id='0'] li[data-correct='true'] input[type='checkbox']")
        .forEach((checkbox) => {
          if (!checkbox.checked) checkbox.click()
        })

      // Clica em blocos ordenáveis (caso existam)
      const blocks = document.querySelectorAll("#sortBlocksOrigin .block")
      if (blocks.length > 0) {
        blocks.forEach((block) => block.click())
        this.showActionFeedback("🔄 Blocos organizados")
      }

      // Envia blocos ordenados
      const submitBlocks = document.getElementById("submitBlocks")
      if (submitBlocks) {
        submitBlocks.click()
        this.showActionFeedback("📋 Blocos enviados")
      }

      // Avança para a próxima atividade, se houver
      document.querySelector("a.task-actions-button-next")?.click()

      // Se for uma tarefa de link de projeto, envia link em branco para preservar progresso
      const projectLink = document.getElementById("project-link")
      if (projectLink) {
        this.handleProjectLink()
      }

      // Aguarda 5 segundos e avança
      setTimeout(() => {
        nextButton.click()
        this.showActionFeedback("➡️ Avançando para próxima tarefa")
      }, 5000)
    }

    handleProjectLink() {
      const sectionEl = document.querySelector(".task-body-header-title small")
      const sectionNum = sectionEl?.textContent.trim().replace(/^0/, "") || "1"

      const urlParts = window.location.pathname.split("/")
      const courseSlug = urlParts[2]
      const taskId = Number.parseInt(urlParts.at(-1))

      const submitUrl = `https://cursos.alura.com.br/course/${courseSlug}/section/${sectionNum}/linksubmit/answer`

      fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          taskId,
          alternatives: [],
          linkUrl: "https://github.com/undefined/",
        }),
      })

      this.showActionFeedback("🔗 Link de projeto enviado como placeholder", 6000)
      alert("Link de projeto enviado como placeholder. Complete manualmente depois.")
    }

    showActionFeedback(message, duration = 2000) {
      const feedback = document.createElement("div")
      feedback.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 212, 255, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 13px;
        font-weight: 500;
        z-index: 99998;
        animation: slideInLeft 0.3s ease;
        backdrop-filter: blur(10px);
      `
      feedback.textContent = message

      const style = document.createElement("style")
      style.textContent = `
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `
      document.head.appendChild(style)

      document.body.appendChild(feedback)
      setTimeout(() => feedback.remove(), duration)
    }

    wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
  }

  // Inicializar o sistema
  new AluraAutomatorEnhanced()
})()
