All the News That's Fit to Scrape

### Overview

This is a web app that lets users retrieve articles, save the articles, and leave comments on the latest news. Using Express, Handlebars, MongoDB, Mongoose, and the Cheerio Package. 

  1. Whenever a user visits this site, the app will scrape stories from a news outlet. The data includes a link to the story and a headline.
  
  2. It uses Cheerio to grab the site content and Mongoose to save it to a MongoDB database. 

  3. All users can leave comments on the stories. They can also delete whatever comments they want removed. All stored comments are visible to every user.
  
  4. It uses Mongoose's model system to associate comments with particular articles. 
