import { faker } from "@faker-js/faker";
import initializeDatabase from "../db/dbConfig";
import Student from "../models/Student";

export interface IStudentsRepository {
  getStudents: () => {};
  createStudent: (student: Student) => Promise<Student>;
  deleteStudentsById(id: string): Promise<void>;
}

/*export class FakeStudentsRepository implements IStudentsRepository {
    async getStudent() {}
    async createStudent(student: Student): Promise<Student> {
      return {
        ...student,
        id: faker.number.int({ min: 1, max: 2000 }),
        // id: Math.random(),
      };
    }
  }*/

  export class StudentsRepository implements IStudentsRepository {
    async getStudents() {}
    async createStudent(student: Student): Promise <Student> {
      const dbPromise = initializeDatabase();
      const db = await dbPromise;
      await db.run(
        `INSERT INTO students(name, shift, year, room) VALUES ("${student.name}","${student.shift}","${student.year}", "${student.room}")`,
        [student.name, student.shift, student.year, student.room]
    );
    const newStudent = await db.get(
        "SELECT * FROM students ORDER BY id DESC LIMIT 1",
        [student.name, student.shift, student.year, student.room]
      );

    return newStudent as Student;
    }

    async deleteStudentsById(id: string): Promise<void> {
        const dbPromise = initializeDatabase();
        const db = await dbPromise;
        return new Promise((resolve, reject) => {
            const deleteQuery = 'DELETE FROM students WHERE id = ?';
            db.run(deleteQuery, [id], (err: any) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
        }
  }

