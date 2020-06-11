import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EmployeeDetails, DefaultSvgPath, DefaultEmployeeData } from '../types/common-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditEmployeeDetailsService } from '../service/edit-employee-details.service';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent implements OnInit, OnDestroy {

  // Defining Form Controls to store Employee form data.
  public firstName: FormControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  public lastName: FormControl = new FormControl('', [Validators.required]);
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public contact: FormControl = new FormControl('', [Validators.required, Validators.pattern('[0-9 ]*')]);
  public imageData: any = '';
  public phone: number;

  public currentEmployeeData: any;
  public employeeDataToEdit: any;
  public defaultPath: string = DefaultSvgPath;
  public avatarPath: string;
  public randomFileName: string;

  /**
   * Constructor of the AddEditEmployeeComponent
   *
   * @param snackBar : An inbuilt service to dispatch Material Design snack bar messages
   * @param editService : Service to get Updated data from ViewDetailsComponent
   * @param router : An inbuilt service that provides navigation and URL manipulation capabilities
   */
  constructor(
    private snackBar: MatSnackBar,
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
    this.editService.currentEmployee.subscribe(details => {
      if (details && Object.keys(details).length > 0) {
        this.employeeDataToEdit = details;
      }
    });
    if (this.employeeDataToEdit && Object.keys(this.employeeDataToEdit).length > 0) {
      this.randomFileName = this.employeeDataToEdit.avatar;
      this.avatarPath = this.defaultPath + this.employeeDataToEdit.avatar;
      this.firstName.setValue(this.employeeDataToEdit.firstname);
      this.lastName.setValue(this.employeeDataToEdit.lastname);
      this.email.setValue(this.employeeDataToEdit.email);
      this.contact.setValue(this.employeeDataToEdit.contact);
      this.phone = this.employeeDataToEdit.contact;
    } else {
      this.randomFileName = Math.floor(Math.random() * (9 - 1) + 1) + '.svg';
      this.avatarPath = this.defaultPath + this.randomFileName;
    }
    if (localStorage.getItem('details')) {
      this.currentEmployeeData = JSON.parse(localStorage.getItem('details'));
    }
    this.http.get('getAllUser').subscribe(
      (res: any) => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          if (this.currentEmployeeData && this.currentEmployeeData.length > 0) {
            this.currentEmployeeData[i].firstname = res.data[i].firstName;
            this.currentEmployeeData[i].lastname = res.data[i].lastName;
            this.currentEmployeeData[i].email = res.data[i].email;
            this.currentEmployeeData[i].contact = res.data[i].phone;
          }
        }
      },
      (err) => {
        this.currentEmployeeData = DefaultEmployeeData;
        console.log(err);
      }
    );
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is
   * destroyed
   */
  ngOnDestroy(): void {
    this.employeeDataToEdit = null;
  }

  /**
   * Function to navigate to Home page
   */
  goToHome = () => {
    this.router.navigateByUrl('home');
  }

  /**
   * Function to open a Snack Bar containing some text provided in the parameter
   *
   * @argument: message : A String containing message which will be displayed in the Snack Bar
   */
  openSnackBar = (message: string) => {
    this.snackBar.open(message, 'Ok', {
      duration: 1500,
    });
  }

  /**
   * Function to Save edited employee data & navigating to View details page
   */
  editEmployeeData = () => {
    console.log('PHONE', this.phone);

    this.http.post({ phone: this.phone }, 'getDetails').subscribe(
      (res: any) => {
        console.log(res);
        const details: any = {
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          email: this.email.value,
          phone: this.contact.value,
          _id: res.data._id
        };
        this.http.post(details, 'editUser').subscribe(
          res1 => {
            console.log(res1);
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
    setTimeout(() => {
      this.router.navigateByUrl('/view-details');
      this.openSnackBar('Updated Successfully!');
    }, 1000);
  }

  /**
    * Function to delete Employee data & go to view data
    */
  deleteEmployee = () => {
    this.http.post({ phone: this.phone }, 'getDetails').subscribe(
      (res: any) => {
        console.log(res);
        const details: any = {
          _id: res.data._id
        };
        this.http.post(details, 'deleteUser').subscribe(
          res1 => {
            console.log(res1);
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
    setTimeout(() => {
      this.router.navigateByUrl('/view-details');
      this.openSnackBar('Deleted Successfully!');
    }, 1000);
  }

  /**
   * Function to Add / Edit Employee Data.
   */
  addEmployee = () => {
    if (this.firstName.value && this.lastName.value && this.email.value && this.contact.value) {
      const userData: FormData = new FormData();

      userData.append('firstName', this.firstName.value);
      userData.append('lastName', this.lastName.value);
      userData.append('email', this.email.value);
      userData.append('phone', this.contact.value);
      userData.append('image', this.imageData);

      this.http.post(userData, 'saveUser').subscribe(
        res => {
          console.log(res);
          setTimeout(() => {
            this.router.navigateByUrl('/view-details');
            this.openSnackBar('Saved Successfully!');
          }, 1000);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.openSnackBar('All Fields are required!');
    }
  }

  /**
   * Function to Upload imageData.
   */
  onImageUpload = (img) => {
    this.imageData = img.target.files[0];
  }
}
