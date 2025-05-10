import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';
@Injectable()
export class ReportsService {
   constructor(@InjectRepository(Report)private repo:Repository<Report>){

   }
   create(reportDto:CreateReportDto,user:User){
       const report = this.repo.create(reportDto)
       report.user = user
       return this.repo.save(report)
   }
   async changeApproval(id:string,approve:boolean){
      const report = await this.repo.findOneBy({id:parseInt(id)})
      if(!report){
         throw new NotFoundException('Report not Found')
      }
      report.approved = approve
      return this.repo.save(report)
   }
}
