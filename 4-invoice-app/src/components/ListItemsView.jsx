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
                        <tr key={id}>
                            <td>{product}</td>
                            <td>{price}</td>
                            <td>{quantity}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    )
}