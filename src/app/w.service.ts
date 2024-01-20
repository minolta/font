import { Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
/**
 * เป็นตัวบอกว่าเรากำไปไหนมาบ้างที่หน้า size ของ web ที่ใช้อยู่เป็นแบบไหน
 */
@Injectable({
  providedIn: "root",
})
export class WService {
  constructor(public breakpointObserver: BreakpointObserver) {
    console.log("+++++++++++ Create check screen ++++++++++++++");
    breakpointObserver
      .observe([
        Breakpoints.Handset,
        // Breakpoints.HandsetPortrait,
        // Breakpoints.WebLandscape
      ])
      .subscribe((result) => {
        console.log(result);
        this.check();
        console.log(
          "Mobile:" +
            this.mobile +
            " WEB:" +
            this.web +
            " WEBP:" +
            this.webp +
            " SMALL:" +
            this.small
        );
      });

    this.check();
  }

  check() {
    console.log("Check ");
    // let ismobile = this.breakpointObserver.isMatched([Breakpoints.Handset]);
    // this.mobile = this.breakpointObserver.isMatched([Breakpoints.Handset]);
    this.web = this.breakpointObserver.isMatched([Breakpoints.WebLandscape]);
    this.webp = this.breakpointObserver.isMatched([Breakpoints.WebPortrait]);
    this.mobile = this.breakpointObserver.isMatched(["(max-width: 599px)"]);
  }

  public small = false;
  public web = false;
  public mobile = false;
  public webp = false;
}
