import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, NgIf],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  isLoaded = false;
  constructor() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 200); // Short delay to ensure styles are loaded
  }
}
