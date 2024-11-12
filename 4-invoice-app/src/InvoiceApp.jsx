import { useEffect, useState } from "react";
import { calculateTotal, getInvoice } from "./services/getInvoice"
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { FormItemsView } from "./components/FormItemsView";

const invoiceInitial = {
    id: 0,
    name: '',
    client: {
        name: '',
        lastName: '',
        address: {
            country: '',
            city: '',
            street: '',
            number: 0
        }
    },
    company: {
        name: ' ',
        fiscalNumber: 0,
    },
    items: []
}
export const InvoiceApp = () => {

    const [activeForm, setActiveForm] = useState(false);

    const [total, setTotal] = useState(0);

    const [invoice, setInvoice] = useState(invoiceInitial);

    const [items, setItems] = useState([]);

    // La factura inicial tiene id 1,2 y 3 por eso se inicia en 4
    const [counter, setCounter] = useState(4);

    const { id, name, client, company } = invoice;

    useEffect( () => {
        const data = getInvoice();
        console.log(data);
        setInvoice(data);
        setItems(data.items);
    }, []);

    useEffect( () => {
        //console.log('El counter cambió');
    }, [counter]);

    useEffect( () => {
        setTotal(calculateTotal(items))
        //console.log('El item cambió');
    }, [items]);

    /*
    const [productValue, setProductValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [quantitytValue, setQuantitytValue] = useState('');
    */

    /*
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
    */
    const handlerAddItems = ( { product, price, quantity } ) => {
        
        setItems([...items, { 
            id: counter,
            product: product.trim(), 
            price: +price.trim(), 
            quantity: parseInt(quantity.trim(), 10)
        }]);
        
        setCounter(counter + 1);
    }

    const handlerDeleteItem = (id) => {
        setItems(items.filter( item => item.id !== id))
    }

    const onActiveForm = () => {
        setActiveForm(!activeForm);
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
                        <ListItemsView title="Productos de la factura" items={items} handlerDeleteItem={ id => handlerDeleteItem(id) } />
                        <TotalView total = { total } />
                        <button className="btn btn-secondary"
                        onClick={ onActiveForm } > {!activeForm? 'Agregar Item' : 'Ocultar Form' }</button>
                        { !activeForm || <FormItemsView handler={ handlerAddItems } />}

                    </div>
                </div>
            </div>
        </>
    )
}