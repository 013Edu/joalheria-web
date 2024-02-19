import { useState } from 'react';
import styled from 'styled-components';
import { FormControl, InputLabel, MenuItem, Select, ThemeProvider, createTheme } from '@mui/material';

const Container = styled.div`
    padding: 20px;
    margin-top: 0;
    background-color: #bb9469;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const Content = styled.div`
    margin-top: 0;
    padding: 20px;
    border-color: #ffd207;
    background-color: transparent;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 600px;
`;

const StyledText = styled.p`
    color: #000;
    font-weight: bold;
`;

const Heading = styled.h2`
    font-size: 30px;
    font-weight: bold;
    color: #000;
`;

const Input = styled.input`
    border-width: 1px;
    border-color: #e2aa44;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px;
    width: 280px;
`;

const Button = styled.button`
    padding: 20px 30px;
    width: 280px;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
    color: #000;
    background: url(/src/assets/bg-btn.png) center center no-repeat;
    background-size: cover;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    height: 100px;

    &:hover {
      background-color: #e8b556;
    }
`;

const theme = createTheme({
    palette: {
      success: {
        main: '#e8b556',
      },
    },
  });
  

const Calculator = () => {
    const [goldPrice, setGoldPrice] = useState('');
    const [milligrams, setMilligrams] = useState('');
    const [weight, setWeight] = useState('');
    const [work, setWork] = useState('');
    const [totalBath, setTotalBath] = useState('');
    const [rawPrice, setRawPrice] = useState('');
    const [cost, setCost] = useState('');
    const [markup, setMarkup] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');

    const calculateTotal = () => {
        const miligramsValue = Number((milligrams || '').toString().replace(',', '.')) * 0.001;
        const maoDeObraValue = Number((work || '').toString().replace(',', '.')) * 0.001;

        const resultado = (miligramsValue + maoDeObraValue) * Number((weight || '').toString().replace(',', '.')) * Number((goldPrice || '').toString().replace(',', '.'));

        setTotalBath("R$" + " " + resultado.toFixed(2).toString());
        console.log(resultado);
    };

    const calculateTotalPriceBruto = () => {
        const priceBrutoValue = Number((rawPrice || '').toString().replace(',', '.'));
        const miligramsValue = Number((milligrams || '').toString().replace(',', '.')) * 0.001;
        const maoDeObraValue = Number((work || '').toString().replace(',', '.')) * 0.001;

        const resultado = (miligramsValue + maoDeObraValue) * Number((weight || '').toString().replace(',', '.')) * Number((goldPrice || '').toString().replace(',', '.'));

        const resultadoCust = resultado + priceBrutoValue;

        setCost("R$" + " " + resultadoCust.toFixed(2).toString());
        console.log(resultadoCust);
    };

    const calculateTotalVenda = () => {
        const selectedMarkup = Number((markup || '').toString().replace(',', '.'));
        const priceBrutoValue = Number((rawPrice || '').toString().replace(',', '.'));
        const miligramsValue = Number((milligrams || '').toString().replace(',', '.')) * 0.001;
        const maoDeObraValue = Number((work || '').toString().replace(',', '.')) * 0.001;

        const resultado = (miligramsValue + maoDeObraValue) * Number((weight || '').toString().replace(',', '.')) * Number((goldPrice || '').toString().replace(',', '.'));

        const resultadoCust = resultado + priceBrutoValue;

        setCost("R$" + " " + resultadoCust.toFixed(2).toString());
        const costValue = isNaN(Number((cost || '').toString().replace(',', '.'))) ? 0 : Number((cost || '').toString().replace(',', '.'));

        const markupValue = (selectedMarkup);

        const resultadoVenda = resultadoCust * markupValue;

        console.log("Valor do Custo:", costValue);

        const formattedResultadoVenda = resultadoVenda.toFixed(2).replace('.', ',');

        setSellingPrice("R$" + " " + formattedResultadoVenda);
        console.log(markupValue);
    };

    return (
        <ThemeProvider theme={theme}>
        <Container>
            <Content>
            <Heading>Calculadora de banho</Heading>
                <StyledText>Cotação do dia:</StyledText>
                <Input
                    type='number'
                    value={goldPrice}
                    onChange={(e) => setGoldPrice(e.target.value)}
                    placeholder="Total em R$"
                />

                <StyledText>Milésimos</StyledText>
             
            <FormControl sx={{ m: 1, minWidth: 120, width: 280 }} color='success'>
                <InputLabel
                    htmlFor="demo-simple-select-helper"
                    sx={{
                        color: '#000'
                    }}
                >
                    Milésimos
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={milligrams}
                    label="Age"
                    onChange={(e) => setMilligrams(e.target.value)}
                >
                    {Array.from({ length: 20 }, (_, i) => (
                        <MenuItem key={i} value={i + 1}>{`${i + 1} ml`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
                <StyledText>Mão de obra</StyledText>
                <FormControl sx={{ m: 1, minWidth: 120, width: 280 }} color='success'>
                <InputLabel
                    htmlFor="demo-simple-select-helper"
                    sx={{
                        color: '#000'
                    }}
                >
                    Mão de obra
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={work}
                    label="Age"
                    onChange={(e) => setWork(e.target.value)}
                >
                   {Array.from({ length: 10 }, (_, i) => (
                        <MenuItem  key={i} value={1.5 + i * 0.5}>{`${1.5 + i * 0.5} ml`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
                <StyledText>Peso da Peça</StyledText>
                <Input
                    type='number'
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="R$ 00,00"
                />

                <Button onClick={calculateTotal}>Calcular o valor total do Banho</Button>

                <StyledText>Total de Banho</StyledText>
                <Input
                    type='text'
                    value={totalBath}
                    onChange={(e) => setTotalBath(e.target.value)}
                    placeholder="Total em R$"
                />

                <StyledText>Preço do Bruto</StyledText>
                <Input
                    type='number'
                    value={rawPrice}
                    onChange={(e) => setRawPrice(e.target.value)}
                    placeholder="R$ 00,00"
                />

                <Button onClick={calculateTotalPriceBruto}>Calcular o valor total do Custo</Button>

                <StyledText>Custo</StyledText>
                <Input
                    type='text'
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="R$ 00,00"
                />

                <StyledText>Marcap</StyledText>

                <FormControl sx={{ m: 1, minWidth: 120, width: 280, backgroundColor: '#bb9469' }} color='success'>
    <InputLabel
        htmlFor="demo-simple-select-helper"
        sx={{
            paddingRight: 10,
            color: '#000'
        }}
    >
        Marcap
    </InputLabel>
    <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={markup}
        label="Age"
        onChange={(e) => setMarkup(e.target.value)}
        sx={{ background: '#bb9469' }} // Adicionando cor de fundo ao Select
    >
        {Array.from({ length: 18 }, (_, i) => (
            <MenuItem key={i} value={1.5 + i * 0.5}>{`X ${1.5 + i * 0.5}`}</MenuItem>
        ))}
    </Select>
</FormControl>

                <Button onClick={calculateTotalVenda}>Calcular o valor total da Venda</Button>

                <StyledText>Preço da Venda</StyledText>
                <Input
                    type='text'
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    placeholder="R$ 00,00"
                />
            </Content>
        </Container>
        </ThemeProvider>
    );
};

export default Calculator;
