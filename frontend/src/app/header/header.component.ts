import { AfterViewInit, Component } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {

  carousel: any;

  ngAfterViewInit() {
    // Inicializáljuk a Bootstrap carousel-t Angularon belül
    this.carousel = new bootstrap.Carousel(document.querySelector('#header'), {
      interval: 4000,
      ride: 'carousel'
    });
  }

  prevSlide() {
    this.carousel.prev();
  }

  nextSlide() {
    this.carousel.next();
  }
}

