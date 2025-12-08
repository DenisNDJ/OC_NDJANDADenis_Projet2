Le projet est fonctionnel, mais il présente de nombreux défauts qui rendront difficile son évolution et l’ajout de nouvelles fonctionnalités.
Le projet possède une mauvaise structure. Les pages font trop. Il faudra créer des services et des composants pour alléger les pages. Cette séparation permettra de faciliter l'amélioration ou l'ajout de fonctionnalités dans l'application. Cela nous permettra aussi de réutiliser certains composants.
On voit notamment que les pages, CountryComponent et HomeComponent, réalisent les requêtes http pour obtenir la liste des pays. Cette décentralisation ,des requêtes http, signifie de créer une requête pour tous les nouveaux composants.
De plus, les pages gèrent les données. En centralisant cette gestion dans un service, les nouveaux composants n'auront pas à recréer cette gestion. On évite donc les doublons et on augmente la réutilisabilité.
On peut voir que le code utilise des typages any. L'un des intérêts du typsript est le typage strict, l'utilisation de any pose donc un problème. On utilisera des interfaces pour typer correctement les données du fichier JSON.
On peut voir qu'il reste aussi des logs à supprimer. Utile durant le développement, il ne faut pas oublier de les supprimer.
Enfin, les requêtes "http" utilisent des observables mais on ne se désabonne pas de ceux-la. Sans désabonnement, on peut avoir des fuites de mémoire et les observables peuvent "survivre" à leur page.

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

La structure sera compossé de quatres dossiers. 
Le premier "composants" sera composer de trois composants graphiques qui sont réutilisable.
Le deuxieme "pages" sera composé de trois pages utilisés pour le rooting de l'application.
Le troisieme "services" sera composé de trois services.
Le quatrieme "models" sera composé de deux interfaces et un type.