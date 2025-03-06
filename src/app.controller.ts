import { Body, ConsoleLogger, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { StudentLogin } from './types/StudentLogin';
import { StudentSignin } from './types/StudentSignin';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/students')
  async getStudents(): Promise<string[]> {
    return await this.appService.getAllUsers();
  }
  @Post("/student/login")
  async studentLogin(@Body() studentlogin:StudentLogin): Promise<any> {
    console.log("Login Request Initiated ")
    return await this.appService.studentLogin(studentlogin);
  }
  @Post("/student/signin")
  async studentSignin(@Body() studentSignin:StudentSignin): Promise<any> {
    console.log("Signin Initiated")
    return await this.appService.studentSigin(studentSignin);
  }
}
