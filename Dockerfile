# ----------------------------------------------------
# STAGE 1 : Build (Construction)
# ----------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# ----------------------------------------------------
# STAGE 2 : Production (Service)
# ----------------------------------------------------
# Utiliser un serveur web léger pour servir les fichiers statiques
FROM nginx:alpine AS production

# Copier les fichiers de configuration Nginx
# Le fichier nginx.conf doit être ajusté pour gérer le routage client-side (React Router)
# et proxyfier les appels API vers le backend.
# Pour l'instant, nous utilisons la configuration par défaut pour servir le dossier /dist.
# (Note: Le routage est géré par l'entrée dans index.html pour le mode "try_files" si un fichier conf dédié était utilisé.)
# Pour un setup simple avec un seul conteneur Nginx, nous servons juste les fichiers.

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]