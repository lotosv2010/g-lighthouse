self.addEventListener('message', function (event) {
	let total = 0;
	for (let i = 0; i < event.data; i++) {
		total += i;
	}
	self.postMessage(total);
});
