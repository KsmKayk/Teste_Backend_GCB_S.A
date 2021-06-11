# Backend Test for GCB_S.A

## challenge for junior vacancy

To start testing the backend you need:

- Yarn
- Insomnia
- Docker
- Git

**First Steps**
1 - Clone project in your machine

    git clone https://github.com/KsmKayk/Teste_Backend_GCB_S.A.git

2 - Install dependencies

    yarn install

3 - Run tests to see if everything is OK

    yarn test

4 - Now, you can build docker up

    docker-compose.exe up

5 - Prepare tables with typeorm

    yarn typeorm migration:run

6 - Then import "Insomnia File To Import.json" to your insomnia and start testing
