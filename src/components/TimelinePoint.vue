<script setup>
import { ref } from "vue";

defineProps({
	number: Number,
	emoji: String,
	name: String,
	time: String,
	emotion: String,
	isActive: Boolean,
});

defineEmits(["click"]);

const isHovered = ref(false);
</script>

<template>
	<div
		class="timeline-point"
		:class="{ active: isActive, hovered: isHovered }"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
		@click="$emit('click')"
	>
		<!-- Dot -->
		<div class="point-dot">
			<span class="dot-inner" />
		</div>

		<!-- Content -->
		<div class="point-content">
			<div class="point-number">{{ number }}</div>
			<div class="point-emoji">{{ emoji }}</div>
			<h3>{{ name }}</h3>
			<p class="point-time">{{ time }}</p>
			<p class="point-emotion" v-if="emotion">{{ emotion }}</p>
		</div>

		<!-- Pulse Ring -->
		<div v-if="isHovered" class="pulse-ring" />
	</div>
</template>

<style scoped>
.timeline-point {
	position: relative;
	cursor: pointer;
	transition: all var(--transition-base);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.timeline-point:hover {
	transform: scale(1.05);
}

.timeline-point.active .point-dot {
	animation: glow 1.5s ease-in-out infinite;
}

/* Dot */
.point-dot {
	width: 70px;
	height: 70px;
	border-radius: 50%;
	background: linear-gradient(135deg, var(--accent-pink), var(--accent-warm));
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
	box-shadow: 0 0 30px rgba(224, 159, 172, 0.3);
	transition: all var(--transition-base);
	position: relative;
	z-index: 2;
}

.dot-inner {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: var(--primary-dark);
	display: flex;
	align-items: center;
	justify-content: center;
}

.point-dot:hover {
	transform: scale(1.1);
	box-shadow: 0 0 50px rgba(224, 159, 172, 0.6);
}

/* Content */
.point-content {
	text-align: center;
	position: relative;
	z-index: 1;
}

.point-number {
	font-size: 24px;
	font-weight: 600;
	color: var(--accent-pink);
	margin-bottom: 8px;
}

.point-emoji {
	font-size: 28px;
	margin-bottom: 8px;
}

h3 {
	font-size: 18px;
	color: var(--primary-light);
	margin-bottom: 4px;
}

.point-time {
	font-size: 13px;
	color: var(--accent-gold);
	margin-bottom: 8px;
}

.point-emotion {
	font-size: 12px;
	color: var(--accent-light);
	font-style: italic;
	opacity: 0.8;
}

/* Pulse Ring */
.pulse-ring {
	position: absolute;
	width: 120px;
	height: 120px;
	border: 2px solid rgba(224, 159, 172, 0.5);
	border-radius: 50%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: pulse 1s ease-out;
	pointer-events: none;
	z-index: 0;
}

@media (max-width: 768px) {
	.point-dot {
		width: 60px;
		height: 60px;
	}

	.dot-inner {
		width: 42px;
		height: 42px;
	}

	h3 {
		font-size: 16px;
	}
}
</style>
