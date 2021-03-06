import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { childRoutes } from '../routes/routes';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  public sideMenu = true;
  public appRoutes: Routes = [];
  public MenuList: any = [];
  public userNmae: string;
  public role: string;

  constructor(private router: Router, private loginService: LoginService) { }


  ngOnInit() {
    const user = this.loginService.getSessionStorage('userName');
    const role = this.loginService.getSessionStorage('role');
    this.userNmae = (user.split('@', 1)).toString();
    this.role = role.replace(/([A-Z])/g, ' $1').trim();
    this.MenuList = this.getMenuList(role);
  }

  getMenuList(role: string) {
    var routes = childRoutes.filter(list => list.data.menu === true && list.data.users.filter((user) => {
      return (user === 'All' || user === role)
    }).length > 0);

    return routes;
  }

  toggleFunction() {
    this.sideMenu = !this.sideMenu;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
