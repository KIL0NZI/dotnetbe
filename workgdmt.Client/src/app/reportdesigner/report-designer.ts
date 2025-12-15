import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-report-designer',
  templateUrl: './report-designer.html',
})
export class ReportDesignerComponent implements OnInit, OnDestroy {

  public reportUrl: string | null = null;
  public isReady: boolean = false; // Controls the *ngIf
  public getDesignerModelAction = "DXXRD/GetDesignerModel";

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    @Inject('BASE_URL') public hostUrl: string
  ) { }

  ngOnInit() {
    console.log('initiated');
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        const prefix = params['type'] || 'ADHOC';
        const storageKey = 'current_report_url';

        // 1. Try to get from Local Storage first (Persistence)
        let cachedUrl = localStorage.getItem(storageKey);

        if (cachedUrl && cachedUrl.startsWith(prefix)) {
          console.log('Restoring from Local Storage:', cachedUrl);
          this.reportUrl = cachedUrl;
        } else {
          // 2. Generate new if not found
          this.reportUrl = `${prefix}_NewReport_${Date.now()}`;
          console.log('Generated New URL:', this.reportUrl);

          // 3. Save to Local Storage
          localStorage.setItem(storageKey, this.reportUrl);
          console.log('saved to local');
        }

        // 4. Add a small timeout to allow scripts to settle before rendering
        setTimeout(() => {
          this.isReady = true;
        }, 100);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  OnBeforeRender(event: any) {
    // confirm the designer is actually running
    console.log("Designer BeforeRender event fired!");
  }
}
