import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SenderOrderEmail } from './classes/sender_order_email';
import { OrderData } from './classes/order_data';




@Injectable()
export class OrdersService {



  create(createOrderDto: CreateOrderDto) {

    try {



      const order = new OrderData(createOrderDto);
        
      const sender = new SenderOrderEmail();
      sender.enviar(order);
    } catch (error) {
      return "Hubo un error al enviar el correo."
    }
    

    return 'Correo enviado exitosamente!';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
