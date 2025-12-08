Le projet est fonctionnel, mais il présente de nombreux défauts qui rendront difficile son évolution et l’ajout de nouvelles fonctionnalités.
Les composants CountryComponent et HomeComponent sont fourre-tout. Ils réalisent trop d’actions. Ils réalisent les requêtes http pour obtenir la liste des pays. Sans centralisation de ces requêtes, on devra en recréer pour chaque composant. De plus, ils gèrent les données avec des typages any. L’un des avantages de typescript est le typage, utiliser any va donc à l’encontre du typage statique. On utilisera des interfaces pour régler ce problème. Concernant ces requêtes http, on peut voir que l’on ne se désabonne pas de l’observable. Il y a aussi des console log à supprimer.

Problèmes :
- Pas de typage strict avec l’utilisation d’any
- Mauvaise structure globale (composants all in one, pas de séparations (page,services,...))
- Pas de désabonnement pour les observables (fuite mémoire, observable survit au composant)
- Des consoles logs à supprimer
- Du code inutile

Structure :
    scr/app/
        -components
        -pages
        -services
        -models


Components sera composé de deux composants :
- CountriesPieChartComponent : gère la création de la pieChart et des données affichées
- CountriesLineChartComponent : gère la création de la linChart et des données affichées

Pages sera composé de quatre pages utilisées pour le routing: 
- la page dashboard : page d’acceuil contient header et de CountriesPieChartComponent
- le countryDetail : page contenant header et de  CountriesLineChartComponent
- le not-found : page d’erreur URL ou donnée.
- le header : contient le nom du projet

Services sera composé de deux services et d’un type:
- Service Api : il gère les appels vers le fichier JSON et renvoie le pays choisi grâce à activedRoute
- Service Data : gère les données, il possède des méthodes qui renvoient les données voulues sur les pays

Models sera composé de deux interfaces et d’un type:
- country {id:number country:string participations :Participation[] }
- participations {id:number year:number city:string medalsCount:number athleteCount:number}
- navSelect permet d’indiquer la page pour la navigation
Ces deux interfaces permettent un typage strict des données du JSON.