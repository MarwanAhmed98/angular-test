import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-blank-navbar',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.scss'
})
export class BlankNavbarComponent {

}
