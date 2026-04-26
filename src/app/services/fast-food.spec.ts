import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FastFoodService, Product } from './fast-food';

describe('FastFoodService', () => {
  let service: FastFoodService;
  let httpMock: HttpTestingController;

  const mockProduct: Product = {
    id: 1,
    name: 'Hamburguesa Clásica',
    price: 99.00,
    image: 'img.jpg',
    category: 'hamburguesa'
  };

  beforeEach(() => {
    // Clear localStorage to ensure clean state
    localStorage.clear();
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FastFoodService]
    });
    service = TestBed.inject(FastFoodService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart and calculate totals', () => {
    // Act
    service.addToCart(mockProduct, 2);

    // Assert
    expect(service.cartItems().length).toBe(1);
    expect(service.cartCount()).toBe(2);
    expect(service.cartTotal()).toBe(198.00); // 99 * 2
  });

  it('should update quantity correctly', () => {
    service.addToCart(mockProduct, 1);
    
    service.updateQty(mockProduct.id, 2); // Add 2 more
    expect(service.cartCount()).toBe(3);

    service.updateQty(mockProduct.id, -1); // Remove 1
    expect(service.cartCount()).toBe(2);
  });

  it('should remove product when quantity drops to 0 or below', () => {
    service.addToCart(mockProduct, 1);
    service.updateQty(mockProduct.id, -1);
    
    expect(service.cartItems().length).toBe(0);
    expect(service.cartCount()).toBe(0);
  });

  it('should clear the cart', () => {
    service.addToCart(mockProduct, 5);
    service.clearCart();
    
    expect(service.cartItems().length).toBe(0);
    expect(service.cartCount()).toBe(0);
    expect(service.cartTotal()).toBe(0);
  });

  it('should fetch products from API', () => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0]).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('https://devsapihub.com/api-fast-food');
    expect(req.request.method).toBe('GET');
    req.flush([mockProduct]);
  });
});
