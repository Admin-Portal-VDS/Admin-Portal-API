import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";

config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });


const postgresDataSourceOptions: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.PG_DB_HOST,
    port: parseInt(process.env.PG_DB_PORT, 10),  
    username: process.env.PG_DB_USERNAME,
    password: process.env.PG_DB_PASSWORD,
    database: process.env.PG_DB_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: [],
    logging: process.env.PG_DB_LOGGING === 'true',  
    synchronize: process.env.PG_DB_SYNCHRONIZE === 'true', 
  };
export { postgresDataSourceOptions as dataSourceOptions };

export const datasource = new DataSource(postgresDataSourceOptions as DataSourceOptions);