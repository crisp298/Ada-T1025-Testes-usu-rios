import { faker } from "@faker-js/faker";
import initializeDatabase from "../db/dbConfig";
import Student from "../models/Student";

export interface IStudentsRepository {
  getStudents: () => {};
  createStudent: (student: Student) => Promise<Student>;
  deleteStudentsById(id: number): Promise<void>;
}

export class FakeStudentsRepository implements IStudentsRepository {
  private students: Array<Student> =[] ;
  async getStudents() {}
    async createStudent(data: Student): Promise<Student> {
      const student = {
        ...data,
        id: faker.number.int({ min: 1, max: 2000 }),
        // id: Math.random(),
      };
      this.students.push(student);
      return student;
    }

    async deleteStudentsById(id: number): Promise<void> {
      this.students = this.students.filter(student => {
        return student.id != id
      })
    }
  }

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

    async deleteStudentsById(id: number): Promise<void> {
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

