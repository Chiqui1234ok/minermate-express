# minermate-express

- Registrar los pagos de los accionistas
- Seguro de vida
- Generar formularios / encuestas para accionistas. Los votos deben ser relativos al porcentaje de acción de cada uno
- Aclarar que contamos con seguros para las máquinas

## Tests
### User
- ✅ User creation
- ✅ User deletion
- ✅ User login
- ✅ User logout

### Office
- ✅ Get offices (all)
- ✅ Creation of the office
- ✅ Office Edition
- ✅ Elimination of the office

### Operating expenses (Office)
- ✅ Obtain operating costs of an office
- ✅ Register and link operating cost to an office
- ✅ Pay operating costs (independent of each mining company)
    - Check that the payment of a miner does not exceed the amount pending payment
    - Determine the payment of each miner in the electricity bill according to their consumption
- ❎ Subtract the operating cost from the 'availableBalance' property of the investment (scheduled without testing)

### Payments
- ✅ Issuance of payments to investors (one by one) (scheduled without test)
    - Payment discount to 'availableBalance' of the project in question (scheduled without test)

### Projects
- ✅ Project creation
- ✅ Project editing

### Pending Projects
- ✅ Pending project creation
- ❎ Pending project receipts (falta upload de imágen)
- ❎ Transform pending project to REAL project

## Bugs
- Success messages within ** if (msg == '') ** are printed to the screen, even if the _helper_ throws an error.

## Reference
- ✅ Success: Validated test
- ❎ Error: Test not validated