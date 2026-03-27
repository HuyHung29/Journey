<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvasRef = ref(null);
let animationId = null;

onMounted(() => {
	const canvas = canvasRef.value;
	if (!canvas) return;

	const ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Particle data
	const particles = [];
	const particleCount = 12;

	class Particle {
		constructor() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.radius = Math.random() * 0.8 + 0.3;
			this.vx = (Math.random() - 0.5) * 0.2;
			this.vy = (Math.random() - 0.5) * 0.2;
			this.opacity = Math.random() * 0.3 + 0.1;
			this.pulseSpeed = Math.random() * 0.01 + 0.005;
			this.pulseAmount = 0;
		}

		update() {
			this.x += this.vx;
			this.y += this.vy;
			this.pulseAmount += this.pulseSpeed;

			// Wrap around edges
			if (this.x < 0) this.x = canvas.width;
			if (this.x > canvas.width) this.x = 0;
			if (this.y < 0) this.y = canvas.height;
			if (this.y > canvas.height) this.y = 0;
		}

		draw() {
			const r = this.radius * (1 + Math.sin(this.pulseAmount) * 0.3);
			ctx.fillStyle = `rgba(224, 159, 172, ${this.opacity})`;
			ctx.beginPath();
			ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	// Initialize particles
	for (let i = 0; i < particleCount; i++) {
		particles.push(new Particle());
	}

	// Animation loop
	const animate = () => {
		ctx.fillStyle = "rgba(13, 13, 13, 0.02)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		particles.forEach((particle) => {
			particle.update();
			particle.draw();
		});

		animationId = requestAnimationFrame(animate);
	};

	animate();

	// Handle resize
	const handleResize = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};

	window.addEventListener("resize", handleResize);

	return () => {
		window.removeEventListener("resize", handleResize);
		if (animationId) cancelAnimationFrame(animationId);
	};
});

onUnmounted(() => {
	if (animationId) cancelAnimationFrame(animationId);
});
</script>

<template>
	<canvas ref="canvasRef" class="particle-background" />
</template>

<style scoped>
.particle-background {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
	pointer-events: none;
	background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%);
}
</style>
