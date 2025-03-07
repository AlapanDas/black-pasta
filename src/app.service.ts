import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { StudentSignin } from './types/StudentSignin';
import { StudentLogin } from './types/StudentLogin';
const bcrypt = require('bcrypt');

@Injectable()
export class AppService {
  constructor(private readonly dbService: DatabaseService) { }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async getAllUsers() {
    return this.dbService.connection.any('SELECT * FROM student');
  }

  async studentLogin(data: StudentLogin) {
    const result=await this.dbService.connection.oneOrNone(
      'SELECT * FROM userdb WHERE username = $1 AND password = $2',
      [data.username, (data.password)],
    );
    console.log(result);
    return result;
  }
  async studentSigin(data: StudentSignin) {

    if (await this.dbService.connection.oneOrNone(
      'INSERT INTO userdb (email, username, password, phonenumber) VALUES ($1, $2, $3, $4)',
      [
        data.email,
        data.username,
        this.hashPassword(data.password),
        data.phoneno,
      ],
    )) {
      return 'User Created Successfully';
    } else {
      return 'User Creation Failed';
    }
  }
}
