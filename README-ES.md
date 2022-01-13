# minermate-express

## Testeos
### Usuario
- ✅ Creación del usuario
- ✅ Eliminación del usuario
- ✅ Login del usuario
- ✅ Logout del usuario

### Oficina 
- ✅ Obtener oficinas (todas)
- ✅ Creación de la oficina
- ✅ Edición de la oficina
- ✅ Eliminación de la oficina

### Gastos operativos (Oficina)
- ✅ Obtener costos operativos de una oficina
- ✅ Registrar y vincular costo operativo a una oficina
- ✅ Pagar costos operativos (independiente de cada minera)
    - Chequear que el pago de un minero no supere el monto pendiente de pago
    - Determinar el pago de cada minero en la factura de luz según su consumo
- ❎ Restar el costo operativo a la propiedad 'availableBalance' de la inversión (programado sin test)

### Pagos
- ✅ Emisión de pagos a inversores (uno a uno) (programado sin test)
    - Descuento del pago a 'availableBalance' del proyecto en cuestión (programado sin test)

### Proyectos
- ✅ Creación del proyecto
- ✅ Edición del proyecto

## Bugs
- Mensajes de éxito dentro de **if(msg == '')** se imprimen en pantalla, incluso si el _helper_ arroja un error.

## Referencia
- ✅ Éxito: Prueba validada
- ❎ Error: Prueba no validada