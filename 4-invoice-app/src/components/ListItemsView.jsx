import { RowItemView } from "./RowItemView"
import PropTypes from 'prop-types';

export const ListItemsView = ({ title, items }) => {
    return (
        <>
            <h4>{title}</h4>
            <table className="table table-striéd table-hover">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(({ id, product, price, quantity }) => (
                        <RowItemView key={id} product={product} price={price} quantity={quantity}/>
                    ))}
                </tbody>

            </table>
        </>
    )
}
ListItemsView.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
}