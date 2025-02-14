import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTIC_NODE'),
        maxRetries: 3,
        requestTimeout: 600000,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SearchService],
  exports: [ElasticsearchModule, SearchService],
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {}

  async onModuleInit() {
    await this.searchService.createIndex();
  }
}
