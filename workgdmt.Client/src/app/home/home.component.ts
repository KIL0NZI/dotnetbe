import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // <-- NEW: Import Router

interface ReportType {
  id: number;
  name: string;
  prefix: string; // Used for naming templates (e.g., ADHOC_MyReport)
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', // Links to the provided HTML file
  // FIX: Removed reference to home.css to resolve TS-992008 error.
  styleUrls: []
})
export class HomeComponent implements OnInit {

  // --- Data Source from cfg_report_types ---
  public reportTypes: ReportType[] = [
    { id: 1, name: 'Process Reports', prefix: 'PROCESS', description: 'Transactional reports focused on single records (e.g., Invoices, Receipts). Data source is highly constrained.' },
    { id: 2, name: 'Summary Reports', prefix: 'SUMMARY', description: 'Aggregate reports providing high-level metrics and totals (e.g., Sales by Region). Data source contains pre-calculated metrics.' },
    { id: 3, name: 'Adhoc Reports', prefix: 'ADHOC', description: 'Flexible reports providing access to wider datasets for custom queries and user joins. Requires careful governance.' }
  ];

  // --- State Properties ---
  public selectedReportTypeId: number = 3;
  public selectedPrefix: string = 'ADHOC';
  public isDesignerVisible: boolean = false;

  // Inject the Router service
  constructor(private router: Router) { } // <-- NEW: Inject Router

  ngOnInit(): void {
    this.updateSelectedType();
  }

  /**
   * FIX: New getter property to safely retrieve the selected ReportType object.
   */
  get currentType(): ReportType | undefined {
    return this.reportTypes.find(t => t.id === this.selectedReportTypeId);
  }

  /**
   * Updates the selectedPrefix property whenever the dropdown value changes.
   */
  updateSelectedType(): void {
    const type = this.reportTypes.find(t => t.id === +this.selectedReportTypeId);
    if (type) {
      this.selectedPrefix = type.prefix;
    }
  }

  /**
   * Method called when the user clicks 'Start Designing Report'.
   */
  startDesigner(): void {
    console.log(`Launching DevExpress Designer for type prefix: ${this.selectedPrefix}`);

    // --- CRITICAL FIX: Use router.navigate to pass the prefix ---
    this.router.navigate(['/ReportDesigner'], {
      // The queryParams will add '?type=ADHOC' or '?type=PROCESS' to the URL
      queryParams: { type: this.selectedPrefix }
    }).then(() => {
      // Optional: If routing is successful, update the visibility state (or rely solely on routing)
      this.isDesignerVisible = true;
    });

    // You must configure an Angular route that maps '/report-designer' to your 
    // component hosting the <dx-report-designer> tag.
  }
}
