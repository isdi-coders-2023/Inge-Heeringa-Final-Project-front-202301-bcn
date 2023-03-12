#!/bin/bash

mkdir ./src/environments

touch ./src/environments/environment.ts
echo "export const environment = {" >> ./src/environments/environment.ts
echo "  production: false," >> ./src/environments/environment.ts
echo "  apiUrl: \"$API_URL\"," >> ./src/environments/environment.ts
echo "    paths: {" >> ./src/environments/environment.ts
echo "      users: \"$USERS_PATH\"," >> ./src/environments/environment.ts
echo "      login: \"$LOGIN_PATH\"," >> ./src/environments/environment.ts
echo "      register: \"$REGISTER_PATH\"," >> ./src/environments/environment.ts
echo "        }," >> ./src/environments/environment.ts
echo "};" >> ./src/environments/environment.ts

touch ./src/environments/environment.prod.ts
echo "export const environment = {" >> ./src/environments/environment.prod.ts
echo "  production: true," >> ./src/environments/environment.prod.ts
echo "  apiUrl: \"$API_URL\"," >> ./src/environments/environment.prod.ts
echo "    paths: {" >> ./src/environments/environment.prod.ts
echo "      users: \"$USERS_PATH\"," >> ./src/environments/environment.prod.ts
echo "      login: \"$LOGIN_PATH\"," >> ./src/environments/environment.prod.ts
echo "      register: \"$REGISTER_PATH\"," >> ./src/environments/environment.prod.ts
echo "        }," >> ./src/environments/environment.prod.ts
echo "};" >> ./src/environments/environment.prod.ts

