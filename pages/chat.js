import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMzMzgzMCwiZXhwIjoxOTU4OTA5ODMwfQ.62fihY9GgqWgUA1yCTWrAxtob2r5o_ATmTho2g5JlnE';
const SUPABASE_URL = 'https://uvxocojwbsxexgtwfwil.supabase.co';

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(SUPABASE_URL , SUPABASE_ANON_KEY)
const userLog = 'lambertimarcos'
//console.log(dadosSupabase);

export default function ChatPage() {
    const [mensagem , setMensagem ] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', {ascending: false}).
            then(({data}) => {
                console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });
    }, []);


    /*
    // Usuário
    -Usuário digita no campo textarea
    -Apertar enter para enviar
    -Tem que adicionar o texto na listagem

    // Dev
    - [] Campo criado
    - [] Vamos usar o onchange usa o useState (ter if para caso seja enter para limpar a variavel )
    - [] Listar as mensagens
    */

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
           // id: listaDeMensagens.length +1,
            de: 'lambertimarcos',
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) =>{
                console.log('Criando mensagem:' , data);
                setListaDeMensagens([
                data[0],
                ...listaDeMensagens,
                ]);
            });
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    
                    <MessageList mensagens={listaDeMensagens} />
                    {/*  Lista de mensagens: 
                        {listaDeMensagens.map((mensagemAtual) => {
                            return(
                                <li key={mensagemAtual.id}>
                                    {mensagemAtual.de}: {mensagemAtual.texto}
                                </li>
                            )
                        })}
                         */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField

                            value={mensagem}
                            onChange={(e) => {
                                console.log(e);
                                const valor = e.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if(event.key === 'Enter') {
                                    event.preventDefault();
                                    
                                    handleNovaMensagem(mensagem);
                                }
                                
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                textShadow: '1px 1px 2px black, 0 0 10px yellow, 0 0 4px darkblue',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                
            }}
        >
            {props.mensagens.map((mensagem)=> {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            } 
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                    hover: {
                                        width: '60px', 
                                        height: '60px',
                                    }
                                        
                            }}

                            src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong"
                                styleSheet={{
                                    Color: '#00FF00',
                                }}
                            >
                            {mensagem.de}
                            </Text>

                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[400],

                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto}
                        
                    </Text>
                );
            })}

        </Box>
    )
}