import { BodyContainer, DashboardBackground, InlineContainer, InlineTitle } from "./styles";
import { useEffect, useState } from "react";

import Header from "../../components/Header";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";

import Statement from "./Statement";
import useAuth from "../../hooks/useAuth";
import { pay, request } from "../../services/resources/pix";

const Dashboard = () => {
    const {user, getCurrentUser} = useAuth();
    const wallet = user?.wallet || 0;

    const [key, setKey] = useState('');
    const [generatedKey, setGeneratedKey] = useState('');
    const [value, setValue] = useState('');

    const handleNewPayment = async () => {
        const {data} = await request(Number(value));

        if(data.copyPasteKey){
            setGeneratedKey(data.copyPasteKey)
        }
    }

    const handlePayPix = async () => {
        try{
            const {data} = await pay(key);
            console.log(data)
            if(data.msg){
                alert(data.msg);
                return;
            }
            
            alert('Não foi possível fazer o pagamento');
        }catch(e){
            console.log(e);
            alert('PIX inválido');
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser]);

    if(!user){
        return null;
    }

    return (
        <DashboardBackground>
            <Header />
            <BodyContainer>
                <div>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Saldo atual</h2>
                        </InlineTitle>
                        <InlineTitle>
                            <h3 className="wallet">
                                {wallet.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </h3>
                        </InlineTitle>
                    </Card>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Receber PIX</h2>
                        </InlineTitle>
                        <InlineContainer>
                            <Input style={{flex: 1}} placeholder="Valor" 
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                            <Button onClick={handleNewPayment}>Gerar código</Button>
                        </InlineContainer>

                        {generatedKey && (
                            <>
                                <p className="primary-color">Pix copia e cola</p>
                                <p className="primary-color">{generatedKey}</p>
                            </>
                        )}
                    </Card>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Pagar PIX</h2>
                        </InlineTitle>
                        <InlineContainer>
                            <Input style={{flex: 1}} value={key} 
                                onChange={e => setKey(e.target.value)} 
                                placeholder="Insira a chave" />
                            <Button onClick={handlePayPix}>Pagar PIX</Button>
                        </InlineContainer>
                    </Card>
                </div>
                <div>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Extrato da conta</h2>
                        </InlineTitle>
                        <Statement />
                    </Card>
                </div>
            </BodyContainer>
        </DashboardBackground>
    );
}

export default Dashboard;