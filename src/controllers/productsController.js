const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');
};

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render('products', {
      products,
      toThousand,
    });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === +id);
    res.render("detail", {
      product,
      toThousand,
    });
  },

  // Create - Form to create
  create: (req, res) => {
    res.render('product-create-form');
  },

  // Create - Method to store
  store: (req, res) => {
    const id = Math.max(...products.map(el => el.id));
    const newProduct = {
		id: id + 1,
		...req.body,
		image: req.file.filename, // Nombre del archivo almacenado en la carpeta "products"
	  };	  
    products.push(newProduct);
    writeJson(products);
    res.redirect('/products');
  },

  // Update - Form to edit
  edit: (req, res) => {
    const { id } = req.params;
    const productToEdit = products.find(product => product.id === +id);
    res.render('product-edit-form', {
      productToEdit,
    });
  },

  // Update - Method to update
  update: (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === +id);

    if (!product) {
      return res.send('No existe ese producto');
    }

    const { name, price, discount, category, description } = req.body;

    products.forEach(product => {
      if (product.id == id) {
        product.name = name;
        product.price = price;
        product.discount = discount;
        product.description = description;
        product.category = category;
      }
    });

    writeJson(products);
    res.redirect('/products');
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    let productId = Number(req.params.id);

    products.forEach(product => {
      if (product.id === productId) {
        let productToDestroy = products.indexOf(product);
        products.splice(productToDestroy, 1);
      }
    });

    writeJson(products);
    res.send("El producto fue destruido");
  },
};

module.exports = controller;
