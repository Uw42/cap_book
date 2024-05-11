module.exports = (srv) => {
  const { Products } = srv.entities
  srv.after ('READ', Products, (each) => {
    let num = each.retail - each.price;
    each.margin = num.toFixed(2);
  })
}