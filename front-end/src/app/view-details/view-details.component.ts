import { Component, OnInit } from '@angular/core';
import { DefaultEmployeeData, TableHeader, DefaultSvgPath } from '../types/common-types';
import { EditEmployeeDetailsService } from '../service/edit-employee-details.service';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  employeeData: any;
  tableHeaderData: string[] = TableHeader;
  defaultPathSrc: string = DefaultSvgPath;

  /**
   * Constructor of the ViewDetailsComponent
   *
   * @param editService : Service to pass Updated data to AddEditComponent
   * @param router : An inbuilt service that provides navigation and URL manipulation capabilities
   */
  constructor(
    private editService: EditEmployeeDetailsService,
    private router: Router,
    private http: HttpService
  ) { }

  /**
   * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound
   * properties for the first time, and before any of the view or content children have been checked. It is invoked only once
   * when the directive is instantiated.
   */
  ngOnInit(): void {
    this.editService.editEmployeeDetais(null);
    if (!localStorage.getItem('details')) {
      localStorage.setItem('details', JSON.stringify(DefaultEmployeeData));
      this.employeeData = JSON.stringify(DefaultEmployeeData);
    } else {
      this.employeeData = JSON.parse(localStorage.getItem('details'));
      console.log(this.employeeData);
    }

    this.http.get('getAllUser').subscribe(
      (res: any) => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          if (this.employeeData && this.employeeData.length > i) {
            this.employeeData[i].firstname = res.data[i].firstName;
            this.employeeData[i].lastname = res.data[i].lastName;
            this.employeeData[i].email = res.data[i].email;
            this.employeeData[i].contact = res.data[i].phone;
          } else {
            this.employeeData.push({
              avatar: res.data[i].image,
              firstname: res.data[i].firstName,
              lastname: res.data[i].lastName,
              email: res.data[i].email,
              contact: res.data[i].phone
            })
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Function to navigate to Home page
   */
  goToHome = () => {
    this.router.navigateByUrl('/home');
  }

  /**
   * Function to pass Employee data to be edited & navigating to Add / Edit page
   * @param employee : Row data of employee to be edited
   */
  editRowData = (employee) => {
    this.editService.editEmployeeDetais(employee);
    this.router.navigateByUrl('/add-edit');
  }

  /**
   * Funcion to navigate to Add New Employee data page
   */
  addNewUser = () => {
    this.router.navigateByUrl('/add-edit');
  }
}
