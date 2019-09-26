# mutex
Asynchronous lock that can be used to serialize concurrent operations on a shared resource.

## Usage
Creation and management of the lock is done by user

### API

#### acquire
Raise a request for mutex. Returns a native JS promise. Wait for it to resolve before doing anything.

#### release
Releases the lock once the task is done for other threads/tasks to do acquire it and perform opeartions on shared resource. __ALWAYS__ release the lock wether task is scuccessfully done or not, otherwise it'll create a deadlock.

### Basic Example

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
