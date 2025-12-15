import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportViewerComponent } from './reportviewer/report-viewer';
import { ReportDesignerComponent } from './reportdesigner/report-designer';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'ReportDesigner', component: ReportDesignerComponent },
      { path: 'DocumentViewer', component: ReportViewerComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }