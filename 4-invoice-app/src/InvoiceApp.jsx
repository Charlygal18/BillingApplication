import { useState } from "react";
import { getInvoice } from "./services/getInvoice"
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { isEqual } from 'lodash';

export const InvoiceApp = () => {

    const { total, id, name, client, company, items: itemsInitial } = getInvoice();

    const [productValue, setProductValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [quantitytValue, setQuantitytValue] = useState('');

    const [items, setItems] = useState(itemsInitial);
    // La factura inicial tiene id 1,2 y 3 por eso se inicia en 4
    const [counter, setCounter] = useState(4);

    const onProductChange = ({ target }) => {
        console.log(target.value);
        setProductValue(target.value);
    }

    const onPriceChange = ({ target }) => {
        console.log(target.value);
        setPriceValue(target.value);
    }

    const onQuantityChange = ({ target }) => {
        console.log(target.value);
        setQuantitytValue(target.value);
    } 

    const onInvoiceItemSubmit = ( { event } ) => {
        event.preventDefault();
        if (isEqual(productValue.trim(), '')) {
            alert('El producto no puede ir vacío')
            return;
        }
        if (isEqual(priceValue.trim(), '') || isNaN(priceValue) || +priceValue <= 0) {
            alert('El precio debe ser un número positivo')
            return;
        }
        if (+quantitytValue.trim() < 1 || !Number.isInteger(+quantitytValue.trim())) {
            alert('La cantidad tiene que ser un número entero positivo')
            return;
        }
        setItems([...items, { 
            id: counter,
            product: productValue.trim(), 
            price: +priceValue.trim(), 
            quantity: parseInt(quantitytValue.trim(), 10)
        }]);
        setProductValue('');
        setPriceValue('');
        setQuantitytValue('');
        setCounter(counter + 1);
    }

    return (
        <>
            <div className="container">
                <div className="card my-3">
                    <div className="card-header">
                        Ejemplo factura
                    </div>
                    <div className="card-body">
                        <InvoiceView id={id} name={name} />
                        <div className="row my-3">
                            <div className="col">
                                <ClientView title="Datos del cliente" client={client} />
                            </div>
                            <div className="col">
                                <CompanyView title="Datos de la empresa" company={company} />
                            </div>
                        </div>
                        <ListItemsView title="Productos de la factura" items={items} />
                        <TotalView total = { total } />

                        <form className="w-50" onSubmit={ event => onInvoiceItemSubmit(event) }>
                            <input 
                                type="text" 
                                name="product" 
                                value={ productValue }
                                placeholder="Producto" 
                                className="form-control m-3" 
                                onChange={ onProductChange }/>
                            <input 
                                type="text" 
                                name="price"
                                value={ priceValue } 
                                placeholder="Precio" 
                                className="form-control m-3" 
                                onChange={ event =>  onPriceChange(event) }/>
                            <input 
                                type="text" 
                                name="quantity"
                                value={ quantitytValue } 
                                placeholder="Cantidad" 
                                className="form-control m-3" 
                                onChange={ event => onQuantityChange(event) }/>
                            <button 
                                type="submit"
                                className="btn btn-primary m-3">
                                Nuevo Item
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}