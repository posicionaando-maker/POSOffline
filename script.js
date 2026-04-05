// Cargar productos y ventas desde localStorage
let productos = JSON.parse(localStorage.getItem('productos')) || [
  {nombre: "Coca-Cola", precio: 2},
  {nombre: "Pan", precio: 1.5},
  {nombre: "Galletas", precio: 1}
];
let carrito = [];
let total = 0;
let historial = JSON.parse(localStorage.getItem('historial')) || [];
// Inicializar la app
mostrarProductos();
actualizarHistorial();
actualizarCarrito();
// Mostrar productos
function mostrarProductos(){
  const lista = document.getElementById('lista-productos');
  lista.innerHTML = '';
  productos.forEach((p, i) => {
    const div = document.createElement('div');
    div.innerHTML = `<label>${p.nombre} $${p.precio}</label> <button onclick="agregarProducto('${p.nombre}', ${p.precio})">Agregar</button>`;
    lista.appendChild(div);
  });
  localStorage.setItem('productos', JSON.stringify(productos));
}
// Agregar nuevo producto
function agregarNuevoProducto(){
  const nombre = document.getElementById('nuevo-nombre').value.trim();
  const precio = parseFloat(document.getElementById('nuevo-precio').value);
  if(!nombre || isNaN(precio)){ alert("Ingrese nombre y precio válidos."); return; }
  productos.push({nombre, precio});
  mostrarProductos();
  document.getElementById('nuevo-nombre').value = '';
  document.getElementById('nuevo-precio').value = '';
}
// Carrito
function agregarProducto(nombre, precio){
  carrito.push({nombre, precio});
  total += precio;
  actualizarCarrito();
}
function actualizarCarrito(){
  const lista = document.getElementById('carrito');
  lista.innerHTML = '';
  carrito.forEach((item, i) => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio}`;
    lista.appendChild(li);
  });
  document.getElementById('total').textContent = total.toFixed(2);
}
// Cobrar y guardar historial
function cobrar(){
  if(carrito.length === 0){ alert("No hay productos en el carrito."); return; }
  alert(`Total a cobrar: $${total.toFixed(2)}\n¡Venta registrada!`);
  historial.push({fecha: new Date().toLocaleString(), items: [...carrito], total: total.toFixed(2)});
  localStorage.setItem('historial', JSON.stringify(historial));
  actualizarHistorial();
  reiniciar();
}
// Reiniciar carrito
function reiniciar(){ carrito = []; total = 0; actualizarCarrito(); }
// Mostrar historial
function actualizarHistorial(){
  const lista = document.getElementById('historial');
  lista.innerHTML = '';
  historial.forEach((venta, i) => {
    const li = document.createElement('li');
    li.textContent = `${i+1}. ${venta.fecha} - Total: $${venta.total}`;
    lista.appendChild(li);
  });
}