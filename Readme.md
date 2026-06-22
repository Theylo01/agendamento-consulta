Considerações sobre o projeto:

O arquivo .env foi versionado apenas para fins acadêmicos e para facilitar a execução do projeto. Em ambientes de produção, arquivos .env e chaves como APP_KEY não devem ser armazenados em repositórios públicos, a configuração deve ser feita manualmente e a chave deve ser gerada usando o comando: node ace generate:key.

Necessário para rodar o projeto:
1. Ter o Docker instalado
2. Ter o NodeJs -- versão 24>x e Npm -- versão 11>x instalado

Passo a passo para executar o sistema:
1. Clonar o projeto:
   - git clone https://github.com/Theylo01/agendamento-consulta.git
2. Com o Docker funcionando, subir todo o projeto usando o comando do docker compose no terminal:
   - docker-compose up --build
3. Acessar a url apresentada no terminal, algo como:
   - http://localhost:3333

Comandos úteis:

docker compose up --build    
  Sobe tudo (reconstrói imagem)

docker compose up -d         
  Sobe em background

docker compose down          
  Derruba os containers (dados ficam no volume)

docker compose down -v       
  Derruba e apaga o volume do banco

docker compose logs -f api   
  Ver logs da API em tempo real
