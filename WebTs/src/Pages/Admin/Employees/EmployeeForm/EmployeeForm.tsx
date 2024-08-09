import { Employee } from "../../../../types/Employee";

interface EmployeeFormProps {
    user: Employee ;
}

const EmployeeForm:React.FC<EmployeeFormProps> = ({user}) => {
    return (
        <div>
            <h1>Employee Form {user.name}</h1>
        </div>
    )
}

export default EmployeeForm