# Desafio | Agendamento COVID-19 | Backend

> ## :memo: Features da Aplicação

* API Rest com Express
* Testes com Jest
* Middlewares
* Validações com Joi
* Deploy no [Heroku](https://pitang-trainee-desafio-backend.herokuapp.com/)

> ## :wrench: Como iniciar a aplicação

Subindo localmente: 
1. Execute na raiz do projeto o comando: npm run start
2. A aplicação estará acessível no endereço localhost:3000


> ## :hammer: Funcionalidades do projeto

> 1. Criar agendamento
* ✅ Recebe uma requisição do tipo **POST** na rota **/api/**
* ✅ Valida dados obrigatórios **name**, **email**, **birthday**, **appointmentDate** e **appointmentHour**
* ✅ Valida se o campo **birthday** e **appointmentDate** é uma data válida
* ✅ Valida se o campo **appointmentHour** hora válida
* ✅ Valida se o dia do **appointmentDate** não possui 20 registros cadastrados
* ✅ Valida se a hora **appointmentHour** não possui 2 registros mesmo dia
* ✅ Cria um novo **appointment** no com **status** false e **conclusion** vazio

> 2. Confirmar agendamento

* ✅ Recebe uma requisição do tipo **PUT** na rota **/api/{id}**
* ✅ Valida o **id** recebido no **params** do **request**
* ✅ Verifica se foi enviado um comentário no dado **comment**
* ✅ Atualiza o **status** e **conclusion** agendamento referente ao **id**

> 3. Lista agendamentos

* ✅ Recebe uma requisição do tipo **GET** na rota **/api/**
* ✅ Faz uma requisição retornando uma lista de agendamentos ordenados por ordem crescente de data e hora
* ✅ Retorna  um array com os dados dos agendamentos atualizados ou array vazio caso não exista nenhum agendamentos

> 3. Lista dias indisponíveis

* ✅ Recebe uma requisição do tipo **GET** na rota **/api/notAvailable**
* ✅ Faz uma requisição retornando uma lista de agendamentos cuja data tenha 20 registros
* ✅ Retorna  um array com as datas indisponíveis ou array vazio caso não exista nenhum dia
