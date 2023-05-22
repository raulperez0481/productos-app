const listaProductos=document.querySelector('.listaProductosFront')

async function obtenerProductosFront() {
    
      const response = await fetch("/productos/ver");
      const productos = await response.json();
      
      listaProductos.innerHTML = "";
  
      productos.forEach((producto, index) => {
          const divProducto = document.createElement("div");
          divProducto.classList.add("product-single")

          const nombreProducto=document.createElement("h3");
          nombreProducto.textContent = producto.nombre

          const cantidadProducto=document.createElement("h6");
          cantidadProducto.textContent = producto.cantidad

          const divPrecios= document.createElement("div");
          divPrecios.classList.add("precios")

          const divAldi= document.createElement("div");
          const imgAldi= document.createElement("img");
          imgAldi.src="../images/aldi.svg"
          imgAldi.width="48"
          divAldi.appendChild(imgAldi)

          const divEroski= document.createElement("div");
          const imgEroski= document.createElement("img");
          imgEroski.src="../images/eroski.png"
          imgEroski.width="48"
          divEroski.appendChild(imgEroski)

          const divLidl= document.createElement("div");
          const imgLidl= document.createElement("img");
          imgLidl.src="../images/lidl.svg"
          imgLidl.width="48"
          divLidl.appendChild(imgLidl)

          const divMercadona= document.createElement("div");
          const imgMercadona= document.createElement("img");
          imgMercadona.src="../images/mercadona.svg"
          imgMercadona.width="52"
          divMercadona.appendChild(imgMercadona)

          const arrayPrecios=[producto.precioAldi,producto.precioEroski,producto.precioLidl,producto.precioMercadona]
          const precioMasAlto = Math.max(...arrayPrecios);
          const precioMasBajo = Math.min(...arrayPrecios);

          const precioAldi=document.createElement("p");
          precioAldi.textContent=`${producto.precioAldi} €`

          const precioEroski=document.createElement("p");
          precioEroski.textContent=`${producto.precioEroski} €`

          const precioLidl=document.createElement("p");
          precioLidl.textContent=`${producto.precioLidl} €`

          const precioMercadona=document.createElement("p");
          precioMercadona.textContent=`${producto.precioMercadona} €`

          console.log(precioMasAlto);
          if (producto.precioAldi == precioMasAlto) {
            precioAldi.classList.add("rojo");
          }
          
          if (producto.precioEroski == precioMasAlto) {
            precioEroski.classList.add("rojo");
          }
          
          if (producto.precioLidl == precioMasAlto) {
            precioLidl.classList.add("rojo");
          }
          
          if (producto.precioMercadona == precioMasAlto) {
            precioMercadona.classList.add("rojo");
          }

          console.log(precioMasBajo);
          if (producto.precioAldi == precioMasBajo) {
            precioAldi.classList.add("verde");
          }
          
          if (producto.precioEroski == precioMasBajo) {
            precioEroski.classList.add("verde");
          }
          
          if (producto.precioLidl == precioMasBajo) {
            precioLidl.classList.add("verde");
          }
          
          if (producto.precioMercadona == precioMasBajo) {
            precioMercadona.classList.add("verde");
          }


          divPrecios.appendChild(divAldi);
          divPrecios.appendChild(divEroski);
          divPrecios.appendChild(divLidl);
          divPrecios.appendChild(divMercadona);
          divPrecios.appendChild(precioAldi);
          divPrecios.appendChild(precioEroski);
          divPrecios.appendChild(precioLidl);
          divPrecios.appendChild(precioMercadona);
          divProducto.appendChild(nombreProducto)
          divProducto.appendChild(cantidadProducto)
          divProducto.appendChild(divPrecios)
          listaProductos.appendChild(divProducto);
      })
  }



document.addEventListener("DOMContentLoaded", obtenerProductosFront);