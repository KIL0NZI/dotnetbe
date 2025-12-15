import { Component, Inject, ViewEncapsulation, Input, OnInit } from '@angular/core';

@Component({
  selector: 'report-viewer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report-viewer.html',
  styleUrls: [
    "../../../node_modules/devextreme/dist/css/dx.material.blue.light.css",
    "../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.common.css",
    "../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.material.blue.light.css",
    "../../../node_modules/devexpress-reporting/dist/css/dx-webdocumentviewer.css"
  ]
})
export class ReportViewerComponent implements OnInit {

  // 1. FIX: Added 'Input' to the @angular/core import above.
  // 2. FIX: Added '!' (definite assignment assertion) because Angular assigns this value.
  @Input() reportTemplateName!: string; // e.g., 'InvoiceReport' or 'ReceiptReport'

  reportUrl!: string; // FIX: Added '!' (definite assignment assertion) 

  invokeAction: string = 'Reports/ViewerInvoke'; // Targeting C# ReportsController
  getLocalizationAction: string = `${this.invokeAction}/GetLocalization`

  constructor(@Inject('BASE_URL') public hostUrl: string) { }

  ngOnInit(): void {
    // Initialize reportUrl based on the Input property
    this.reportUrl = this.reportTemplateName || 'TestReport';

    // Note: If you want to use the Report Designer, you must swap 
    // the component tag in your HTML and use 'Reports/DesignerInvoke' here.
  }
}
