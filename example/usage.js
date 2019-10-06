let Lock = require ("../index").Lock;
let mutex = new Lock ();

async function main () {
	try {
		await mutex.acquire ();
		/*
		 * Do work on concurrent resource 
		 *
		 * await getResource ()
		 * await modifyResource ()*/
	}
	catch (err) {
		/* eslint no-console : off */
		console.error ({err}, 'error doing stuff');
	}

	/*
	 * Always release the lock
	 * Otherwise it will create a deadlock and other tasks waiting for the lock won't execute
	 */
	mutex.release ();
}

main ();
