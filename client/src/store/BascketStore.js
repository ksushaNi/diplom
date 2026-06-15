import { makeAutoObservable } from "mobx";

class BascketStore {
  products = [];
  totalPrice = 0;

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  addProduct(product) {
    const existing = this.products.find(p => p.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.products.push({...product, quantity: 1});
    }
    this.calculateTotal();
    this.saveToStorage();
  }

  removeProduct(productId) {
    const product = this.products.find(p => p.id === productId);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
    } else {
      this.products = this.products.filter(p => p.id !== productId);
    }
    this.calculateTotal();
    this.saveToStorage();
  }

  deleteProduct(productId) {
    this.products = this.products.filter(p => p.id !== productId);
    this.calculateTotal();
    this.saveToStorage();
  }

  clearBascket() {
    this.products = [];
    this.totalPrice = 0;
    this.saveToStorage();
  }

  calculateTotal() {
    this.totalPrice = this.products.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
  }

  saveToStorage() {
    localStorage.setItem('bascket', JSON.stringify({
      products: this.products,
      totalPrice: this.totalPrice
    }));
  }

  loadFromStorage() {
    const saved = localStorage.getItem('bascket');
    if (saved) {
      const data = JSON.parse(saved);
      this.products = data.products || [];
      this.totalPrice = data.totalPrice || 0;
    }
  }

  addNewProduct(product) {
    const existing = this.products.find(p => p.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        this.products.push({...product, quantity: 1});
    }
    this.calculateTotal();
    this.saveToStorage();
  }
  increaseQuantity(productId) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.quantity += 1;
      this.calculateTotal();
      this.saveToStorage();
    }
  }
}

export default BascketStore;