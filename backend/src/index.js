const app= require('./app');
async function main(){
    await app.listen(400);
    console.log('servidor iniciado en 4000');
}

main();