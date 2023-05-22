const listaProductos=document.querySelector('.listaProductos')
const btnOpen= document.querySelector('.mostrarForm')
const formAdd = document.querySelector('.addProduct')
const btnClose= document.querySelector('.close')

function limpiarForm(){
  document.getElementById("nombre").value = ""
  document.getElementById("cantidad").value =""
  document.getElementById("precioMercadona").value =""
  document.getElementById("precioLidl").value = ""
  document.getElementById("precioEroski").value = ""
  document.getElementById("precioAldi").value = ""
}


async function obtenerProductosGestion() {
  limpiarForm()
    console.log("Entro en obtener productos");
    const response = await fetch("/productos/ver");
    const productos = await response.json();
    
    listaProductos.innerHTML = "";

    productos.forEach((producto, index) => {
        const p = document.createElement("p");
        p.textContent = `${producto.nombre} - ${producto.cantidad} - ${producto.precioMercadona} - ${producto.precioLidl} - ${producto.precioEroski} - ${producto.precioAldi}`;
        
        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.addEventListener("click", (event) => {
          formAdd.style.display = 'block'
          document.querySelector('.add').style.display="none";
          document.querySelector('.edit').style.display="block";

          cargarDatosProducto(producto);
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

function cargarDatosProducto(producto) {
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("cantidad").value = producto.cantidad;
  document.getElementById("precioMercadona").value = producto.precioMercadona;
  document.getElementById("precioLidl").value = producto.precioLidl;
  document.getElementById("precioEroski").value = producto.precioEroski;
  document.getElementById("precioAldi").value = producto.precioAldi;
  document.getElementById("idProducto").value = producto._id;


}

async function modificarProducto(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const cantidad = document.getElementById("cantidad").value;
  const precioMercadona = document.getElementById("precioMercadona").value
  const precioEroski = document.getElementById("precioEroski").value
  const precioLidl = document.getElementById("precioLidl").value
  const precioAldi = document.getElementById("precioAldi").value
  const idProducto =  document.getElementById("idProducto").value;
  console.log("esta es la id producto que paso:");
  console.log(idProducto);

  const response = await fetch("/productos/editar", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, cantidad, precioMercadona, precioLidl,precioEroski,precioAldi,idProducto })
  });
  console.log(response);
  document.querySelector('.add').style.display="block";
  document.querySelector('.edit').style.display="none";
  formAdd.style.display = 'none'
  obtenerProductosGestion();
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


document.addEventListener("DOMContentLoaded", obtenerProductosGestion);

document.querySelector('.edit').addEventListener("click", modificarProducto);