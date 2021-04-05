/* Add your Application JavaScript */
const Home = {
  name: 'Home',
  template: `  
    <div class="text-center">
      <img src="/static/images/logo.png" alt="VueJS Logo">
      <h1>{{ welcome }}</h1>
    </div>      `,
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }   
  }
};

const NewsList =  {
  name: 'NewsList',
  template: `
     <div class="form-inline d-flex justify-content-center">
          <div class="form-group mx-sm-3 mb-2">
              <label class="sr-only" for="search">Search</label>
              <input type="search" name="search" v-model="searchTerm" id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" />
              <!--<p>You are searching for {{ searchTerm }}</p>-->
              <button class="btn btn-primary mb-2" @click="searchNews">Search</button>
          </div>
      </div>
      <div class="news">
          <h2>News</h2>
          <ul class="news__list">
              <li v-for="article in articles" style="list-style-type:none; display:inline-block; border-radius:5px; border: 1px solid; border-top-width:5px; border-top-color: lightgreen; margin: 0 1em 1em 0; width:18em; height:30em; box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19); vertical-align:top; padding:1em" class="news__item">
                  <p><strong>{{ article.title }}</strong></p>
                  <img :src = "article.urlToImage" style="max-width:100%; max-height:100%;"/>
                  <p></p>
                  <p style="padding-bottom: 2em;">{{ article.description }}</p> 
              </li>
          </ul>
      </div>
  `,
  created() {

    let self = this;
    let apiKey = '';

    fetch(`https://newsapi.org/v2/top-headlines?country=us`,
    {
      headers: {
        'Authorization': `Bearer <apikey>`
      }
    })
    .then(response =>response.json())
    .then(data => {
      console.log(data);
      self.articles = data.articles;
    }).catch(error => {
      console.log(error);
    });
  },
  data(){
    return {
       articles: [],
       searchTerm: ''
    }
  },
  methods: {
    searchNews(){
      let self = this;
      let apiKey = '';

      fetch(`https://newsapi.org/v2/everything?q='${self.searchTerm}'&language=en`, {    
        headers: {
          'Authorization': `Bearer <apikey>`,
        }})
        .then(function(response) {
          return response.json();
        }).then(function(data){
          console.log(data);
          self.articles = data.articles;
        }).catch(error => {
          console.log(error);
        });
    } 
  }
};

const app = Vue.createApp({
  conponents: {
    'home': Home,
    'news-list': NewsList
  }
});

const router = VueRouter.createRouter({  
  history: VueRouter.createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/news', component: NewsList }
  ]
});


app.component('app-header', {
  name: 'AppHeader',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <a class="navbar-brand" href="#">VueJS App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/news" class="nav-link">News</router-link>
                </li>
              </ul>
            </div>
          </nav>
      </header>    
  `,
  data: function() {
    return {};
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
})

app.use(router);
app.mount('#app');