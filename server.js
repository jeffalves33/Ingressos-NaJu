const express = require("express")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 3000

// Middleware para servir arquivos estáticos
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// API Routes para funcionalidades futuras

// Rota para contato
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body

  // Aqui você implementaria o envio de email ou salvamento no banco
  console.log("Novo contato recebido:", { name, email, message })

  res.json({
    success: true,
    message: "Mensagem enviada com sucesso!",
  })
})

// Rota para newsletter/teste grátis
app.post("/api/signup", (req, res) => {
  const { email, plan } = req.body

  // Aqui você implementaria o cadastro do usuário
  console.log("Novo cadastro:", { email, plan })

  res.json({
    success: true,
    message: "Cadastro realizado com sucesso!",
  })
})

// Rota para solicitar demo
app.post("/api/demo", (req, res) => {
  const { name, email, company, phone } = req.body

  // Aqui você implementaria o agendamento da demo
  console.log("Solicitação de demo:", { name, email, company, phone })

  res.json({
    success: true,
    message: "Demo agendada com sucesso!",
  })
})

// Rota para suporte
app.post("/api/support", (req, res) => {
  const { type, message, priority } = req.body

  // Aqui você implementaria o sistema de tickets de suporte
  console.log("Ticket de suporte:", { type, message, priority })

  res.json({
    success: true,
    message: "Ticket criado com sucesso!",
    ticketId: Math.random().toString(36).substr(2, 9),
  })
})

// Rota para estatísticas (para dashboard futuro)
app.get("/api/stats", (req, res) => {
  // Dados mockados - em produção viriam do banco de dados
  const stats = {
    ticketsSold: 523847,
    eventsCompleted: 1247,
    uptime: 99.9,
    supportHours: 24,
  }

  res.json(stats)
})

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Algo deu errado!",
  })
})

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📱 Acesse: http://localhost:${PORT}`)
  console.log(`🎫 TicketPro - Plataforma de Eventos`)
})

module.exports = app
