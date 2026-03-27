<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ParticleBackground from "./components/ParticleBackground.vue";
import SecretNote from "./components/SecretNote.vue";
import { useMusic } from "./utils/useMusic";

const router = useRouter();
const { isMusicPlaying, toggleMusic } = useMusic();

onMounted(() => {
	// Initialize music on user interaction
	document.addEventListener(
		"click",
		() => {
			// Music will be handled by composable
		},
		{ once: true },
	);
});
</script>

<template>
	<div class="app-wrapper">
		<ParticleBackground />

		<!-- Main Router View -->
		<Transition name="fade" mode="out-in">
			<RouterView />
		</Transition>

		<!-- Global Components -->
		<SecretNote />

		<!-- Music Toggle Button -->
		<button
			class="music-toggle btn-icon"
			@click="toggleMusic"
			:title="isMusicPlaying ? 'Tắt nhạc' : 'Bật nhạc'"
			aria-label="Toggle music"
		>
			{{ isMusicPlaying ? "🔊" : "🔇" }}
		</button>
	</div>
</template>

<style scoped>
.app-wrapper {
	position: relative;
	min-height: 100vh;
	background-color: var(--primary-dark);
	color: var(--primary-light);
	overflow-x: hidden;
}

.music-toggle {
	position: fixed;
	bottom: 30px;
	right: 30px;
	z-index: 999;
	animation: slideUp 0.5s ease-out 0.5s both;
}

@media (max-width: 768px) {
	.music-toggle {
		bottom: 20px;
		right: 20px;
		width: 45px;
		height: 45px;
	}
}
</style>
