const api   = require('express').Router()

const { Payment } = require('../seeds')
api.get('/payments', (req, res) => {
  payments = []
  stats = {
      closed: 0,
      active: 0,
      pending: 0,
      total: 0
  }

  const statuses = ['closed', 'active', 'pending']
  statuses.forEach(status => {
      for (let i=0; i< faker.random.number(6); i++) {
          const payment = new Payment(status)
          payments.push(payment)
          stats[status] += payment.amount            
      }                
  })

  stats.total = stats.pending + stats.active

  payments.sort((payment1, payment2) => {        
      return -(moment(payment1.create_dt).unix() - moment(payment2.create_dt).unix())
  })

  res.status(200).json({
      payments, stats
  })
})

module.exports = api