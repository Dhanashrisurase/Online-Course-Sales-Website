import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  courses: any[] = [];
  selectedCourse: any;
  constructor(
    private productService: ProductService,
    private cartservice: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  viewDetails(course: any) {
    this.selectedCourse = course;
  }
  closeDetails() {
    this.selectedCourse = null;
  }

  addToCartAndNavigateToCart(product: any): void {
    this.addToCart(product);
    this.router.navigate(['/cart']);
  }

  addToCart(product: any): void {
    this.cartservice.addToCart(product);
    console.log(this.cartservice.getCartItems()); 
  }
}
