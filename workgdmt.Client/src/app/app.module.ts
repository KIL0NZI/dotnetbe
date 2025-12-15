import { BrowserModule } from '@angular/platform-browser';
import { APP_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './navmenu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DxReportViewerModule, DxReportDesignerModule } from 'devexpress-reporting-angular';
import { ReportViewerComponent } from './reportviewer/report-viewer';
import { ReportDesignerComponent } from './reportdesigner/report-designer';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ReportViewerComponent,
    ReportDesignerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DxReportViewerModule,
    DxReportDesignerModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient(), { provide: APP_ID, useValue: 'ng-cli-universal' }],
  bootstrap: [AppComponent]
})
export class AppModule { }