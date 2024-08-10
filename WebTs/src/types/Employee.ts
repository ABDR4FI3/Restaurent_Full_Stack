import { Department } from "./Departement";
import { Position } from "./position";

export interface Employee {
  id: number;
  name: string;
  position: Position;
  salary: number;
  department: Department;
  address: string;
  phone: string;
  email: string;
  gender: string;
  image: string;
  shift: string;
  hiringDate: Date;
}
export const emptyEmployee: Employee = {
  id: 0,
  name: "",
  position: {
    id: 0,
    name: "",
    level: "",
    responsibilities: "",
    qualifications: "",
  },
  salary: 0,
  department: {
    id: 0,
    name: "",
    description: "",
  },
  address: "",
  phone: "",
  email: "",
  gender: "",
  image: "",
  shift: "",
  hiringDate: new Date(),
};
