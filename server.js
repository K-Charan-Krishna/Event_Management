import server from './app.js'
import { connectDB } from './src/config/database.js'

const port=5001

connectDB()
server.listen(port,()=>{
    console.log(`Started server and  listing from ${port}`)
})
  