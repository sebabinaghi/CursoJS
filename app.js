//ASIGNACIÓN DE ALGUNAS VARIABLES
const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')
const botonComprar = document.getElementById('comprar')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// BOTON DE VACIAR CARRITO
botonVaciar.addEventListener('click', () => {
    // SE AÑADiO SWEET ALERT PARA VACIAR EL CARRITO A 0 CON CONFIRMACION
    Swal.fire({
        title: 'Estas seguro de eliminar todos los celulares?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgba(2, 200, 2, 0.808',
        cancelButtonColor: 'rgba(3, 22, 190, 0.808',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            // AGREGO SWEETALERT A LOS BOTONES      
            Swal.fire(
                'Eliminados!',
                'Ahora tu carrito esta vacío.',
                'success'
)
carrito.length = 0
actualizarCarrito()
}
})
})


botonComprar.addEventListener('click', () => {
    // SE AÑADiO SWEET ALERT PARA VACIAR EL CARRITO A 0 CON CONFIRMACION
    Swal.fire({
        title: 'Estas seguro de efectuar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgba(21, 255, 0, 0.808)',
        cancelButtonColor: 'rgba(255, 0, 0, 0.808)',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            // AGREGO SWEETALERT A LOS BOTONES      
            Swal.fire(
                'Compra hecha!',
                'Gracias por tu compra!',
                'success')
    carrito.length = 0
    actualizarCarrito()
}
})
})


carrito.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img class="fotoIcono" src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)
    
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener("click", () => { agregarAlCarrito(`${producto.id}`)})
})

// BOTÓN DE AGREGAR PRODUCTOS AL CARRITO
const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = dataProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    // AGREGO SWEETALERT A LOS BOTONES
    swal.fire(
        'Agregado!',
        'Agregaste este celular a tu carrito.',
        'success'
    )
    actualizarCarrito() 
}

// BOTÓN DE ELIMINAR PRODUCTOS DEL CARRITO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)    

    carrito.splice(indice, 1)
    actualizarCarrito() 
    console.log(carrito) 

    // AGREGO SWEETALERT A LOS BOTONES
    swal.fire ({
        title: "Eliminado",
        text: "El producto se ha eliminado!",
        icon: "error",
        timer: 2000,
    })
}


const actualizarCarrito = () => {
    
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <img class="fotoIcono" src="${prod.img}">
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}


// CÓDIGO PARA LLAMAR A LA API DE LOS PRODUCTOS
const pedirProductos = async () => {
    const resp = await
    fetch ("/stock.json")
     dataProductos = await resp.json()

dataProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src="${producto.img}" alt="">
    <h3>${producto.nombre}</h3>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => { agregarAlCarrito(producto.id) })
})
}

pedirProductos ()