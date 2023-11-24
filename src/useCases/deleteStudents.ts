import { inject, injectable } from "tsyringe";
import  Student from "../models/Student";
import createHttpError from "http-errors";
import { IStudentsRepository } from "../repositories/StudentsRepository";


@injectable()

export class DeleteStudent {
  
    constructor(
        @inject("StudentsRepository") private studentsRepository: IStudentsRepository,
    ) {}

    async execute(student: Student) {
        try {
            const deletedStudent = await this.studentsRepository.deleteStudentsById(student.toString());
            console.log("Estudante deletado:", deletedStudent);
        } catch (error) {
            console.error("Erro ao deletar estudante:", error);
        }
    }
}