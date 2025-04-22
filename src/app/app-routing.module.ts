import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { ListNameComponent } from "./list-name/list-name.component";
import { MasterComponent } from "./master/master.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  // { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "",
    component: LoginComponent,
  },
  // {
  //   path: "list-name",
  //   component: ListNameComponent,
  // },
  // { path: "user-form", component: UserFormComponent },
  {
    path: "login",
    component: LoginComponent,
  },
  // {
  //   path: "update/:id",
  //   component: UserFormComponent,
  // },
  {
    path: "",
    component: MasterComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "user-form", component: UserFormComponent },
      { path: "update/:id", component: UserFormComponent },
      { path: "list-name", component: ListNameComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
