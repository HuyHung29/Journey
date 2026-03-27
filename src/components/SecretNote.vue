<script setup>
import { ref } from "vue";

const isOpen = ref(false);

const toggleNote = () => {
	isOpen.value = !isOpen.value;
};

const closeNote = () => {
	isOpen.value = false;
};
</script>

<template>
	<div class="secret-note">
		<!-- Icon Button -->
		<button
			class="note-icon btn-icon"
			@click="toggleNote"
			title="Secret note"
			aria-label="Open secret note"
		>
			💌
		</button>

		<!-- Modal Overlay -->
		<Transition name="fade">
			<div v-if="isOpen" class="modal-overlay" @click="closeNote" />
		</Transition>

		<!-- Modal Content -->
		<Transition name="slide-up">
			<div v-if="isOpen" class="modal-content shadow-lg">
				<button class="close-btn" @click="closeNote" aria-label="Close">
					✕
				</button>

				<div class="note-paper">
					<p class="note-text">
						Anh đã chờ đợi buổi date này từ rất lâu rồi!
					</p>
					<p class="note-subtext">
						Mong em sẽ có một buổi tối tuyệt vời bên anh. 💕
					</p>
				</div>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.secret-note {
	position: fixed;
	right: 30px;
	top: 30px;
	z-index: 998;
}

.note-icon {
	animation: float 3s ease-in-out infinite;
}

.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(4px);
	z-index: 999;
}

.modal-content {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: linear-gradient(
		135deg,
		var(--primary-dark-3),
		var(--primary-dark-2)
	);
	border: 1px solid rgba(224, 159, 172, 0.2);
	border-radius: 16px;
	padding: 40px;
	max-width: 500px;
	width: 90%;
	z-index: 1000;
	animation: scaleIn 0.4s ease-out;
}

.close-btn {
	position: absolute;
	top: 16px;
	right: 16px;
	background: transparent;
	border: none;
	color: var(--accent-pink);
	font-size: 20px;
	cursor: pointer;
	transition: all var(--transition-base);
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.close-btn:hover {
	transform: rotate(90deg);
	color: var(--accent-warm);
}

.note-paper {
	text-align: center;
	animation: slideUp 0.6s ease-out 0.2s both;
}

.note-text {
	font-size: clamp(1.3rem, 5vw, 1.8rem);
	font-family: var(--font-display);
	color: var(--accent-pink);
	margin-bottom: 16px;
	line-height: 1.6;
}

.note-subtext {
	font-size: 16px;
	color: var(--primary-light);
	opacity: 0.8;
	font-style: italic;
}

@media (max-width: 768px) {
	.secret-note {
		right: 20px;
		top: 20px;
	}

	.modal-content {
		padding: 30px 24px;
	}
}
</style>
