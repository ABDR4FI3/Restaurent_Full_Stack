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