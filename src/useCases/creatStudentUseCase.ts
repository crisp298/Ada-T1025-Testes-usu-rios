import { inject, injectable } from "tsyringe";
import  Student from "../models/Student";
import createHttpError from "http-errors";
import { IStudentsRepository } from "../repositories/StudentsRepository";

@injectable
export class CreateStudent
 {
  constructor(
    @inject("StudentsRepository") private StudentsRepository: IStudentsRepository){};

    async execute(student: Student){
        if(
            !student.name ||
            !student.shift ||
            !student.year ||
            !student.room ||

        ){
        
            throw createHttpError.BadRequest("Propriedades obirgatórias ausentes no corpo da requisição.")
        }

        const studentsDetails: any[] =[];

        try{
            const newStudent = await.this.studentsRepository.createStudent(student);
            
            return newStudent;
        } catch(error) {
            console.error("Erro ao inserir estudante", error);
            throw createHttpError.InternalServerError("Erro interno ao criar estudante."
            );
        }
    }
}