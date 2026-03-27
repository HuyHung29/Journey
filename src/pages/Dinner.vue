<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MenuCard from "../components/MenuCard.vue";
import pic1 from "../assets/Salad.PNG";
import pic2 from "../assets/Pizza.png";
import pic3 from "../assets/MainDish.PNG";
import pic4 from "../assets/Drink.PNG";
import pic5 from "../assets/Dessert.PNG";

const router = useRouter();
const selectedDish = ref(null);

const menuItems = [
	{
		id: 1,
		name: "Pomelo Prawn Salad",
		description: "Salad tôm bưởi thanh mát",
		image: pic1,
	},
	{
		id: 2,
		name: "Braised Beef Pizza",
		description: "Pizza bò hầm signature",
		image: pic2,
	},
	{
		id: 3,
		name: "Grilled Oyster Blade",
		description: "Thịt bò Úc nướng mềm với rau củ",
		image: pic3,
	},
	{
		id: 4,
		name: "Đồ Uống tự chọn",
		description: "Mình cùng chọn đồ uống yêu thích nhé",
		image: pic4,
	},
	{
		id: 5,
		name: "Tráng Miệng",
		description: "Món tráng miệng ngọt ngào kết thúc bữa ăn",
		image: pic5,
	},
];

const selectDish = (dish) => {
	selectedDish.value = selectedDish.value?.id === dish.id ? null : dish;
};

const openMaps = () => {
	window.open("https://maps.google.com/?q=22+Flourish+Ha+Noi", "_blank");
};

const goNext = () => {
	router.push("/photo");
};
</script>

<template>
	<div class="dinner-page section">
		<div class="container">
			<!-- Header -->
			<div class="header-section text-center mb-8">
				<h1>Dinner tại 22 Flourish</h1>
				<p class="subtitle">Một bữa tối nhẹ nhàng để bắt đầu</p>
				<p class="timing">20:00 - 21:15</p>
			</div>

			<!-- Menu Items -->
			<div class="menu-grid">
				<MenuCard
					v-for="item in menuItems"
					:key="item.id"
					:name="item.name"
					:description="item.description"
					:image="item.image"
					:is-selected="selectedDish?.id === item.id"
					@click="selectDish(item)"
				/>
			</div>

			<!-- Restaurant Info -->
			<div class="restaurant-info mt-8 text-center">
				<p class="info-text">
					22 Flourish là một nhà hàng cao cấp với không gian ấm cúng,
					thức ăn hấp dẫn. Địa điểm hoàn hảo cho một buổi tối lãng
					mạn.
				</p>
			</div>

			<!-- Action Buttons -->
			<div class="action-buttons mt-8 text-center">
				<button class="btn btn-primary" @click="openMaps">
					📍 Mở Google Maps
				</button>
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
.dinner-page {
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

.menu-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 24px;
	margin-bottom: 40px;
}

.restaurant-info {
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.05),
		rgba(232, 180, 160, 0.03)
	);
	border: 1px solid rgba(224, 159, 172, 0.2);
	border-radius: 16px;
	padding: 32px;
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
}

.info-text {
	font-size: 16px;
	color: var(--primary-light);
	opacity: 0.85;
	line-height: 1.8;
}

.action-buttons {
	display: flex;
	justify-content: center;
	gap: 16px;
	flex-wrap: wrap;
}

@media (max-width: 768px) {
	.menu-grid {
		grid-template-columns: 1fr;
		gap: 16px;
	}

	.restaurant-info {
		padding: 20px;
	}
}
</style>
