import { StatementContainer, StatementItemContainer, StatementItemImage, StatementItemInfo } from "./styles";
import { useEffect, useState } from "react";

import { format } from 'date-fns';
import { FiDollarSign } from 'react-icons/fi';

import { transactions } from "../../../services/resources/pix";

interface IStatementItem {
    user: {
        firstName: string,
        lastName: string
    },
    value: number,
    type: 'paid' | 'received',
    updateAt: Date
}

const StatementItem = ({user, value, type, updateAt}: IStatementItem) => {
    return(
        <StatementItemContainer>
            <StatementItemImage type={type}>
                <FiDollarSign size={24} />
            </StatementItemImage>
            <StatementItemInfo>
                <p className="primary-color">
                    {value.toLocaleString(
                        'pt-br', {style: 'currency', currency: 'BRL'}
                    )}
                </p>
                <p>{type === 'paid' ? 'Pago a ' : 'Recebido de '} 
                    <strong>{user.firstName} {user.lastName}</strong>
                </p>
                <p>{format(new Date(updateAt), "dd/mm/yyyy 'às' HH:mm:'h'")}</p>
            </StatementItemInfo>
        </StatementItemContainer>
    );
}

const Statement = () => {
    const [statements, setStatements] = useState<IStatementItem[]>([]);
    
    const getAlltransactions = async () => {
        const {data} = await transactions();
        setStatements(data.transactions)
    }

    useEffect(() =>{
        getAlltransactions();
    }, [])

    return(
        <StatementContainer>
            {statements.length > 0 && statements.map((statement, key) => <StatementItem {...statement} key={key} />)}
        </StatementContainer>
    );
}

export default Statement;