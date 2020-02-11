# KOOGIO Website

[KOOGIO website](https://koogio.now.sh/) is official website of KOOGIO. It preset games I built with [Defold](https://defold.com/) and published to [Google Play](https://play.google.com/store/apps/developer?id=KOOGIO).

I built it with Gridsome using VueJS to generate pages from data. The data of this page is from get projects API. Only this api does not required authentication token because KOOGIO website is static site. I fetched the data from get projects API and build pages for each project. I used Tailwind for style because Gridsome supports it with a plugin.

There was a problem with this website. Because it fetchs data from API and builds pages from the data, the data on the page does not change if I update the data on Admin CMS. So I needed to find a way to rebuild the website every I change the data. Luckily, Github Actions offer a solution for this problem. I set up Github Actions schedule to run its workflow to rebuild and deploy the website at 00:00 UTC everyday. The problem was solved.

Tools I used
* [Gridsome](https://gridsome.org/)
* [VueJS](https://vuejs.org/)
* [Tailwind](http://tailwindcss.com/)
* Deploy to [Zeit Now](https://zeit.co/)