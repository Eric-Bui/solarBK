import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SidebarComponent } from "./components/layout/sidebar/sidebar.component";
import { HomepageComponent } from "./components/pages/homepage/homepage.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, SidebarComponent, HomepageComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
