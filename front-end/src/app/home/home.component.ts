import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  /**
   * Constructor of the HomeComponent
   * @param router : An inbuilt service that provides navigation and URL manipulation capabilities
   */
  constructor(
    private router: Router
  ) { }

  /**
   * Function to navigate to Add / Edit page
   */
  public addNewEmployee = () => {
    this.router.navigateByUrl('/add-edit');
  }

  /**
   * Function to navigate to View details page
   */
  public viewEmployeeDetails = () => {
    this.router.navigateByUrl('/view-details');
  }
}
