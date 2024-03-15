# GT-LINKS
Pequeña web tipo acortador de links

## Esta es solo una pequeña muestra de como seria un acortador de URL's

Tecnologias usadas:

- NextJs
- TailwindCSS
- Shadcn
- Mongoose
- Javascript & Typescript (js, jsx, ts, tsx)

### Instrucciones de uso

1. Clonar el repositorio
    ```sh
    git clone https://github.com/fco-gt/gt-links.git
    ```

2. Ingresar a la carpeta
    ```sh
    cd gt-links
    ```

3. Instalar dependecias
    ```sh
    npm install
    ```

4. Crear un archivo .env para las variables de entorno y configurar las siguientes variables:
    ```env
    MONGODB_URI=tu_link_de_mongodb
    REDIRECT_URL=url_de_tu_pagina (ej: http://localhost:3000/)
    ```
5. Iniciar proyecto como desarrollador
    ```sh
    npm run dev
    ```