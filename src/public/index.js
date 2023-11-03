const socket = io();

socket.on('connect',()=>{
    console.log('servidor conectado')
});

socket.on('productAdded', (data) => {
    // lista de productos
    // con el nuevo producto 
});


socket.on('productDeleted', (data) => {
    // elimina el producto de la lista de productos
});

 // Manejar el envío del formulario para agregar un producto
document.getElementById('addProductForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const productName = e.target.productName.value;
    const productQuantity = e.target.productQuantity.value;

    // Aquí, emite un evento para agregar el producto a través de WebSockets
    socket.emit('addProduct', { name: productName, quantity: productQuantity });

    // Limpia los campos del formulario
    e.target.productName.value = '';
    e.target.productQuantity.value = '';
});

// Manejar el envío del formulario para eliminar un producto
document.getElementById('deleteProductForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const productId = e.target.productId.value;

    // Aquí, emite un evento para eliminar el producto a través de WebSockets
    socket.emit('deleteProduct', { id: productId });

    // Limpia el campo del formulario
    e.target.productId.value = '';
});