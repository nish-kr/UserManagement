/**
 * Class defining Employee Details data type.
 */
export class EmployeeDetails {
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: number;
}

/**
 * Default Values for View Employee Details page
 */
export const DefaultEmployeeData: EmployeeDetails[] = [];

// View Employee Details table header data
export const TableHeader: string[] = ['Avatar', 'firstname', 'LastName', 'Email', 'Contact'];

// Common Avatar path
export const DefaultSvgPath: string = './assets/avatars/';
