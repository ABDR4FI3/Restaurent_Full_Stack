//! mock service for demonstration 
export class OrderService {
  static async getOrders() {
    // Mock data for demonstration. Replace with your actual API call.
    return [
      { name: "Pizza", price: 10, quantity: 2, total: 20 },
      { name: "Burger", price: 8, quantity: 1, total: 8 },
      { name: "Pasta", price: 12, quantity: 3, total: 36 },
    ];
  }
}
