import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { DefinitionComponent } from "./components/definition/definition.component";
const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: "full" },
    { path: "definition", component:DefinitionComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }