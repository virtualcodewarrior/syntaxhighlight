const highlighters = {};

export default {
	id(id) {
		const prefix = 'highlighter_';
		return id.indexOf(prefix) == 0 ? id : prefix + id;
	},

	get(id) {
		return highlighters[this.id(id)];
	},

	set(id, highlighter) {
		highlighters[this.id(id)] = highlighter;
	},
};
