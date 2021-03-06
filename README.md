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
- ✅ Get office (all)
- ✅ Register office
- ✅ Update office
- ✅ Delete office

### Operating expenses (Office)
- ✅ Get operating costs of an office
- ✅ Register and link operating cost to an office
- ✅ Pay operating costs (independent of each project / mining company)
    - Check that the payment of a miner does not exceed the amount pending payment (pending)
    - Determine the payment of each miner in the electricity bill according to their consumption (pending)
- ❎ Subtract the operating cost from the 'availableBalance' property of the investment (scheduled without testing)

### Payments
- ✅ Issuance of payments to investors (one by one) (scheduled without test)
    - Payment discount to 'availableBalance' of the project in question (scheduled without test)

### Projects
#### In older versions: *investments*. However, this name transformation isn't finished already.
- ✅ Register project
- ✅ Update project

### Pending Projects
- ✅ Pending project creation
- ❎ Pending project receipts (bug: req.files is *undefined*)
- ✅ Transform pending project to final/real project
- ✅ Re-link receipts from pending project to final/real project

### Pending Investor
- ✅ DB Model
- ❎ Register pendingInvestor (test pending)
- ❎ Register intentionToPay (test pending)

### Investor
- ✅ DB Model
- ❎ Back-end:
    - Link ProjectID
    - Add initial investment of the user at space 0
    - Convert initial investment to project's preferred mining coin
    - Calculate the stocks in number and percentage

### Currency/:symbol
- ✅ Currency model
- ✅ Currency route
- ✅ getCurrency(), registerCurrency() helpers
- ❎ patchCurrency() not tested
- ❎ currencyExists() -> findOne() returns null/false

## Auto-gen
### Pending Projects
- ✅ Auto-gen pending project

### Pending Projects Receipts
- ✅ Auto-gen pending project receipts

----

## Reference
- ✅ Success: Validated test
- ❎ Error: Test not validated