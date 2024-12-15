import '../css/app.css';
import './bootstrap';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import EnvPlugin from './env-plugin';  // Import du plugin
import router from './router';  // Import du router
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(EnvPlugin)
            .use(router)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});