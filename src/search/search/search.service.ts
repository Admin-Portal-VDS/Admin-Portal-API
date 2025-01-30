import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}
  async createIndex() {
    const index = this.configService.get<string>('ELASTIC_INDEX');

    // Check if the index exists
    const indexExists = await this.esService.indices.exists({ index });

    if (!indexExists) {
      console.log(`Creating index: ${index}`);

      await this.esService.indices.create({
        index,
        body: {
          settings: {
            number_of_shards: 1,
            number_of_replicas: 1,
          },
          mappings: {
            properties: {
              id: { type: 'integer' },
              parent_id: { type: 'integer' },
              first_name: {
                type: 'text',
                fields: { keyword: { type: 'keyword' } },
              },
              last_name: {
                type: 'text',
                fields: { keyword: { type: 'keyword' } },
              },
              login_name: {
                type: 'text',
                fields: { keyword: { type: 'keyword' } },
              },
              email: { type: 'keyword' },
              role: {
                properties: {
                  id: { type: 'keyword' },
                  name: { type: 'keyword' },
                  label: {
                    type: 'text',
                    fields: { keyword: { type: 'keyword' } },
                  },
                },
              },
              groups: {
                type: 'nested',
                properties: {
                  id: { type: 'integer' },
                  name: {
                    type: 'text',
                    fields: { keyword: { type: 'keyword' } },
                  },
                  description: { type: 'text' },
                  status: { type: 'keyword' },
                },
              },
            },
          },
        },
      });

      console.log(`Index ${index} created successfully.`);
    } else {
      console.log(`Index ${index} already exists.`);
    }
  }

  public async indexUser(user: any) {
    return await this.esService.index({
      index: this.configService.get<string>('ELASTIC_INDEX'),
      body: user,
    });
  }

  public async remove(id: number) {
    this.esService.deleteByQuery({
      index: this.configService.get<string>('ELASTIC_INDEX'),
      body: {
        query: {
          match: {
            id: id,
          },
        },
      },
    });
  }
}
