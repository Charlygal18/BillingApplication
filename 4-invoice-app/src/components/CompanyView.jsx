export const CompanyView = ({ title, company }) => {
    return (
        <>
            <h3>{title}</h3>
            <ul className="list-group">
                <li className="list-group-item active">Empresa: {company.name}</li>
                <li className="list-group-item">Número fiscal: {company.fiscalNumber}</li>
            </ul>
        </>
    )
}