# GeoTAM

This is an application built for the [GeoTAM hackathon](https://www.rebalance.earth/geotam-challenge). The application is fullstack, built in TypeScript (JavaScript). The application provides a basic login screen, followed by the main application which allows users to draw a given area to determine the turnover of businesses in the area. The whole application is built with Open Source tools. 

![GeoTAM App](screenshot.png "A screenshot of the GeoTAM application")

## Frontend

The frontend is built using:

* Preact
* MapLibre
* Turf.js
* Terra Draw

To get started you can install:

```
npm install
```

Then run 

```
npm run build:watch
```

To start a watching build that will allow you to develop locally.

## Backend

The backend is built using:

* Nest.js
* Sequelize
* Postgres

Firstly you'll need to do an install:

```shell
npm install 
```

To get started you will need to set up your environment variables. You can create a `.env` file in the `backend` folder:

```shell
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=some_password_123

PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_DB=geotam
PG_PASSWORD=postgres

SEED_BUSINESSES_PATH=/path/to/your/open-local-data.csv
```

You will also need to have your Postgres database created (in this case it's called geotam).

This part is probably the most specific, as this app assumes that the data being loaded comes from the OpenLocal dataset given in the hackathon. However there is an additional stipulation that all the rows in the CSV have the 'voafloorarea' and 'voarateablevalue' fields complete. You can get a filtered version this by placing your OpenLocal dataset in scripts/data and renaming it 'open-local.csv', and the running the `filter-only-complete-csv.ts` against this new copy. You may also want to ensure the latitude and longitude columns are named correctly because longitude appeared to have been labelled `x1`, most likely be accident. 

To run the script you can use the following commands: 

```
cd scripts
npm install
npx tsx filter-only-complete-csv.ts
```

After this assuming the env var SEED_BUSINESSES_PATH is set to your new data path (remember these seeds will run from the backend/dist folder so it has to be either absolute, or relative from there), we can run the local migrations:

```
npm run db:migrate:up
npm run db:seed:up
```

RThe first seed (`backend/src/seeders/20241123164536-admin-user.ts`) will add a admin user to allow you to login, the second seed (20241123164538-load-manchester-data.ts) will the actual business data you need to draw and fetch the businesses in the UI. Both will be critical to getting the application going 

Then you can start the backend app:

```shell
npm run start:dev
```

## Calculations

Most of the calculations occur in:

`backend/src/buisness/calculate-estimate-turnover.ts`

If you want to see how the turnover/TAM numbers are derived.

## Assets

Assets used are all open source.

### Icons

- Polygon: https://www.svgrepo.com/svg/451198/polygon - MIT Licensed
- Freehand: https://www.svgrepo.com/svg/450915/freehand - MIT Licensed
- Rectangle: https://www.svgrepo.com/svg/487711/rectangle - MIT Licensed
- Circle: https://www.svgrepo.com/svg/507597/circle - MIT Licensed
- Select: https://www.svgrepo.com/svg/449216/select - Apache

### Images

- Manchester: https://www.publicdomainpictures.net/pictures/30000/velka/bbc-buildings-salford-manchester.jpg - CC0 Public Domain

## License 

MIT Licensed