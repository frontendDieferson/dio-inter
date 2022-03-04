import { CardContainer } from "./styled";

interface CardProps {
    children?: React.ReactNode;
    width?: string;
    height?: string;
    noShadow?: boolean;
}
const Card = ({ children, width='100%', height='auto', noShadow=false}: CardProps) => {
    return(
        <CardContainer width={width} height={height} noShadow={noShadow}>
            {children}
        </CardContainer>
    );
}

export default Card;