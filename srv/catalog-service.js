module.exports = (srv) => {
	// Use reflection to get the definition of Products
	const { Products } = cds.entities
	srv.before('CREATE', 'Orders', async (req) => {
		// Check for sufficient stock
		const orderItems = req.data.Items;
		var outOfStock = 0;
		for (index = 0; index < orderItems.length; index++) {
			let product = await SELECT.from(Products, ['stock', 'name'])
				.where({ ID: { '=': orderItems[index].product_ID } });
			if (product[0].stock < orderItems[index].amount) {
				req.error(400, 'Not enough stock for ' + product[0].name);
				outOfStock += 1;
			}
		}
		// If sufficent stock, then reduce Products.stock
		if (outOfStock == 0) {
			for (index = 0; index < orderItems.length; index++) {
				let affectedRows = await UPDATE(Products)
					.set({ stock: { '-=': orderItems[index].amount } })
					.where({ ID: { '=': orderItems[index].product_ID } });
			}
		}
	})
	srv.before('READ', 'Products', async (req) => {
		const profile = cds.env.requires.actualprofile;
		const prof = cds.env.for('NODE_ENV');
		const { para1 } = cds.env.for('myapp');
	  console.log(profile, para1);
		if( process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV === 'development')
		  console.log('development');
	})
	
}