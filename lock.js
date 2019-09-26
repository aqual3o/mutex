class Lock {
	constructor () {
		this.pendingRequests = [];
		this.locked          = false;
	}

	acquire () {
		let __this = this;

		return new Promise (function (resolve, reject) {
			if (!__this.locked) {
				__this.locked = true;
				resolve (__this.release);
				return;
			}

			/* If locked
			 * create a request obj
			 * push request to an array,
			 * will be resolved at a later time when someone has released it */
			let request = {resolve, reject};
			__this.pendingRequests.push (request);
		});
	}

	release () {
		this.locked = false;

		/*
		 * Check for pending requests
		 * if found
		 *    - Put the lock again
		 *    - Resolve a request
		 */
		if (this.pendingRequests.length) {
			let request = this.pendingRequests [0];
			this.locked = true;

			this.pendingRequests.splice (0, 1);
			request.resolve ();
			return;
		}
	}
}

module.exports = Lock;
