<script setup>
import { ref, onMounted, onUnmounted } from "vue";

defineProps({
	emoji: String,
	name: String,
	description: String,
	image: String,
	isSelected: Boolean,
});

defineEmits(["click", "preview"]);

const isHovered = ref(false);
const showPreview = ref(false);

const openPreview = (event) => {
	event.preventDefault();
	event.stopPropagation(); // Ngăn không trigger click card
	showPreview.value = true;
};

const closePreview = () => {
	showPreview.value = false;
};

// Thêm event listener cho ESC key
const handleKeydown = (event) => {
	if (event.key === "Escape" && showPreview.value) {
		closePreview();
	}
};

// Thêm event listener khi component mount
onMounted(() => {
	document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
	document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
	<div
		class="menu-card"
		:class="{ selected: isSelected, hovered: isHovered }"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
		@click="$emit('click')"
	>
		<div class="card-content">
			<div v-if="image" class="menu-image" @click="openPreview">
				<img :src="image" :alt="name" />
				<div class="preview-overlay">
					<span class="preview-icon">🔍</span>
				</div>
			</div>
			<div v-else class="emoji">{{ emoji }}</div>
			<h3>{{ name }}</h3>
			<p>{{ description }}</p>

			<div v-if="isSelected" class="selection-text">
				✓ Món này mình thử chung nhé?
			</div>
		</div>
	</div>

	<!-- Image Preview Modal -->
	<Transition name="fade">
		<div v-if="showPreview" class="preview-modal">
			<div class="preview-overlay-bg" @click="closePreview"></div>
			<div class="preview-content" @click.stop>
				<button class="close-btn" @click="closePreview">&times;</button>
				<img :src="image" :alt="name" class="preview-image" />
				<h3 class="preview-title">{{ name }}</h3>
				<p class="preview-description">{{ description }}</p>
			</div>
		</div>
	</Transition>
</template>

<style scoped>
.menu-card {
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.05),
		rgba(232, 180, 160, 0.03)
	);
	border: 2px solid rgba(224, 159, 172, 0.2);
	border-radius: 16px;
	padding: 24px;
	cursor: pointer;
	transition: all var(--transition-base);
	position: relative;
	overflow: hidden;
}

.menu-card::before {
	content: "";
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		90deg,
		transparent,
		rgba(255, 255, 255, 0.1),
		transparent
	);
	transition: left 0.5s ease;
}

.menu-card:hover::before {
	left: 100%;
}

.menu-card:hover {
	border-color: var(--accent-pink);
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.1),
		rgba(232, 180, 160, 0.08)
	);
	transform: translateY(-8px);
	box-shadow: 0 20px 40px rgba(224, 159, 172, 0.2);
}

.menu-card.selected {
	border-color: var(--accent-pink);
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.15),
		rgba(232, 180, 160, 0.1)
	);
	box-shadow:
		0 0 30px rgba(224, 159, 172, 0.4),
		inset 0 0 20px rgba(224, 159, 172, 0.1);
}

.card-content {
	position: relative;
	z-index: 1;
	text-align: center;
}

.emoji {
	font-size: 48px;
	margin-bottom: 16px;
	animation: float 3s ease-in-out infinite;
}

.menu-image {
	margin-bottom: 16px;
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	position: relative;
	cursor: pointer;
}

.menu-image img {
	width: 100%;
	height: 120px;
	object-fit: cover;
	transition: transform var(--transition-base);
}

.menu-card:hover .menu-image img {
	transform: scale(1.05);
}

.preview-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.4);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity var(--transition-base);
	border-radius: 12px;
}

.menu-image:hover .preview-overlay {
	opacity: 1;
}

.preview-icon {
	color: white;
	font-size: 24px;
	background: rgba(0, 0, 0, 0.6);
	padding: 8px;
	border-radius: 50%;
}

.preview-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
}

.preview-overlay-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	cursor: pointer;
}

.preview-content {
	background: var(--primary-dark);
	border-radius: 16px;
	padding: 24px;
	max-width: 500px;
	width: 90%;
	max-height: 90vh;
	overflow-y: auto;
	cursor: default;
	position: relative;
	z-index: 10000;
	border: 2px solid var(--accent-pink);
}

.close-btn {
	position: absolute;
	top: 12px;
	right: 16px;
	background: none;
	border: none;
	color: var(--primary-light);
	font-size: 32px;
	cursor: pointer;
	line-height: 1;
	padding: 0;
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: background var(--transition-base);
}

.close-btn:hover {
	background: rgba(224, 159, 172, 0.2);
}

.preview-image {
	width: 100%;
	height: auto;
	max-height: 300px;
	object-fit: cover;
	border-radius: 12px;
	margin-bottom: 16px;
}

.preview-title {
	color: var(--primary-light);
	margin-bottom: 8px;
	text-align: center;
}

.preview-description {
	color: var(--primary-light);
	opacity: 0.8;
	text-align: center;
	font-size: 16px;
	line-height: 1.6;
}

h3 {
	color: var(--primary-light);
	margin-bottom: 8px;
	font-size: clamp(1.1rem, 4vw, 1.3rem);
}

p {
	color: var(--primary-light);
	opacity: 0.7;
	font-size: 14px;
	line-height: 1.5;
}

.selection-text {
	margin-top: 16px;
	padding-top: 16px;
	border-top: 1px solid rgba(224, 159, 172, 0.3);
	color: var(--accent-pink);
	font-weight: 500;
	font-size: 13px;
	animation: slideUp 0.4s ease-out;
}

@media (max-width: 768px) {
	.menu-card {
		padding: 16px;
	}

	.emoji {
		font-size: 36px;
	}

	.menu-image img {
		height: 100px;
	}

	.preview-content {
		padding: 16px;
		width: 95%;
	}

	.preview-image {
		max-height: 200px;
	}

	.close-btn {
		font-size: 24px;
		width: 24px;
		height: 24px;
	}
}
</style>
