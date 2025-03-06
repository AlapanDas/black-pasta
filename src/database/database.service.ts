import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import * as pgPromise from "pg-promise";

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pgp = pgPromise();
  private db = this.pgp({
    host: "db.cloudtop.dev",
    port: 49317,
    database: "postgres",
    user: "postgres",
    password: process.env.DB_PASS?.toString(),
  });

  get connection() {
    return this.db;
  }

  async onModuleInit() {
    console.log("Database connected");
  }

  async onModuleDestroy() {
    await this.pgp.end();
    console.log("Database connection closed");
  }
}
