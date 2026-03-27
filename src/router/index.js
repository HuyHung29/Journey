import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Journey from "../pages/Journey.vue";
import Dinner from "../pages/Dinner.vue";
import Photo from "../pages/Photo.vue";
import Walk from "../pages/Walk.vue";

const routes = [
	{
		path: "/",
		component: Home,
		meta: { title: "MenuDate - Tối dành cho hai đứa" },
	},
	{
		path: "/journey",
		component: Journey,
		meta: { title: "Hành trình" },
	},
	{
		path: "/dinner",
		component: Dinner,
		meta: { title: "Dinner" },
	},
	{
		path: "/photo",
		component: Photo,
		meta: { title: "Photo Booth" },
	},
	{
		path: "/walk",
		component: Walk,
		meta: { title: "Đi dạo" },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title || "MenuDate";
	window.scrollTo(0, 0);
	next();
});

export default router;
