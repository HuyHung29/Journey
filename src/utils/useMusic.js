import { ref } from "vue";
import { musicConfig } from "../config/musicConfig.js";

const isMusicPlaying = ref(false);
let audioPlayer = null;

const initAudioPlayer = () => {
	if (audioPlayer) return;

	audioPlayer = new Audio();
	audioPlayer.src = musicConfig.musicUrl;
	audioPlayer.loop = musicConfig.autoLoop;
	audioPlayer.volume = musicConfig.volume;
};

const playMusic = () => {
	if (!audioPlayer) {
		initAudioPlayer();
	}
	audioPlayer.play().catch((err) => {
		console.log("Audio play failed:", err);
		// Browser hoặc user chưa interact nên không thể auto-play
	});
};

const stopMusic = () => {
	if (audioPlayer) {
		audioPlayer.pause();
		audioPlayer.currentTime = 0;
	}
};

export const useMusic = () => {
	const toggleMusic = () => {
		isMusicPlaying.value = !isMusicPlaying.value;

		if (isMusicPlaying.value) {
			playMusic();
		} else {
			stopMusic();
		}
	};

	return {
		isMusicPlaying,
		toggleMusic,
	};
};
