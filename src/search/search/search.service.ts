import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';
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
              role: { type: 'object' },
              groups: { type: 'object' },
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
    console.log(user);
    const result = await this.esService.index({
      index: this.configService.get<string>('ELASTIC_INDEX'),
      body: user,
    });
    console.log(result);
    return result;
  }

  public async search(key: string) {
    const response: SearchResponse<any> = await this.esService.search({
      index: this.configService.get<string>('ELASTIC_INDEX'),
      body: {
        query: {
          multi_match: {
            query: key,
            fuzziness: 'AUTO',
          },
        },
      },
    });
    console.log('Elastic response', response);
    return response.hits?.hits.map((item) => item._source) || [];
  }
  // public async searchAll(key:string) {
  //   const response: SearchResponse<any> = await this.esService.search({
  //     index: this.configService.get<string>('ELASTIC_INDEX'),
  //     body: {
  //       query: {
  //         match_all: {}
  //       }
  //     }
  //   });

  //   return response.hits.hits;
  // }

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
