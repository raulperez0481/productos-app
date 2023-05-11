const listaProductos=document.querySelector('.listaProductos')
const btnOpen= document.querySelector('.mostrarForm')
const formAdd = document.querySelector('.addProduct')
const btnClose= document.querySelector('.close')


async function obtenerProductos() {
    console.log("Entro en obtener productos");
    const response = await fetch("/productos/ver");
    const productos = await response.json();
    
    listaProductos.innerHTML = "";

    productos.forEach((producto, index) => {
        const p = document.createElement("p");
        p.textContent = `${producto.nombre} - ${producto.cantidad} - ${producto.precioMercadona} - ${producto.precioLidl} - ${producto.precioEroski} - ${producto.precioAldi}`;
        
        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.dataset.id = index; // Agrega el índice de la producto como atributo data-id
        botonEditar.addEventListener("click", (event) => {
          //obteniendo el índice de la producto correspondiente al botón que se acaba de presionar
          const productoIndex = event.target.dataset.id;
          document.querySelector('.envio').style.display="none";
          document.querySelector('.edit').style.display="block";

          cargarDatosproducto(productos,productoIndex);
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", (event) => {
            eliminarProducto(producto.nombre);
          });

        

        p.appendChild(botonEditar);
        p.appendChild(botonEliminar);
        listaProductos.appendChild(p);
    })
}

async function eliminarProducto(nombreProducto) {
    console.log(nombreProducto)
    const response = await fetch("/productos/borrar", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({nombreProducto})
    });
    obtenerProductos();
  }

btnOpen.addEventListener('click', (e) => {
    e.preventDefault()
    formAdd.style.display = 'block'
});

btnClose.addEventListener('click', (e) => {
    e.preventDefault()
    formAdd.style.display = 'none'
});

document.addEventListener("DOMContentLoaded",obtenerProductos)

//document.querySelector('.edit').addEventListener("click", modificarProducto);