import { CreateOrderDto } from "../dto/create-order.dto";

export class OrderData{
    nombre: string;
    cedula: string;
    direccion: string;
    pedido: string;
    correo_electronico: string;

    constructor(createOrderDto: CreateOrderDto){
        

        this.nombre = createOrderDto.nombre;
        this.correo_electronico = createOrderDto.correo_electronico;
        this.cedula = createOrderDto.cedula;
        this.direccion = createOrderDto.direccion;
        this.pedido = createOrderDto.pedido;
    }

}