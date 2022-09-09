# Pub/Sub vs Queue

## App overview

This software is for you who want to know the difference between Pub/Sub and Queue using Redis. This is the topology of the software:

![Software Topology](https://github.com/facsiaginsa/pubsub-vs-queue/blob/main/topology.png?raw=true)

The ``app1`` will send a message to ``redis`` every seconds. The message is something like ``I want a pizza {counter}``. And then the ``app2`` and ``app3`` will process the request by connecting to redis. And then the ``app2`` & ``app3`` will send a message like ``app2 handle: pizza {counter}`` or ``app3 handle: pizza {counter}`` to ``app1`` depend on wich app got the message from ``redis``.

This software has 2 operation mode:
1. Pub/Sub Mode
2. Queue Mode

## How to Deploy

### Prerequisite

You need:
1. node (tested in v16.15.0)
2. npm (tested in v8.5.5)

### Cloning Repo

Clone this repo.
````
git clone https://github.com/facsiaginsa/pubsub-vs-queue.git
````

### Running ``app1``

Go to ``app1`` folder
````
cd app1
````

Create ``.env`` file, you can refer to ``env.example`` to see what is the required envrionment variable
````
cp env.example .env
````

Adjust the parameter on ``.env`` according to your redis environment. Set ``MODE=pubsub`` to use pubsub mode, or ``MODE=queue`` to use queue mode. Note that you must set the same ``MODE`` for ``app1``, ``app2``, and ``app3``.

After that, you can run the app by running this command
````
node src/app.js
````

You will see some log printed on the console:
````
node src/app.js 
sending message: I want a pizza 1 to redis pubsub..
sending message: I want a pizza 2 to redis pubsub..
sending message: I want a pizza 3 to redis pubsub..
...
````

You will see that the ``app1`` is sending message to redis each seconds.

### Running ``app2``

Open another console while keep the ``app1`` running.

Go to ``app2`` folder
````
cd app2
````

Create ``.env`` file, you can refer to ``env.example`` to see what is the required envrionment variable
````
cp env.example .env
````

Adjust the parameter on ``.env`` according to your redis environment. Set the ``APP1_URL`` depend on where do you run the ``app1``, if run this in ``localhost`` on port ``3000``, then the URL is ``http://localhost:3000``. Lastly, set ``MODE=pubsub`` to use pubsub mode, or ``MODE=queue`` to use queue mode. Note that you must set the same ``MODE`` for ``app1``, ``app2``, and ``app3``.

After that, you can run the app by running this command
````
node src/app.js
````

### Running ``app3``

Open another console while keep the ``app1`` and ``app2`` running.

Go to ``app3`` folder
````
cd app3
````

Create ``.env`` file, you can refer to ``env.example`` to see what is the required envrionment variable
````
cp env.example .env
````

Adjust the parameter on ``.env`` according to your redis environment. Set the ``APP1_URL`` depend on where do you run the ``app1``, if run this in ``localhost`` on port ``3000``, then the URL is ``http://localhost:3000``. Lastly, set ``MODE=pubsub`` to use pubsub mode, or ``MODE=queue`` to use queue mode. Note that you must set the same ``MODE`` for ``app1``, ``app2``, and ``app3``.

After that, you can run the app by running this command
````
node src/app.js
````

### Monitor

You can analyze the difference between pubsub and queue by looking at ``app1`` log. 

When you are using pubsub mode, the log will be something like this
````
sending message: I want a pizza 22 to redis pubsub..
app2 handle: pizza 22
app3 handle: pizza 22
sending message: I want a pizza 23 to redis pubsub..
app2 handle: pizza 23
app3 handle: pizza 23
sending message: I want a pizza 24 to redis pubsub..
app3 handle: pizza 24
app2 handle: pizza 24
...
````

When you are using queue mode, the log will be something like this
````
sending message: I want a pizza 12 to redis queue..
app3 handle: pizza 12
sending message: I want a pizza 13 to redis queue..
app2 handle: pizza 13
sending message: I want a pizza 14 to redis queue..
app3 handle: pizza 14
sending message: I want a pizza 15 to redis queue..
app2 handle: pizza 15
...
````