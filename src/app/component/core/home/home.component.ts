import { Autoplay } from 'swiper/modules';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import SwiperCore from 'swiper';
import AOS from 'aos';


import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

import { Product, Category } from '../../../model/models';

SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] | undefined = [];
  categories: Category[] | undefined = [];

  logNum: number = 0;
  regNum: number = 0;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, public BasicAuth: AuthService, public Logout: AuthService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.initializeSwiper();
    this.initializeAOS();
    this.logNum = 0;
  }

  private loadCategories(): void {
    this.http.get<Category[]>('https://localhost:7157/api/Category').subscribe(
      (response) => {
        this.categories = response;
        console.log(this.categories);
      },
      (error) => {
        console.error('Errore nel recupero delle categorie:', error);
      }
    );
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 1000); // Genera un numero casuale tra 0 e 999
  }

  private loadProducts(): void {
    this.http.get<Product[]>('https://localhost:7157/api/Product').subscribe(
      (response) => {
        // Per ogni prodotto ottenuto, cerca la categoria corrispondente
        response.forEach(product => {
          // Ottieni l'ID della categoria dal prodotto
          const categoryId = product.categoryId;
          // Esegui una chiamata HTTP per ottenere i dettagli della categoria
          this.http.get<Category>('https://localhost:7157/api/Category/' + categoryId).subscribe(
            (category) => {
              // Se la categoria è stata trovata, aggiungi il nome al prodotto e assegna l'URL dell'immagine
              product.categoryName = category.name; // Assegna solo il nome della categoria
              product.imageUrl = `https://picsum.photos/200/300?random=${this.getRandomNumber()}`;
              // Aggiungi il prodotto alla lista di prodotti
              this.products?.push(product);
            },
            (error) => {
              console.error('Errore nel recupero della categoria per il prodotto:', error);
            }
          );
        });
        console.log(this.products);
      },
      (error) => {
        console.error('Errore nel recupero dei prodotti:', error);
      }
    );
}


  private initializeSwiper(): void {
    const swiper = new SwiperCore('.mySwiper', {
      grabCursor: true,
      centeredSlides: false,
      loop: true,
      spaceBetween: 40,
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 5,
        },
      },
    });

    // Aggiungi eventi per mettere in pausa e riprendere l'autoplay al passaggio del mouse
    swiper.el.addEventListener('mouseenter', () => {
      swiper.autoplay.stop();
    });

    swiper.el.addEventListener('mouseleave', () => {
      swiper.autoplay.start();
    });
  }

  private initializeAOS(): void {
    AOS.init({
      delay: 500,
      easing: 'linear',
      offset: 10,
    });
  }
}
