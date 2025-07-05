// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar background change on scroll
  const navbar = document.querySelector(".custom-navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(26, 29, 41, 0.98)"
    } else {
      navbar.style.background = "rgba(26, 29, 41, 0.95)"
    }
  })

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add fade-in class to elements
  const elementsToAnimate = document.querySelectorAll(
    ".feature-card, .tech-card, .pricing-card, .support-card, .stat-item",
  )
  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Contact form submission
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      // Here you would typically send the data to your server
      console.log("Form submitted:", data)

      // Show success message
      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")

      // Reset form
      this.reset()
    })
  }

  // Pricing button clicks
  const pricingButtons = document.querySelectorAll(".pricing-card .btn")
  pricingButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const planName = this.closest(".pricing-card").querySelector(".pricing-title").textContent
      alert(`Você selecionou o plano: ${planName}. Redirecionando para o checkout...`)
    })
  })

  // CTA button clicks
  const ctaButtons = document.querySelectorAll(".cta-buttons .btn, .hero-buttons .btn")
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#" || this.getAttribute("href") === "") {
        e.preventDefault()
        const buttonText = this.textContent.trim()

        if (buttonText.includes("Teste") || buttonText.includes("Demo")) {
          alert("Iniciando teste grátis... Você será redirecionado para o cadastro.")
        } else if (buttonText.includes("Especialista")) {
          alert("Conectando com um especialista... Você será redirecionado para o chat.")
        }
      }
    })
  })

  // Support card clicks
  const supportButtons = document.querySelectorAll(".support-card .btn")
  supportButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const supportType = this.closest(".support-card").querySelector("h4").textContent
      alert(`Acessando: ${supportType}`)
    })
  })

  // Mobile menu close on link click
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")
  const bootstrap = window.bootstrap // Declare the bootstrap variable

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Add active class to navigation based on scroll position
  const sections = document.querySelectorAll("section[id]")
  const navItems = document.querySelectorAll(".navbar-nav .nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active")
      }
    })
  })

  // Counter animation for stats
  const counters = document.querySelectorAll(".stat-number")
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = counter.textContent
          const numericValue = Number.parseInt(target.replace(/[^\d]/g, ""))

          if (numericValue > 0) {
            animateCounter(counter, numericValue, target)
          }

          counterObserver.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })

  function animateCounter(element, target, originalText) {
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = originalText
        clearInterval(timer)
      } else {
        const suffix = originalText.includes("K")
          ? "K+"
          : originalText.includes("%")
            ? "%"
            : originalText.includes("/")
              ? "/7"
              : "+"
        element.textContent = Math.floor(current) + suffix
      }
    }, 20)
  }
})

// Utility functions
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Add some interactive features
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".feature-card, .tech-card, .pricing-card")

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
    } else {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    }
  })
})
