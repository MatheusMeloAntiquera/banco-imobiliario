# Simulador de Banco Imobiliário

## Pré-requisitos
- Node - versão LTS se possível
- NPM ou YARN

## Instalando os NPM Modules
```shell
npm install
```

## Para subir a aplicação e desenvolver 
> :warning: Antes de iniciar o serviço, verifique se a porta 8080 não está em uso
```shell
npm run start
```

Aplicação ficará rodando em:

```http://localhost:8080```

## Para rodar os testes
```shell
npm run test
```

## Detalhes da API
```http
GET /jogo/simular/
```

### Responses

Será retornado o vencedor, o número de rodadas jogadas e a lista do jogadores em ordem de saldo final.

```javascript
{
  "vencendor" : string,
  "rodadasJogadas" : number,
  "jogadores"    : array
}
```

### Exemplo de Response

```javascript
{
   "vencendor":"cauteloso",
   "rodadasJogadas":74,
   "jogadores":[
      {
         "estrategia":"cauteloso",
         "saldo":430,
         "ordemDeJogada":2
      },
      {
         "estrategia":"aleatorio",
         "saldo":-15,
         "ordemDeJogada":3
      },
      {
         "estrategia":"exigente",
         "saldo":-35,
         "ordemDeJogada":1
      },
      {
         "estrategia":"impulsivo",
         "saldo":-130,
         "ordemDeJogada":4
      }
   ]
}
```
