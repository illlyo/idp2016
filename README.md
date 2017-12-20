# Refugee Flow App

This app uses data visualization

``` code here ```
***

## Technologies

* **Ruby** version : ruby 2.4.1p111 , with Rails to create and use as an API.  

* **React.js** as Front-end development with **D3.js** library for Data visualization.

* System dependencies

* Configuration

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

* ...
