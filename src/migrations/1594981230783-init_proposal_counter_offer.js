const _ = require('lodash')
const Presentation = require('../models/presentation')

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // const result = await Presentation.updateMany({ status: 'proposal' }, { counterOffer: { price: 0, duration: 0 }}, { upsert:true }, (err, doc) => { console.log(doc) })
  const presentations = await Presentation.find()
  presentations.forEach((presentation) => {
    presentation.proposal.counterOffer = {
      price: 0, duration: 0, status: 'void'
    }

    // console.log(presentation.proposal)
    presentation.save()
    console.log(`Saved presentation ${presentation.id}`)
  })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
