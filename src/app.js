import express from 'express'

const app = express()
const PORT=3000

app.get('/',function(req,res){
console.log("Server running");

})

app.listen(PORT, ()=>{
    console.log(`PORT RUNNING ON ${PORT}`);
    
})

export {app}