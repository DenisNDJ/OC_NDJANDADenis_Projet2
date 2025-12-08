La nouvelle architecture a été réalisée dans le but d'améliorer la structure de l'application. Cette amélioration permettra de faciliter les modifications et l'ajout de fonctionnalités sur l'application.
Cette architecture isolera des composants pour les rendre réutilisables. Le service, gérant les données, permettra d'utiliser les données de façon globale et sans réécrire des méthodes. Le service "API" permettra d'uniquement modifier le service en cas d'évolution de l'API et non dans tous les composants.

Structure detaillée:
    scr/app/
        -components
            -CountriesPieChartComponent
            -CountryLineChartComponent
            -HeaderComponent
        -pages
            -CountryDetailPageComponent
            -DashboardPageComponent
            -NotFoundPage
        -services
            -ApiService
            -NavService
            -DataService
        -models
            -Country
            -Participation
            -NavSelect


Components sera composé de deux composants :
- CountriesPieChartComponent : gère la création de la pieChart
- CountriesLineChartComponent : gère la création de la linChart du pays choisi
- Header : contient le nom du projet et une barre de navigation contenant tous les pays

Pages sera composé de quatre pages utilisées pour le routing: 
- Page dashboard : page d’acceuil contient header, des données sur les pays et de CountriesPieChartComponent
- Page countryDetail : page contenant header, des données sur le pays et de CountriesLineChartComponent
- Page not-found : page d’erreur URL ou donnée.

Services sera composé de deux services et d’un type:
- Service Api : il gère les appels vers le fichier JSON et renvoie le pays choisi grâce à activedRoute
- Service Data : gère les données, il possède des méthodes qui renvoient les données voulues sur les pays
- Service Navigation : gére la navigation entre les pages et le rafraichisement des pages

Models sera composé de deux interfaces et d’un type:
- country {id:number country:string participations :Participation[] }
- participations {id:number year:number city:string medalsCount:number athleteCount:number}
- navSelect permet d’indiquer la page pour la navigation
Ces deux interfaces permettent un typage strict des données du JSON.