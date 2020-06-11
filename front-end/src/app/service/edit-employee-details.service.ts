import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeDetails } from '../types/common-types';

@Injectable()
export class EditEmployeeDetailsService {
    private employeeSource = new BehaviorSubject({});
    currentEmployee = this.employeeSource.asObservable();

    constructor() { }

    /**
     * Function to pass Employee Details to be updated
     * @param details : Employee Data to be updated
     */
    editEmployeeDetais = (details: EmployeeDetails) => {
        this.employeeSource.next(details);
    }
}
