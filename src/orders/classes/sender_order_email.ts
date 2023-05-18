

import { BadRequestException } from "@nestjs/common";
import { createTransport } from "nodemailer";
import { OrderData } from "./order_data";
import { SenderOrder } from "./sender_order";

export class SenderOrderEmail extends SenderOrder{


    constructor(){
        super();
    }


    private async getTransporter(){
        const transporter = createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure: true,
            auth: {
                user:'secretfriend202212@gmail.com',
                pass:"ekshkcoyaswjaley"
            }
        })

        const vertification = await transporter.verify()


        return transporter

    }

    private mailTemplate(orderData: OrderData){
        return  `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Document</title>
        </head>
        
        <style>
        

            *{
                margin:0;
                padding:0;
            }
            html{
                font-family: sans-serif;
            }
            body{
                margin: 0.5rem;

            }
            .card{
                width: 300px;
                box-shadow: 0px 0px 2px rgba(0,0,0,0.5);
                border-radius: 1rem;
            }
            .card-head{
                background-color: #ffd046;
                padding: 0.5rem 1rem;
                border-top-left-radius: 1rem;
                border-top-right-radius: 1rem;
            }
            .card-title{
                font-size: 1.4rem;
            }
            .card-body{
                display: flex;
                flex-direction: column;
            }
            .card-body-section{
                padding: 0.5rem 1rem;
        
            }
            .tag-container{
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .tag-title{
                font-size: 1rem;
            }
            .tag-text{
                font-size: 0.8rem;
            }
            
        
        </style>
        <body>
            
        
            <div class="card">
                <div class="card-head">
                    <h1 class="card-title">Pedido</h1>
                </div>
                <div class="card-body">
                    <div class="card-body-section">
                        <div class="tag-container">
                            <h2 class="tag-title">Nombre:</h2>
                            <p class="tag-text">${orderData.nombre}</p>
                        </div>
                    </div>
                    <div class="card-body-section">
                        <div class="tag-container">
                            <h2 class="tag-title">Cedula:</h2>
                            <p class="tag-text">${orderData.cedula}</p>
                        </div>
                    </div>
                    <div class="card-body-section">
                        <div class="tag-container">
                            <h2 class="tag-title">Pedido:</h2>
                            <p class="tag-text">${orderData.pedido}</p>
                        </div>
                    </div>
                    <hr>
                    <div class="card-body-section">
                        <h2 class="tag-title">Direccion</h2>
                        <p class="tag-text">${orderData.direccion}</p>
                    </div>
                </div>
                <div class="card-foot"></div>
            </div>
        
        </body>
        </html>
        
        `
    }
    

    async enviar(orderData: OrderData): Promise<void> {
        try {
            const transporter = await this.getTransporter();


            await transporter.sendMail({
                from:orderData.nombre,
                to:orderData.correo_electronico,
                subject:"Pedido de Los Pollos Hermanos",
                html: this.mailTemplate(orderData)
            });
        } catch (error) {
            console.log(error)
            throw new BadRequestException(`Hubo un error enviando el correo`)
        }
    }
}