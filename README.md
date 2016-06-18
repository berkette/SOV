# SOV

A simple indie MORPG (Multiplayer Online Role Playing Game), that has no intent of being massive.

## Installation

Install node:
```pacman -S npm```

Install mongodb:
```pacman -S mongodb```

Grab the repo:
```git clone https://github.com/berkette/SOV.git .```

Go there:
```cd SOV```

Install the dependencies:
```npm install```

Run the server:
```npm start```

Visit http://localhost:3000/ to view the website.

## Code organization

Put client side code in `public/`. Server side data requests can be put in `routes/`.

This aims to be a single page-application. All data should be fetched over AJAX requests.
