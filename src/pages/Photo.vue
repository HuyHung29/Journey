<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import pic1 from "../assets/photobooth/pic1.jfif";
import pic2 from "../assets/photobooth/pic2.jfif";
import pic3 from "../assets/photobooth/pic3.jfif";
import pic4 from "../assets/photobooth/pic4.jfif";
import pic5 from "../assets/photobooth/pic5.jfif";

const router = useRouter();
const selectedConcept = ref(null);

const goNext = () => {
	router.push("/walk");
};

const concepts = [
	{
		id: "pic1",
		name: "Mẫu 01",
		description: "",
		image: pic1,
	},
	{
		id: "pic2",
		name: "Mẫu 02",
		description: "",
		image: pic2,
	},
	{
		id: "pic3",
		name: "Mẫu 03",
		description: "",
		image: pic3,
	},
	{
		id: "pic4",
		name: "Mẫu 04",
		description: "",
		image: pic4,
	},
	{
		id: "pic5",
		name: "Mẫu 05",
		description: "",
		image: pic5,
	},
];

const tips = ["1 tấm nghiêm túc", "1 tấm cười", "1 tấm lầy"];

const selectConcept = (id) => {
	selectedConcept.value = selectedConcept.value === id ? null : id;
};
</script>

<template>
	<div class="photo-page section">
		<div class="container">
			<!-- Header -->
			<div class="header-section text-center mb-8">
				<h1>Photo Booth tại Photo Palette</h1>
				<p class="subtitle">
					Chụp những khoảnh khắc đặc biệt của chúng mình nhé
				</p>
				<p class="timing">21:25 - 21:55</p>
			</div>

			<!-- Concepts Selection -->
			<div class="concepts-section">
				<h2 class="section-title">Một vài mẫu chụp</h2>
				<div class="concepts-grid">
					<div
						v-for="concept in concepts"
						:key="concept.id"
						class="concept-card"
						:class="{ selected: selectedConcept === concept.id }"
						@click="selectConcept(concept.id)"
					>
						<div class="concept-image">
							<img :src="concept.image" :alt="concept.name" />
						</div>
						<h3>{{ concept.name }}</h3>
						<p>{{ concept.description }}</p>
					</div>
				</div>
			</div>

			<!-- Navigation Buttons -->
			<div class="nav-buttons mt-8 text-center">
				<button
					class="btn btn-secondary"
					@click="router.push('/journey')"
				>
					← Quay lại hành trình
				</button>
				<button class="btn btn-primary" @click="goNext">
					Tiếp theo →
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.photo-page {
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
	margin-bottom: 8px;
}

.timing {
	font-size: 14px;
	color: var(--accent-gold);
	letter-spacing: 1px;
}

.concepts-section {
	margin-bottom: 60px;
}

.section-title {
	text-align: center;
	margin-bottom: 32px;
	font-size: 24px;
}

.concepts-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 24px;
}

.concept-card {
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.05),
		rgba(232, 180, 160, 0.03)
	);
	border: 2px solid rgba(224, 159, 172, 0.2);
	border-radius: 16px;
	padding: 32px 24px;
	text-align: center;
	cursor: pointer;
	transition: all var(--transition-base);
	position: relative;
	overflow: hidden;
}

.concept-card::before {
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

.concept-card:hover::before {
	left: 100%;
}

.concept-card:hover {
	transform: translateY(-8px);
	border-color: var(--accent-pink);
}

.concept-card.selected {
	border-color: var(--accent-pink);
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.15),
		rgba(232, 180, 160, 0.1)
	);
	box-shadow: 0 0 30px rgba(224, 159, 172, 0.4);
}

.concept-image {
	width: 100%;
	height: 180px;
	overflow: hidden;
	border-radius: 12px;
	margin-bottom: 14px;
}

.concept-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform var(--transition-base);
}

.concept-card:hover .concept-image img {
	transform: scale(1.05);
}

.concept-card h3 {
	margin-bottom: 8px;
	font-size: 20px;
}

.concept-card p {
	font-size: 14px;
	opacity: 0.7;
}

.preview-section {
	text-align: center;
}

.preview-box {
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.1),
		rgba(232, 180, 160, 0.08)
	);
	border: 2px solid rgba(224, 159, 172, 0.3);
	border-radius: 16px;
	min-height: 300px;
	padding: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	animation: scaleIn 0.5s ease-out;
	box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.preview-box.concept-cute {
	background: linear-gradient(
		135deg,
		rgba(255, 182, 193, 0.1),
		rgba(255, 192, 203, 0.08)
	);
	border-color: rgba(255, 192, 203, 0.4);
	filter: saturate(1.2) brightness(1.05);
}

.preview-box.concept-cool {
	background: linear-gradient(
		135deg,
		rgba(135, 206, 235, 0.1),
		rgba(100, 149, 237, 0.08)
	);
	border-color: rgba(100, 149, 237, 0.4);
	filter: hue-rotate(240deg) saturate(1.1);
}

.preview-box.concept-vintage {
	background: linear-gradient(
		135deg,
		rgba(210, 180, 140, 0.1),
		rgba(188, 143, 143, 0.08)
	);
	border-color: rgba(188, 143, 143, 0.4);
	filter: sepia(0.4) saturate(0.8);
}

.preview-img {
	width: 100%;
	height: auto;
	max-height: 280px;
	object-fit: cover;
	border-radius: 12px;
	margin-bottom: 16px;
}

.preview-meta {
	text-align: center;
	color: var(--primary-light);
}

.preview-meta h3 {
	font-size: 1.2rem;
	margin-bottom: 4px;
}

.preview-meta p {
	font-size: 14px;
	opacity: 0.75;
}

.preview-placeholder {
	font-size: 18px;
	color: var(--accent-pink);
	opacity: 0.7;
}

.tips-section {
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.05),
		rgba(232, 180, 160, 0.03)
	);
	border: 1px solid rgba(224, 159, 172, 0.2);
	border-radius: 16px;
	padding: 32px;
	text-align: center;
}

.tips-list {
	list-style: none;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 24px;
	margin-top: 16px;
}

.tip-item {
	font-size: 16px;
	color: var(--primary-light);
	padding: 12px 20px;
	background: rgba(224, 159, 172, 0.1);
	border-radius: 20px;
	border: 1px solid rgba(224, 159, 172, 0.2);
}

.nav-buttons {
	display: flex;
	justify-content: center;
	gap: 16px;
	flex-wrap: wrap;
	margin-top: 32px;
}

@media (max-width: 768px) {
	.concepts-grid {
		grid-template-columns: 1fr;
	}

	.preview-box {
		min-height: 220px;
		padding: 18px;
		border-radius: 14px;
	}

	.preview-img {
		max-height: 180px;
		object-fit: cover;
	}

	.preview-meta h3 {
		font-size: 1rem;
	}

	.preview-meta p {
		font-size: 14px;
	}

	.preview-placeholder {
		font-size: 16px;
		line-height: 1.4;
		padding: 0 12px;
	}

	.tips-list {
		flex-direction: column;
		gap: 12px;
	}

	.nav-buttons {
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}
}
</style>
