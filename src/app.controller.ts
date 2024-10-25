import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RepoDto } from './repo.dto';  

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('trending')
  async getTrendingRepos(): Promise<RepoDto[]> {
    return this.appService.getTrendingRepos();
  }
}
