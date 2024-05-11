namespace my.domain;
entity Products {
  key ID       : Integer;
      name     : localized String(100) not null @title : '{i18n>productName}';
      stock    : Integer @title : '{i18n>stock}';
      price    : Decimal(9, 2) @title : '{i18n>price}';
      retail   : Decimal(9, 2) @title:'{i18n>retail}';
      virtual margin : Decimal(9, 2) @title:'{i18n>margin}';
      currency_code : String(3);
      supplier : Association to Suppliers
}
entity Suppliers {
  key ID    : Integer;
      name  : String(100);
      priority : Integer;
      products : Association to many Products on products.supplier = $self;
}
entity Orders {
  key ID       : UUID;
      orderNo  : String;
      currency_code : String(3);
      Items    : Composition of many OrderItems on Items.parent = $self;
}
entity OrderItems {
  key ID    : UUID;
  parent    : Association to Orders;
  product   : Association to Products;
  amount    : Integer;
}
