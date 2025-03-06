import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { StudentSignin } from './types/StudentSignin';
import { StudentLogin } from './types/StudentLogin';

@Injectable()
export class AppService {
  constructor(private readonly dbService: DatabaseService) { }

  async getAllUsers() {
    return this.dbService.connection.any("SELECT * FROM student");
  }
  async studentLogin(data: StudentLogin) {
    return this.dbService.connection.oneOrNone("SELECT * FROM userdb WHERE username = $1 AND password = $2",
      [data.username, data.password])
  }
  async studentSigin(data: StudentSignin) {
    return this.dbService.connection.any("INSERT INTO userdb (email, username, password, phonenumber) VALUES ($1, $2, $3, $4)",
      [data.email, data.username, data.password, data.phoneno]);
  }
}