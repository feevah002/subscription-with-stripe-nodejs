const mongoose = require('mongoose')
// mongoose.Promise = global.Promise

const db = process.env.MONGODB

main().catch(err=>{
  console.log(err)
})

async function main(){
  mongoose.connect(db)
}