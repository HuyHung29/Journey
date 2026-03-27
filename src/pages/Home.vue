<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const lines = ref([]);
const showTitle = ref(false);
const showCTA = ref(false);

onMounted(() => {
	// First line - fade in
	setTimeout(() => {
		lines.value.push({ text: "Tối Chủ nhật này...", visible: false });
		setTimeout(() => {
			lines.value[0].visible = true;
		}, 50);
	}, 100);

	// Second line - fade in with delay
	setTimeout(() => {
		lines.value.push({ text: "Anh có một kế hoạch nhỏ", visible: false });
		setTimeout(() => {
			lines.value[1].visible = true;
		}, 50);
	}, 1200);

	// Show title and CTA
	setTimeout(() => {
		showTitle.value = true;
	}, 2800);

	setTimeout(() => {
		showCTA.value = true;
	}, 3600);
});

const startJourney = () => {
	router.push("/journey");
};
</script>

<template>
	<div class="home-page section">
		<div class="container">
			<!-- Opening Text -->
			<div class="opening-text text-center">
				<div
					v-for="(line, index) in lines"
					:key="index"
					:class="['opening-line', { visible: line.visible }]"
				>
					{{ line.text }}
				</div>
			</div>

			<!-- Title Section -->
			<Transition name="slide-up">
				<div v-if="showTitle" class="hero-content text-center">
					<h1 class="hero-title">Một tối dành cho hai đứa</h1>
					<p class="hero-subtitle">Bắt đầu từ 20:00 · 3 điểm đến</p>
				</div>
			</Transition>

			<!-- CTA Button -->
			<Transition name="fade">
				<div v-if="showCTA" class="cta-section text-center">
					<button class="btn btn-primary" @click="startJourney">
						Bắt đầu hành trình
						<span>→</span>
					</button>
					<p class="hint-text">
						Hãy chuẩn bị cho một tối thật đặc biệt
					</p>
				</div>
			</Transition>
		</div>
	</div>
</template>

<style scoped>
.home-page {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 1;
}

.opening-text {
	margin-bottom: 60px;
	min-height: 150px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
}

.opening-line {
	font-size: clamp(1.5rem, 6vw, 2.2rem);
	font-family: var(--font-display);
	color: var(--accent-pink);
	opacity: 0;
	transition: opacity 0.4s ease-out;
}

.opening-line.visible {
	opacity: 1;
}

.hero-content {
	margin-bottom: 80px;
	animation: slideUp 0.5s ease-out;
}

.hero-title {
	margin-bottom: 16px;
	color: var(--primary-light);
}

.hero-subtitle {
	font-size: 18px;
	color: var(--accent-warm);
	letter-spacing: 1px;
}

.cta-section {
	animation: slideUp 0.5s ease-out;
}

.btn-primary {
	margin-bottom: 24px;
	font-size: 16px;
	padding: 14px 40px;
}

.btn-primary span {
	display: inline-block;
	transition: transform 0.3s ease;
}

.btn-primary:hover span {
	transform: translateX(5px);
}

.hint-text {
	color: var(--primary-light);
	opacity: 0.6;
	font-size: 14px;
}

@media (max-width: 768px) {
	.home-page {
		padding: 40px 16px;
	}

	.opening-text {
		margin-bottom: 40px;
	}

	.hero-content {
		margin-bottom: 60px;
	}
}
</style>
