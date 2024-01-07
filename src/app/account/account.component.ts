import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../interfaces/vehiclesInterface';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  loading = false;
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

  getVehiclesInfor()
  {
    
  }

}
