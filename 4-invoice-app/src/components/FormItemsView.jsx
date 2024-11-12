import { useEffect, useState } from "react";
import { isEqual } from 'lodash';

export const FormItemsView = ( { handler }) => {

    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: ''
    });

    const { product, price, quantity } = formItemsState;

    useEffect( () => {
        //console.log('El precio cambió');
    }, [price]);

    useEffect( () => {
        //console.log('El formItemsState cambió');
    }, [formItemsState]);

    const onInputChange = ({ target: { name, value } }) => {
        //console.log(name);
        //console.log(value);
        setFormItemsState({
            ...formItemsState,
            [name]: value
        });
    }

    const onInvoiceItemSubmit = ( event ) => {
        event.preventDefault();

        if (isEqual(product.trim(), '')) {
            alert('El producto no puede ir vacío')
            return;
        }
        if (isEqual(price.trim(), '') || isNaN(price) || +price <= 0) {
            alert('El precio debe ser un número positivo')
            return;
        }
        if (+quantity.trim() < 1 || !Number.isInteger(+quantity.trim())) {
            alert('La cantidad tiene que ser un número entero positivo')
            return;
        }
        
        handler(formItemsState);

        setFormItemsState({
            product: '',
            price: '',
            quantity: ''
        });
    }

    return <>
    <form className="w-50" onSubmit={ event => onInvoiceItemSubmit(event) }>
                            <input 
                                type="text" 
                                name="product" 
                                value={ product }
                                placeholder="Producto" 
                                className="form-control m-3" 
                                onChange={ onInputChange }/>
                            <input 
                                type="text" 
                                name="price"
                                value={ price } 
                                placeholder="Precio" 
                                className="form-control m-3" 
                                onChange={ event =>  onInputChange(event) }/>
                            <input 
                                type="text" 
                                name="quantity"
                                value={ quantity } 
                                placeholder="Cantidad" 
                                className="form-control m-3" 
                                onChange={ event => onInputChange(event) }/>
                            <button 
                                type="submit"
                                className="btn btn-primary m-3">
                                Nuevo Item
                            </button>
                        </form>
    
    </>
}