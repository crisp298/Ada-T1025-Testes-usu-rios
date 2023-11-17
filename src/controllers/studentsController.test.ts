import { test, expect, beforeEach, describe } from "vitest";
import { studentsListHandler } from "./studentsController";
import  Student from "../models/Student";
import { createDbConnection } from "../db/dbConfig";
import { NotFound, BadRequest } from "http-errors";
import { faker } from "@faker-js/faker";

const addStudent = async (student: Student) => {
  const promise = new Promise((resolve) => {
    const db = createDbConnection();
    const id = student.id ?? faker.number.int();

  // insere o evento
  db.run(
    "INSERT INTO students(name, shift, year, room) VALUES (?, ?, ?, ?)",
    [id, student.name, student.shift, student.year, student.room]
    );
});
};

beforeEach(async () => {
  // abrimos a conexão com o banco
  const promise = new Promise ((resolve) => {
  const db = createDbConnection();
    
  db.exec("DELETE FROM students", (error) => {
    if (!error) {
        resolve("Alunos deletados");
    }
    });
  });
  await promise;
});

describe("Testar listagem de estudantes",() => {
    test("Testar studentsListHandler", async () => {
        const student1: Student = {
            id: faker.number.int(),
            name:"Bianca",
            shift: "tarde",
            year: "5",
            room: "C",
        };
        const student2: Student = {
            id: faker.number.int(),
            name:"Carla",
            shift: "tarde",
            year: "4",
            room: "C",
        };
        const student3: Student = {
            id: faker.number.int(),
            name:"Josué",
            shift: "manhã",
            year: "5",
            room: "C",
        };

        await addStudent(student1);
        await addStudent(student2);
        await addStudent(student3);

        const allStudents = await studentsListHandler();

        expect(allStudents).toHaveLength(3);
        expect(allStudents).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "Bianca" }),
                expect.objectContaining({ name: "Carla" }),
                expect.objectContaining({ name: "Josué" }),
            ])
        );
    });

    test("Testar se ao listar alunos sem criá-los se um array vazio é retornado", async () => {
        const studentList = await studentsListHandler();
    
        expect(studentList).toHaveLength(0);
      });
});