export const invoice = {
    id: 10,
    name: 'Componentes Pc',
    client: {
        name: 'Charly',
        lastName: 'Galvan',
        address: {
            country: 'México',
            city: 'Puerto Escondido',
            street: 'organizacion',
            number: 1028
        }
    },
    company: {
        name: 'IDS comercial',
        fiscalNumber: 1234567,
    },
    items: [
        {
            id: 1,
            product: 'Cpu Intel i7',
            price: 12999,
            quantity: 1
        },
        {
            id: 2,
            product: 'Keyboard',
            price: 299,
            quantity: 1
        },
        {
            id: 3,
            product: 'Monitor Asus',
            price: 750,
            quantity: 1
        }
    ]
}