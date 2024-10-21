import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { BOOKS_CLIENT } from './constants';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';

@Module({
  imports: [ClientConfigModule],
  controllers: [BooksController],
  providers: [BooksService,
    {
      provide: BOOKS_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.booksClientOptions;
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    }],
})
export class BooksModule { }
