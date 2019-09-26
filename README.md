# mutex
Asynchronous lock that can be used to serialize concurrent operations on a shared resource.

## Usage
Creation and management of the lock is done by user

```javascript
let Lock = require ("./mutex").Lock;
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
		console.error ({err}, 'error doing stuff');
	}

	/*
	 * Always release the lock
	 * Otherwise it will create a deadlock and other tasks waiting for the lock won't execute
	 */
	mutex.release ();
}

main ();
```
