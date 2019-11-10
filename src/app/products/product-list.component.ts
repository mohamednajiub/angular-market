import {Component} from '@angular/core';
import {IProduct} from './product';
import { ProductService } from '../shared/services/product.service';

@Component({
    selector: 'products',
    templateUrl: './product-list.component.html'
})

export class ProductListComponent {
  pageTitle: string = 'Products List';
  products: IProduct[];
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;
  constructor(private productService: ProductService){
  }
  toggleImage(): void{
    this.showImage = !this.showImage
  };
  
  _listFilter: string;
  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  filteredProducts: IProduct[];
  performFilter(filterBy: string): IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct)=>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }
  onRatingClicked(message: string): void {
    this.pageTitle = "Products List: " + message
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    
    
  }
}