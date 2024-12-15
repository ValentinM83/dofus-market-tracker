// resources/js/plugins/env-plugin.js
export default {
    install(app) {
        // Tu peux ajouter toutes les variables que tu veux dans cet objet
        app.config.globalProperties.$env = {
            appName: import.meta.env.VITE_APP_NAME, // Exemples de variables d'environnement
        };
    }
};
