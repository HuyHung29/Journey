<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentQuestion = ref(null);
const isSlowModeOn = ref(false);
const isSaved = ref(false);

const questions = [
	"Lần đầu gặp mình, bạn ấn tượng điều gì nhất?",
	"Nếu mô tả mình bằng 3 từ, bạn sẽ chọn gì?",
	"Kỷ niệm nào của tụi mình làm bạn cười nhiều nhất?",
	"Nếu tụi mình là một bộ phim, bạn nghĩ thể loại gì?",
	"Điều nhỏ nhặt nào mình làm khiến bạn thấy hạnh phúc?",

	"Khi nào bạn cảm thấy được yêu nhất?",
	"Bạn thể hiện tình yêu theo cách nào?",
	"Điều gì khiến bạn cảm thấy an toàn trong mối quan hệ?",
	"Bạn có sợ mất mình không? Vì sao?",
	"Khi buồn, bạn muốn mình làm gì?",

	"Điều gì trong quá khứ ảnh hưởng nhiều nhất đến con người bạn hiện tại?",
	"Bạn có nỗi sợ nào mà ít khi nói ra không?",
	"Bạn nghĩ điểm yếu lớn nhất của mình là gì?",
	"Điều gì khiến bạn tự hào nhất về bản thân?",
	"Bạn muốn mình hiểu điều gì về bạn mà mình chưa nhận ra?",

	"Bạn nghĩ tình yêu lâu dài cần điều gì nhất?",
	"Nếu tụi mình cãi nhau lớn, bạn muốn giải quyết như thế nào?",
	"Điều gì có thể khiến bạn rời bỏ một mối quan hệ?",
	"Bạn có tin vào định mệnh trong tình yêu không?",
	"Bạn muốn tương lai của tụi mình trông như thế nào?",

	"Bạn muốn 5 năm nữa mình sẽ ở đâu, làm gì?",
	"Bạn có muốn sống chung trước hôn nhân không?",
	"Bạn nghĩ thế nào về việc quản lý tài chính chung?",
	"Bạn muốn xây dựng gia đình như thế nào?",
	"Điều gì bạn mong tụi mình cùng nhau vượt qua?",
];
const getRandomQuestion = () => {
	const randomIndex = Math.floor(Math.random() * questions.length);
	currentQuestion.value = questions[randomIndex];
};

const toggleSlowMode = () => {
	isSlowModeOn.value = !isSlowModeOn.value;
	if (isSlowModeOn.value) {
		document.documentElement.style.scrollBehavior = "smooth";
	} else {
		document.documentElement.style.scrollBehavior = "auto";
	}
};

const goHome = () => {
	router.push("/");
};

const saveMemory = () => {
	isSaved.value = true;
	setTimeout(() => {
		isSaved.value = false;
	}, 3000);
};
</script>

<template>
	<div class="walk-page section" :class="{ 'slow-mode': isSlowModeOn }">
		<div class="container">
			<!-- Header -->
			<div class="header-section text-center mb-8">
				<h1>Đi Dạo Công Viên Ngọc Thụy</h1>
				<p class="subtitle">Đoạn chậm lại của buổi tối</p>
				<p class="timing">22:05 - 22:45</p>
			</div>

			<!-- Features Section -->
			<div class="features-grid">
				<!-- Question Feature -->
				<div class="feature-card">
					<div class="feature-icon">❓</div>
					<h2>Gợi Ý Câu Hỏi</h2>
					<p class="feature-description">
						Những câu hỏi gợi ý để các bạn trò chuyện
					</p>
					<button
						class="btn btn-primary mt-4"
						@click="getRandomQuestion"
					>
						Lấy câu hỏi
					</button>

					<!-- Question Display -->
					<Transition name="slide-up">
						<div v-if="currentQuestion" class="question-box">
							<p class="question-text">"{{ currentQuestion }}"</p>
						</div>
					</Transition>
				</div>

				<!-- Slow Mode Feature -->
				<div class="feature-card">
					<div class="feature-icon">🌙</div>
					<h2>Đi cùng nhau em nhé</h2>
					<p class="feature-description">
						Chậm lại, tận hưởng từng bước chân và khoảnh khắc bên
						nhau
					</p>
					<button
						:class="[
							'btn mt-4',
							isSlowModeOn ? 'btn-primary' : 'btn-secondary',
						]"
						@click="toggleSlowMode"
					>
						{{ isSlowModeOn ? "✓ Em yêu anh" : "Anh yêu em" }}
					</button>
				</div>

				<!-- Save Memory Feature -->
				<div class="feature-card">
					<div class="feature-icon">💾</div>
					<h2>Nhật ký của tụi mình</h2>
					<p class="feature-description">
						Lưu những khoảnh khắc đặc biệt ngày hôm nay vào ký ức
					</p>
					<button class="btn btn-primary mt-4" @click="saveMemory">
						💾 Lưu Lại
					</button>

					<Transition name="fade">
						<p v-if="isSaved" class="saved-message">
							✓ Đã lưu vào ký ức của tụi mình ❤️
						</p>
					</Transition>
				</div>
			</div>

			<!-- Park Info -->
			<div class="park-info mb-8">
				<h3 class="section-title">Về Công Viên Ngọc Thụy</h3>
				<p class="info-text">
					Nơi lần đầu anh gặp em, nơi chúng mình đã có những bước chân
					đầu tiên bên nhau. Công viên Ngọc Thụy với không gian xanh
					mát, lãng mạn, là địa điểm hoàn hảo để tụi mình dạo chơi và
					trò chuyện. Hy vọng mỗi lần đến đây, em sẽ nhớ về những kỷ
					niệm đẹp của chúng mình nhé!
				</p>
			</div>

			<!-- Ending Message -->
			<div class="ending-section mt-16 text-center">
				<h2>Cảm ơn em đã đi cùng anh tối nay</h2>
				<p class="ending-subtitle">
					Hy vọng đây chỉ là một trong rất nhiều lần sau
				</p>
				<p class="heart-animation">❤️</p>
			</div>

			<!-- Navigation Buttons -->
			<div class="nav-buttons mt-8 text-center">
				<button
					class="btn btn-secondary"
					@click="router.push('/journey')"
				>
					← Quay lại hành trình
				</button>
				<button class="btn btn-primary" @click="goHome">
					🏠 Về trang chủ
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.walk-page {
	position: relative;
	z-index: 1;
	transition: scroll-behavior 0.3s ease;
}

.walk-page.slow-mode {
	scroll-behavior: smooth;
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

.features-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 32px;
	margin-bottom: 32px;
}

.feature-card {
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.05),
		rgba(232, 180, 160, 0.03)
	);
	border: 1px solid rgba(224, 159, 172, 0.2);
	border-radius: 16px;
	padding: 32px 24px;
	text-align: center;
	transition: all var(--transition-base);
}

.feature-card:hover {
	border-color: var(--accent-pink);
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.1),
		rgba(232, 180, 160, 0.08)
	);
	transform: translateY(-8px);
}

.feature-icon {
	font-size: 48px;
	margin-bottom: 16px;
	animation: float 3s ease-in-out infinite;
}

.feature-card h2 {
	font-size: 20px;
	margin-bottom: 12px;
}

.feature-description {
	font-size: 14px;
	color: var(--primary-light);
	opacity: 0.7;
}

.question-box {
	background: rgba(224, 159, 172, 0.1);
	border: 1px solid rgba(224, 159, 172, 0.3);
	border-radius: 12px;
	padding: 16px;
	margin-top: 16px;
	animation: slideUp 0.4s ease-out;
}

.question-text {
	font-size: 16px;
	font-style: italic;
	color: var(--accent-pink);
	margin: 0;
}

.saved-message {
	color: var(--accent-pink);
	font-weight: 500;
	margin-top: 12px;
	animation: slideUp 0.3s ease-out;
}

.ending-section {
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.08),
		rgba(232, 180, 160, 0.05)
	);
	border: 2px solid rgba(224, 159, 172, 0.3);
	border-radius: 16px;
	padding: 60px 40px;
}

.ending-section h2 {
	font-size: clamp(1.5rem, 6vw, 2.2rem);
	margin-bottom: 16px;
}

.ending-subtitle {
	font-size: 18px;
	color: var(--accent-warm);
	margin-bottom: 24px;
}

.heart-animation {
	font-size: 48px;
	animation: float 2s ease-in-out infinite;
	margin: 0;
}

.park-info {
	background: linear-gradient(
		135deg,
		rgba(224, 159, 172, 0.03),
		rgba(232, 180, 160, 0.02)
	);
	border: 1px solid rgba(224, 159, 172, 0.15);
	border-radius: 16px;
	padding: 32px;
	text-align: center;
}

.section-title {
	font-size: 20px;
	margin-bottom: 16px;
}

.info-text {
	font-size: 16px;
	color: var(--primary-light);
	opacity: 0.8;
	line-height: 1.8;
}

.nav-buttons {
	display: flex;
	justify-content: center;
	gap: 16px;
	flex-wrap: wrap;
}

@media (max-width: 768px) {
	.features-grid {
		grid-template-columns: 1fr;
		gap: 24px;
	}

	.ending-section {
		padding: 40px 24px;
	}
}
</style>
