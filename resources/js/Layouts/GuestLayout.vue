<script setup>
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="d-flex min-vh-100 flex-column justify-content-center align-items-center bg-light pt-5">
        <div>
            <Link href="/">
                <ApplicationLogo class="h-20 w-20 text-muted" />
            </Link>
        </div>

        <div
            class="container mt-4 w-100 bg-white p-4 shadow-sm rounded-3"
        >
            <slot />
        </div>
    </div>
</template>
