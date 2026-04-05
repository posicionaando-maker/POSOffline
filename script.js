const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR2jdvVlVww2NEYN4qWYDwSonX1WJfq7jzpkduDTdcWBTAWDLlWRXdqJYByIP0Z96BmieT-j3ixGD_6/pub?gid=0&single=true&output=csv';
let inventario = [];
let carrito = [];

async function importarDesdeGoogle() {
    try {
        const res = await fetch(GOOGLE_SHEET_CSV_URL);
        const data = await res.text();
        const filas = data.split('\n').slice(1);
        inventario = filas.map(f => {
            const [id, nombre, cat, precio] = f.split(',');
            return { id: id?.trim(), nombre: nombre?.trim(), precio: parseFloat(precio) };
        }).filter(p => !isNaN(p.precio));
        renderizar();
    } catch (e) { console.error("Error de conexión"); }
}

function renderizar() {
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = inventario.map(p => `
        <div onclick="add('${p.id}')" class="bg-white p-4 rounded-xl shadow-sm border active:bg-indigo-50 transition-colors">
            <p class="font-bold text-gray-800">${p.nombre}</p>
            <p class="text-indigo-600 font-bold">$${p.precio.toFixed(2)}</p>
        </div>
    `).join('');
}

function add(id) {
    const p = inventario.find(i => i.id === id);
    carrito.push(p);
    const total = carrito.reduce((s, i) => s + i.precio, 0);
    document.getElementById('total-display').innerText = total.toFixed(2);
}

function cobrar() {
    if(carrito.length === 0) return;
    alert("Venta realizada: $" + document.getElementById('total-display').innerText);
    reiniciar();
}

function reiniciar() {
    carrito = [];
    document.getElementById('total-display').innerText = "0.00";
}

importarDesdeGoogle();