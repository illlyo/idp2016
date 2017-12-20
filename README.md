# Refugee Flow App

This app uses data visualization from the downloadable CSV file <http://www.unhcr.org/globaltrends2016/>.
The viewer will be able to grasp a visual representation of the paths of the internationally displaced peoples(IDP) that migrated in the year of 2016. Inspiration and reference came from <https://medium.com/@zimrick/how-to-create-pure-react-svg-maps-with-topojson-and-d3-geo-e4a6b6848a98>.

***

## Technologies

* **Ruby** version : ruby 2.4.1p111 , with Rails to create and use as an API.  

* **React.js** as Front-end development with **D3.js** library for Data visualization.

* System dependencies:

    **React & Component** from _react_
    **geoMercator, geoPath** from _d3-geo_
    **feature** from _topojson-client_
    gem 'react-rails'

I also added a proxy in my package.json in my react-app _http://localhost:3001_

* Database creation

  The database has only one table created into an API.
  **Refugees Table**

| country_of_origin  | origin_coordinates_x | origin_coordinates_y  | country_of_asylum    | asylum_coordinates_x  | asylum_coordinates_y  | refugees           |
| ------------------ |:--------------------:| :--------------------:|:--------------------:| :--------------------:| :--------------------:| ------------------:|
| data-type: string  | data-type: decimal   | data-type: decimal    | data-type: string    | data-type: decimal    | data-type: decimal    | data-type: integer |
| country name       | latitude point       | longitude point       | country name         | latitude point        | longitude point       | number of refugees |


* Rails database with React.js initialization:

```
foreman start -p 3000
```
