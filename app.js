'use strict'//Recomendable usar el modo estricto

//Instanciamos los paquetes
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

//Configuramos un puerto que vamos a utilizar para nuestro servidor
const app = express();
//Ahora app va a tener todos los metodos que cuenta express pero de una manera mas amigable
app.set('port',5000);
app.use(bodyParser.json());//De esta manera vamos a entender los elementos json que reciba

/*Crearemos la ruta principal donde va a estar nuestro servidor
Esto es para dar una vista y comprobar que nuestro servidor 
se encuentra disponible.*/
app.get('/',function(req,response){
    response.send('Hola mundo!');
})

//Ahora vamos a añadir el webhook
app.get('/webhook',function(req,response){
    response.send('Estamos en el webhook!');
})

//Hacemos el manejador de mensajes
function handleMessage(event){
    //Extraemos el mensaje
    const messageText = event.message.text;
    //Creamos un objeto para enviar esta informacion
    const messageData = {
        message: {
            text: messageText
        }
    }
    //Funcion que envia la información
    callSendApi(messageData);
}

//Funcion para enviar la información
/*function callSendApi(response){
    request({
        "uri": "https://-->Aqui-va-a-donde-lo-mandamos<--",
        "method":"POST",
        "json":"response"
    },
    //funcion para saber si se envió el mensaje
    function(err){
        if(err){
            console.log('Ha ocurrido un error')
        }else{
            console.log('Mensaje enviado')
        }
    }
    )
}*/

//Vamos a recibir el mensaje y entenderlo
app.post('/webhook',function(req,rest){
    const webhook_event = req.body.entry[0];
    if(webhook_event.messagin){
        webhook_event.messagin.array.forEach(event => {
           // console.log(event);
            handleMessage(event);
        });
    }
    //esto es para decir que recibimos el mensaje (No se si sea necesario)
    rest.sendStatus(200);
})

//Creamos un mensaje que nos diga si esta funcionando nuestra app
app.listen(app.get('port'),function(){
    console.log('Nuestro servidor esta funcionando en el puerto ',app.get('port'));
})
