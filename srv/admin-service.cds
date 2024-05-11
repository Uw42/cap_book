using my.domain from '../db/schema';
service AdminService {
  entity Products as projection on domain.Products;
  entity Suppliers as projection on domain.Suppliers;
  entity Orders as projection on domain.Orders;
}