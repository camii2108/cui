const fs = require('fs');
const path = require('path');

const carritoFilePath = path.join(__dirname, '../data/carrito.json');


// Obtener el contenido del archivo del carrito
function obtenerContenidoCarrito() {
  const carritoData = fs.readFileSync(carritoFilePath, 'utf-8');
  return JSON.parse(carritoData);
}

// Guardar el contenido actualizado del carrito en el archivo
function guardarCarrito(carrito) {
  fs.writeFileSync(carritoFilePath, JSON.stringify(carrito, null, 2), 'utf-8');
}

// Controlador para obtener el carrito
exports.obtenerCarrito = (req, res) => {
  const carrito = obtenerContenidoCarrito();
  res.json(carrito);
};

// Controlador para agregar un producto al carrito
exports.agregarAlCarrito = (req, res) => {
  const { titulo, precio, imagen } = req.body;

  const carrito = obtenerContenidoCarrito();

  const nuevoProducto = {
    titulo,
    precio,
    imagen
  };

  carrito.push(nuevoProducto);

  guardarCarrito(carrito);

  res.json({ mensaje: 'Producto agregado al carrito' });
};

// Controlador para eliminar un producto del carrito
exports.eliminarDelCarrito = (req, res) => {
  const { titulo } = req.body;

  const carrito = obtenerContenidoCarrito();

  const indice = carrito.findIndex(producto => producto.titulo === titulo);
  if (indice !== -1) {
    carrito.splice(indice, 1);
    guardarCarrito(carrito);
  }

  res.json({ mensaje: 'Producto eliminado del carrito' });
};

// Controlador para actualizar la cantidad de un producto en el carrito
exports.actualizarCantidadEnCarrito = (req, res) => {
  const { titulo, cantidad } = req.body;

  const carrito = obtenerContenidoCarrito();

  const producto = carrito.find(producto => producto.titulo === titulo);
  if (producto) {
    producto.cantidad = cantidad;
    guardarCarrito(carrito);
  }

  res.json({ mensaje: 'Cantidad actualizada en el carrito' });
};

// Controlador para vaciar el carrito
exports.vaciarCarrito = (req, res) => {
  guardarCarrito([]);
  res.json({ mensaje: 'Carrito vaciado' });
};
