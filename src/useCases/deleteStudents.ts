import { inject, injectable } from "tsyringe";
import  Student from "../models/Student";
import createHttpError from "http-errors";
import { IStudentsRepository } from "../repositories/StudentsRepository";

@injectable()
export class DeleteStudent
 {
  constructor(
    @inject("StudentsRepository") private studentsRepository: IStudentsRepository){};

    async execute(student: Student){
        
            const deleteStudent = await.this.studentsRepository.deleteStudentsById(student);
            
            return console.log("Estudante deletado");
        } 
    }
