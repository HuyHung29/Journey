<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import TimelinePoint from "../components/TimelinePoint.vue";

const router = useRouter();
const activePoint = ref(0);

const locations = [
	{
		id: 1,
		number: 1,
		emoji: "🍽️",
		name: "22 Flourish",
		time: "20:00 - 21:15",
		emotion: "Bắt đầu",
		description: "Một bữa tối nhẹ nhàng để bắt đầu",
		route: "/dinner",
	},
	{
		id: 2,
		number: 2,
		emoji: "📸",
		name: "Photo Palette",
		time: "21:25 - 21:55",
		emotion: "Ấm áp",
		description: "Chụp những khoảnh khắc đặc biệt",
		route: "/photo",
	},
	{
		id: 3,
		number: 3,
		emoji: "🌳",
		name: "Công viên Ngọc Thụy",
		time: "22:05 - 22:45",
		emotion: "Nhẹ nhàng",
		description: "Đi dạo và nói chuyện",
		route: "/walk",
	},
];

const animatedLine = ref(0);

onMounted(() => {
	// Animate the line progressively
	let lineProgress = 0;
	const interval = setInterval(() => {
		lineProgress += 0.5;
		animatedLine.value = Math.min(lineProgress, 100);
		if (lineProgress >= 100) clearInterval(interval);
	}, 50);
});

const goToLocation = (route) => {
	router.push(route);
};

const handlePointClick = (location) => {
	activePoint.value = location.id;
};
</script>

<template>
	<div class="journey-page section">
		<div class="container">
			<!-- Header -->
			<div class="header-section text-center mb-8">
				<h1>Hành Trình Của Chúng Ta</h1>
				<p class="subtitle">Ba điểm dừng chân của buổi tối</p>
			</div>

			<!-- Map/Timeline Container -->
			<div class="timeline-container">
				<!-- Animated Background -->
				<div class="timeline-background">
					<svg
						class="timeline-svg"
						viewBox="0 0 100 300"
						preserveAspectRatio="none"
					>
						<line
							class="timeline-line"
							x1="50"
							y1="0"
							x2="50"
							y2="100"
							:style="{
								strokeDasharray: `${animatedLine.value} 100`,
							}"
						/>
					</svg>
				</div>

				<!-- Timeline Points -->
				<div class="points-grid">
					<div
						v-for="location in locations"
						:key="location.id"
						class="point-wrapper"
						@click="handlePointClick(location)"
					>
						<TimelinePoint
							:number="location.number"
							:emoji="location.emoji"
							:name="location.name"
							:time="location.time"
							:emotion="location.emotion"
							:is-active="activePoint === location.id"
							@click="goToLocation(location.route)"
						/>
					</div>
				</div>
			</div>

			<!-- Back Button -->
			<div class="nav-buttons mt-8">
				<button class="btn btn-secondary" @click="router.push('/')">
					← Quay lại
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.journey-page {
	position: relative;
	z-index: 1;
}

.header-section {
	margin-bottom: 60px;
}

h1 {
	margin-bottom: 8px;
}

.subtitle {
	font-size: 18px;
	color: var(--accent-warm);
}

.timeline-container {
	position: relative;
	min-height: 400px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 40px 0;
}

.timeline-background {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
}

.timeline-svg {
	width: 100%;
	height: 100%;
}

.timeline-line {
	stroke: url(#lineGradient);
	stroke-width: 3;
	stroke-linecap: round;
	animation: drawLine 2s ease-out forwards;
}

.points-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 40px;
	width: 100%;
	position: relative;
	z-index: 2;
}

.point-wrapper {
	cursor: pointer;
	transition: all var(--transition-base);
}

.point-wrapper:hover {
	transform: scale(1.05);
}

.details-section {
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.05),
		rgba(232, 180, 160, 0.03)
	);
	border: 1px solid rgba(224, 159, 172, 0.2);
	border-radius: 16px;
	padding: 40px;
	text-align: center;
	min-height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.location-detail {
	animation: slideUp 0.5s ease-out;
}

.detail-emoji {
	font-size: 60px;
	margin-bottom: 16px;
	animation: float 3s ease-in-out infinite;
}

.detail-description {
	font-size: 16px;
	color: var(--primary-light);
	opacity: 0.8;
	margin-bottom: 16px;
}

.nav-buttons {
	display: flex;
	justify-content: center;
	gap: 16px;
	flex-wrap: wrap;
}

@media (max-width: 768px) {
	.timeline-container {
		min-height: 300px;
		margin: 40px 0;
	}

	.points-grid {
		grid-template-columns: 1fr;
		gap: 30px;
	}

	.details-section {
		padding: 24px;
	}
}
</style>
